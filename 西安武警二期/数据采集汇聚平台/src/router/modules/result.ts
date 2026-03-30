import { AppRouteRecord } from '@/types/router'

export const resultRoutes: AppRouteRecord = {
  path: '/data-collection-storage',
  name: 'DataCollectionStorage',
  component: '/index/index',
  meta: {
    title: '数据采集与存储',
    icon: 'ri:download-cloud-2-line',
    roles: ['R_SUPER', 'R_ADMIN']
  },
  children: [
    {
      path: 'center',
      name: 'DataCollectionStorageCenter',
      component: '/result/success',
      meta: {
        title: '采集与存储中心',
        icon: 'ri:inbox-archive-line',
        keepAlive: true
      }
    },
    {
      path: 'protocol-adapter',
      name: 'CollectionProtocolAdapter',
      component: '/examples/forms/search-bar',
      meta: {
        title: '协议适配与检索',
        icon: 'ri:git-branch-line',
        keepAlive: true
      }
    },
    {
      path: 'schedule-monitor',
      name: 'CollectionScheduleMonitor',
      component: '/examples/socket-chat',
      meta: {
        title: '调度预览与监控',
        icon: 'ri:pulse-line',
        keepAlive: true
      }
    },
    {
      path: 'catalog-manage',
      name: 'CollectionCatalogManage',
      component: '/examples/tables/tree',
      meta: {
        title: '任务目录管理',
        icon: 'ri:folder-tree-line',
        keepAlive: true
      }
    }
  ]
}
