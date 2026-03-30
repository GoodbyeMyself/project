import { AppRouteRecord } from '@/types/router'

export const dashboardRoutes: AppRouteRecord = {
  name: 'Dashboard',
  path: '/dashboard',
  component: '/index/index',
  meta: {
    title: '数据处理中心',
    icon: 'ri:database-2-line',
    roles: ['R_SUPER', 'R_ADMIN']
  },
  children: [
    {
      path: 'console',
      name: 'Console',
      component: '/dashboard/console',
      meta: {
        title: '数据处理概览',
        icon: 'ri:dashboard-horizontal-line',
        keepAlive: false,
        fixedTab: true
      }
    },
    {
      path: 'analysis',
      name: 'Analysis',
      component: '/dashboard/analysis',
      meta: {
        title: '数据处理量分析',
        icon: 'ri:bar-chart-grouped-line',
        keepAlive: false
      }
    }
  ]
}
