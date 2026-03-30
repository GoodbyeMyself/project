import request from '@/utils/http'

const FRONTEND_USER_STORAGE_KEY = 'exchange-platform-user-profile'

const FRONTEND_BUTTONS = [
  'query',
  'export',
  'add',
  'edit',
  'delete',
  'detail',
  'online',
  'offline',
  'copy',
  'move',
  'assign',
  'portal',
  'subscribe',
  'unsubscribe',
  'apply',
  'cancelApply',
  'backHome',
  'groupUsers',
  'upload',
  'download',
  'newFolder',
  'editFolder',
  'deleteFolder',
  'addDirectory',
  'editDirectory',
  'deleteDirectory'
]

const FRONTEND_USERS: Record<string, Api.Auth.UserInfo> = {
  super: {
    userId: 1,
    userName: '平台超级管理员',
    email: 'super@exchange.local',
    roles: ['R_SUPER'],
    buttons: FRONTEND_BUTTONS
  },
  admin: {
    userId: 2,
    userName: '平台管理员',
    email: 'admin@exchange.local',
    roles: ['R_ADMIN'],
    buttons: FRONTEND_BUTTONS
  },
  user: {
    userId: 3,
    userName: '平台操作员',
    email: 'user@exchange.local',
    roles: ['R_USER'],
    buttons: FRONTEND_BUTTONS
  }
}

const isFrontendMode = () => import.meta.env.VITE_ACCESS_MODE === 'frontend'

const resolveAccountKey = (userName: string) => {
  const lowerCaseName = userName.toLowerCase()

  if (lowerCaseName.includes('super')) return 'super'
  if (lowerCaseName.includes('admin')) return 'admin'
  return 'user'
}

const readFrontendUser = (): Api.Auth.UserInfo => {
  const rawUser = localStorage.getItem(FRONTEND_USER_STORAGE_KEY)

  if (!rawUser) {
    return FRONTEND_USERS.super
  }

  try {
    return JSON.parse(rawUser) as Api.Auth.UserInfo
  } catch (error) {
    console.error('[Auth] 解析本地用户信息失败:', error)
    return FRONTEND_USERS.super
  }
}

/**
 * 登录
 * @param params 登录参数
 * @returns 登录响应
 */
export function fetchLogin(params: Api.Auth.LoginParams) {
  if (isFrontendMode()) {
    const accountKey = resolveAccountKey(params.userName)
    const profile = FRONTEND_USERS[accountKey]

    localStorage.setItem(FRONTEND_USER_STORAGE_KEY, JSON.stringify(profile))

    return Promise.resolve<Api.Auth.LoginResponse>({
      token: `frontend-${accountKey}-${Date.now()}`,
      refreshToken: `frontend-refresh-${accountKey}`
    })
  }

  return request.post<Api.Auth.LoginResponse>({
    url: '/api/auth/login',
    params
  })
}

/**
 * 获取用户信息
 * @returns 用户信息
 */
export function fetchGetUserInfo() {
  if (isFrontendMode()) {
    return Promise.resolve(readFrontendUser())
  }

  return request.get<Api.Auth.UserInfo>({
    url: '/api/user/info'
  })
}
