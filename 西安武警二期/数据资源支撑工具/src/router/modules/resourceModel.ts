import { AppRouteRecord } from '@/types/router'

export const resourceModelRoutes: AppRouteRecord = {
  path: '/resource-model',
  name: 'ResourceModel',
  component: '/index/index',
  meta: {
    title: '数据资源体系模型设计',
    icon: 'ri:database-2-line',
    roles: ['R_SUPER', 'R_ADMIN']
  },
  children: [
    {
      path: 'standard',
      name: 'ResourceStandard',
      component: '/resource-model/standard',
      meta: {
        title: '数据标准管理',
        icon: 'ri:file-list-3-line',
        keepAlive: true
      }
    },
    {
      path: 'concept',
      name: 'ConceptModel',
      component: '/resource-model/concept',
      meta: {
        title: '概念模型管理',
        icon: 'ri:shape-line',
        keepAlive: true
      }
    },
    {
      path: 'logical',
      name: 'LogicalModel',
      component: '/resource-model/logical',
      meta: {
        title: '逻辑模型管理',
        icon: 'ri:git-branch-line',
        keepAlive: true
      }
    },
    {
      path: 'physical',
      name: 'PhysicalModel',
      component: '/resource-model/physical',
      meta: {
        title: '物理模型管理',
        icon: 'ri:hard-drive-3-line',
        keepAlive: true
      }
    },
    {
      path: 'distribution',
      name: 'ModelDistribution',
      component: '/resource-model/distribution',
      meta: {
        title: '模型下发',
        icon: 'ri:send-plane-2-line',
        keepAlive: true
      }
    },
    {
      path: 'check',
      name: 'ModelCheck',
      component: '/resource-model/check',
      meta: {
        title: '模型检查',
        icon: 'ri:shield-check-line',
        keepAlive: true
      }
    },
    {
      path: 'sync',
      name: 'ModelSync',
      component: '/resource-model/sync',
      meta: {
        title: '模型同步',
        icon: 'ri:refresh-line',
        keepAlive: true
      }
    }
  ]
}
