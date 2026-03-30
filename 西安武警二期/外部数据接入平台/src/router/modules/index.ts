import { AppRouteRecord } from '@/types/router'
import { sourceManagementRoutes } from './source-management'
import { templateConfigRoutes } from './template-config'
import { accessDataRoutes } from './access-data'
import { taskManagementRoutes } from './task-management'
import { scheduleManagementRoutes } from './schedule-management'
import { shareManagementRoutes } from './share-management'

/**
 * 导出所有模块化路由
 */
export const routeModules: AppRouteRecord[] = [
  sourceManagementRoutes,
  templateConfigRoutes,
  accessDataRoutes,
  taskManagementRoutes,
  scheduleManagementRoutes,
  shareManagementRoutes
]
