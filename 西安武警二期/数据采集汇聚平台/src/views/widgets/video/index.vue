<template>
  <!-- Auto Comment: Component Summary: This component renders UI for '数据采集汇聚平台/src/views/widgets/video/index.vue'. -->
  <!-- Auto Comment: Component Responsibility: It provides the view structure, interaction entry points, and display containers for this feature. -->
  <div class="flex flex-col gap-4 pb-5">
    <ElCard>
      <template #header>
        <div class="flex-cb gap-3">
          <div>
            <h3 class="m-0 text-base font-medium">数据恢复</h3>
            <p class="m-0 mt-1 text-sm text-g-700">提供恢复点选择、恢复范围查看与恢复任务执行确认。</p>
          </div>
          <ElButton type="primary" @click="startRecover">执行恢复</ElButton>
        </div>
      </template>

      <ElForm label-width="96px">
        <ElFormItem label="恢复点">
          <ElSelect v-model="restorePoint">
            <ElOption label="2026-03-30 00:00 全量备份" value="2026-03-30 00:00 全量备份" />
            <ElOption label="2026-03-29 00:00 全量备份" value="2026-03-29 00:00 全量备份" />
          </ElSelect>
        </ElFormItem>
        <ElFormItem label="恢复范围">
          <ElCheckboxGroup v-model="restoreScope">
            <ElCheckbox label="设备台账" value="设备台账" />
            <ElCheckbox label="采集结果" value="采集结果" />
            <ElCheckbox label="告警记录" value="告警记录" />
          </ElCheckboxGroup>
        </ElFormItem>
        <ElFormItem label="恢复说明">
          <ElInput v-model="remark" type="textarea" :rows="3" />
        </ElFormItem>
      </ElForm>
    </ElCard>

    <ElCard>
      <template #header><span class="font-medium">最近恢复任务</span></template>
      <ElTable :data="recoverLogs" border>
        <ElTableColumn prop="time" label="时间" width="180" />
        <ElTableColumn prop="point" label="恢复点" min-width="220" />
        <ElTableColumn prop="status" label="状态" width="120" />
      </ElTable>
    </ElCard>
  </div>
</template>

<script setup lang="ts">
  // Auto Comment: Component Script Notes: This script block manages state, events, and data flow for '数据采集汇聚平台/src/views/widgets/video/index.vue'.
  // Auto Comment: Maintenance Hint: Keep business rules explicit and avoid implicit side effects between handlers.
  defineOptions({ name: 'DataRecovery' })

  // Logic Note: Reactive state 'restorePoint' stores mutable runtime data used by this component.
  const restorePoint = ref('2026-03-30 00:00 全量备份')
  // Logic Note: Reactive state 'restoreScope' stores mutable runtime data used by this component.
  const restoreScope = ref(['设备台账', '采集结果'])
  // Logic Note: Reactive state 'remark' stores mutable runtime data used by this component.
  const remark = ref('用于恢复凌晨异常变更前的数据状态。')
  // Logic Note: Reactive state 'recoverLogs' stores mutable runtime data used by this component.
  const recoverLogs = ref([
    { time: '2026-03-29 09:00', point: '2026-03-29 00:00 全量备份', status: '成功' },
    { time: '2026-03-28 22:10', point: '2026-03-28 00:00 全量备份', status: '成功' }
  ])

  // Logic Note: Handler 'startRecover' encapsulates a single interaction or data-processing flow.
  const startRecover = () => ElMessage.success(`已执行数据恢复：${restorePoint.value}`)
</script>
