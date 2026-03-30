<template>
  <!-- Auto Comment: Component Summary: This component renders UI for '外部数据接入平台/src/views/external-platform/overview/index.vue'. -->
  <!-- Auto Comment: Component Responsibility: It provides the view structure, interaction entry points, and display containers for this feature. -->
  <div class="overview-page">
    <section class="hero art-card">
      <div class="hero-left">
        <p class="hero-eyebrow">平台总览</p>
        <h1>外部数据接入平台</h1>
        <p>
          当前版本已覆盖接入来源管理、数据模板配置、接入数据管理、接入任务管理、
          接入调度管理、数据共享管理 6 大模块，并将 PRD 能力点映射为可操作按钮。
        </p>
        <ElSpace wrap>
          <ElButton
            type="primary"
            @click="openPage('/external-access-platform/source-management')"
          >
            接入来源管理
          </ElButton>
          <ElButton @click="openPage('/external-access-platform/access-data')">
            接入数据管理
          </ElButton>
          <ElButton @click="openPage('/external-access-platform/share-management')">
            数据共享管理
          </ElButton>
        </ElSpace>
      </div>
      <div class="hero-right">
        <div class="hero-number">
          <span>{{ modulePageList.length }}</span>
          <small>功能页面</small>
        </div>
        <div class="hero-number">
          <span>{{ totalCapabilities }}</span>
          <small>能力点</small>
        </div>
      </div>
    </section>

    <section class="stats-grid">
      <article class="stat art-card">
        <p>核心业务模块</p>
        <h3>{{ modulePageList.length }}</h3>
        <span>按 PRD 拆分的业务模块页面</span>
      </article>
      <article class="stat art-card">
        <p>能力点覆盖</p>
        <h3>{{ totalCapabilities }}</h3>
        <span>PRD 功能点均可在页面内定位</span>
      </article>
      <article class="stat art-card">
        <p>可操作面板</p>
        <h3>{{ totalPanels }}</h3>
        <span>支持手工执行按钮操作与数据编辑</span>
      </article>
      <article class="stat art-card">
        <p>手动验证入口</p>
        <h3>{{ quickLinks.length }}</h3>
        <span>总览页提供关键模块快捷跳转</span>
      </article>
    </section>

    <ElCard shadow="never" class="matrix-card">
      <template #header>
        <div class="matrix-header">
          <div>
            <h2>能力矩阵</h2>
            <p>按模块查看需求点覆盖情况，并可直接跳转到对应业务页。</p>
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
        <ElTableColumn
          prop="capabilityText"
          label="核心能力点"
          min-width="500"
          show-overflow-tooltip
        />
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
  // Auto Comment: Component Script Notes: This script block manages state, events, and data flow for '外部数据接入平台/src/views/external-platform/overview/index.vue'.
  // Auto Comment: Maintenance Hint: Keep business rules explicit and avoid implicit side effects between handlers.
  import { computed } from 'vue'
  import { useRouter } from 'vue-router'
  import { modulePageList } from '../shared/module-data'

  defineOptions({ name: 'ExternalAccessPlatformOverview' })

  const router = useRouter()

  const pathMap: Record<string, string> = {
    ExternalSourceManagement: '/external-access-platform/source-management',
    ExternalTemplateConfig: '/external-access-platform/template-config',
    ExternalAccessData: '/external-access-platform/access-data',
    ExternalTaskManagement: '/external-access-platform/task-management',
    ExternalScheduleManagement: '/external-access-platform/schedule-management',
    ExternalShareManagement: '/external-access-platform/share-management'
  }

  // Logic Note: Computed value 'totalPanels' derives UI state from reactive sources and updates automatically.
  const totalPanels = computed(() =>
    modulePageList.reduce((sum, item) => sum + item.panels.length, 0)
  )

  // Logic Note: Computed value 'totalCapabilities' derives UI state from reactive sources and updates automatically.
  const totalCapabilities = computed(() =>
    modulePageList.reduce(
      (sum, item) => sum + item.sections.reduce((inner, section) => inner + section.items.length, 0),
      0
    )
  )

  // Logic Note: Computed value 'matrixRows' derives UI state from reactive sources and updates automatically.
  const matrixRows = computed(() =>
    modulePageList.map((item) => ({
      category: item.category,
      title: item.title,
      capabilityText: item.sections.flatMap((section) => section.items).join('、'),
      panelCount: item.panels.length,
      path: pathMap[item.routeName] || '/external-access-platform/overview'
    }))
  )

  const quickLinks = [
    { label: '接入来源管理', path: '/external-access-platform/source-management' },
    { label: '数据模板配置', path: '/external-access-platform/template-config' },
    { label: '接入数据管理', path: '/external-access-platform/access-data' },
    { label: '接入任务管理', path: '/external-access-platform/task-management' },
    { label: '数据共享管理', path: '/external-access-platform/share-management' }
  ]

  // Logic Note: Handler 'openPage' encapsulates a single interaction or data-processing flow.
  const openPage = (path: string) => {
    router.push(path)
  }
</script>

<style lang="scss" scoped>
  /* Auto Comment: Component Style Notes: Styles in this block define visual layout and interaction feedback for '外部数据接入平台/src/views/external-platform/overview/index.vue'. */
  /* Auto Comment: Consistency Rule: Preserve spacing rhythm, typography hierarchy, and state visibility across breakpoints. */
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
    .matrix-header {
      flex-direction: column;
      align-items: stretch;
    }

    .hero-right {
      min-width: unset;
      width: 100%;
    }
  }
</style>
