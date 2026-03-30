import { WEB_LINKS } from '@/utils/constants'
import type { FastEnterConfig } from '@/types/config'

const fastEnterConfig: FastEnterConfig = {
  minWidth: 1200,
  applications: [
    {
      name: '数据标准管理',
      description: '标准变更、依赖分析与送审',
      icon: 'ri:file-list-3-line',
      iconColor: '#377DFF',
      enabled: true,
      order: 1,
      routeName: 'ResourceStandard'
    },
    {
      name: '逻辑模型管理',
      description: '多用户协作与共享权限',
      icon: 'ri:git-branch-line',
      iconColor: '#16A34A',
      enabled: true,
      order: 2,
      routeName: 'LogicalModel'
    },
    {
      name: '模型下发',
      description: '版本控制与兼容性检查',
      icon: 'ri:send-plane-2-line',
      iconColor: '#F97316',
      enabled: true,
      order: 3,
      routeName: 'ModelDistribution'
    },
    {
      name: '报告下钻',
      description: '指标下钻与对比分析',
      icon: 'ri:line-chart-line',
      iconColor: '#7C3AED',
      enabled: true,
      order: 4,
      routeName: 'ReportDrilldown'
    },
    {
      name: '数据资产管理',
      description: '资产台账与元数据同步',
      icon: 'ri:database-line',
      iconColor: '#0891B2',
      enabled: true,
      order: 5,
      routeName: 'DataAssetManagement'
    },
    {
      name: '数据溯源分析',
      description: '来源追踪与血缘展示',
      icon: 'ri:route-line',
      iconColor: '#DC2626',
      enabled: true,
      order: 6,
      routeName: 'DataLineageAnalysis'
    }
  ],
  quickLinks: [
    {
      name: '模型检查',
      enabled: true,
      order: 1,
      routeName: 'ModelCheck'
    },
    {
      name: '模型同步',
      enabled: true,
      order: 2,
      routeName: 'ModelSync'
    },
    {
      name: '一键下载报告',
      enabled: true,
      order: 3,
      routeName: 'ReportDownload'
    },
    {
      name: '个人中心',
      enabled: true,
      order: 4,
      routeName: 'UserCenter'
    },
    {
      name: '官方文档',
      enabled: true,
      order: 5,
      link: WEB_LINKS.DOCS
    },
    {
      name: '技术社区',
      enabled: true,
      order: 6,
      link: WEB_LINKS.COMMUNITY
    }
  ]
}

export default Object.freeze(fastEnterConfig)
