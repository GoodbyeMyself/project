import { AppRouteRecord } from '@/types/router'

export const dataAssetRoutes: AppRouteRecord = {
  path: '/data-asset',
  name: 'DataAsset',
  component: '/index/index',
  meta: {
    title: '数据资产管理',
    icon: 'ri:stack-line',
    roles: ['R_SUPER', 'R_ADMIN']
  },
  children: [
    {
      path: 'management',
      name: 'DataAssetManagement',
      component: '/data-asset/management',
      meta: {
        title: '资产台账',
        icon: 'ri:database-line',
        keepAlive: true
      }
    }
  ]
}
