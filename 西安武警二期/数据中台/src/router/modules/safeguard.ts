import { AppRouteRecord } from '@/types/router'

export const safeguardRoutes: AppRouteRecord = {
  path: '/data-protection',
  name: 'DataProtection',
  component: '/index/index',
  meta: {
    title: '数据保护',
    icon: 'ri:shield-keyhole-line',
    keepAlive: false
  },
  children: [
    {
      path: 'security-center',
      name: 'DataProtectionSecurityCenter',
      component: '/safeguard/server',
      meta: {
        title: '权限与防护中心',
        icon: 'ri:shield-star-line',
        keepAlive: true
      }
    }
  ]
}
