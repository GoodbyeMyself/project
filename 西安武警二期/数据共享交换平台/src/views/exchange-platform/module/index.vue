<template>
  <!-- Auto Comment: Component Summary: This component renders UI for '数据共享交换平台/src/views/exchange-platform/module/index.vue'. -->
  <!-- Auto Comment: Component Responsibility: It provides the view structure, interaction entry points, and display containers for this feature. -->
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
  // Auto Comment: Component Script Notes: This script block manages state, events, and data flow for '数据共享交换平台/src/views/exchange-platform/module/index.vue'.
  // Auto Comment: Maintenance Hint: Keep business rules explicit and avoid implicit side effects between handlers.
  import { computed, ref, watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { ElMessage, ElMessageBox } from 'element-plus'
  import * as XLSX from 'xlsx'
  import { modulePageConfigs } from '../shared/module-data'
  import type {
    ModuleActionConfig,
    ModulePanelConfig,
    ModulePanelRow
  } from '../shared/module-schema'

  defineOptions({ name: 'ExchangePlatformModule' })

  const route = useRoute()
  const router = useRouter()

  // Logic Note: Computed value 'pageConfig' derives UI state from reactive sources and updates automatically.
  const pageConfig = computed(() => modulePageConfigs[String(route.name || '')])
  // Logic Note: Reactive state 'panels' stores mutable runtime data used by this component.
  const panels = ref<ModulePanelConfig[]>([])
  // Logic Note: Reactive state 'activePanelKey' stores mutable runtime data used by this component.
  const activePanelKey = ref('')
  // Logic Note: Reactive state 'keyword' stores mutable runtime data used by this component.
  const keyword = ref('')
  // Logic Note: Reactive state 'statusFilter' stores mutable runtime data used by this component.
  const statusFilter = ref('')
  // Logic Note: Reactive state 'dialogVisible' stores mutable runtime data used by this component.
  const dialogVisible = ref(false)
  // Logic Note: Reactive state 'dialogMode' stores mutable runtime data used by this component.
  const dialogMode = ref<'add' | 'edit'>('add')
  // Logic Note: Reactive state 'dialogTitle' stores mutable runtime data used by this component.
  const dialogTitle = ref('')
  // Logic Note: Reactive state 'editingId' stores mutable runtime data used by this component.
  const editingId = ref<number | null>(null)
  // Logic Note: Reactive state 'drawerVisible' stores mutable runtime data used by this component.
  const drawerVisible = ref(false)
  // Logic Note: Reactive state 'drawerTitle' stores mutable runtime data used by this component.
  const drawerTitle = ref('')
  // Logic Note: Reactive state 'detailRow' stores mutable runtime data used by this component.
  const detailRow = ref<ModulePanelRow | null>(null)
  // Logic Note: Reactive state 'formModel' stores mutable runtime data used by this component.
  const formModel = ref<Record<string, string | number | boolean | undefined>>({})

  // Logic Note: Handler 'clonePanels' encapsulates a single interaction or data-processing flow.
  const clonePanels = (value?: ModulePanelConfig[]) =>
    JSON.parse(JSON.stringify(value ?? [])) as ModulePanelConfig[]

  // Logic Note: Watcher keeps dependent state synchronized when observed sources change.
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

  // Logic Note: Computed value 'activePanel' derives UI state from reactive sources and updates automatically.
  const activePanel = computed(
    () => panels.value.find((panel) => panel.key === activePanelKey.value) ?? panels.value[0]
  )

  // Logic Note: Computed value 'statusOptions' derives UI state from reactive sources and updates automatically.
  const statusOptions = computed(() => {
    const values = activePanel.value?.rows
      .map((row) => String(row.status || ''))
      .filter(Boolean)

    return Array.from(new Set(values))
  })

  // Logic Note: Computed value 'filteredRows' derives UI state from reactive sources and updates automatically.
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

  // Logic Note: Computed value 'detailEntries' derives UI state from reactive sources and updates automatically.
  const detailEntries = computed(() =>
    Object.entries(detailRow.value ?? {}).filter(([key]) => key !== 'id')
  )

  // Logic Note: Handler 'resolveFieldLabel' encapsulates a single interaction or data-processing flow.
  const resolveFieldLabel = (key: string) => {
    const panel = activePanel.value
    const fromFields = panel?.fields.find((item) => item.key === key)?.label
    const fromColumns = panel?.columns.find((item) => item.key === key)?.label
    return fromFields || fromColumns || key
  }

  // Logic Note: Handler 'formatValue' encapsulates a single interaction or data-processing flow.
  const formatValue = (value: unknown) => {
    if (Array.isArray(value)) return value.join('、')
    if (value === undefined || value === null || value === '') return '-'
    return String(value)
  }

  // Logic Note: Handler 'resolveTagType' encapsulates a single interaction or data-processing flow.
  const resolveTagType = (value: unknown) => {
    const text = String(value || '')
    if (['健康', '已上线'].includes(text)) return 'success'
    if (['运行中', '待审核'].includes(text)) return 'warning'
    if (text.includes('告警')) return 'danger'
    return 'info'
  }

  // Logic Note: Handler 'getActivePanel' encapsulates a single interaction or data-processing flow.
  const getActivePanel = () => activePanel.value

  // Logic Note: Handler 'getTargetRow' encapsulates a single interaction or data-processing flow.
  const getTargetRow = (row?: ModulePanelRow) => {
    if (row) return row
    return filteredRows.value[0] ?? activePanel.value?.rows[0] ?? null
  }

  // Logic Note: Handler 'buildTimestamp' encapsulates a single interaction or data-processing flow.
  const buildTimestamp = () =>
    new Date().toLocaleString('zh-CN', { hour12: false }).replace(/\//g, '-')

  // Logic Note: Handler 'resetForm' encapsulates a single interaction or data-processing flow.
  const resetForm = (row?: ModulePanelRow | null) => {
    const nextModel: Record<string, string | number | boolean | undefined> = {}
    ;(activePanel.value?.fields ?? []).forEach((field) => {
      nextModel[field.key] = row?.[field.key] ?? (field.key === 'status' ? '运行中' : '')
    })
    formModel.value = nextModel
  }

  // Logic Note: Handler 'openDialog' encapsulates a single interaction or data-processing flow.
  const openDialog = (mode: 'add' | 'edit', title: string, row?: ModulePanelRow | null) => {
    dialogMode.value = mode
    dialogTitle.value = title
    editingId.value = row?.id ?? null
    resetForm(row)
    dialogVisible.value = true
  }

  // Logic Note: Handler 'openDrawer' encapsulates a single interaction or data-processing flow.
  const openDrawer = (title: string, row: ModulePanelRow | null) => {
    if (!row) {
      ElMessage.warning('当前没有可查看的记录')
      return
    }
    drawerTitle.value = title
    detailRow.value = row
    drawerVisible.value = true
  }

  // Logic Note: Handler 'nextRowId' encapsulates a single interaction or data-processing flow.
  const nextRowId = (panel: ModulePanelConfig) =>
    Math.max(0, ...panel.rows.map((item) => item.id)) + 1

  // Logic Note: Handler 'exportRows' encapsulates a single interaction or data-processing flow.
  const exportRows = (rows: ModulePanelRow[], filename: string) => {
    if (!rows.length) {
      ElMessage.warning('没有可导出的数据')
      return
    }

    const worksheet = XLSX.utils.json_to_sheet(
      rows.map(({ id, ...rest }) => rest)
    )
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')
    XLSX.writeFile(workbook, filename)
    ElMessage.success('导出完成')
  }

  // Logic Note: Handler 'triggerDownload' encapsulates a single interaction or data-processing flow.
  const triggerDownload = (row: ModulePanelRow) => {
    const blob = new Blob([JSON.stringify(row, null, 2)], {
      type: 'application/json;charset=utf-8'
    })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = `${row.code || row.name || 'record'}.json`
    anchor.click()
    URL.revokeObjectURL(url)
    ElMessage.success('下载完成')
  }

  // Logic Note: Handler 'removeRow' encapsulates a single interaction or data-processing flow.
  const removeRow = async (row: ModulePanelRow | null, label: string) => {
    const panel = getActivePanel()
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

  // Logic Note: Handler 'changeStatus' encapsulates a single interaction or data-processing flow.
  const changeStatus = (row: ModulePanelRow | null, status: string, label: string) => {
    if (!row) {
      ElMessage.warning('当前没有可操作的记录')
      return
    }
    row.status = status
    row.updatedAt = buildTimestamp()
    ElMessage.success(`${label}成功`)
  }

  // Logic Note: Handler 'duplicateRow' encapsulates a single interaction or data-processing flow.
  const duplicateRow = (row: ModulePanelRow | null) => {
    const panel = getActivePanel()
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

  // Logic Note: Handler 'moveRow' encapsulates a single interaction or data-processing flow.
  const moveRow = (row: ModulePanelRow | null) => {
    if (!row) {
      ElMessage.warning('当前没有可移动的记录')
      return
    }

    const groups = Array.from(new Set((activePanel.value?.rows ?? []).map((item) => String(item.group || '默认分组'))))
    const currentIndex = groups.findIndex((item) => item === String(row.group || ''))
    row.group = groups[(currentIndex + 1 + groups.length) % groups.length] || '默认分组'
    row.updatedAt = buildTimestamp()
    ElMessage.success(`已移动到 ${row.group}`)
  }

  // Logic Note: Handler 'copyToPanel' encapsulates a single interaction or data-processing flow.
  const copyToPanel = (source: ModulePanelRow, panelKey: string, status?: string) => {
    const targetPanel = panels.value.find((item) => item.key === panelKey)
    if (!targetPanel) return false

    const exists = targetPanel.rows.some((item) => item.code === source.code)
    if (exists) return false

    targetPanel.rows.unshift({
      ...source,
      id: nextRowId(targetPanel),
      owner: '当前用户',
      status: status || source.status,
      updatedAt: buildTimestamp()
    })
    return true
  }

  // Logic Note: Handler 'removeFromPanel' encapsulates a single interaction or data-processing flow.
  const removeFromPanel = (panelKey: string, row: ModulePanelRow | null) => {
    const targetPanel = panels.value.find((item) => item.key === panelKey)
    if (!targetPanel || !row) return
    targetPanel.rows = targetPanel.rows.filter((item) => item.id !== row.id)
  }

  // Logic Note: Handler 'submitDialog' encapsulates a single interaction or data-processing flow.
  const submitDialog = () => {
    const panel = getActivePanel()
    if (!panel) return

    const payload: ModulePanelRow = {
      id: editingId.value ?? nextRowId(panel),
      ...formModel.value,
      updatedAt: buildTimestamp(),
      description:
        String(formModel.value.description || '') ||
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

  // Logic Note: Handler 'handleAction' encapsulates a single interaction or data-processing flow.
  const handleAction = async (action: ModuleActionConfig, row?: ModulePanelRow) => {
    const panel = getActivePanel()
    const target = getTargetRow(row)

    // Logic Note: Branching logic maps action keys to explicit behavior paths.
    switch (action.key) {
      case 'query':
        ElMessage.success(`${action.label}完成`)
        break
      case 'export':
        exportRows(target && row ? [target] : filteredRows.value, `${pageConfig.value?.title || '数据'}-${activePanel.value?.title || '面板'}.xlsx`)
        break
      case 'add':
      case 'upload':
      case 'newFolder':
      case 'addDirectory':
        openDialog('add', action.label)
        break
      case 'edit':
      case 'editFolder':
      case 'editDirectory':
      case 'assign':
      case 'groupUsers':
        if (!target) {
          ElMessage.warning('请先选择一条记录再执行该操作')
          break
        }
        if (action.key === 'groupUsers') {
          openDrawer(action.label, target)
          break
        }
        openDialog('edit', action.label, target)
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
        changeStatus(target, '已上线', action.label)
        break
      case 'offline':
        changeStatus(target, '已下线', action.label)
        break
      case 'copy':
        duplicateRow(target)
        break
      case 'move':
        moveRow(target)
        break
      case 'download':
        if (target) {
          triggerDownload(target)
        } else {
          ElMessage.warning('当前没有可下载的记录')
        }
        break
      case 'portal':
      case 'backHome':
        router.push('/exchange-platform/overview')
        break
      case 'subscribe':
        if (!target) {
          ElMessage.warning('当前没有可订阅的任务')
          break
        }
        if (copyToPanel(target, 'mySubscriptions', '运行中')) {
          ElMessage.success('已新增到我的订阅')
        } else {
          ElMessage.warning('该任务已存在于我的订阅')
        }
        break
      case 'unsubscribe':
        removeFromPanel('mySubscriptions', target)
        ElMessage.success('已删除我的订阅')
        break
      case 'apply':
        if (!target) {
          ElMessage.warning('当前没有可申请的任务')
          break
        }
        if (copyToPanel(target, 'pending', '待审核')) {
          ElMessage.success('已加入待申请清单')
        } else {
          ElMessage.warning('该任务已存在于待申请清单')
        }
        break
      case 'cancelApply':
        removeFromPanel('pending', target)
        ElMessage.success('已取消待申请')
        break
      default:
        if (panel) {
          ElMessage.info(`${action.label}已触发`)
        }
        break
    }
  }
</script>

<style lang="scss" scoped>
  /* Auto Comment: Component Style Notes: Styles in this block define visual layout and interaction feedback for '数据共享交换平台/src/views/exchange-platform/module/index.vue'. */
  /* Auto Comment: Consistency Rule: Preserve spacing rhythm, typography hierarchy, and state visibility across breakpoints. */
  .module-page {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .hero-card {
    padding: 28px;
    background:
      radial-gradient(circle at right top, rgb(93 135 255 / 20%), transparent 35%),
      linear-gradient(135deg, rgb(18 52 102 / 96%), rgb(24 96 168 / 96%));
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
