import { AppRouteRecord } from '@/types/router'

export const widgetsRoutes: AppRouteRecord = {
  path: '/widgets',
  name: 'Widgets',
  component: '/index/index',
  meta: {
    title: '数据留存管理',
    icon: 'ri:archive-drawer-line',
    roles: ['R_SUPER', 'R_ADMIN']
  },
  children: [
    {
      path: 'excel',
      name: 'Excel',
      component: '/widgets/excel',
      meta: {
        title: '留存管理中心',
        icon: 'ri:database-line',
        keepAlive: true
      }
    },
    {
      path: 'partition-index-sync',
      name: 'PartitionIndexSync',
      component: '/widgets/excel',
      meta: {
        title: '分区和索引同步',
        icon: 'ri:git-pull-request-line',
        keepAlive: true
      }
    },
    {
      path: 'data-recovery',
      name: 'DataRecovery',
      component: '/widgets/video',
      meta: {
        title: '数据恢复',
        icon: 'ri:restart-line',
        keepAlive: true
      }
    },
    {
      path: 'data-backup',
      name: 'DataBackup',
      component: '/widgets/wang-editor',
      meta: {
        title: '数据备份',
        icon: 'ri:folder-zip-line',
        keepAlive: true
      }
    }
  ]
}
