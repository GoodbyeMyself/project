<template>
  <!-- Auto Comment: Component Summary: This component renders UI for '数据采集汇聚平台/src/views/widgets/wang-editor/index.vue'. -->
  <!-- Auto Comment: Component Responsibility: It provides the view structure, interaction entry points, and display containers for this feature. -->
  <div class="flex flex-col gap-4 pb-5">
    <ElCard>
      <template #header>
        <div class="flex-cb gap-3">
          <div>
            <h3 class="m-0 text-base font-medium">数据备份</h3>
            <p class="m-0 mt-1 text-sm text-g-700">提供备份策略说明、文件目录维护与备份任务说明配置。</p>
          </div>
          <ElButton type="primary" @click="saveBackupStrategy">保存备份策略</ElButton>
        </div>
      </template>

      <ArtWangEditor v-model="strategyHtml" height="320px" placeholder="请输入数据备份策略说明..." :toolbar-keys="toolbarKeys" />
    </ElCard>

    <ElCard>
      <template #header><span class="font-medium">备份目录说明</span></template>
      <ElDescriptions :column="1" border>
        <ElDescriptionsItem label="主备份目录">/backup/full</ElDescriptionsItem>
        <ElDescriptionsItem label="增量备份目录">/backup/increment</ElDescriptionsItem>
        <ElDescriptionsItem label="文件保留周期">30 天</ElDescriptionsItem>
      </ElDescriptions>
    </ElCard>
  </div>
</template>

<script setup lang="ts">
  // Auto Comment: Component Script Notes: This script block manages state, events, and data flow for '数据采集汇聚平台/src/views/widgets/wang-editor/index.vue'.
  // Auto Comment: Maintenance Hint: Keep business rules explicit and avoid implicit side effects between handlers.
  defineOptions({ name: 'DataBackup' })

  const toolbarKeys = ['headerSelect', 'bold', 'italic', 'underline', '|', 'bulletedList', 'numberedList', '|', 'insertLink', 'undo', 'redo']
  // Logic Note: Reactive state 'strategyHtml' stores mutable runtime data used by this component.
  const strategyHtml = ref('<h2>数据备份策略</h2><p>每日执行全量备份，每 2 小时执行一次增量备份，关键文件同步保存至异地节点。</p>')

  // Logic Note: Handler 'saveBackupStrategy' encapsulates a single interaction or data-processing flow.
  const saveBackupStrategy = () => ElMessage.success('已保存数据备份策略')
</script>
