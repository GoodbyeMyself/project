<template>
  <div class="metadata-overview">
    <ElRow :gutter="16" class="stat-row">
      <ElCol :xs="24" :md="8">
        <ElCard shadow="never" class="stat-card">
          <div class="stat-title">模块数量</div>
          <div class="stat-value">{{ metadataStatistics.moduleCount }}</div>
        </ElCard>
      </ElCol>
      <ElCol :xs="24" :md="8">
        <ElCard shadow="never" class="stat-card">
          <div class="stat-title">子功能数量</div>
          <div class="stat-value">{{ metadataStatistics.sectionCount }}</div>
        </ElCard>
      </ElCol>
      <ElCol :xs="24" :md="8">
        <ElCard shadow="never" class="stat-card">
          <div class="stat-title">能力点数量</div>
          <div class="stat-value">{{ metadataStatistics.capabilityCount }}</div>
        </ElCard>
      </ElCol>
    </ElRow>

    <ElCard shadow="never" class="section-card">
      <template #header>
        <div class="header-row">
          <span>能力检索</span>
          <span class="count-text">共 {{ filteredRows.length }} 条</span>
        </div>
      </template>
      <ElInput
        v-model="keyword"
        placeholder="输入模块、子功能或能力点关键字"
        clearable
        class="search-input"
      />
      <ElTable :data="filteredRows" stripe>
        <ElTableColumn prop="moduleTitle" label="模块" min-width="160" />
        <ElTableColumn prop="sectionTitle" label="子功能" min-width="180" />
        <ElTableColumn prop="capability" label="能力点" min-width="260" />
        <ElTableColumn label="操作" width="120" fixed="right">
          <template #default="{ row }">
            <ElButton link type="primary" @click="gotoSection(row.sectionKey)">进入页面</ElButton>
          </template>
        </ElTableColumn>
      </ElTable>
    </ElCard>

    <ElCard shadow="never" class="section-card">
      <template #header>
        <span>模块导航</span>
      </template>
      <ElRow :gutter="16">
        <ElCol v-for="module in metadataCatalog" :key="module.key" :xs="24" :md="12" :xl="8">
          <ElCard shadow="hover" class="module-card">
            <div class="module-title">{{ module.title }}</div>
            <div class="module-desc">{{ module.description }}</div>
            <ElDivider />
            <div class="module-sections">
              <ElButton
                v-for="section in module.sections"
                :key="section.key"
                type="primary"
                plain
                class="section-button"
                @click="gotoSection(section.key)"
              >
                {{ section.title }}
              </ElButton>
            </div>
          </ElCard>
        </ElCol>
      </ElRow>
    </ElCard>
  </div>
</template>

<script setup lang="ts">
  import { metadataCatalog, metadataStatistics } from '../catalog'

  defineOptions({ name: 'MetadataOverview' })

  interface CapabilityRow {
    moduleKey: string
    moduleTitle: string
    sectionKey: string
    sectionTitle: string
    capability: string
  }

  const router = useRouter()
  const keyword = ref('')

  const allRows = computed<CapabilityRow[]>(() => {
    return metadataCatalog.flatMap((module) =>
      module.sections.flatMap((section) =>
        section.capabilities.map((capability) => ({
          moduleKey: module.key,
          moduleTitle: module.title,
          sectionKey: section.key,
          sectionTitle: section.title,
          capability
        }))
      )
    )
  })

  const filteredRows = computed(() => {
    if (!keyword.value.trim()) {
      return allRows.value
    }

    const normalizedKeyword = keyword.value.trim().toLowerCase()
    return allRows.value.filter((row) => {
      return [row.moduleTitle, row.sectionTitle, row.capability]
        .join(' ')
        .toLowerCase()
        .includes(normalizedKeyword)
    })
  })

  const gotoSection = (sectionKey: string) => {
    const routeName = `Section-${sectionKey}`
    router.push({ name: routeName })
  }
</script>

<style lang="scss" scoped>
  .metadata-overview {
    .stat-row {
      margin-bottom: 16px;
    }

    .stat-card {
      border: 1px solid var(--el-border-color-light);

      .stat-title {
        color: var(--art-gray-600);
        font-size: 14px;
      }

      .stat-value {
        margin-top: 8px;
        color: var(--el-color-primary);
        font-size: 32px;
        font-weight: 700;
        line-height: 1;
      }
    }

    .section-card {
      margin-bottom: 16px;
    }

    .header-row {
      display: flex;
      justify-content: space-between;
      width: 100%;

      .count-text {
        color: var(--art-gray-500);
        font-size: 13px;
      }
    }

    .search-input {
      margin-bottom: 12px;
    }

    .module-card {
      height: 100%;
      margin-bottom: 16px;
      border: 1px solid var(--el-border-color-lighter);
    }

    .module-title {
      color: var(--art-gray-800);
      font-size: 16px;
      font-weight: 600;
    }

    .module-desc {
      min-height: 38px;
      margin-top: 8px;
      color: var(--art-gray-600);
      font-size: 13px;
      line-height: 1.5;
    }

    .module-sections {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .section-button {
      margin: 0;
    }
  }
</style>
