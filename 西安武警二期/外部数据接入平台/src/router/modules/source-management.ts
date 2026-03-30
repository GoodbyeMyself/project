import { AppRouteRecord } from '@/types/router'

export const sourceManagementRoutes: AppRouteRecord = {
  path: '/source-management',
  name: 'SourceManagement',
  component: '/index/index',
  meta: {
    title: '接入来源管理',
    icon: 'ri:database-2-line',
    roles: ['R_SUPER', 'R_ADMIN']
  },
  children: [
    {
      path: 'data-source',
      name: 'DataSourceManagement',
      component: '/article/list',
      meta: {
        title: '数据源管理',
        icon: 'ri:database-line',
        keepAlive: true,
        fixedTab: true,
        authList: [
          { title: '新增', authMark: 'add' },
          { title: '编辑', authMark: 'edit' },
          { title: '删除', authMark: 'delete' },
          { title: '检测', authMark: 'check' }
        ]
      }
    }
  ]
}
