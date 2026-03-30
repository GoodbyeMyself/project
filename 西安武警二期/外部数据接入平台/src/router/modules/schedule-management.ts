import { AppRouteRecord } from '@/types/router'

export const scheduleManagementRoutes: AppRouteRecord = {
  path: '/schedule-management',
  name: 'ScheduleManagement',
  component: '/index/index',
  meta: {
    title: '接入调度管理',
    icon: 'ri:calendar-check-line',
    roles: ['R_SUPER', 'R_ADMIN']
  },
  children: [
    {
      path: 'alert-management',
      name: 'AlertManagement',
      component: '/schedule-management/alert-management',
      meta: {
        title: '告警管理',
        icon: 'ri:alarm-warning-line',
        keepAlive: true
      }
    },
    {
      path: 'resource-monitor',
      name: 'ResourceMonitor',
      component: '/safeguard/server',
      meta: {
        title: '资源监控',
        icon: 'ri:server-line',
        keepAlive: true
      }
    },
    {
      path: 'orchestration',
      name: 'TaskOrchestration',
      component: '/system/menu',
      meta: {
        title: '任务编排',
        icon: 'ri:node-tree',
        keepAlive: true
      }
    },
    {
      path: 'overview-stats',
      name: 'TaskOverviewStats',
      component: '/dashboard/analysis',
      meta: {
        title: '任务概览统计',
        icon: 'ri:bar-chart-grouped-line',
        keepAlive: true
      }
    }
  ]
}
