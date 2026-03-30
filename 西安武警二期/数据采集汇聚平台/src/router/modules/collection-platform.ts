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
  component: '/platform/module',
  meta: {
    title,
    icon,
    keepAlive: true,
    roles: ALL_ROLES
  }
})

export const collectionPlatformRoutes: AppRouteRecord = {
  path: '/collection-platform',
  name: 'CollectionPlatform',
  component: '/index/index',
  redirect: '/collection-platform/overview',
  meta: {
    title: '数据采集汇聚平台',
    icon: 'ri:database-2-line',
    roles: ALL_ROLES
  },
  children: [
    {
      path: 'overview',
      name: 'CollectionPlatformOverview',
      component: '/platform/overview',
      meta: {
        title: '平台总览',
        icon: 'ri:dashboard-line',
        keepAlive: true,
        fixedTab: true,
        roles: ALL_ROLES
      }
    },
    createModuleRoute(
      'device-connection-management',
      'DeviceConnectionManagement',
      '设备连接管理',
      'ri:usb-line'
    ),
    createModuleRoute(
      'collection-storage-management',
      'CollectionStorageManagement',
      '数据采集与存储',
      'ri:inbox-archive-line'
    ),
    createModuleRoute(
      'processing-analysis-management',
      'ProcessingAnalysisManagement',
      '数据处理与分析',
      'ri:line-chart-line'
    ),
    createModuleRoute(
      'realtime-remote-control',
      'RealtimeRemoteControl',
      '实时监控与远程控制',
      'ri:radar-line'
    ),
    createModuleRoute(
      'alarm-notification-management',
      'AlarmNotificationManagement',
      '报警与通知',
      'ri:alarm-warning-line'
    ),
    createModuleRoute(
      'data-visualization-management',
      'DataVisualizationManagement',
      '数据可视化',
      'ri:bar-chart-2-line'
    ),
    createModuleRoute(
      'data-retention-management',
      'DataRetentionManagement',
      '数据留存管理',
      'ri:archive-stack-line'
    ),
    createModuleRoute(
      'data-reporting-management',
      'DataReportingManagement',
      '数据上报管理',
      'ri:file-chart-line'
    ),
    createModuleRoute(
      'notification-dispatch-management',
      'NotificationDispatchManagement',
      '通知下发管理',
      'ri:send-plane-2-line'
    )
  ]
}
