import { AppRouteRecord } from '@/types/router'

export const shareManagementRoutes: AppRouteRecord = {
  path: '/share-management',
  name: 'ShareManagement',
  component: '/index/index',
  meta: {
    title: '数据共享管理',
    icon: 'ri:share-line',
    roles: ['R_SUPER', 'R_ADMIN']
  },
  children: [
    {
      path: 'gateway',
      name: 'ServiceGateway',
      component: '/share-management/gateway',
      meta: {
        title: '服务网关',
        icon: 'ri:router-line',
        keepAlive: true
      }
    },
    {
      path: 'table-resource',
      name: 'TableResourceService',
      component: '/business/resource-service',
      meta: {
        title: '表资源服务',
        icon: 'ri:table-2',
        keepAlive: true
      }
    },
    {
      path: 'tag-resource',
      name: 'TagResourceService',
      component: '/business/resource-service',
      meta: {
        title: '标签数据资源服务',
        icon: 'ri:price-tag-3-line',
        keepAlive: true
      }
    },
    {
      path: 'metric-resource',
      name: 'MetricResourceService',
      component: '/business/resource-service',
      meta: {
        title: '数据指标服务',
        icon: 'ri:line-chart-line',
        keepAlive: true
      }
    },
    {
      path: 'api-resource',
      name: 'ApiResourceService',
      component: '/business/resource-service',
      meta: {
        title: '数据接口服务',
        icon: 'ri:api-line',
        keepAlive: true
      }
    },
    {
      path: 'file-resource',
      name: 'FileResourceService',
      component: '/business/resource-service',
      meta: {
        title: '数据文件资源服务',
        icon: 'ri:file-cloud-line',
        keepAlive: true
      }
    }
  ]
}
