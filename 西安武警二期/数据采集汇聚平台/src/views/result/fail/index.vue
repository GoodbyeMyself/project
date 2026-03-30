<template>
  <!-- Auto Comment: Component Summary: This component renders UI for '数据采集汇聚平台/src/views/result/fail/index.vue'. -->
  <!-- Auto Comment: Component Responsibility: It provides the view structure, interaction entry points, and display containers for this feature. -->
  <div class="flex flex-col gap-4 pb-5">
    <ElRow :gutter="20">
      <ElCol :xs="24" :xl="15">
        <ElCard>
          <template #header>
            <div class="flex-cb gap-3">
              <div>
                <h3 class="m-0 text-base font-medium">数据处理定义</h3>
                <p class="m-0 mt-1 text-sm text-g-700">
                  覆盖新增/修改/删除/查询数据处理任务、目录管理、任务上下线、移动与复制任务。
                </p>
              </div>
              <ElButton type="primary" @click="addProcessTask">新增数据处理任务</ElButton>
            </div>
          </template>

          <ArtTable :data="processTasks" :columns="processColumns" :show-table-header="false">
            <template #status="{ row }">
              <ElTag :type="row.online ? 'success' : 'info'" effect="light">{{ row.online ? '已上线' : '已下线' }}</ElTag>
            </template>
            <template #operation="{ row }">
              <ElSpace wrap>
                <ElButton link type="primary" @click="editProcessTask(row)">修改数据处理任务</ElButton>
                <ElButton link type="primary" @click="toggleProcessTask(row)">{{ row.online ? '数据处理任务下线' : '数据处理任务上线' }}</ElButton>
                <ElButton link type="primary" @click="copyProcessTask(row)">复制数据处理任务</ElButton>
                <ElButton link type="primary" @click="moveProcessTask(row)">移动数据处理任务</ElButton>
                <ElPopconfirm title="确认删除该任务吗？" @confirm="deleteProcessTask(row.id)">
                  <template #reference><ElButton link type="danger">删除数据处理任务</ElButton></template>
                </ElPopconfirm>
              </ElSpace>
            </template>
          </ArtTable>
        </ElCard>
      </ElCol>

      <ElCol :xs="24" :xl="9">
        <ElCard>
          <template #header><span class="font-medium">数据标准化处理</span></template>
          <ElForm label-width="96px">
            <ElFormItem label="标准目录"><ElInput v-model="standardForm.catalog" placeholder="新增/修改/删除/查询标准目录" /></ElFormItem>
            <ElFormItem label="代码集"><ElInput v-model="standardForm.codeSet" placeholder="新增/修改/删除/查询代码集" /></ElFormItem>
            <ElFormItem label="标准代码"><ElInput v-model="standardForm.standardCode" placeholder="新增/修改/删除/查询标准代码" /></ElFormItem>
            <ElFormItem label="标准配置"><ElInput v-model="standardForm.config" type="textarea" :rows="3" placeholder="数据标准化配置" /></ElFormItem>
          </ElForm>
          <ElButton type="primary" @click="saveStandardConfig">保存标准化配置</ElButton>
        </ElCard>
      </ElCol>
    </ElRow>

    <ElRow :gutter="20">
      <ElCol :xs="24" :lg="12">
        <ElCard>
          <template #header><span class="font-medium">异常数据处理</span></template>
          <ElCheckboxGroup v-model="abnormalConfigs" class="flex flex-col gap-2">
            <ElCheckbox label="清洗配置" value="清洗配置" />
            <ElCheckbox label="过滤配置" value="过滤配置" />
            <ElCheckbox label="唯一标识配置" value="唯一标识配置" />
            <ElCheckbox label="SQL 转换配置" value="SQL 转换配置" />
            <ElCheckbox label="数据校验配置" value="数据校验配置" />
          </ElCheckboxGroup>
        </ElCard>
      </ElCol>

      <ElCol :xs="24" :lg="12">
        <ElCard>
          <template #header><span class="font-medium">数据处理调度管理</span></template>
          <ElForm label-width="96px">
            <ElFormItem label="调度配置"><ElInput v-model="dispatchForm.cron" placeholder="数据处理调度配置" /></ElFormItem>
            <ElFormItem label="调度预览"><ElInput v-model="dispatchForm.preview" readonly /></ElFormItem>
          </ElForm>
          <ElButton @click="previewDispatch">预览数据处理调度</ElButton>
        </ElCard>
      </ElCol>
    </ElRow>

    <ElCard>
      <template #header>
        <div class="flex-cb gap-3">
          <span class="font-medium">数据处理监控日志</span>
          <ElTag type="success">查看数据处理概览 / 数据处理量分析</ElTag>
        </div>
      </template>

      <ElRow :gutter="20">
        <ElCol :xs="24" :md="8" v-for="item in overviewCards" :key="item.label">
          <div class="summary-card">
            <div class="text-lg font-semibold">{{ item.value }}</div>
            <div class="mt-1 text-sm text-g-700">{{ item.label }}</div>
          </div>
        </ElCol>
      </ElRow>

      <ElTable :data="analysisRows" border class="mt-4">
        <ElTableColumn prop="date" label="日期" width="140" />
        <ElTableColumn prop="processed" label="处理量" width="120" />
        <ElTableColumn prop="failed" label="异常量" width="120" />
        <ElTableColumn prop="successRate" label="成功率" width="120" />
      </ElTable>
    </ElCard>
  </div>
</template>

<script setup lang="ts">
  // Auto Comment: Component Script Notes: This script block manages state, events, and data flow for '数据采集汇聚平台/src/views/result/fail/index.vue'.
  // Auto Comment: Maintenance Hint: Keep business rules explicit and avoid implicit side effects between handlers.
  import type { ColumnOption } from '@/types'

  defineOptions({ name: 'DataProcessingAnalysisCenter' })

  interface ProcessTask {
    id: number
    name: string
    catalog: string
    owner: string
    online: boolean
  }

  // Logic Note: Reactive state 'processTasks' stores mutable runtime data used by this component.
  const processTasks = ref<ProcessTask[]>([
    { id: 1, name: '原始轨迹清洗任务', catalog: '清洗目录', owner: '数据处理组', online: true },
    { id: 2, name: '目标画像标准化任务', catalog: '标准化目录', owner: '情报分析组', online: false }
  ])

  const processColumns: ColumnOption[] = [
    { prop: 'name', label: '处理任务', minWidth: 180 },
    { prop: 'catalog', label: '任务目录', minWidth: 160 },
    { prop: 'owner', label: '责任单位', minWidth: 140 },
    { prop: 'status', label: '任务状态', width: 110, useSlot: true },
    { prop: 'operation', label: '操作', minWidth: 420, useSlot: true, fixed: 'right' }
  ]

  // Logic Note: Reactive state 'standardForm' stores mutable runtime data used by this component.
  const standardForm = reactive({
    catalog: '基础标准目录',
    codeSet: '行政区划代码集',
    standardCode: 'XZQH_6101',
    config: '按照行政区划和设备类型进行标准映射。'
  })

  // Logic Note: Reactive state 'abnormalConfigs' stores mutable runtime data used by this component.
  const abnormalConfigs = ref(['清洗配置', '过滤配置', 'SQL 转换配置'])
  // Logic Note: Reactive state 'dispatchForm' stores mutable runtime data used by this component.
  const dispatchForm = reactive({ cron: '0 */15 * * * ?', preview: '每 15 分钟执行一次处理流程' })

  // Logic Note: Computed value 'overviewCards' derives UI state from reactive sources and updates automatically.
  const overviewCards = computed(() => [
    { label: '查看数据处理概览', value: '18 个任务' },
    { label: '今日处理数据量', value: '12.6 万条' },
    { label: '异常待处理', value: '26 条' }
  ])

  // Logic Note: Reactive state 'analysisRows' stores mutable runtime data used by this component.
  const analysisRows = ref([
    { date: '2026-03-28', processed: '3.2 万', failed: '120', successRate: '99.6%' },
    { date: '2026-03-29', processed: '4.1 万', failed: '98', successRate: '99.8%' },
    { date: '2026-03-30', processed: '5.3 万', failed: '143', successRate: '99.7%' }
  ])

  // Logic Note: Handler 'addProcessTask' encapsulates a single interaction or data-processing flow.
  const addProcessTask = () => {
    processTasks.value.unshift({ id: Date.now(), name: '新建数据处理任务', catalog: '新增目录', owner: '数据处理组', online: false })
    ElMessage.success('已新增数据处理任务')
  }

  // Logic Note: Handler 'editProcessTask' encapsulates a single interaction or data-processing flow.
  const editProcessTask = (row: ProcessTask) => {
    row.name = `${row.name}-已修改`
    ElMessage.success('已修改数据处理任务')
  }

  // Logic Note: Handler 'deleteProcessTask' encapsulates a single interaction or data-processing flow.
  const deleteProcessTask = (id: number) => {
    processTasks.value = processTasks.value.filter((item) => item.id !== id)
    ElMessage.success('已删除数据处理任务')
  }

  // Logic Note: Handler 'toggleProcessTask' encapsulates a single interaction or data-processing flow.
  const toggleProcessTask = (row: ProcessTask) => {
    row.online = !row.online
    ElMessage.success(row.online ? '数据处理任务上线成功' : '数据处理任务下线成功')
  }

  // Logic Note: Handler 'moveProcessTask' encapsulates a single interaction or data-processing flow.
  const moveProcessTask = (row: ProcessTask) => {
    row.catalog = row.catalog === '清洗目录' ? '标准化目录' : '清洗目录'
    ElMessage.success('已移动数据处理任务')
  }

  // Logic Note: Handler 'copyProcessTask' encapsulates a single interaction or data-processing flow.
  const copyProcessTask = (row: ProcessTask) => {
    processTasks.value.unshift({ ...row, id: Date.now(), name: `${row.name}-副本`, online: false })
    ElMessage.success('已复制数据处理任务')
  }

  // Logic Note: Handler 'saveStandardConfig' encapsulates a single interaction or data-processing flow.
  const saveStandardConfig = () => ElMessage.success('已保存数据标准化配置')
  // Logic Note: Handler 'previewDispatch' encapsulates a single interaction or data-processing flow.
  const previewDispatch = () => ElMessage.info(`调度预览：${dispatchForm.preview}`)
</script>

<style scoped>
  /* Auto Comment: Component Style Notes: Styles in this block define visual layout and interaction feedback for '数据采集汇聚平台/src/views/result/fail/index.vue'. */
  /* Auto Comment: Consistency Rule: Preserve spacing rhythm, typography hierarchy, and state visibility across breakpoints. */
  .summary-card {
    padding: 16px;
    border: 1px solid var(--el-border-color-light);
    border-radius: 12px;
    background: var(--el-fill-color-blank);
  }
</style>
