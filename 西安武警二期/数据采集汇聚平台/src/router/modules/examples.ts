import { AppRouteRecord } from '@/types/router'

export const examplesRoutes: AppRouteRecord = {
  path: '/data-processing-analysis',
  name: 'DataProcessingAnalysis',
  component: '/index/index',
  meta: {
    title: '数据处理与分析',
    icon: 'ri:git-merge-line',
    roles: ['R_SUPER', 'R_ADMIN']
  },
  children: [
    {
      path: 'center',
      name: 'DataProcessingAnalysisCenter',
      component: '/result/fail',
      meta: {
        title: '处理与分析中心',
        icon: 'ri:flow-chart',
        keepAlive: true
      }
    },
    {
      path: 'standardization',
      name: 'DataStandardizationManage',
      component: '/article/detail',
      meta: {
        title: '标准化处理',
        icon: 'ri:book-open-line',
        keepAlive: true
      }
    },
    {
      path: 'abnormal-processing',
      name: 'AbnormalDataProcess',
      component: '/article/comment',
      meta: {
        title: '异常数据处理',
        icon: 'ri:filter-3-line',
        keepAlive: true
      }
    },
    {
      path: 'dispatch-manage',
      name: 'DataProcessDispatchManage',
      component: '/examples/forms/search-bar',
      meta: {
        title: '处理调度管理',
        icon: 'ri:time-line',
        keepAlive: true
      }
    },
    {
      path: 'monitor-log',
      name: 'DataProcessMonitorLog',
      component: '/examples/tables/tree',
      meta: {
        title: '监控日志',
        icon: 'ri:file-list-2-line',
        keepAlive: true
      }
    }
  ]
}
