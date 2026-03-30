import { AppRouteRecord } from '@/types/router'
import { externalAccessPlatformRoutes } from './external-access-platform'

/**
 * 导出所有模块化路由
 */
export const routeModules: AppRouteRecord[] = [
  externalAccessPlatformRoutes
]
