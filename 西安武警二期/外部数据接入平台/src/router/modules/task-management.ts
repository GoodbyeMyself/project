import { AppRouteRecord } from '@/types/router'

export const taskManagementRoutes: AppRouteRecord = {
  path: '/task-management',
  name: 'TaskManagement',
  component: '/index/index',
  meta: {
    title: '接入任务管理',
    icon: 'ri:share-forward-box-line',
    roles: ['R_SUPER', 'R_ADMIN']
  },
  children: [
    {
      path: 'lineage',
      name: 'TaskLineage',
      component: '/task-management/lineage',
      meta: {
        title: '任务血缘查看',
        icon: 'ri:git-branch-line',
        keepAlive: true
      }
    },
    {
      path: 'run-status',
      name: 'TaskRunStatus',
      component: '/task-management/run-status',
      meta: {
        title: '任务运行状态',
        icon: 'ri:pulse-line',
        keepAlive: true
      }
    },
    {
      path: 'task-list',
      name: 'TaskListManagement',
      component: '/task-management/task-management',
      meta: {
        title: '任务管理',
        icon: 'ri:list-check-3',
        keepAlive: true
      }
    },
    {
      path: 'task-control',
      name: 'TaskStatusControl',
      component: '/task-management/task-control',
      meta: {
        title: '任务状态控制',
        icon: 'ri:play-circle-line',
        keepAlive: true
      }
    }
  ]
}
