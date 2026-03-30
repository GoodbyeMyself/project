<template>
  <div class="overview-page">
    <section class="hero art-card">
      <div class="hero-left">
        <p class="hero-eyebrow">平台总览</p>
        <h1>数据共享交换平台二次开发版</h1>
        <p>
          当前版本将工程菜单收敛为“数据共享交换节点 + 数据共享交换管理中心”两大能力域，
          所有子功能都已落到可浏览、可操作的业务页中，适合直接手动验收。
        </p>
        <ElSpace wrap>
          <ElButton type="primary" @click="openPage('/exchange-platform/node/management-agent')">
            查看节点能力
          </ElButton>
          <ElButton @click="openPage('/exchange-platform/center/base-environment/node-management')">
            查看基础环境管理
          </ElButton>
          <ElButton @click="openPage('/exchange-platform/center/system-management/resource-directory')">
            查看资源目录
          </ElButton>
        </ElSpace>
      </div>
      <div class="hero-right">
        <div class="hero-number">
          <span>{{ modulePageList.length }}</span>
          <small>功能页面</small>
        </div>
        <div class="hero-number">
          <span>{{ totalPanels }}</span>
          <small>业务面板</small>
        </div>
      </div>
    </section>

    <section class="stats-grid">
      <article class="stat art-card">
        <p>节点侧能力</p>
        <h3>{{ nodeModules.length }}</h3>
        <span>节点代理、调度引擎、交换引擎、日志管理</span>
      </article>
      <article class="stat art-card">
        <p>管理中心能力</p>
        <h3>{{ centerModules.length }}</h3>
        <span>基础环境、业务配置、订阅、监控、告警、统计、用户、系统</span>
      </article>
      <article class="stat art-card">
        <p>覆盖子功能点</p>
        <h3>{{ totalCapabilities }}</h3>
        <span>按需求拆分到页面能力项中</span>
      </article>
      <article class="stat art-card">
        <p>可手动验证入口</p>
        <h3>{{ quickLinks.length }}</h3>
        <span>总览页提供直达关键模块的快捷入口</span>
      </article>
    </section>

    <ElRow :gutter="20">
      <ElCol :xs="24" :lg="10">
        <ElCard shadow="never" class="overview-card">
          <template #header>数据共享交换节点</template>
          <div class="module-list">
            <div v-for="item in nodeModules" :key="item.routeName" class="module-item">
              <div class="module-item__header">
                <strong>{{ item.title }}</strong>
                <ElTag type="primary" effect="plain">{{ item.panels.length }} 个面板</ElTag>
              </div>
              <p>{{ item.summary }}</p>
              <div class="tag-row">
                <ElTag
                  v-for="tag in item.sections[0]?.items ?? []"
                  :key="tag"
                  effect="plain"
                  round
                >
                  {{ tag }}
                </ElTag>
              </div>
            </div>
          </div>
        </ElCard>
      </ElCol>
      <ElCol :xs="24" :lg="14">
        <ElCard shadow="never" class="overview-card">
          <template #header>数据共享交换管理中心</template>
          <div class="module-list module-list--dense">
            <div v-for="item in centerModules" :key="item.routeName" class="module-item">
              <div class="module-item__header">
                <strong>{{ item.title }}</strong>
                <ElTag effect="plain">{{ item.panels.length }} 个面板</ElTag>
              </div>
              <p>{{ item.summary }}</p>
            </div>
          </div>
        </ElCard>
      </ElCol>
    </ElRow>

    <ElCard shadow="never" class="matrix-card">
      <template #header>
        <div class="matrix-header">
          <div>
            <h2>能力矩阵</h2>
            <p>按页面查看需求点覆盖情况，并可直接跳转到对应模块。</p>
          </div>
          <ElSpace wrap>
            <ElButton
              v-for="item in quickLinks"
              :key="item.path"
              size="small"
              @click="openPage(item.path)"
            >
              {{ item.label }}
            </ElButton>
          </ElSpace>
        </div>
      </template>

      <ElTable :data="matrixRows" border stripe>
        <ElTableColumn prop="category" label="能力域" min-width="140" />
        <ElTableColumn prop="title" label="页面名称" min-width="180" />
        <ElTableColumn prop="capabilityText" label="核心能力点" min-width="340" show-overflow-tooltip />
        <ElTableColumn prop="panelCount" label="面板数" width="90" />
        <ElTableColumn label="跳转" width="120" fixed="right">
          <template #default="{ row }">
            <ElButton link type="primary" @click="openPage(row.path)">打开</ElButton>
          </template>
        </ElTableColumn>
      </ElTable>
    </ElCard>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { useRouter } from 'vue-router'
  import { modulePageList } from '../shared/module-data'

  defineOptions({ name: 'ExchangePlatformOverview' })

  const router = useRouter()

  const nodePathMap: Record<string, string> = {
    NodeManagementAgent: '/exchange-platform/node/management-agent',
    NodeSchedulingEngine: '/exchange-platform/node/scheduling-engine',
    NodeExchangeEngine: '/exchange-platform/node/exchange-engine',
    NodeLogManagement: '/exchange-platform/node/log-management'
  }

  const centerPathMap: Record<string, string> = {
    CenterShareManagement: '/exchange-platform/center/base-environment/share-management',
    CenterNodeManagement: '/exchange-platform/center/base-environment/node-management',
    CenterChannelManagement: '/exchange-platform/center/base-environment/channel-management',
    CenterTopologyManagement: '/exchange-platform/center/base-environment/topology-management',
    CenterEdgeNodeManagement: '/exchange-platform/center/base-environment/edge-node-management',
    CenterDomainManagement: '/exchange-platform/center/base-environment/domain-management',
    CenterServerManagement: '/exchange-platform/center/base-environment/server-management',
    CenterCdcManagement: '/exchange-platform/center/base-environment/cdc-management',
    CenterBaseEnvironmentDashboard:
      '/exchange-platform/center/base-environment/base-environment-dashboard',
    CenterWorkflowConfig: '/exchange-platform/center/business-config/workflow-config',
    CenterTaskManagement: '/exchange-platform/center/business-config/task-management',
    CenterPublishSubscribe: '/exchange-platform/center/publish-subscribe',
    CenterEnvironmentMonitor: '/exchange-platform/center/environment-monitor',
    CenterAlertConfig: '/exchange-platform/center/alert-config',
    CenterStatisticsAnalysis: '/exchange-platform/center/statistics-analysis',
    CenterOrganizationManagement:
      '/exchange-platform/center/user-management/organization-management',
    CenterUserAccountManagement:
      '/exchange-platform/center/user-management/user-account-management',
    CenterUserRoleManagement:
      '/exchange-platform/center/user-management/user-role-management',
    CenterIpAccessManagement: '/exchange-platform/center/user-management/ip-access-management',
    CenterRouteManagement: '/exchange-platform/center/system-management/route-management',
    CenterSecurityManagement: '/exchange-platform/center/system-management/security-management',
    CenterDataSourceManagement:
      '/exchange-platform/center/system-management/data-source-management',
    CenterResourceDirectory: '/exchange-platform/center/system-management/resource-directory',
    CenterFileManagement: '/exchange-platform/center/system-management/file-management'
  }

  const nodeModules = computed(() =>
    modulePageList.filter((item) => item.category === '节点侧能力')
  )
  const centerModules = computed(() =>
    modulePageList.filter((item) => item.category === '管理中心能力')
  )
  const totalPanels = computed(() =>
    modulePageList.reduce((sum, item) => sum + item.panels.length, 0)
  )
  const totalCapabilities = computed(() =>
    modulePageList.reduce(
      (sum, item) => sum + item.sections.reduce((sectionSum, section) => sectionSum + section.items.length, 0),
      0
    )
  )

  const matrixRows = computed(() =>
    modulePageList.map((item) => ({
      category: item.category,
      title: item.title,
      capabilityText: item.sections.flatMap((section) => section.items).join('、'),
      panelCount: item.panels.length,
      path: nodePathMap[item.routeName] || centerPathMap[item.routeName] || '/exchange-platform/overview'
    }))
  )

  const quickLinks = [
    { label: '交换节点管理', path: '/exchange-platform/center/base-environment/node-management' },
    { label: 'CDC管理', path: '/exchange-platform/center/base-environment/cdc-management' },
    { label: '交换流程配置', path: '/exchange-platform/center/business-config/workflow-config' },
    { label: '任务发布订阅', path: '/exchange-platform/center/publish-subscribe' },
    { label: '资源目录', path: '/exchange-platform/center/system-management/resource-directory' }
  ]

  const openPage = (path: string) => {
    router.push(path)
  }
</script>

<style lang="scss" scoped>
  .overview-page {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .hero {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    padding: 28px;
    background:
      radial-gradient(circle at top left, rgb(96 192 65 / 18%), transparent 35%),
      linear-gradient(135deg, #102848, #165c9d);
    color: #fff;
  }

  .hero-left h1 {
    margin: 0;
    font-size: 32px;
  }

  .hero-left p {
    margin: 14px 0 0;
    line-height: 1.7;
  }

  .hero-eyebrow {
    margin: 0 0 8px !important;
    font-size: 13px;
    letter-spacing: 3px;
    opacity: 0.8;
  }

  .hero-right {
    display: grid;
    gap: 14px;
    grid-template-columns: repeat(2, minmax(110px, 1fr));
    min-width: 280px;
  }

  .hero-number {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid rgb(255 255 255 / 14%);
    border-radius: 18px;
    background: rgb(255 255 255 / 9%);
    backdrop-filter: blur(6px);
  }

  .hero-number span {
    font-size: 34px;
    font-weight: 700;
  }

  .stats-grid {
    display: grid;
    gap: 16px;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  }

  .stat {
    padding: 20px;
  }

  .stat p,
  .stat span {
    margin: 0;
    color: var(--art-text-gray-600);
    line-height: 1.6;
  }

  .stat h3 {
    margin: 14px 0 8px;
    font-size: 30px;
    color: var(--art-gray-900);
  }

  .overview-card {
    height: 100%;
  }

  .module-list {
    display: flex;
    flex-direction: column;
    gap: 18px;
  }

  .module-list--dense {
    gap: 14px;
  }

  .module-item {
    padding-bottom: 18px;
    border-bottom: 1px solid var(--art-border-dashed-color);
  }

  .module-item:last-child {
    padding-bottom: 0;
    border-bottom: none;
  }

  .module-item__header {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    align-items: center;
  }

  .module-item p {
    margin: 10px 0 0;
    color: var(--art-text-gray-600);
    line-height: 1.7;
  }

  .tag-row {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 10px;
  }

  .matrix-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 20px;
  }

  .matrix-header h2 {
    margin: 0;
  }

  .matrix-header p {
    margin: 8px 0 0;
    color: var(--art-text-gray-600);
  }

  @media (max-width: 768px) {
    .hero,
    .matrix-header,
    .module-item__header {
      flex-direction: column;
      align-items: stretch;
    }

    .hero-right {
      min-width: unset;
      width: 100%;
    }
  }
</style>
