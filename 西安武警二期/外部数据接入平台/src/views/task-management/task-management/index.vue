<template>
  <div class="flex flex-col gap-5 pb-5">
    <ElCard>
      <template #header>
        <div class="flex-cb gap-3 flex-wrap">
          <div>
            <h3 class="m-0 text-base">任务管理</h3>
            <p class="m-0 mt-1 text-sm text-g-500">支持查询任务、立即执行、上线任务、下线任务。</p>
          </div>
          <ElSpace wrap>
            <ElButton type="primary">立即执行</ElButton>
            <ElButton type="success" plain>上线任务</ElButton>
            <ElButton type="warning" plain>下线任务</ElButton>
          </ElSpace>
        </div>
      </template>
      <ElTable :data="taskList" border>
        <ElTableColumn prop="name" label="任务名称" min-width="180" />
        <ElTableColumn prop="type" label="任务类型" width="120" />
        <ElTableColumn prop="lastRun" label="最近执行时间" width="170" />
        <ElTableColumn prop="nextRun" label="下次执行时间" width="170" />
        <ElTableColumn prop="publish" label="上线状态" width="100" />
      </ElTable>
    </ElCard>
  </div>
</template>

<script setup lang="ts">
  defineOptions({ name: 'TaskListManagement' })

  const taskList = ref([
    {
      name: '边防卡口接入主任务',
      type: '接入任务',
      lastRun: '2026-03-30 09:15',
      nextRun: '2026-03-30 09:20',
      publish: '已上线'
    },
    {
      name: '日志归档同步任务',
      type: '清洗任务',
      lastRun: '2026-03-30 08:30',
      nextRun: '2026-03-31 02:00',
      publish: '已下线'
    }
  ])
</script>
