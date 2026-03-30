import { AppRouteRecord } from '@/types/router'

export const dataLineageRoutes: AppRouteRecord = {
  path: '/data-lineage',
  name: 'DataLineage',
  component: '/index/index',
  meta: {
    title: '数据溯源分析',
    icon: 'ri:git-merge-line',
    roles: ['R_SUPER', 'R_ADMIN']
  },
  children: [
    {
      path: 'analysis',
      name: 'DataLineageAnalysis',
      component: '/data-lineage/analysis',
      meta: {
        title: '溯源分析',
        icon: 'ri:route-line',
        keepAlive: true
      }
    }
  ]
}
