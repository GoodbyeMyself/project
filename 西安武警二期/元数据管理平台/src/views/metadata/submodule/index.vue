<template>
  <!-- Auto Comment: Component Summary: This component renders UI for '元数据管理平台/src/views/metadata/submodule/index.vue'. -->
  <!-- Auto Comment: Component Responsibility: It provides the view structure, interaction entry points, and display containers for this feature. -->
  <div class="metadata-submodule">
    <template v-if="context">
      <ElCard shadow="never" class="info-card">
        <template #header>
          <div class="header-row">
            <div>
              <div class="module-title">{{ context.module.title }}</div>
              <div class="section-title">{{ context.section.title }}</div>
            </div>
            <ElTag type="primary">能力点 {{ context.section.capabilities.length }}</ElTag>
          </div>
        </template>
        <div class="desc">{{ context.section.description }}</div>
      </ElCard>

      <ElCard shadow="never" class="block-card">
        <template #header>
          <div class="header-row">
            <span>能力清单</span>
            <span class="count-text">筛选后 {{ filteredCapabilities.length }} 条</span>
          </div>
        </template>
        <ElInput
          v-model="keyword"
          placeholder="输入能力关键字筛选"
          clearable
          class="search-input"
        />
        <ElTable :data="capabilityRows" stripe>
          <ElTableColumn prop="name" label="能力点" min-width="300" />
          <ElTableColumn label="建议动作" min-width="180">
            <template #default="{ row }">
              <ElSpace wrap>
                <ElTag v-for="action in row.actions" :key="action.code" type="info">
                  {{ action.label }}
                </ElTag>
              </ElSpace>
            </template>
          </ElTableColumn>
          <ElTableColumn label="操作" width="140" fixed="right">
            <template #default="{ row }">
              <ElButton link type="primary" @click="openActionDialog('执行能力', row.name)">执行</ElButton>
            </template>
          </ElTableColumn>
        </ElTable>
      </ElCard>

      <ElCard shadow="never" class="block-card">
        <template #header>
          <div class="header-row">
            <span>快捷动作</span>
            <ElSpace>
              <ElButton @click="triggerImport">导入记录</ElButton>
              <ElButton type="success" @click="exportRecords">导出记录</ElButton>
              <ElButton type="danger" plain @click="clearRecords">清空记录</ElButton>
            </ElSpace>
          </div>
        </template>

        <ElSpace wrap>
          <ElButton
            v-for="action in suggestedActions"
            :key="action.code"
            type="primary"
            plain
            @click="openActionDialog(action.label)"
          >
            {{ action.label }}
          </ElButton>
        </ElSpace>

        <input
          ref="uploadInputRef"
          class="hidden-input"
          type="file"
          accept="application/json,.json"
          @change="handleImportFile"
        />
      </ElCard>

      <ElCard shadow="never" class="block-card">
        <template #header>
          <div class="header-row">
            <span>执行记录</span>
            <span class="count-text">共 {{ currentRecords.length }} 条</span>
          </div>
        </template>
        <ElTable :data="currentRecords" stripe>
          <ElTableColumn prop="action" label="动作" min-width="130" />
          <ElTableColumn prop="capability" label="能力点" min-width="240" />
          <ElTableColumn prop="operator" label="执行人" width="120" />
          <ElTableColumn prop="executeTime" label="执行时间" min-width="180" />
          <ElTableColumn prop="remark" label="说明" min-width="220" />
          <ElTableColumn label="操作" width="100" fixed="right">
            <template #default="{ row }">
              <ElButton link type="danger" @click="removeRecord(row.id)">删除</ElButton>
            </template>
          </ElTableColumn>
        </ElTable>
      </ElCard>
    </template>

    <ElEmpty v-else description="未找到当前子功能配置" />

    <ElDialog v-model="dialogVisible" title="执行动作" width="520px">
      <ElForm label-position="top">
        <ElFormItem label="动作名称">
          <ElInput v-model.trim="dialogForm.action" />
        </ElFormItem>
        <ElFormItem label="关联能力点">
          <ElInput v-model.trim="dialogForm.capability" placeholder="可选，默认按当前子功能记录" />
        </ElFormItem>
        <ElFormItem label="执行人">
          <ElInput v-model.trim="dialogForm.operator" />
        </ElFormItem>
        <ElFormItem label="执行说明">
          <ElInput
            v-model.trim="dialogForm.remark"
            type="textarea"
            :rows="3"
            placeholder="请输入动作执行说明"
          />
        </ElFormItem>
      </ElForm>
      <template #footer>
        <ElButton @click="dialogVisible = false">取消</ElButton>
        <ElButton type="primary" @click="submitAction">确认</ElButton>
      </template>
    </ElDialog>
  </div>
</template>

<script setup lang="ts">
  // Auto Comment: Component Script Notes: This script block manages state, events, and data flow for '元数据管理平台/src/views/metadata/submodule/index.vue'.
  // Auto Comment: Maintenance Hint: Keep business rules explicit and avoid implicit side effects between handlers.
  import type { SuggestedAction } from '../catalog'
  import { getSectionContext, getSuggestedActions } from '../catalog'
  import { ElMessage, ElMessageBox } from 'element-plus'

  interface OperationRecord {
    id: string
    action: string
    capability: string
    operator: string
    executeTime: string
    remark: string
  }

  defineOptions({ name: 'MetadataSubmodule' })

  const route = useRoute()
  // Logic Note: Reactive state 'keyword' stores mutable runtime data used by this component.
  const keyword = ref('')
  // Logic Note: Reactive state 'dialogVisible' stores mutable runtime data used by this component.
  const dialogVisible = ref(false)
  // Logic Note: Reactive state 'uploadInputRef' stores mutable runtime data used by this component.
  const uploadInputRef = ref<HTMLInputElement | null>(null)
  // Logic Note: Reactive state 'recordsBySection' stores mutable runtime data used by this component.
  const recordsBySection = ref<Record<string, OperationRecord[]>>({})
  // Logic Note: Reactive state 'dialogForm' stores mutable runtime data used by this component.
  const dialogForm = reactive({
    action: '',
    capability: '',
    operator: '系统管理员',
    remark: ''
  })

  // Logic Note: Computed value 'sectionKey' derives UI state from reactive sources and updates automatically.
  const sectionKey = computed(() => String(route.meta.sectionKey || ''))
  // Logic Note: Computed value 'context' derives UI state from reactive sources and updates automatically.
  const context = computed(() => getSectionContext(sectionKey.value))

  // Logic Note: Computed value 'filteredCapabilities' derives UI state from reactive sources and updates automatically.
  const filteredCapabilities = computed(() => {
    if (!context.value) {
      return []
    }
    if (!keyword.value.trim()) {
      return context.value.section.capabilities
    }

    const normalizedKeyword = keyword.value.trim().toLowerCase()
    return context.value.section.capabilities.filter((item) =>
      item.toLowerCase().includes(normalizedKeyword)
    )
  })

  // Logic Note: Computed value 'suggestedActions' derives UI state from reactive sources and updates automatically.
  const suggestedActions = computed<SuggestedAction[]>(() =>
    getSuggestedActions(context.value?.section.capabilities || [])
  )

  // Logic Note: Computed value 'capabilityRows' derives UI state from reactive sources and updates automatically.
  const capabilityRows = computed(() =>
    filteredCapabilities.value.map((name) => ({
      name,
      actions: getSuggestedActions([name])
    }))
  )

  // Logic Note: Computed value 'currentRecords' derives UI state from reactive sources and updates automatically.
  const currentRecords = computed(() => {
    return recordsBySection.value[sectionKey.value] || []
  })

  // Logic Note: Watcher keeps dependent state synchronized when observed sources change.
  watch(
    () => sectionKey.value,
    () => {
      keyword.value = ''
    }
  )

  // Logic Note: Handler 'openActionDialog' encapsulates a single interaction or data-processing flow.
  const openActionDialog = (action: string, capability = '') => {
    dialogForm.action = action
    dialogForm.capability = capability
    dialogForm.remark = ''
    dialogVisible.value = true
  }

  // Logic Note: Handler 'submitAction' encapsulates a single interaction or data-processing flow.
  const submitAction = () => {
    if (!dialogForm.action.trim()) {
      ElMessage.warning('请填写动作名称')
      return
    }

    const record: OperationRecord = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
      action: dialogForm.action.trim(),
      capability: dialogForm.capability.trim() || context.value?.section.title || '未指定',
      operator: dialogForm.operator.trim() || '系统管理员',
      executeTime: new Date().toLocaleString('zh-CN', { hour12: false }),
      remark: dialogForm.remark.trim() || '已执行'
    }

    recordsBySection.value = {
      ...recordsBySection.value,
      [sectionKey.value]: [record, ...currentRecords.value]
    }

    dialogVisible.value = false
    ElMessage.success('动作已记录')
  }

  // Logic Note: Handler 'removeRecord' encapsulates a single interaction or data-processing flow.
  const removeRecord = (id: string) => {
    recordsBySection.value = {
      ...recordsBySection.value,
      [sectionKey.value]: currentRecords.value.filter((record) => record.id !== id)
    }
  }

  // Logic Note: Handler 'clearRecords' encapsulates a single interaction or data-processing flow.
  const clearRecords = async () => {
    if (!currentRecords.value.length) {
      return
    }

    try {
      await ElMessageBox.confirm('确认清空当前子功能的全部执行记录吗？', '提示', {
        type: 'warning'
      })

      recordsBySection.value = {
        ...recordsBySection.value,
        [sectionKey.value]: []
      }
      ElMessage.success('已清空')
    } catch {
      // 用户取消确认，不做处理
    }
  }

  // Logic Note: Handler 'exportRecords' encapsulates a single interaction or data-processing flow.
  const exportRecords = () => {
    const payload = {
      sectionKey: sectionKey.value,
      sectionTitle: context.value?.section.title || '',
      exportAt: new Date().toISOString(),
      records: currentRecords.value
    }

    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${sectionKey.value || 'metadata'}-records.json`
    a.click()
    URL.revokeObjectURL(url)
    ElMessage.success('导出成功')
  }

  // Logic Note: Handler 'triggerImport' encapsulates a single interaction or data-processing flow.
  const triggerImport = () => {
    uploadInputRef.value?.click()
  }

  // Logic Note: Handler 'handleImportFile' encapsulates a single interaction or data-processing flow.
  const handleImportFile = async (event: Event) => {
    const input = event.target as HTMLInputElement
    const file = input.files?.[0]
    if (!file) {
      return
    }

    try {
      const text = await file.text()
      const parsed = JSON.parse(text) as { records?: OperationRecord[] }
      const records = Array.isArray(parsed.records) ? parsed.records : []

      if (!records.length) {
        ElMessage.warning('未读取到有效记录')
        return
      }

      const normalized = records.map((record) => ({
        ...record,
        id: record.id || `${Date.now()}-${Math.random().toString(16).slice(2, 8)}`
      }))

      recordsBySection.value = {
        ...recordsBySection.value,
        [sectionKey.value]: [...normalized, ...currentRecords.value]
      }
      ElMessage.success(`已导入 ${normalized.length} 条记录`)
    } catch (error) {
      console.error('[MetadataSubmodule] 导入失败', error)
      ElMessage.error('导入失败，请检查文件内容')
    } finally {
      input.value = ''
    }
  }
</script>

<style lang="scss" scoped>
  /* Auto Comment: Component Style Notes: Styles in this block define visual layout and interaction feedback for '元数据管理平台/src/views/metadata/submodule/index.vue'. */
  /* Auto Comment: Consistency Rule: Preserve spacing rhythm, typography hierarchy, and state visibility across breakpoints. */
  .metadata-submodule {
    .info-card,
    .block-card {
      margin-bottom: 16px;
    }

    .header-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      width: 100%;
    }

    .module-title {
      color: var(--art-gray-600);
      font-size: 13px;
    }

    .section-title {
      margin-top: 4px;
      color: var(--art-gray-800);
      font-size: 20px;
      font-weight: 600;
    }

    .desc {
      color: var(--art-gray-600);
      line-height: 1.6;
    }

    .search-input {
      margin-bottom: 12px;
    }

    .count-text {
      color: var(--art-gray-500);
      font-size: 13px;
    }

    .hidden-input {
      display: none;
    }
  }
</style>
