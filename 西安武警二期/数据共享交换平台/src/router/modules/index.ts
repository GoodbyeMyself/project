import { AppRouteRecord } from '@/types/router'
import { exchangePlatformRoutes } from './exchange-platform'

/**
 * 导出所有模块化路由
 */
export const routeModules: AppRouteRecord[] = [
  exchangePlatformRoutes
]
