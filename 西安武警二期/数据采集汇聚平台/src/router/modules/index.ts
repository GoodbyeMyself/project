import { AppRouteRecord } from '@/types/router'
import { dashboardRoutes } from './dashboard'
import { templateRoutes } from './template'
import { widgetsRoutes } from './widgets'
import { systemRoutes } from './system'
import { articleRoutes } from './article'
import { resultRoutes } from './result'
import { safeguardRoutes } from './safeguard'

export const routeModules: AppRouteRecord[] = [
  dashboardRoutes,
  safeguardRoutes,
  systemRoutes,
  templateRoutes,
  widgetsRoutes,
  articleRoutes,
  resultRoutes
]
