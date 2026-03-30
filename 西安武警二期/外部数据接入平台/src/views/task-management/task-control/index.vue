<template>
  <!-- Auto Comment: Component Summary: This component renders UI for '外部数据接入平台/src/views/task-management/task-control/index.vue'. -->
  <!-- Auto Comment: Component Responsibility: It provides the view structure, interaction entry points, and display containers for this feature. -->
  <div class="flex flex-col gap-5 pb-5">
    <ElCard>
      <template #header>
        <div class="flex-cb gap-3 flex-wrap">
          <div>
            <h3 class="m-0 text-base">任务状态控制</h3>
            <p class="m-0 mt-1 text-sm text-g-500">支持启动任务、停止任务、重试任务的统一操作。</p>
          </div>
          <ElSpace wrap>
            <ElButton type="success">启动任务</ElButton>
            <ElButton type="danger" plain>停止任务</ElButton>
            <ElButton type="warning" plain>重试任务</ElButton>
          </ElSpace>
        </div>
      </template>
      <ElTable :data="controlList" border>
        <ElTableColumn prop="name" label="任务名称" min-width="180" />
        <ElTableColumn prop="executor" label="执行器" width="140" />
        <ElTableColumn prop="status" label="当前状态" width="100" />
        <ElTableColumn prop="lastAction" label="最近操作" min-width="180" />
        <ElTableColumn prop="operator" label="操作人" width="120" />
      </ElTable>
    </ElCard>
  </div>
</template>

<script setup lang="ts">
  // Auto Comment: Component Script Notes: This script block manages state, events, and data flow for '外部数据接入平台/src/views/task-management/task-control/index.vue'.
  // Auto Comment: Maintenance Hint: Keep business rules explicit and avoid implicit side effects between handlers.
  defineOptions({ name: 'TaskStatusControl' })

  // Logic Note: Reactive state 'controlList' stores mutable runtime data used by this component.
  const controlList = ref([
    {
      name: '边防卡口接入主任务',
      executor: 'worker-01',
      status: '运行中',
      lastAction: '2026-03-30 09:18 启动任务',
      operator: '调度管理员'
    },
    {
      name: '日志归档同步任务',
      executor: 'worker-03',
      status: '失败',
      lastAction: '2026-03-30 08:40 重试任务',
      operator: '系统管理员'
    }
  ])
</script>
