import { AppRouteRecord } from '@/types/router'

export const articleRoutes: AppRouteRecord = {
  path: '/article',
  name: 'Article',
  component: '/index/index',
  meta: {
    title: '数据上报管理',
    icon: 'ri:file-chart-line',
    roles: ['R_SUPER', 'R_ADMIN']
  },
  children: [
    {
      path: 'article-list',
      name: 'ArticleList',
      component: '/article/list',
      meta: {
        title: '上报计划与合规校验',
        icon: 'ri:task-line',
        keepAlive: true,
        authList: [{ title: '新增', authMark: 'add' }]
      }
    }
  ]
}
