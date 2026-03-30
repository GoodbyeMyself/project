import { AppRouteRecord } from '@/types/router'

export const dashboardRoutes: AppRouteRecord = {
  name: 'ReportManagement',
  path: '/report-management',
  component: '/index/index',
  meta: {
    title: '数据上报管理',
    icon: 'ri:file-upload-line',
    roles: ['R_SUPER', 'R_ADMIN']
  },
  children: [
    {
      path: 'plan-center',
      name: 'ReportPlanCenter',
      component: '/dashboard/console',
      meta: {
        title: '上报计划与文件管理',
        icon: 'ri:folder-chart-line',
        keepAlive: true,
        fixedTab: true
      }
    },
    {
      path: 'compliance-monitor',
      name: 'ReportComplianceMonitor',
      component: '/dashboard/analysis',
      meta: {
        title: '合规校验与监控告警',
        icon: 'ri:shield-check-line',
        keepAlive: true
      }
    }
  ]
}
