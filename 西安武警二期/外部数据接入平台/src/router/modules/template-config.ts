import { AppRouteRecord } from '@/types/router'

export const templateConfigRoutes: AppRouteRecord = {
  path: '/template-config',
  name: 'TemplateConfig',
  component: '/index/index',
  meta: {
    title: '数据模板配置',
    icon: 'ri:file-list-3-line',
    roles: ['R_SUPER', 'R_ADMIN']
  },
  children: [
    {
      path: 'template-management',
      name: 'TemplateManagement',
      component: '/template-config/template-management',
      meta: {
        title: '数据模板管理',
        icon: 'ri:file-copy-2-line',
        keepAlive: true
      }
    },
    {
      path: 'field-mapping',
      name: 'FieldMappingConfig',
      component: '/template-config/field-mapping',
      meta: {
        title: '字段映射配置',
        icon: 'ri:node-tree',
        keepAlive: true
      }
    },
    {
      path: 'template-distribution',
      name: 'TemplateDistribution',
      component: '/template-config/template-distribution',
      meta: {
        title: '数据模板下放',
        icon: 'ri:send-plane-line',
        keepAlive: true
      }
    },
    {
      path: 'template-version',
      name: 'TemplateVersionManagement',
      component: '/template-config/template-version',
      meta: {
        title: '模板版本管理',
        icon: 'ri:git-branch-line',
        keepAlive: true
      }
    }
  ]
}
