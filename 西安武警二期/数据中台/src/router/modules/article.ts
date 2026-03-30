import { AppRouteRecord } from '@/types/router'

export const articleRoutes: AppRouteRecord = {
  path: '/data-governance',
  name: 'DataGovernance',
  component: '/index/index',
  meta: {
    title: '数据治理',
    icon: 'ri:file-list-3-line',
    roles: ['R_SUPER', 'R_ADMIN']
  },
  children: [
    {
      path: 'standard-and-resource',
      name: 'DataGovernanceStandardAndResource',
      component: '/article/list',
      meta: {
        title: '数据标准与资源目录',
        icon: 'ri:book-shelf-line',
        keepAlive: true,
        authList: [
          { title: '新增', authMark: 'add' },
          { title: '编辑', authMark: 'edit' },
          { title: '删除', authMark: 'delete' }
        ]
      }
    }
  ]
}
