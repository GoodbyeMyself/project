<template>
  <!-- Auto Comment: Component Summary: This component renders UI for '外部数据接入平台/src/views/access-data/access-management/index.vue'. -->
  <!-- Auto Comment: Component Responsibility: It provides the view structure, interaction entry points, and display containers for this feature. -->
  <div class="flex flex-col gap-5 pb-5">
    <ElCard>
      <template #header>
        <div class="flex-cb gap-3 flex-wrap">
          <div>
            <h3 class="m-0 text-base">接入管理</h3>
            <p class="m-0 mt-1 text-sm text-g-500">统一处理新增任务、修改任务、删除任务、复制任务与移动任务。</p>
          </div>
          <ElSpace wrap>
            <ElButton type="primary">新增任务</ElButton>
            <ElButton>复制任务</ElButton>
            <ElButton type="warning" plain>移动任务</ElButton>
            <ElButton type="danger" plain>删除任务</ElButton>
          </ElSpace>
        </div>
      </template>
      <ElTable :data="taskList" border>
        <ElTableColumn prop="name" label="任务名称" min-width="180" />
        <ElTableColumn prop="template" label="关联模板" min-width="180" />
        <ElTableColumn prop="type" label="接入类型" width="120" />
        <ElTableColumn prop="cron" label="调度周期" width="140" />
        <ElTableColumn prop="owner" label="负责人" width="120" />
        <ElTableColumn prop="status" label="状态" width="100" />
      </ElTable>
    </ElCard>
  </div>
</template>

<script setup lang="ts">
  // Auto Comment: Component Script Notes: This script block manages state, events, and data flow for '外部数据接入平台/src/views/access-data/access-management/index.vue'.
  // Auto Comment: Maintenance Hint: Keep business rules explicit and avoid implicit side effects between handlers.
  defineOptions({ name: 'AccessManagement' })

  // Logic Note: Reactive state 'taskList' stores mutable runtime data used by this component.
  const taskList = ref([
    {
      name: '卡口数据实时接入',
      template: '边防卡口结构化模板',
      type: 'Kafka0.9',
      cron: '*/5 * * * *',
      owner: '赵云',
      status: '运行中'
    },
    {
      name: '日志归档导入',
      template: '日志归档模板',
      type: 'Excel',
      cron: '0 2 * * *',
      owner: '陈涛',
      status: '待上线'
    }
  ])
</script>
