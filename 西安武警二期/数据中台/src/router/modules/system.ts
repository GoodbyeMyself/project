import { AppRouteRecord } from '@/types/router'

export const systemRoutes: AppRouteRecord = {
  path: '/data-service',
  name: 'DataService',
  component: '/index/index',
  meta: {
    title: '数据服务',
    icon: 'ri:service-line',
    roles: ['R_SUPER', 'R_ADMIN']
  },
  children: [
    {
      path: 'mount-access-share',
      name: 'DataServiceMountAccessShare',
      component: '/system/menu',
      meta: {
        title: '服务挂载与共享发布',
        icon: 'ri:git-merge-line',
        keepAlive: true,
        roles: ['R_SUPER', 'R_ADMIN'],
        authList: [
          { title: '新增', authMark: 'add' },
          { title: '编辑', authMark: 'edit' },
          { title: '删除', authMark: 'delete' }
        ]
      }
    }
  ]
}
