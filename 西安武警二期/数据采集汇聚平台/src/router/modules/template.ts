import { AppRouteRecord } from '@/types/router'

export const templateRoutes: AppRouteRecord = {
  path: '/template',
  name: 'Template',
  component: '/index/index',
  meta: {
    title: '数据可视化',
    icon: 'ri:bar-chart-box-line',
    roles: ['R_SUPER', 'R_ADMIN']
  },
  children: [
    {
      path: 'charts',
      name: 'Charts',
      component: '/template/charts',
      meta: {
        title: '数据展示与设备状态',
        icon: 'ri:presentation-line',
        keepAlive: true
      }
    }
  ]
}
