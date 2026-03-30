import { AppRouteRecord } from '@/types/router'

export const dashboardRoutes: AppRouteRecord = {
  name: 'DataWarehouse',
  path: '/data-warehouse',
  component: '/index/index',
  meta: {
    title: '数据仓体系',
    icon: 'ri:database-2-line',
    roles: ['R_SUPER', 'R_ADMIN']
  },
  children: [
    {
      path: 'catalog-management',
      name: 'DataWarehouseCatalogManagement',
      component: '/dashboard/console',
      meta: {
        title: '数仓目录与表信息',
        icon: 'ri:table-line',
        keepAlive: true,
        fixedTab: true
      }
    }
  ]
}
