<template>
  <!-- Auto Comment: Component Summary: This component renders UI for '数据资源支撑工具/src/views/resource-model/distribution/index.vue'. -->
  <!-- Auto Comment: Component Responsibility: It provides the view structure, interaction entry points, and display containers for this feature. -->
  <div class="flex flex-col gap-4 pb-5">
    <ElCard shadow="never">
      <template #header>
        <div class="flex-cb">
          <span class="text-base font-semibold">模型下发</span>
          <ElTag type="primary" effect="light">版本与审计</ElTag>
        </div>
      </template>
      <div class="flex flex-wrap gap-2">
        <ElTag v-for="item in capabilityTags" :key="item" effect="light">{{ item }}</ElTag>
      </div>
    </ElCard>

    <ElCard shadow="never">
      <ElForm :model="configForm" inline>
        <ElFormItem label="主中心版本">
          <ElInput v-model="configForm.globalVersion" style="width: 180px" />
        </ElFormItem>
        <ElFormItem label="边缘节点版本">
          <ElInput v-model="configForm.edgeVersion" style="width: 180px" />
        </ElFormItem>
        <ElFormItem label="权限策略">
          <ElSelect v-model="configForm.permissionMode" style="width: 180px">
            <ElOption label="最小权限" value="最小权限" />
            <ElOption label="管理员审批" value="管理员审批" />
            <ElOption label="开放发布" value="开放发布" />
          </ElSelect>
        </ElFormItem>
        <ElFormItem>
          <ElButton type="success" @click="dispatchModel">执行下发</ElButton>
          <ElButton @click="checkCompatibility">兼容性检查</ElButton>
        </ElFormItem>
      </ElForm>

      <ElTable :data="rows" border>
        <ElTableColumn prop="taskName" label="任务名称" min-width="180" />
        <ElTableColumn prop="targetNode" label="目标节点" width="140" />
        <ElTableColumn prop="version" label="下发版本" width="120" />
        <ElTableColumn prop="compatibility" label="兼容性" width="100" />
        <ElTableColumn prop="auditStatus" label="审计状态" width="120" />
        <ElTableColumn prop="operator" label="操作人" width="120" />
        <ElTableColumn prop="updatedAt" label="时间" width="170" />
        <ElTableColumn label="操作" width="220" fixed="right">
          <template #default="{ row }">
            <ElSpace>
              <ElButton link type="primary" @click="viewAuditLog(row)">审计日志</ElButton>
              <ElButton link type="warning" @click="revokeTask(row)">回滚</ElButton>
            </ElSpace>
          </template>
        </ElTableColumn>
      </ElTable>
    </ElCard>
  </div>
</template>

<script setup lang="ts">
  // Auto Comment: Component Script Notes: This script block manages state, events, and data flow for '数据资源支撑工具/src/views/resource-model/distribution/index.vue'.
  // Auto Comment: Maintenance Hint: Keep business rules explicit and avoid implicit side effects between handlers.
  import { reactive, ref } from 'vue'
  import { ElMessage } from 'element-plus'

  defineOptions({ name: 'ModelDistribution' })

  interface DistributionRow {
    id: number
    taskName: string
    targetNode: string
    version: string
    compatibility: string
    auditStatus: string
    operator: string
    updatedAt: string
  }

  const capabilityTags = [
    '模型下发',
    '版本控制',
    '主中心全局模型版本控制',
    '边缘节点版本控制',
    '版本兼容性检查',
    '审计日志',
    '权限配置'
  ]

  // Logic Note: Reactive state 'configForm' stores mutable runtime data used by this component.
  const configForm = reactive({
    globalVersion: 'v2.4.0',
    edgeVersion: 'v2.3.6',
    permissionMode: '管理员审批'
  })

  // Logic Note: Reactive state 'rows' stores mutable runtime data used by this component.
  const rows = ref<DistributionRow[]>([
    {
      id: 1,
      taskName: '中心模型下发-人员域',
      targetNode: '节点A',
      version: 'v2.4.0',
      compatibility: '通过',
      auditStatus: '已归档',
      operator: '张强',
      updatedAt: '2026-03-30 13:20:00'
    },
    {
      id: 2,
      taskName: '边缘补丁下发-装备域',
      targetNode: '节点B',
      version: 'v2.3.6',
      compatibility: '告警',
      auditStatus: '待复核',
      operator: '刘涛',
      updatedAt: '2026-03-30 08:46:00'
    }
  ])

  // Logic Note: Handler 'dispatchModel' encapsulates a single interaction or data-processing flow.
  const dispatchModel = () => {
    rows.value.unshift({
      id: Date.now(),
      taskName: '手动下发任务',
      targetNode: '节点A/节点B',
      version: configForm.globalVersion,
      compatibility: '待检查',
      auditStatus: '待复核',
      operator: '当前用户',
      updatedAt: new Date().toLocaleString()
    })
    ElMessage.success('模型下发任务已创建')
  }

  // Logic Note: Handler 'checkCompatibility' encapsulates a single interaction or data-processing flow.
  const checkCompatibility = () => {
    rows.value.forEach((item) => {
      item.compatibility = '通过'
    })
    ElMessage.success('版本兼容性检查已完成')
  }

  // Logic Note: Handler 'viewAuditLog' encapsulates a single interaction or data-processing flow.
  const viewAuditLog = (row: DistributionRow) => {
    ElMessage.info(`已打开 ${row.taskName} 的审计日志`)
  }

  // Logic Note: Handler 'revokeTask' encapsulates a single interaction or data-processing flow.
  const revokeTask = (row: DistributionRow) => {
    row.auditStatus = '已回滚'
    row.updatedAt = new Date().toLocaleString()
    ElMessage.warning(`${row.taskName} 已执行回滚`)
  }
</script>
