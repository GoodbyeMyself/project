/**
 * 快速入口配置
 * 包含：应用列表、快速链接等配置
 */
import { WEB_LINKS } from '@/utils/constants'
import type { FastEnterConfig } from '@/types/config'

const fastEnterConfig: FastEnterConfig = {
  // 显示条件（屏幕宽度）
  minWidth: 1200,
  // 应用列表
  applications: [
    {
      name: '能力总览',
      description: '查看全局模块、子功能和能力点统计',
      icon: 'ri:dashboard-line',
      iconColor: '#2f54eb',
      enabled: true,
      order: 1,
      routeName: 'MetadataOverview'
    },
    {
      name: '元模板管理',
      description: '模板、目录、订阅和稽核能力管理',
      icon: 'ri:file-list-3-line',
      iconColor: '#1677ff',
      enabled: true,
      order: 2,
      routeName: 'Section-template-management'
    },
    {
      name: '采集任务',
      description: '任务检索、创建、同步和调度',
      icon: 'ri:task-line',
      iconColor: '#13c2c2',
      enabled: true,
      order: 3,
      routeName: 'Section-collection-task-management'
    },
    {
      name: '基础管理',
      description: '平台、业务域、分类、标签与目录管理',
      icon: 'ri:database-2-line',
      iconColor: '#52c41a',
      enabled: true,
      order: 4,
      routeName: 'Section-metadata-base-management'
    },
    {
      name: '图谱实体构建',
      description: '模型导入转换与 DDL 生成',
      icon: 'ri:git-merge-line',
      iconColor: '#722ed1',
      enabled: true,
      order: 5,
      routeName: 'Section-graph-entity-build'
    },
    {
      name: '质量概览',
      description: '规则类型、任务状态和失效任务分析',
      icon: 'ri:line-chart-line',
      iconColor: '#fa8c16',
      enabled: true,
      order: 6,
      routeName: 'Section-quality-overview'
    },
    {
      name: '搜索服务',
      description: '元数据分类检索与结果展示',
      icon: 'ri:search-line',
      iconColor: '#eb2f96',
      enabled: true,
      order: 7,
      routeName: 'Section-metadata-search-service'
    },
    {
      name: '官方文档',
      description: '查看项目通用说明文档',
      icon: 'ri:book-open-line',
      iconColor: '#faad14',
      enabled: true,
      order: 8,
      link: WEB_LINKS.DOCS
    }
  ],
  // 快速链接
  quickLinks: [
    {
      name: '能力总览',
      enabled: true,
      order: 1,
      routeName: 'MetadataOverview'
    },
    {
      name: '元数据注册',
      enabled: true,
      order: 2,
      routeName: 'Section-metadata-register'
    },
    {
      name: '标准管理',
      enabled: true,
      order: 3,
      routeName: 'Section-metadata-standard'
    },
    {
      name: '智能应用',
      enabled: true,
      order: 4,
      routeName: 'Section-metadata-smart-application'
    },
    {
      name: '信息服务',
      enabled: true,
      order: 5,
      routeName: 'Section-metadata-info-service'
    },
    {
      name: '登录页',
      enabled: true,
      order: 6,
      routeName: 'Login'
    }
  ]
}

export default Object.freeze(fastEnterConfig)
