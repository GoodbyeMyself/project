import { AppRouteRecord } from '@/types/router'
import { resourceModelRoutes } from './resourceModel'
import { reportAnalysisRoutes } from './reportAnalysis'
import { dataAssetRoutes } from './dataAsset'
import { dataLineageRoutes } from './dataLineage'
import { supportRoutes } from './support'

/**
 * 导出所有模块化路由
 */
export const routeModules: AppRouteRecord[] = [
  resourceModelRoutes,
  reportAnalysisRoutes,
  dataAssetRoutes,
  dataLineageRoutes,
  supportRoutes
]
