<template>
  <div class="flex flex-col gap-4 pb-5">
    <ElCard>
      <template #header>
        <div class="flex-cb gap-3">
          <div>
            <h3 class="m-0 text-base font-medium">通知记录与追踪</h3>
            <p class="m-0 mt-1 text-sm text-g-700">
              提供下发任务的新增、修改、删除、查询能力，并支持查看执行进度与反馈结果。
            </p>
          </div>
          <ElSpace wrap>
            <ElInput v-model="taskKeyword" placeholder="查询下发任务" clearable class="max-w-64" />
            <ElButton type="primary" @click="openTaskDialog('add')">新增下发任务</ElButton>
          </ElSpace>
        </div>
      </template>

      <ArtTable :data="filteredTasks" :columns="taskColumns" :show-table-header="false">
        <template #priority="{ row }">
          <ElTag :type="row.priorityType" effect="light">{{ row.priority }}</ElTag>
        </template>

        <template #status="{ row }">
          <ElTag :type="row.statusType" effect="light">{{ row.status }}</ElTag>
        </template>

        <template #progress="{ row }">
          <div class="flex items-center gap-3 min-w-40">
            <ElProgress :percentage="row.progress" :stroke-width="10" />
          </div>
        </template>

        <template #operation="{ row }">
          <ElSpace wrap>
            <ElButton link type="primary" @click="openTaskDialog('edit', row)">修改下发任务</ElButton>
            <ElPopconfirm title="确认删除该下发任务吗？" @confirm="deleteTask(row.id)">
              <template #reference>
                <ElButton link type="danger">删除下发任务</ElButton>
              </template>
            </ElPopconfirm>
          </ElSpace>
        </template>
      </ArtTable>
    </ElCard>

    <ElRow :gutter="20">
      <ElCol :xs="24" :lg="14">
        <ElCard>
          <template #header>
            <div class="flex-cb gap-3">
              <span class="font-medium">记录追踪看板</span>
              <ElTag type="success">实时同步</ElTag>
            </div>
          </template>

          <ElTimeline>
            <ElTimelineItem
              v-for="item in trackingTimeline"
              :key="`${item.time}-${item.content}`"
              :timestamp="item.time"
              :type="item.type"
            >
              <div class="font-medium">{{ item.content }}</div>
              <div class="mt-1 text-sm text-g-700">{{ item.description }}</div>
            </ElTimelineItem>
          </ElTimeline>
        </ElCard>
      </ElCol>

      <ElCol :xs="24" :lg="10">
        <ElCard>
          <template #header>
            <span class="font-medium">任务统计</span>
          </template>
          <div class="flex flex-col gap-3">
            <div v-for="item in taskStats" :key="item.label" class="stat-item">
              <span>{{ item.label }}</span>
              <strong>{{ item.value }}</strong>
            </div>
          </div>
        </ElCard>
      </ElCol>
    </ElRow>

    <ElDialog v-model="taskDialogVisible" :title="taskDialogTitle" width="560px">
      <ElForm :model="taskForm" label-width="90px">
        <ElFormItem label="任务名称">
          <ElInput v-model="taskForm.name" placeholder="请输入任务名称" />
        </ElFormItem>
        <ElFormItem label="通知对象">
          <ElInput v-model="taskForm.target" placeholder="请输入通知对象" />
        </ElFormItem>
        <ElFormItem label="优先级">
          <ElSelect v-model="taskForm.priority" placeholder="请选择优先级">
            <ElOption label="高" value="高" />
            <ElOption label="中" value="中" />
            <ElOption label="低" value="低" />
          </ElSelect>
        </ElFormItem>
        <ElFormItem label="计划时间">
          <ElInput v-model="taskForm.scheduleTime" placeholder="请输入计划时间" />
        </ElFormItem>
      </ElForm>
      <template #footer>
        <ElButton @click="taskDialogVisible = false">取消</ElButton>
        <ElButton type="primary" @click="submitTask">保存</ElButton>
      </template>
    </ElDialog>
  </div>
</template>

<script setup lang="ts">
  import type { ColumnOption } from '@/types'

  defineOptions({ name: 'NotificationRecordTracking' })

  interface DispatchTask {
    id: number
    name: string
    target: string
    priority: string
    priorityType: 'success' | 'warning' | 'danger' | 'info'
    scheduleTime: string
    status: string
    statusType: 'success' | 'warning' | 'info'
    progress: number
  }

  const taskKeyword = ref('')
  const taskDialogVisible = ref(false)
  const taskMode = ref<'add' | 'edit'>('add')
  const editingTaskId = ref<number | null>(null)

  const tasks = ref<DispatchTask[]>([
    {
      id: 1,
      name: '重点资源变更通知',
      target: '情报采集组',
      priority: '高',
      priorityType: 'danger',
      scheduleTime: '2026-03-30 16:00',
      status: '执行中',
      statusType: 'warning',
      progress: 72
    },
    {
      id: 2,
      name: '目录维护结果下发',
      target: '边防数据组',
      priority: '中',
      priorityType: 'warning',
      scheduleTime: '2026-03-30 18:00',
      status: '待执行',
      statusType: 'info',
      progress: 28
    },
    {
      id: 3,
      name: '告警闭环反馈通知',
      target: '指挥保障组',
      priority: '低',
      priorityType: 'success',
      scheduleTime: '2026-03-29 20:00',
      status: '已完成',
      statusType: 'success',
      progress: 100
    }
  ])

  const taskForm = reactive({
    name: '',
    target: '',
    priority: '中',
    scheduleTime: ''
  })

  const taskColumns: ColumnOption[] = [
    { prop: 'name', label: '任务名称', minWidth: 180 },
    { prop: 'target', label: '通知对象', minWidth: 140 },
    { prop: 'priority', label: '优先级', width: 100, useSlot: true },
    { prop: 'scheduleTime', label: '计划时间', width: 180 },
    { prop: 'status', label: '执行状态', width: 100, useSlot: true },
    { prop: 'progress', label: '追踪进度', minWidth: 180, useSlot: true },
    { prop: 'operation', label: '操作', minWidth: 180, useSlot: true, fixed: 'right' }
  ]

  const filteredTasks = computed(() => {
    const keyword = taskKeyword.value.trim()
    if (!keyword) {
      return tasks.value
    }

    return tasks.value.filter(
      (item) => item.name.includes(keyword) || item.target.includes(keyword) || item.status.includes(keyword)
    )
  })

  const trackingTimeline = computed(() => [
    {
      time: '09:30',
      content: '任务创建完成',
      description: '已生成重点资源变更通知并进入待审批状态。',
      type: 'primary'
    },
    {
      time: '10:15',
      content: '审批通过',
      description: '值班领导确认通知内容，允许下发。',
      type: 'success'
    },
    {
      time: '11:00',
      content: '任务进入执行',
      description: '通知网关开始向指定对象下发消息。',
      type: 'warning'
    }
  ])

  const taskStats = computed(() => [
    { label: '任务总量', value: `${tasks.value.length} 个` },
    { label: '待执行', value: `${tasks.value.filter((item) => item.status === '待执行').length} 个` },
    { label: '执行中', value: `${tasks.value.filter((item) => item.status === '执行中').length} 个` },
    { label: '已完成', value: `${tasks.value.filter((item) => item.status === '已完成').length} 个` }
  ])

  const taskDialogTitle = computed(() => (taskMode.value === 'add' ? '新增下发任务' : '修改下发任务'))

  const resetTaskForm = () => {
    taskForm.name = ''
    taskForm.target = ''
    taskForm.priority = '中'
    taskForm.scheduleTime = ''
  }

  const getPriorityType = (priority: string): DispatchTask['priorityType'] => {
    if (priority === '高') return 'danger'
    if (priority === '中') return 'warning'
    return 'success'
  }

  const openTaskDialog = (mode: 'add' | 'edit', row?: DispatchTask) => {
    taskMode.value = mode
    taskDialogVisible.value = true

    if (row) {
      editingTaskId.value = row.id
      taskForm.name = row.name
      taskForm.target = row.target
      taskForm.priority = row.priority
      taskForm.scheduleTime = row.scheduleTime
      return
    }

    editingTaskId.value = null
    resetTaskForm()
  }

  const submitTask = () => {
    if (taskMode.value === 'add') {
      tasks.value.unshift({
        id: Date.now(),
        name: taskForm.name,
        target: taskForm.target,
        priority: taskForm.priority,
        priorityType: getPriorityType(taskForm.priority),
        scheduleTime: taskForm.scheduleTime,
        status: '待执行',
        statusType: 'info',
        progress: 0
      })
      ElMessage.success('已新增下发任务')
    } else {
      const target = tasks.value.find((item) => item.id === editingTaskId.value)
      if (target) {
        target.name = taskForm.name
        target.target = taskForm.target
        target.priority = taskForm.priority
        target.priorityType = getPriorityType(taskForm.priority)
        target.scheduleTime = taskForm.scheduleTime
      }
      ElMessage.success('已修改下发任务')
    }

    taskDialogVisible.value = false
  }

  const deleteTask = (id: number) => {
    tasks.value = tasks.value.filter((item) => item.id !== id)
    ElMessage.success('已删除下发任务')
  }
</script>

<style scoped>
  .stat-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 12px 14px;
    border: 1px solid var(--el-border-color-light);
    border-radius: 10px;
    background: var(--el-fill-color-blank);
  }
</style>
