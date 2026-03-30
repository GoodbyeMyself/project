import { AppRouteRecord } from '@/types/router'

export const resultRoutes: AppRouteRecord = {
  path: '/result',
  name: 'Result',
  component: '/index/index',
  meta: {
    title: '通知下发管理',
    icon: 'ri:notification-4-line'
  },
  children: [
    {
      path: 'success',
      name: 'ResultSuccess',
      component: '/result/success',
      meta: {
        title: '通知内容定制',
        icon: 'ri:file-list-3-line',
        keepAlive: true
      }
    },
    {
      path: 'fail',
      name: 'ResultFail',
      component: '/result/fail',
      meta: {
        title: '通知记录与追踪',
        icon: 'ri:route-line',
        keepAlive: true
      }
    },
    {
      path: 'permission',
      name: 'ResultPermission',
      component: '/result/permission',
      meta: {
        title: '用户权限授权',
        icon: 'ri:shield-user-line',
        keepAlive: true
      }
    }
  ]
}
