import { AppRouteRecord } from '@/types/router'

export const safeguardRoutes: AppRouteRecord = {
  path: '/safeguard',
  name: 'Safeguard',
  component: '/index/index',
  meta: {
    title: '实时监控与远程控制',
    icon: 'ri:radar-line',
    keepAlive: false
  },
  children: [
    {
      path: 'device-center',
      name: 'SafeguardServer',
      component: '/safeguard/server',
      meta: {
        title: '设备监控与远程控制',
        icon: 'ri:cpu-line',
        keepAlive: true
      }
    }
  ]
}
