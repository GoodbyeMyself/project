import { AppRouteRecord } from '@/types/router'

export const accessDataRoutes: AppRouteRecord = {
  path: '/access-data',
  name: 'AccessData',
  component: '/index/index',
  meta: {
    title: '接入数据管理',
    icon: 'ri:inbox-archive-line',
    roles: ['R_SUPER', 'R_ADMIN']
  },
  children: [
    {
      path: 'access-types',
      name: 'AccessTypes',
      component: '/access-data/access-types',
      meta: {
        title: '数据接入类型',
        icon: 'ri:git-merge-line',
        keepAlive: true
      }
    },
    {
      path: 'strategy',
      name: 'AccessStrategy',
      component: '/access-data/strategy',
      meta: {
        title: '数据接入策略',
        icon: 'ri:equalizer-2-line',
        keepAlive: true
      }
    },
    {
      path: 'structured-reconcile',
      name: 'StructuredReconcile',
      component: '/business/reconcile',
      meta: {
        title: '结构化对账管理',
        icon: 'ri:table-line',
        keepAlive: true
      }
    },
    {
      path: 'unstructured-reconcile',
      name: 'UnstructuredReconcile',
      component: '/business/reconcile',
      meta: {
        title: '非结构化对账管理',
        icon: 'ri:file-text-line',
        keepAlive: true
      }
    },
    {
      path: 'clean-transform',
      name: 'DataCleanTransform',
      component: '/access-data/clean-transform',
      meta: {
        title: '数据清洗转换',
        icon: 'ri:filter-3-line',
        keepAlive: true
      }
    },
    {
      path: 'overview',
      name: 'DataAccessOverview',
      component: '/dashboard/console',
      meta: {
        title: '数据接入概览',
        icon: 'ri:home-8-line',
        keepAlive: true
      }
    },
    {
      path: 'access-control',
      name: 'DataAccessControl',
      component: '/access-data/access-control',
      meta: {
        title: '数据访问控制',
        icon: 'ri:lock-password-line',
        keepAlive: true
      }
    },
    {
      path: 'access-management',
      name: 'AccessManagement',
      component: '/access-data/access-management',
      meta: {
        title: '接入管理',
        icon: 'ri:task-line',
        keepAlive: true
      }
    }
  ]
}
