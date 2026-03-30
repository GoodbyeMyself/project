import { AppRouteRecord } from '@/types/router'

export const widgetsRoutes: AppRouteRecord = {
  path: '/widgets',
  name: 'Widgets',
  component: '/index/index',
  meta: {
    title: '数据留存管理',
    icon: 'ri:archive-stack-line'
  },
  children: [
    {
      path: 'excel',
      name: 'Excel',
      component: '/widgets/excel',
      meta: {
        title: '分区和索引同步',
        icon: 'ri:database-line',
        keepAlive: true
      }
    },
    {
      path: 'video',
      name: 'Video',
      component: '/widgets/video',
      meta: {
        title: '数据恢复',
        icon: 'ri:restart-line',
        keepAlive: true
      }
    },
    {
      path: 'wang-editor',
      name: 'WangEditor',
      component: '/widgets/wang-editor',
      meta: {
        title: '数据备份',
        icon: 'ri:folder-zip-line',
        keepAlive: true
      }
    }
  ]
}
