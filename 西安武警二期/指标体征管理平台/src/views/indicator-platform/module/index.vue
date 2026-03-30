<template>
  <div v-if="pageConfig" class="module-page">
    <section class="hero-card art-card">
      <div class="hero-content">
        <div>
          <p class="hero-category">{{ pageConfig.category }}</p>
          <h1 class="hero-title">{{ pageConfig.title }}</h1>
          <p class="hero-description">{{ pageConfig.description }}</p>
          <p class="hero-summary">{{ pageConfig.summary }}</p>
        </div>
        <div class="hero-mark">
          <span>{{ panels.length }}</span>
          <small>业务面板</small>
        </div>
      </div>
    </section>

    <section class="stats-grid">
      <article v-for="stat in pageConfig.stats" :key="stat.label" class="stat-card art-card">
        <p class="stat-label">{{ stat.label }}</p>
        <h3 class="stat-value">{{ stat.value }}</h3>
        <p class="stat-description">{{ stat.description }}</p>
      </article>
    </section>

    <ElRow :gutter="20" class="top-grid">
      <ElCol :xs="24" :lg="14">
        <ElCard shadow="never" class="info-card">
          <template #header>功能能力</template>
          <div class="section-list">
            <div v-for="section in pageConfig.sections" :key="section.title" class="section-item">
              <h3>{{ section.title }}</h3>
              <div class="section-tags">
                <ElTag v-for="item in section.items" :key="item" effect="plain" round>
                  {{ item }}
                </ElTag>
              </div>
            </div>
          </div>
        </ElCard>
      </ElCol>
      <ElCol :xs="24" :lg="10">
        <ElCard shadow="never" class="info-card">
          <template #header>执行节奏</template>
          <ElTimeline>
            <ElTimelineItem
              v-for="(item, index) in pageConfig.timeline"
              :key="item"
              :timestamp="`步骤 ${index + 1}`"
              center
            >
              {{ item }}
            </ElTimelineItem>
          </ElTimeline>
        </ElCard>
      </ElCol>
    </ElRow>

    <ElCard shadow="never" class="panel-card">
      <template #header>
        <div class="panel-header">
          <div>
            <h2>{{ activePanel?.title }}</h2>
            <p>{{ activePanel?.description }}</p>
          </div>
          <ElTag type="primary" effect="plain">{{ filteredRows.length }} 条记录</ElTag>
        </div>
      </template>

      <ElTabs v-if="panels.length > 1" v-model="activePanelKey" class="panel-tabs">
        <ElTabPane
          v-for="panel in panels"
          :key="panel.key"
          :label="panel.title"
          :name="panel.key"
        />
      </ElTabs>

      <div class="filter-bar">
        <ElInput
          v-model="keyword"
          clearable
          placeholder="输入名称、编码、负责人或说明进行筛选"
        />
        <ElSelect v-model="statusFilter" clearable placeholder="全部状态">
          <ElOption
            v-for="item in statusOptions"
            :key="item"
            :label="item"
            :value="item"
          />
        </ElSelect>
      </div>

      <div class="action-bar">
        <ElButton
          v-for="action in activePanel?.toolbarActions ?? []"
          :key="action.label"
          :type="action.type"
          :plain="action.plain"
          @click="handleAction(action)"
        >
          {{ action.label }}
        </ElButton>
      </div>

      <ElTable :data="filteredRows" border stripe>
        <ElTableColumn
          v-for="column in activePanel?.columns ?? []"
          :key="column.key"
          :prop="column.key"
          :label="column.label"
          :min-width="column.minWidth"
          :width="column.width"
          show-overflow-tooltip
        >
          <template #default="{ row }">
            <ElTag v-if="column.type === 'tag'" :type="resolveTagType(row[column.key])">
              {{ formatValue(row[column.key]) }}
            </ElTag>
            <ElProgress
              v-else-if="column.type === 'progress'"
              :percentage="Number(row[column.key]) || 0"
              :stroke-width="12"
            />
            <span v-else>{{ formatValue(row[column.key]) }}</span>
          </template>
        </ElTableColumn>
        <ElTableColumn label="操作" fixed="right" min-width="280">
          <template #default="{ row }">
            <ElSpace wrap>
              <ElButton
                v-for="action in activePanel?.rowActions ?? []"
                :key="action.label"
                link
                :type="action.type"
                @click="handleAction(action, row)"
              >
                {{ action.label }}
              </ElButton>
            </ElSpace>
          </template>
        </ElTableColumn>
      </ElTable>
    </ElCard>

    <ElDrawer v-model="drawerVisible" :title="drawerTitle" size="36%">
      <ElDescriptions v-if="detailRow" :column="1" border>
        <ElDescriptionsItem
          v-for="([key, value], index) in detailEntries"
          :key="`${key}-${index}`"
          :label="resolveFieldLabel(key)"
        >
          {{ formatValue(value) }}
        </ElDescriptionsItem>
      </ElDescriptions>
    </ElDrawer>

    <ElDialog v-model="dialogVisible" :title="dialogTitle" width="720px">
      <ElForm label-width="110px">
        <ElRow :gutter="16">
          <ElCol
            v-for="field in activePanel?.fields ?? []"
            :key="field.key"
            :span="field.span ?? 12"
          >
            <ElFormItem :label="field.label">
              <ElInput
                v-if="!field.type || field.type === 'text'"
                v-model="formModel[field.key]"
              />
              <ElInput
                v-else-if="field.type === 'textarea'"
                v-model="formModel[field.key]"
                type="textarea"
                :rows="4"
              />
              <ElSelect v-else-if="field.type === 'select'" v-model="formModel[field.key]">
                <ElOption
                  v-for="option in field.options ?? []"
                  :key="option.value"
                  :label="option.label"
                  :value="option.value"
                />
              </ElSelect>
              <ElInputNumber
                v-else-if="field.type === 'number'"
                v-model="formModel[field.key]"
                :min="0"
                style="width: 100%"
              />
            </ElFormItem>
          </ElCol>
        </ElRow>
      </ElForm>
      <template #footer>
        <ElButton @click="dialogVisible = false">取消</ElButton>
        <ElButton type="primary" @click="submitDialog">保存</ElButton>
      </template>
    </ElDialog>
  </div>

  <ElEmpty v-else description="未找到页面配置" />
</template>

<script setup lang="ts">
  import { computed, reactive, ref, watch } from 'vue'
  import { useRoute } from 'vue-router'
  import { ElMessage, ElMessageBox } from 'element-plus'
  import { modulePageConfigs } from '../shared/module-data'
  import type {
    ModuleActionConfig,
    ModulePanelConfig,
    ModulePanelRow
  } from '../shared/module-schema'

  defineOptions({ name: 'IndicatorPlatformModule' })

  const route = useRoute()

  const pageConfig = computed(() => modulePageConfigs[String(route.name || '')])
  const panels = ref<ModulePanelConfig[]>([])
  const activePanelKey = ref('')
  const keyword = ref('')
  const statusFilter = ref('')
  const dialogVisible = ref(false)
  const dialogTitle = ref('')
  const editingId = ref<number | null>(null)
  const drawerVisible = ref(false)
  const drawerTitle = ref('')
  const detailRow = ref<ModulePanelRow | null>(null)
  const formModel = reactive<Record<string, string | number | boolean | undefined>>({})

  const clonePanels = (value?: ModulePanelConfig[]) =>
    JSON.parse(JSON.stringify(value ?? [])) as ModulePanelConfig[]

  watch(
    pageConfig,
    (config) => {
      panels.value = clonePanels(config?.panels)
      activePanelKey.value = panels.value[0]?.key ?? ''
      keyword.value = ''
      statusFilter.value = ''
      dialogVisible.value = false
      drawerVisible.value = false
    },
    { immediate: true }
  )

  const activePanel = computed(
    () => panels.value.find((panel) => panel.key === activePanelKey.value) ?? panels.value[0]
  )

  const statusOptions = computed(() => {
    const values = activePanel.value?.rows
      .map((row) => String(row.status || ''))
      .filter(Boolean)
    return Array.from(new Set(values))
  })

  const filteredRows = computed(() => {
    const panel = activePanel.value
    if (!panel) return []

    return panel.rows.filter((row) => {
      const matchKeyword =
        !keyword.value ||
        Object.values(row).some((value) =>
          String(value ?? '')
            .toLowerCase()
            .includes(keyword.value.trim().toLowerCase())
        )
      const matchStatus = !statusFilter.value || String(row.status || '') === statusFilter.value
      return matchKeyword && matchStatus
    })
  })

  const detailEntries = computed(() =>
    Object.entries(detailRow.value ?? {}).filter(([key]) => key !== 'id')
  )

  const resolveFieldLabel = (key: string) => {
    const panel = activePanel.value
    const fromFields = panel?.fields.find((item) => item.key === key)?.label
    const fromColumns = panel?.columns.find((item) => item.key === key)?.label
    return fromFields || fromColumns || key
  }

  const formatValue = (value: unknown) => {
    if (Array.isArray(value)) return value.join('、')
    if (value === undefined || value === null || value === '') return '-'
    return String(value)
  }

  const resolveTagType = (value: unknown) => {
    const text = String(value || '')
    if (['已上线'].includes(text)) return 'success'
    if (['运行中', '待处理'].includes(text)) return 'warning'
    if (text.includes('异常')) return 'danger'
    return 'info'
  }

  const nextRowId = (panel: ModulePanelConfig) =>
    Math.max(0, ...panel.rows.map((item) => item.id)) + 1

  const buildTimestamp = () =>
    new Date().toLocaleString('zh-CN', { hour12: false }).replace(/\//g, '-')

  const getTargetRow = (row?: ModulePanelRow) => {
    if (row) return row
    return filteredRows.value[0] ?? activePanel.value?.rows[0] ?? null
  }

  const resetForm = (row?: ModulePanelRow | null) => {
    const panel = activePanel.value
    if (!panel) return
    panel.fields.forEach((field) => {
      formModel[field.key] = row?.[field.key] ?? (field.key === 'status' ? '运行中' : '')
    })
  }

  const openDialog = (title: string, row?: ModulePanelRow | null) => {
    dialogTitle.value = title
    editingId.value = row?.id ?? null
    resetForm(row)
    dialogVisible.value = true
  }

  const openDrawer = (title: string, row: ModulePanelRow | null) => {
    if (!row) {
      ElMessage.warning('当前没有可查看的记录')
      return
    }
    drawerTitle.value = title
    detailRow.value = row
    drawerVisible.value = true
  }

  const removeRow = async (row: ModulePanelRow | null, label: string) => {
    const panel = activePanel.value
    if (!panel || !row) {
      ElMessage.warning('当前没有可删除的记录')
      return
    }
    try {
      await ElMessageBox.confirm(`确认执行“${label}”吗？`, '提示', {
        type: 'warning',
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      })
      panel.rows = panel.rows.filter((item) => item.id !== row.id)
      ElMessage.success(`${label}成功`)
    } catch {
      ElMessage.info('已取消当前操作')
    }
  }

  const updateStatus = (row: ModulePanelRow | null, status: string, label: string) => {
    if (!row) {
      ElMessage.warning('当前没有可操作的记录')
      return
    }
    row.status = status
    row.updatedAt = buildTimestamp()
    ElMessage.success(`${label}成功`)
  }

  const duplicateRow = (row: ModulePanelRow | null) => {
    const panel = activePanel.value
    if (!panel || !row) {
      ElMessage.warning('当前没有可复制的记录')
      return
    }
    panel.rows.unshift({
      ...row,
      id: nextRowId(panel),
      name: `${row.name}-副本`,
      code: `${row.code}-COPY`,
      updatedAt: buildTimestamp()
    })
    ElMessage.success('复制成功')
  }

  const moveRow = (row: ModulePanelRow | null) => {
    if (!row) {
      ElMessage.warning('当前没有可移动的记录')
      return
    }
    const groups = Array.from(
      new Set((activePanel.value?.rows ?? []).map((item) => String(item.group || '默认分组')))
    )
    const currentIndex = groups.findIndex((item) => item === String(row.group || ''))
    row.group = groups[(currentIndex + 1 + groups.length) % groups.length] || '默认分组'
    row.updatedAt = buildTimestamp()
    ElMessage.success(`已移动到 ${row.group}`)
  }

  const downloadRow = (row: ModulePanelRow | null) => {
    if (!row) {
      ElMessage.warning('当前没有可下载的记录')
      return
    }
    const blob = new Blob([JSON.stringify(row, null, 2)], { type: 'application/json;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = `${row.code || row.name || 'record'}.json`
    anchor.click()
    URL.revokeObjectURL(url)
    ElMessage.success('下载完成')
  }

  const submitDialog = () => {
    const panel = activePanel.value
    if (!panel) return

    const payload: ModulePanelRow = {
      id: editingId.value ?? nextRowId(panel),
      ...formModel,
      updatedAt: buildTimestamp(),
      description:
        String(formModel.description || '') ||
        `${pageConfig.value?.title || '业务'}维护项`
    }

    if (!payload.status) {
      payload.status = '运行中'
    }

    if (editingId.value) {
      const target = panel.rows.find((item) => item.id === editingId.value)
      if (target) {
        Object.assign(target, payload)
      }
      ElMessage.success('更新成功')
    } else {
      panel.rows.unshift(payload)
      ElMessage.success('新增成功')
    }
    dialogVisible.value = false
  }

  const handleAction = async (action: ModuleActionConfig, row?: ModulePanelRow) => {
    const target = getTargetRow(row)
    switch (action.key) {
      case 'query':
      case 'execute':
      case 'check':
      case 'preview':
        ElMessage.success(`${action.label}已触发`)
        break
      case 'add':
      case 'upload':
        openDialog(action.label)
        break
      case 'edit':
        openDialog(action.label, target)
        break
      case 'delete':
      case 'deleteFolder':
      case 'deleteDirectory':
        await removeRow(target, action.label)
        break
      case 'detail':
        openDrawer(action.label, target)
        break
      case 'online':
      case 'start':
        updateStatus(target, '已上线', action.label)
        break
      case 'offline':
      case 'stop':
        updateStatus(target, '已下线', action.label)
        break
      case 'copy':
        duplicateRow(target)
        break
      case 'move':
        moveRow(target)
        break
      case 'download':
        downloadRow(target)
        break
      case 'markRead':
        updateStatus(target, '已处理', action.label)
        break
      case 'abnormal':
        statusFilter.value = '异常'
        ElMessage.info('已筛选异常记录')
        break
      default:
        ElMessage.info(`${action.label}已触发`)
        break
    }
  }
</script>

<style lang="scss" scoped>
  .module-page {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .hero-card {
    padding: 28px;
    background:
      radial-gradient(circle at right top, rgb(80 138 255 / 20%), transparent 35%),
      linear-gradient(135deg, rgb(16 45 90 / 96%), rgb(27 101 168 / 96%));
    color: #fff;
  }

  .hero-content {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    align-items: center;
  }

  .hero-category {
    margin: 0 0 8px;
    font-size: 13px;
    letter-spacing: 2px;
    opacity: 0.78;
  }

  .hero-title {
    margin: 0;
    font-size: 30px;
    font-weight: 700;
  }

  .hero-description,
  .hero-summary {
    margin: 10px 0 0;
    line-height: 1.7;
    opacity: 0.92;
  }

  .hero-mark {
    min-width: 140px;
    padding: 18px 20px;
    border: 1px solid rgb(255 255 255 / 16%);
    border-radius: 18px;
    background: rgb(255 255 255 / 10%);
    text-align: center;
    backdrop-filter: blur(8px);
  }

  .hero-mark span {
    display: block;
    font-size: 42px;
    font-weight: 700;
    line-height: 1.1;
  }

  .hero-mark small {
    opacity: 0.85;
  }

  .stats-grid {
    display: grid;
    gap: 16px;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  }

  .stat-card {
    padding: 18px 20px;
  }

  .stat-label {
    margin: 0;
    color: var(--art-text-gray-600);
  }

  .stat-value {
    margin: 12px 0 8px;
    font-size: 26px;
    color: var(--art-gray-900);
  }

  .stat-description {
    margin: 0;
    line-height: 1.6;
    color: var(--art-text-gray-600);
  }

  .top-grid {
    margin: 0 !important;
  }

  .info-card {
    height: 100%;
  }

  .section-list {
    display: flex;
    flex-direction: column;
    gap: 18px;
  }

  .section-item h3 {
    margin: 0 0 12px;
    font-size: 16px;
  }

  .section-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .panel-card :deep(.el-card__header) {
    padding-bottom: 14px;
  }

  .panel-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 20px;
  }

  .panel-header h2 {
    margin: 0;
    font-size: 20px;
  }

  .panel-header p {
    margin: 8px 0 0;
    color: var(--art-text-gray-600);
  }

  .filter-bar,
  .action-bar {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-bottom: 16px;
  }

  .filter-bar {
    margin-top: 4px;
  }

  .filter-bar :deep(.el-input),
  .filter-bar :deep(.el-select) {
    max-width: 320px;
  }

  @media (max-width: 768px) {
    .hero-content,
    .panel-header {
      flex-direction: column;
      align-items: stretch;
    }

    .hero-mark {
      width: 100%;
    }

    .filter-bar :deep(.el-input),
    .filter-bar :deep(.el-select) {
      max-width: none;
      width: 100%;
    }
  }
</style>
