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
  component: '/indicator-platform/module',
  meta: {
    title,
    icon,
    keepAlive: true,
    roles: ALL_ROLES
  }
})

export const indicatorPlatformRoutes: AppRouteRecord = {
  path: '/indicator-platform',
  name: 'IndicatorPlatform',
  component: '/index/index',
  redirect: '/indicator-platform/overview',
  meta: {
    title: '指标体征管理平台',
    icon: 'ri:line-chart-line',
    roles: ALL_ROLES
  },
  children: [
    {
      path: 'overview',
      name: 'IndicatorPlatformOverview',
      component: '/indicator-platform/overview',
      meta: {
        title: '平台总览',
        icon: 'ri:dashboard-line',
        keepAlive: true,
        fixedTab: true,
        roles: ALL_ROLES
      }
    },
    createModuleRoute('indicator-management', 'IndicatorManagement', '指标管理', 'ri:book-2-line'),
    createModuleRoute('indicator-build', 'IndicatorBuild', '指标构建', 'ri:calculator-line'),
    createModuleRoute('indicator-resource', 'IndicatorResource', '指标资源', 'ri:folder-chart-line'),
    createModuleRoute('indicator-report', 'IndicatorReport', '指标分析报告', 'ri:file-chart-line')
  ]
}
