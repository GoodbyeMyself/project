import type { FastEnterConfig } from '@/types/config'

const fastEnterConfig: FastEnterConfig = {
  minWidth: 1200,
  applications: [
    {
      name: '平台总览',
      description: '查看节点侧与管理中心能力全景',
      icon: 'ri:dashboard-line',
      iconColor: '#377dff',
      enabled: true,
      order: 1,
      routeName: 'ExchangePlatformOverview'
    },
    {
      name: '管理代理',
      description: '维护节点侧指定代理能力',
      icon: 'ri:git-branch-line',
      iconColor: '#13c2c2',
      enabled: true,
      order: 2,
      routeName: 'NodeManagementAgent'
    },
    {
      name: '交换节点管理',
      description: '维护交换节点与运行状态',
      icon: 'ri:server-line',
      iconColor: '#ff7a45',
      enabled: true,
      order: 3,
      routeName: 'CenterNodeManagement'
    },
    {
      name: 'CDC管理',
      description: '维护实时任务与任务目录',
      icon: 'ri:radar-line',
      iconColor: '#7a7fff',
      enabled: true,
      order: 4,
      routeName: 'CenterCdcManagement'
    },
    {
      name: '交换流程配置',
      description: '维护工作流与目录结构',
      icon: 'ri:flow-chart',
      iconColor: '#60c041',
      enabled: true,
      order: 5,
      routeName: 'CenterWorkflowConfig'
    },
    {
      name: '资源目录',
      description: '维护数据资源与资源目录',
      icon: 'ri:book-open-line',
      iconColor: '#ffb100',
      enabled: true,
      order: 6,
      routeName: 'CenterResourceDirectory'
    }
  ],
  quickLinks: [
    {
      name: '任务发布订阅',
      enabled: true,
      order: 1,
      routeName: 'CenterPublishSubscribe'
    },
    {
      name: '交换环境监控',
      enabled: true,
      order: 2,
      routeName: 'CenterEnvironmentMonitor'
    },
    {
      name: '配置告警',
      enabled: true,
      order: 3,
      routeName: 'CenterAlertConfig'
    },
    {
      name: '统计分析',
      enabled: true,
      order: 4,
      routeName: 'CenterStatisticsAnalysis'
    },
    {
      name: '文件管理',
      enabled: true,
      order: 5,
      routeName: 'CenterFileManagement'
    }
  ]
}

export default Object.freeze(fastEnterConfig)
