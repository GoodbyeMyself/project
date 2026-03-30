<template>
  <!-- Auto Comment: Component Summary: This component renders UI for '数据资源支撑工具/src/views/resource-model/sync/index.vue'. -->
  <!-- Auto Comment: Component Responsibility: It provides the view structure, interaction entry points, and display containers for this feature. -->
  <div class="flex flex-col gap-4 pb-5">
    <ElCard shadow="never">
      <template #header>
        <div class="flex-cb">
          <span class="text-base font-semibold">数据资源体系模型同步</span>
          <ElTag type="primary" effect="light">自动化同步机制</ElTag>
        </div>
      </template>

      <ElForm :model="syncForm" inline>
        <ElFormItem label="同步策略">
          <ElSelect v-model="syncForm.strategy" style="width: 180px">
            <ElOption label="全量同步" value="全量同步" />
            <ElOption label="增量同步" value="增量同步" />
            <ElOption label="定时同步" value="定时同步" />
          </ElSelect>
        </ElFormItem>
        <ElFormItem label="数据质量阈值">
          <ElInputNumber v-model="syncForm.qualityThreshold" :min="80" :max="100" />
        </ElFormItem>
        <ElFormItem label="权限模式">
          <ElSelect v-model="syncForm.permissionMode" style="width: 180px">
            <ElOption label="角色隔离" value="角色隔离" />
            <ElOption label="按域授权" value="按域授权" />
          </ElSelect>
        </ElFormItem>
        <ElFormItem>
          <ElButton type="success" @click="runSync">开始同步</ElButton>
        </ElFormItem>
      </ElForm>
    </ElCard>

    <ElCard shadow="never">
      <template #header>
        <span class="text-base font-semibold">同步日志与监控</span>
      </template>
      <ElTable :data="logs" border>
        <ElTableColumn prop="taskName" label="任务" min-width="180" />
        <ElTableColumn prop="strategy" label="策略" width="120" />
        <ElTableColumn prop="qualityScore" label="质量得分" width="110" />
        <ElTableColumn prop="status" label="状态" width="120">
          <template #default="{ row }">
            <ElTag :type="row.status === '成功' ? 'success' : 'warning'" effect="light">
              {{ row.status }}
            </ElTag>
          </template>
        </ElTableColumn>
        <ElTableColumn prop="operator" label="执行人" width="120" />
        <ElTableColumn prop="createdAt" label="时间" width="170" />
      </ElTable>
    </ElCard>
  </div>
</template>

<script setup lang="ts">
  // Auto Comment: Component Script Notes: This script block manages state, events, and data flow for '数据资源支撑工具/src/views/resource-model/sync/index.vue'.
  // Auto Comment: Maintenance Hint: Keep business rules explicit and avoid implicit side effects between handlers.
  import { reactive, ref } from 'vue'
  import { ElMessage } from 'element-plus'

  defineOptions({ name: 'ModelSync' })

  interface SyncLog {
    id: number
    taskName: string
    strategy: string
    qualityScore: number
    status: '成功' | '告警'
    operator: string
    createdAt: string
  }

  // Logic Note: Reactive state 'syncForm' stores mutable runtime data used by this component.
  const syncForm = reactive({
    strategy: '增量同步',
    qualityThreshold: 95,
    permissionMode: '角色隔离'
  })

  // Logic Note: Reactive state 'logs' stores mutable runtime data used by this component.
  const logs = ref<SyncLog[]>([
    {
      id: 1,
      taskName: '人员域模型同步',
      strategy: '增量同步',
      qualityScore: 98,
      status: '成功',
      operator: '张强',
      createdAt: '2026-03-30 07:30:00'
    },
    {
      id: 2,
      taskName: '装备域模型同步',
      strategy: '全量同步',
      qualityScore: 91,
      status: '告警',
      operator: '刘涛',
      createdAt: '2026-03-29 23:10:00'
    }
  ])

  // Logic Note: Handler 'runSync' encapsulates a single interaction or data-processing flow.
  const runSync = () => {
    const score = 96
    logs.value.unshift({
      id: Date.now(),
      taskName: '手动同步任务',
      strategy: syncForm.strategy,
      qualityScore: score,
      status: score >= syncForm.qualityThreshold ? '成功' : '告警',
      operator: '当前用户',
      createdAt: new Date().toLocaleString()
    })
    ElMessage.success('模型同步任务已提交并写入监控日志')
  }
</script>
