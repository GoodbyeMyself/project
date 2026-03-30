import { AppRouteRecord } from '@/types/router'

export const systemRoutes: AppRouteRecord = {
  path: '/notification-management',
  name: 'NotificationManagement',
  component: '/index/index',
  meta: {
    title: '通知下发管理',
    icon: 'ri:notification-4-line',
    roles: ['R_SUPER', 'R_ADMIN']
  },
  children: [
    {
      path: 'content-customization',
      name: 'NotificationContentCustomization',
      component: '/system/user',
      meta: {
        title: '通知内容定制',
        icon: 'ri:file-list-3-line',
        keepAlive: true,
        roles: ['R_SUPER', 'R_ADMIN']
      }
    },
    {
      path: 'record-tracking',
      name: 'NotificationRecordTracking',
      component: '/system/role',
      meta: {
        title: '通知记录与追踪',
        icon: 'ri:route-line',
        keepAlive: true,
        roles: ['R_SUPER', 'R_ADMIN']
      }
    },
    {
      path: 'permission-authorization',
      name: 'NotificationPermissionAuthorization',
      component: '/system/menu',
      meta: {
        title: '用户权限授权',
        icon: 'ri:shield-user-line',
        keepAlive: true,
        roles: ['R_SUPER', 'R_ADMIN'],
        authList: [
          { title: '新增', authMark: 'add' },
          { title: '编辑', authMark: 'edit' },
          { title: '删除', authMark: 'delete' },
          { title: '配置', authMark: 'config' },
          { title: '查看', authMark: 'view' }
        ]
      }
    },
    {
      path: 'user-center',
      name: 'UserCenter',
      component: '/system/user-center',
      meta: {
        title: '个人中心',
        icon: 'ri:user-line',
        isHide: true,
        keepAlive: true,
        isHideTab: true
      }
    }
  ]
}
