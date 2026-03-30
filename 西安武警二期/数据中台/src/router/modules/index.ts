import { AppRouteRecord } from '@/types/router'
import { dashboardRoutes } from './dashboard'
import { systemRoutes } from './system'
import { articleRoutes } from './article'
import { safeguardRoutes } from './safeguard'

/**
 * 导出所有模块化路由
 */
export const routeModules: AppRouteRecord[] = [
  dashboardRoutes,
  articleRoutes,
  safeguardRoutes,
  systemRoutes
]
