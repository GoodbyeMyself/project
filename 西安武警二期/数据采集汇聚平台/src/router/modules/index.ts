import { AppRouteRecord } from '@/types/router'
import { articleRoutes } from './article'
import { resultRoutes } from './result'
import { examplesRoutes } from './examples'
import { safeguardRoutes } from './safeguard'
import { alarmRoutes } from './alarm'
import { templateRoutes } from './template'
import { widgetsRoutes } from './widgets'
import { dashboardRoutes } from './dashboard'
import { systemRoutes } from './system'

export const routeModules: AppRouteRecord[] = [
  articleRoutes,
  resultRoutes,
  examplesRoutes,
  safeguardRoutes,
  alarmRoutes,
  templateRoutes,
  widgetsRoutes,
  dashboardRoutes,
  systemRoutes
]
