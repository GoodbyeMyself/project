import { AppRouteRecord } from '@/types/router'

const ALL_ROLES = ['R_SUPER', 'R_ADMIN', 'R_USER']

const createModuleRoute = (
  path: string,
  name: string,
  title: string,
  icon: string,
  activePath?: string
): AppRouteRecord => ({
  path,
  name,
  component: '/exchange-platform/module',
  meta: {
    title,
    icon,
    keepAlive: true,
    roles: ALL_ROLES,
    activePath
  }
})

export const exchangePlatformRoutes: AppRouteRecord = {
  path: '/exchange-platform',
  name: 'ExchangePlatform',
  component: '/index/index',
  redirect: '/exchange-platform/overview',
  meta: {
    title: '数据共享交换平台',
    icon: 'ri:share-forward-2-line',
    roles: ALL_ROLES
  },
  children: [
    {
      path: 'overview',
      name: 'ExchangePlatformOverview',
      component: '/exchange-platform/overview',
      meta: {
        title: '平台总览',
        icon: 'ri:dashboard-line',
        keepAlive: true,
        fixedTab: true,
        roles: ALL_ROLES
      }
    },
    {
      path: 'node',
      name: 'ExchangeNode',
      component: '',
      redirect: '/exchange-platform/node/management-agent',
      meta: {
        title: '数据共享交换节点',
        icon: 'ri:server-line',
        roles: ALL_ROLES
      },
      children: [
        createModuleRoute('management-agent', 'NodeManagementAgent', '管理代理', 'ri:git-branch-line'),
        createModuleRoute('scheduling-engine', 'NodeSchedulingEngine', '调度引擎', 'ri:node-tree'),
        createModuleRoute('exchange-engine', 'NodeExchangeEngine', '交换引擎', 'ri:send-plane-line'),
        createModuleRoute('log-management', 'NodeLogManagement', '日志管理', 'ri:file-list-3-line')
      ]
    },
    {
      path: 'center',
      name: 'ExchangeCenter',
      component: '',
      redirect: '/exchange-platform/center/base-environment/share-management',
      meta: {
        title: '数据共享交换管理中心',
        icon: 'ri:building-line',
        roles: ALL_ROLES
      },
      children: [
        {
          path: 'base-environment',
          name: 'CenterBaseEnvironment',
          component: '',
          redirect: '/exchange-platform/center/base-environment/share-management',
          meta: {
            title: '基础环境管理',
            icon: 'ri:stack-line',
            roles: ALL_ROLES
          },
          children: [
            createModuleRoute(
              'share-management',
              'CenterShareManagement',
              '数据共享交换管理',
              'ri:pulse-line'
            ),
            createModuleRoute(
              'node-management',
              'CenterNodeManagement',
              '交换节点管理',
              'ri:server-line'
            ),
            createModuleRoute(
              'channel-management',
              'CenterChannelManagement',
              '交换通道管理',
              'ri:git-merge-line'
            ),
            createModuleRoute(
              'topology-management',
              'CenterTopologyManagement',
              '交换拓扑管理',
              'ri:share-box-line'
            ),
            createModuleRoute(
              'edge-node-management',
              'CenterEdgeNodeManagement',
              '边缘节点管理',
              'ri:anchor-line'
            ),
            createModuleRoute(
              'domain-management',
              'CenterDomainManagement',
              '交换域管理',
              'ri:apps-2-line'
            ),
            createModuleRoute(
              'server-management',
              'CenterServerManagement',
              '服务器管理',
              'ri:database-2-line'
            ),
            createModuleRoute('cdc-management', 'CenterCdcManagement', 'CDC管理', 'ri:radar-line'),
            createModuleRoute(
              'base-environment-dashboard',
              'CenterBaseEnvironmentDashboard',
              '基础环境面板',
              'ri:layout-grid-line'
            )
          ]
        },
        {
          path: 'business-config',
          name: 'CenterBusinessConfig',
          component: '',
          redirect: '/exchange-platform/center/business-config/workflow-config',
          meta: {
            title: '交换业务配置',
            icon: 'ri:settings-4-line',
            roles: ALL_ROLES
          },
          children: [
            createModuleRoute(
              'workflow-config',
              'CenterWorkflowConfig',
              '交换流程配置',
              'ri:flow-chart'
            ),
            createModuleRoute(
              'task-management',
              'CenterTaskManagement',
              '交换任务管理',
              'ri:task-line'
            )
          ]
        },
        createModuleRoute(
          'publish-subscribe',
          'CenterPublishSubscribe',
          '任务发布订阅',
          'ri:rss-line'
        ),
        createModuleRoute(
          'environment-monitor',
          'CenterEnvironmentMonitor',
          '交换环境监控',
          'ri:computer-line'
        ),
        createModuleRoute('alert-config', 'CenterAlertConfig', '配置告警', 'ri:alarm-warning-line'),
        createModuleRoute(
          'statistics-analysis',
          'CenterStatisticsAnalysis',
          '统计分析',
          'ri:bar-chart-grouped-line'
        ),
        {
          path: 'user-management',
          name: 'CenterUserManagement',
          component: '',
          redirect: '/exchange-platform/center/user-management/organization-management',
          meta: {
            title: '用户管理',
            icon: 'ri:team-line',
            roles: ALL_ROLES
          },
          children: [
            createModuleRoute(
              'organization-management',
              'CenterOrganizationManagement',
              '用户组织管理',
              'ri:organization-chart'
            ),
            createModuleRoute(
              'user-account-management',
              'CenterUserAccountManagement',
              '用户管理',
              'ri:user-settings-line'
            ),
            createModuleRoute(
              'user-role-management',
              'CenterUserRoleManagement',
              '用户角色管理',
              'ri:admin-line'
            ),
            createModuleRoute(
              'ip-access-management',
              'CenterIpAccessManagement',
              'IP黑白名单管理',
              'ri:shield-keyhole-line'
            )
          ]
        },
        {
          path: 'system-management',
          name: 'CenterSystemManagement',
          component: '',
          redirect: '/exchange-platform/center/system-management/route-management',
          meta: {
            title: '系统管理',
            icon: 'ri:settings-3-line',
            roles: ALL_ROLES
          },
          children: [
            createModuleRoute(
              'route-management',
              'CenterRouteManagement',
              '路由管理',
              'ri:route-line'
            ),
            createModuleRoute(
              'security-management',
              'CenterSecurityManagement',
              '安全管理',
              'ri:shield-check-line'
            ),
            createModuleRoute(
              'data-source-management',
              'CenterDataSourceManagement',
              '数据源管理',
              'ri:database-line'
            ),
            createModuleRoute(
              'resource-directory',
              'CenterResourceDirectory',
              '资源目录',
              'ri:book-open-line'
            ),
            createModuleRoute(
              'file-management',
              'CenterFileManagement',
              '文件管理',
              'ri:folder-2-line'
            )
          ]
        }
      ]
    }
  ]
}
