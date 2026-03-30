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
      name: '数据仓体系',
      description: '数仓目录与表信息管理',
      icon: 'ri:database-2-line',
      iconColor: '#377dff',
      enabled: true,
      order: 1,
      routeName: 'DataWarehouseCatalogManagement'
    },
    {
      name: '数据治理',
      description: '数据标准与资源目录完善',
      icon: 'ri:file-list-3-line',
      iconColor: '#13c2c2',
      enabled: true,
      order: 2,
      routeName: 'DataGovernanceStandardAndResource'
    },
    {
      name: '数据保护',
      description: '权限、防护与流量管理',
      icon: 'ri:shield-keyhole-line',
      iconColor: '#ff9f1a',
      enabled: true,
      order: 3,
      routeName: 'DataProtectionSecurityCenter'
    },
    {
      name: '数据服务',
      description: '服务挂载、访问控制、共享发布',
      icon: 'ri:service-line',
      iconColor: '#7A7FFF',
      enabled: true,
      order: 4,
      routeName: 'DataServiceMountAccessShare'
    },
    {
      name: '官方文档',
      description: '使用指南与开发文档',
      icon: 'ri:bill-line',
      iconColor: '#ffb100',
      enabled: true,
      order: 5,
      link: WEB_LINKS.DOCS
    },
    {
      name: '技术支持',
      description: '技术支持与问题反馈',
      icon: 'ri:user-location-line',
      iconColor: '#ff6b6b',
      enabled: true,
      order: 6,
      link: WEB_LINKS.COMMUNITY
    }
  ],
  // 快速链接
  quickLinks: [
    {
      name: '登录',
      enabled: true,
      order: 1,
      routeName: 'Login'
    },
    {
      name: '注册',
      enabled: true,
      order: 2,
      routeName: 'Register'
    },
    {
      name: '忘记密码',
      enabled: true,
      order: 3,
      routeName: 'ForgetPassword'
    },
    {
      name: '数据仓体系',
      enabled: true,
      order: 4,
      routeName: 'DataWarehouseCatalogManagement'
    },
    {
      name: '数据治理',
      enabled: true,
      order: 5,
      routeName: 'DataGovernanceStandardAndResource'
    },
    {
      name: '数据服务',
      enabled: true,
      order: 6,
      routeName: 'DataServiceMountAccessShare'
    }
  ]
}

export default Object.freeze(fastEnterConfig)
