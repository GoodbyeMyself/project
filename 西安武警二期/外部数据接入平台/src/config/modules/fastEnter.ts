/**
 * 快速入口配置
 * 包含：应用列表、快速链接等配置
 */
import type { FastEnterConfig } from '@/types/config'

const fastEnterConfig: FastEnterConfig = {
  minWidth: 1200,
  applications: [
    {
      name: '数据源管理',
      description: '新增、检测、查看异常数据源',
      icon: 'ri:database-line',
      iconColor: '#377dff',
      enabled: true,
      order: 1,
      routeName: 'DataSourceManagement'
    },
    {
      name: '模板管理',
      description: '模板目录、版本与下放配置',
      icon: 'ri:file-copy-2-line',
      iconColor: '#7A7FFF',
      enabled: true,
      order: 2,
      routeName: 'TemplateManagement'
    },
    {
      name: '接入概览',
      description: '查看接入总量与运行态势',
      icon: 'ri:home-8-line',
      iconColor: '#13DEB9',
      enabled: true,
      order: 3,
      routeName: 'DataAccessOverview'
    },
    {
      name: '任务血缘',
      description: '查看任务链路与表详情',
      icon: 'ri:git-branch-line',
      iconColor: '#ff6b6b',
      enabled: true,
      order: 4,
      routeName: 'TaskLineage'
    },
    {
      name: '资源监控',
      description: '监控 Master、Worker、数据库等资源',
      icon: 'ri:server-line',
      iconColor: '#ffb100',
      enabled: true,
      order: 5,
      routeName: 'ResourceMonitor'
    },
    {
      name: '服务网关',
      description: '维护数据共享网关与发布状态',
      icon: 'ri:router-line',
      iconColor: '#38C0FC',
      enabled: true,
      order: 6,
      routeName: 'ServiceGateway'
    }
  ],
  quickLinks: [
    {
      name: '字段映射',
      enabled: true,
      order: 1,
      routeName: 'FieldMappingConfig'
    },
    {
      name: '访问控制',
      enabled: true,
      order: 2,
      routeName: 'DataAccessControl'
    },
    {
      name: '任务管理',
      enabled: true,
      order: 3,
      routeName: 'TaskListManagement'
    },
    {
      name: '告警管理',
      enabled: true,
      order: 4,
      routeName: 'AlertManagement'
    },
    {
      name: '表资源服务',
      enabled: true,
      order: 5,
      routeName: 'TableResourceService'
    },
    {
      name: '接口服务',
      enabled: true,
      order: 6,
      routeName: 'ApiResourceService'
    }
  ]
}

export default Object.freeze(fastEnterConfig)
