import { AppRouteRecord } from '@/types/router'
import { metadataCatalog } from '@/views/metadata/catalog'

const metadataChildren: AppRouteRecord[] = [
  {
    path: 'overview',
    name: 'MetadataOverview',
    component: '/metadata/overview',
    meta: {
      title: '元数据能力总览',
      icon: 'ri:dashboard-line',
      keepAlive: false,
      fixedTab: true
    }
  },
  ...metadataCatalog.map((module) => ({
    path: module.path,
    name: `Module-${module.key}`,
    component: '',
    meta: {
      title: module.title,
      icon: module.icon,
      keepAlive: false
    },
    children: module.sections.map((section) => ({
      path: section.key,
      name: `Section-${section.key}`,
      component: '/metadata/submodule',
      meta: {
        title: section.title,
        icon: 'ri:function-line',
        keepAlive: false,
        sectionKey: section.key
      }
    }))
  }))
]

export const metadataRoutes: AppRouteRecord = {
  path: '/metadata',
  name: 'MetadataSystem',
  component: '/index/index',
  meta: {
    title: '元数据管理系统',
    icon: 'ri:stack-line'
  },
  children: metadataChildren
}
