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
  component: '/external-platform/module',
  meta: {
    title,
    icon,
    keepAlive: true,
    roles: ALL_ROLES
  }
})

export const externalAccessPlatformRoutes: AppRouteRecord = {
  path: '/external-access-platform',
  name: 'ExternalAccessPlatform',
  component: '/index/index',
  redirect: '/external-access-platform/overview',
  meta: {
    title: '外部数据接入平台',
    icon: 'ri:plug-2-line',
    roles: ALL_ROLES
  },
  children: [
    {
      path: 'overview',
      name: 'ExternalAccessPlatformOverview',
      component: '/external-platform/overview',
      meta: {
        title: '平台总览',
        icon: 'ri:dashboard-line',
        keepAlive: true,
        fixedTab: true,
        roles: ALL_ROLES
      }
    },
    createModuleRoute('source-management', 'ExternalSourceManagement', '接入来源管理', 'ri:database-2-line'),
    createModuleRoute('template-config', 'ExternalTemplateConfig', '数据模板配置', 'ri:file-list-3-line'),
    createModuleRoute('access-data', 'ExternalAccessData', '接入数据管理', 'ri:inbox-archive-line'),
    createModuleRoute('task-management', 'ExternalTaskManagement', '接入任务管理', 'ri:task-line'),
    createModuleRoute('schedule-management', 'ExternalScheduleManagement', '接入调度管理', 'ri:calendar-check-line'),
    createModuleRoute('share-management', 'ExternalShareManagement', '数据共享管理', 'ri:share-forward-line')
  ]
}
