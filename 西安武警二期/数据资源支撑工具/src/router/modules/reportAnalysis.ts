import { AppRouteRecord } from '@/types/router'

export const reportAnalysisRoutes: AppRouteRecord = {
  path: '/report-analysis',
  name: 'ReportAnalysis',
  component: '/index/index',
  meta: {
    title: '统计分析报告',
    icon: 'ri:bar-chart-grouped-line',
    roles: ['R_SUPER', 'R_ADMIN']
  },
  children: [
    {
      path: 'style',
      name: 'ReportStyle',
      component: '/report-analysis/style',
      meta: {
        title: '多风格报告',
        icon: 'ri:layout-masonry-line',
        keepAlive: true
      }
    },
    {
      path: 'download',
      name: 'ReportDownload',
      component: '/report-analysis/download',
      meta: {
        title: '一键下载报告',
        icon: 'ri:download-cloud-2-line',
        keepAlive: true
      }
    },
    {
      path: 'drilldown',
      name: 'ReportDrilldown',
      component: '/report-analysis/drilldown',
      meta: {
        title: '报告下钻',
        icon: 'ri:line-chart-line',
        keepAlive: true
      }
    }
  ]
}
