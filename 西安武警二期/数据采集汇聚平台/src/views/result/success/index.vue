<template>
  <!-- Auto Comment: Component Summary: This component renders UI for '数据采集汇聚平台/src/views/result/success/index.vue'. -->
  <!-- Auto Comment: Component Responsibility: It provides the view structure, interaction entry points, and display containers for this feature. -->
  <div class="flex flex-col gap-4 pb-5">
    <ElRow :gutter="20">
      <ElCol :xs="24" :xl="15">
        <ElCard>
          <template #header>
            <div class="flex-cb gap-3">
              <div>
                <h3 class="m-0 text-base font-medium">数据采集任务管理</h3>
                <p class="m-0 mt-1 text-sm text-g-700">
                  覆盖新增/修改/删除/查询采集任务、任务上下线、目录管理、复制任务、移动任务。
                </p>
              </div>
              <ElButton type="primary" @click="openTaskDialog('add')">新增采集任务</ElButton>
            </div>
          </template>

          <ArtTable :data="tasks" :columns="taskColumns" :show-table-header="false">
            <template #status="{ row }">
              <ElTag :type="row.online ? 'success' : 'info'" effect="light">{{ row.online ? '已上线' : '已下线' }}</ElTag>
            </template>
            <template #operation="{ row }">
              <ElSpace wrap>
                <ElButton link type="primary" @click="toggleTask(row)">{{ row.online ? '任务下线' : '任务上线' }}</ElButton>
                <ElButton link type="primary" @click="copyTask(row)">复制任务</ElButton>
                <ElButton link type="primary" @click="moveTask(row)">移动任务</ElButton>
                <ElButton link type="primary" @click="openTaskDialog('edit', row)">修改采集任务</ElButton>
                <ElPopconfirm title="确认删除该采集任务吗？" @confirm="deleteTask(row.id)">
                  <template #reference><ElButton link type="danger">删除采集任务</ElButton></template>
                </ElPopconfirm>
              </ElSpace>
            </template>
          </ArtTable>
        </ElCard>
      </ElCol>

      <ElCol :xs="24" :xl="9">
        <ElCard>
          <template #header><span class="font-medium">采集协议适配</span></template>
          <ElCheckboxGroup v-model="enabledProtocols" class="flex flex-col gap-2">
            <ElCheckbox v-for="item in protocolOptions" :key="item" :label="item" :value="item" />
          </ElCheckboxGroup>
        </ElCard>

        <ElCard class="mt-4">
          <template #header><span class="font-medium">数据传输定义与采集调度</span></template>
          <ElForm label-width="96px">
            <ElFormItem label="输入传输"><ElInput v-model="transferConfig.input" placeholder="配置输入传输" /></ElFormItem>
            <ElFormItem label="输出传输"><ElInput v-model="transferConfig.output" placeholder="配置输出传输" /></ElFormItem>
            <ElFormItem label="调度表达式"><ElInput v-model="scheduleConfig.cron" placeholder="数据采集调度配置" /></ElFormItem>
            <ElFormItem label="调度预览"><ElInput v-model="scheduleConfig.preview" readonly /></ElFormItem>
          </ElForm>
        </ElCard>
      </ElCol>
    </ElRow>

    <ElCard>
      <template #header>
        <div class="flex-cb gap-3">
          <span class="font-medium">数据采集监控</span>
          <ElTag type="success">支持查看全部设备 / 单个设备</ElTag>
        </div>
      </template>
      <ElTable :data="monitorData" border>
        <ElTableColumn prop="device" label="设备" min-width="180" />
        <ElTableColumn prop="taskName" label="采集任务" min-width="180" />
        <ElTableColumn prop="throughput" label="采集速率" width="120" />
        <ElTableColumn prop="status" label="监控状态" width="120" />
        <ElTableColumn label="查看" width="180">
          <template #default="{ row }">
            <ElSpace>
              <ElButton link type="primary" @click="viewAllMonitor">查看全部设备数据采集监控</ElButton>
              <ElButton link type="primary" @click="viewSingleMonitor(row.device)">查看单个设备数据采集监控</ElButton>
            </ElSpace>
          </template>
        </ElTableColumn>
      </ElTable>
    </ElCard>

    <ElCard>
      <template #header><span class="font-medium">任务目录管理</span></template>
      <ElTree :data="taskCatalogTree" node-key="id" default-expand-all>
        <template #default="{ data }">
          <div class="flex-cb w-full">
            <span>{{ data.label }}</span>
            <ElSpace>
              <ElButton link type="primary" @click="appendCatalog(data.label)">新增任务目录</ElButton>
              <ElButton link type="primary" @click="renameCatalog(data.label)">修改任务目录</ElButton>
              <ElButton link type="danger" @click="removeCatalog(data.label)">删除任务目录</ElButton>
            </ElSpace>
          </div>
        </template>
      </ElTree>
    </ElCard>

    <ElDialog v-model="taskDialogVisible" :title="taskDialogTitle" width="520px">
      <ElForm :model="taskForm" label-width="90px">
        <ElFormItem label="任务名称"><ElInput v-model="taskForm.name" /></ElFormItem>
        <ElFormItem label="采集来源"><ElInput v-model="taskForm.source" /></ElFormItem>
        <ElFormItem label="所属目录"><ElInput v-model="taskForm.catalog" /></ElFormItem>
      </ElForm>
      <template #footer>
        <ElButton @click="taskDialogVisible = false">取消</ElButton>
        <ElButton type="primary" @click="submitTask">保存</ElButton>
      </template>
    </ElDialog>
  </div>
</template>

<script setup lang="ts">
  // Auto Comment: Component Script Notes: This script block manages state, events, and data flow for '数据采集汇聚平台/src/views/result/success/index.vue'.
  // Auto Comment: Maintenance Hint: Keep business rules explicit and avoid implicit side effects between handlers.
  import type { ColumnOption } from '@/types'

  defineOptions({ name: 'DataCollectionStorageCenter' })

  interface CollectTask {
    id: number
    name: string
    source: string
    catalog: string
    online: boolean
  }

  // Logic Note: Reactive state 'taskDialogVisible' stores mutable runtime data used by this component.
  const taskDialogVisible = ref(false)
  // Logic Note: Reactive state 'taskMode' stores mutable runtime data used by this component.
  const taskMode = ref<'add' | 'edit'>('add')
  // Logic Note: Reactive state 'editingTaskId' stores mutable runtime data used by this component.
  const editingTaskId = ref<number | null>(null)

  // Logic Note: Reactive state 'tasks' stores mutable runtime data used by this component.
  const tasks = ref<CollectTask[]>([
    { id: 1, name: '边境视频流采集', source: '卡口视频', catalog: '视频采集目录', online: true },
    { id: 2, name: '车辆轨迹采集', source: 'GPS设备', catalog: '轨迹采集目录', online: false }
  ])

  const protocolOptions = ['Hbase 输入', '关系型数据库表输入', 'Kafka0.9 输入', '华为 Elasticsearch 输入', 'SQL 输入', 'Excel 读取']
  // Logic Note: Reactive state 'enabledProtocols' stores mutable runtime data used by this component.
  const enabledProtocols = ref(['Hbase 输入', 'SQL 输入', 'Excel 读取'])
  // Logic Note: Reactive state 'transferConfig' stores mutable runtime data used by this component.
  const transferConfig = reactive({ input: 'Kafka Topic /topic/device-in', output: 'ODS 表 ods_collect_result' })
  // Logic Note: Reactive state 'scheduleConfig' stores mutable runtime data used by this component.
  const scheduleConfig = reactive({ cron: '0 */10 * * * ?', preview: '每 10 分钟执行一次' })
  // Logic Note: Reactive state 'taskForm' stores mutable runtime data used by this component.
  const taskForm = reactive({ name: '', source: '', catalog: '' })

  // Logic Note: Reactive state 'taskCatalogTree' stores mutable runtime data used by this component.
  const taskCatalogTree = ref([
    { id: 1, label: '视频采集目录', children: [{ id: 11, label: '前端卡口' }] },
    { id: 2, label: '轨迹采集目录', children: [{ id: 21, label: '车载终端' }] }
  ])

  // Logic Note: Reactive state 'monitorData' stores mutable runtime data used by this component.
  const monitorData = ref([
    { device: '边境雷达一号', taskName: '边境视频流采集', throughput: '128 条/分', status: '正常' },
    { device: '巡逻车载终端', taskName: '车辆轨迹采集', throughput: '64 条/分', status: '波动' }
  ])

  const taskColumns: ColumnOption[] = [
    { prop: 'name', label: '采集任务', minWidth: 180 },
    { prop: 'source', label: '采集来源', minWidth: 160 },
    { prop: 'catalog', label: '任务目录', minWidth: 160 },
    { prop: 'status', label: '上下线状态', width: 110, useSlot: true },
    { prop: 'operation', label: '操作', minWidth: 360, useSlot: true, fixed: 'right' }
  ]

  // Logic Note: Computed value 'taskDialogTitle' derives UI state from reactive sources and updates automatically.
  const taskDialogTitle = computed(() => (taskMode.value === 'add' ? '新增采集任务' : '修改采集任务'))

  // Logic Note: Handler 'openTaskDialog' encapsulates a single interaction or data-processing flow.
  const openTaskDialog = (mode: 'add' | 'edit', row?: CollectTask) => {
    taskMode.value = mode
    taskDialogVisible.value = true
    if (!row) {
      editingTaskId.value = null
      taskForm.name = ''
      taskForm.source = ''
      taskForm.catalog = ''
      return
    }
    editingTaskId.value = row.id
    taskForm.name = row.name
    taskForm.source = row.source
    taskForm.catalog = row.catalog
  }

  // Logic Note: Handler 'submitTask' encapsulates a single interaction or data-processing flow.
  const submitTask = () => {
    if (taskMode.value === 'add') {
      tasks.value.unshift({ id: Date.now(), name: taskForm.name, source: taskForm.source, catalog: taskForm.catalog, online: false })
      ElMessage.success('已新增采集任务')
    } else {
      const target = tasks.value.find((item) => item.id === editingTaskId.value)
      if (target) {
        target.name = taskForm.name
        target.source = taskForm.source
        target.catalog = taskForm.catalog
      }
      ElMessage.success('已修改采集任务')
    }
    taskDialogVisible.value = false
  }

  // Logic Note: Handler 'deleteTask' encapsulates a single interaction or data-processing flow.
  const deleteTask = (id: number) => {
    tasks.value = tasks.value.filter((item) => item.id !== id)
    ElMessage.success('已删除采集任务')
  }

  // Logic Note: Handler 'toggleTask' encapsulates a single interaction or data-processing flow.
  const toggleTask = (row: CollectTask) => {
    row.online = !row.online
    ElMessage.success(row.online ? '任务已上线' : '任务已下线')
  }

  // Logic Note: Handler 'copyTask' encapsulates a single interaction or data-processing flow.
  const copyTask = (row: CollectTask) => {
    tasks.value.unshift({ ...row, id: Date.now(), name: `${row.name}-副本`, online: false })
    ElMessage.success('已复制任务')
  }

  // Logic Note: Handler 'moveTask' encapsulates a single interaction or data-processing flow.
  const moveTask = (row: CollectTask) => {
    row.catalog = row.catalog === '视频采集目录' ? '轨迹采集目录' : '视频采集目录'
    ElMessage.success('已移动任务')
  }

  // Logic Note: Handler 'appendCatalog' encapsulates a single interaction or data-processing flow.
  const appendCatalog = (label: string) => ElMessage.success(`已新增任务目录，父目录：${label}`)
  // Logic Note: Handler 'renameCatalog' encapsulates a single interaction or data-processing flow.
  const renameCatalog = (label: string) => ElMessage.success(`已修改任务目录：${label}`)
  // Logic Note: Handler 'removeCatalog' encapsulates a single interaction or data-processing flow.
  const removeCatalog = (label: string) => ElMessage.success(`已删除任务目录：${label}`)
  // Logic Note: Handler 'viewAllMonitor' encapsulates a single interaction or data-processing flow.
  const viewAllMonitor = () => ElMessage.info('查看全部设备数据采集监控')
  // Logic Note: Handler 'viewSingleMonitor' encapsulates a single interaction or data-processing flow.
  const viewSingleMonitor = (device: string) => ElMessage.info(`查看单个设备数据采集监控：${device}`)
</script>
