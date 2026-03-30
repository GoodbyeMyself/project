import { AppRouteRecord } from '@/types/router'

export const supportRoutes: AppRouteRecord = {
  path: '/system',
  name: 'SupportSystem',
  component: '/index/index',
  meta: {
    title: '系统支持',
    isHide: true
  },
  children: [
    {
      path: 'user-center',
      name: 'UserCenter',
      component: '/system/user-center',
      meta: {
        title: '个人中心',
        isHide: true,
        isHideTab: true,
        keepAlive: true
      }
    }
  ]
}
