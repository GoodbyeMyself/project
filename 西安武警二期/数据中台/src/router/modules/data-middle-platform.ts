import { AppRouteRecord } from '@/types/router'

const ALL_ROLES = ['R_SUPER', 'R_ADMIN', 'R_USER']

const createModuleRoute = (
  path: string,
  name: string,
  title: string,
  icon: string
): AppRouteRecord => ({
  path,
  name,
  component: '/middle-platform/module',
  meta: {
    title,
    icon,
    keepAlive: true,
    roles: ALL_ROLES
  }
})

export const dataMiddlePlatformRoutes: AppRouteRecord = {
  path: '/data-middle-platform',
  name: 'DataMiddlePlatform',
  component: '/index/index',
  redirect: '/data-middle-platform/overview',
  meta: {
    title: '数据中台',
    icon: 'ri:database-2-line',
    roles: ALL_ROLES
  },
  children: [
    {
      path: 'overview',
      name: 'DataMiddlePlatformOverview',
      component: '/middle-platform/overview',
      meta: {
        title: '平台总览',
        icon: 'ri:dashboard-line',
        keepAlive: true,
        fixedTab: true,
        roles: ALL_ROLES
      }
    },
    createModuleRoute('warehouse-system', 'WarehouseSystemManagement', '数仓体系', 'ri:archive-line'),
    createModuleRoute('data-governance', 'DataGovernanceManagement', '数据治理', 'ri:shield-check-line'),
    createModuleRoute('data-protection', 'DataProtectionManagement', '数据保护', 'ri:lock-2-line'),
    createModuleRoute('data-service', 'DataServiceManagement', '数据服务', 'ri:service-line')
  ]
}
