<template>
  <div class="flex flex-col gap-5 pb-5">
    <ElCard>
      <template #header>
        <div class="flex-cb gap-3 flex-wrap">
          <div>
            <h3 class="m-0 text-base">任务运行状态</h3>
            <p class="m-0 mt-1 text-sm text-g-500">覆盖任务运行状态监控与实例运行状态监控。</p>
          </div>
          <ElButton type="primary">刷新状态</ElButton>
        </div>
      </template>
      <ElRow :gutter="20">
        <ElCol :xs="24" :md="8" v-for="item in statCards" :key="item.title">
          <ElCard shadow="hover" class="mb-5">
            <p class="m-0 text-sm text-g-500">{{ item.title }}</p>
            <h2 class="m-0 mt-3 text-3xl">{{ item.value }}</h2>
            <p class="m-0 mt-2 text-sm" :class="item.className">{{ item.desc }}</p>
          </ElCard>
        </ElCol>
      </ElRow>
      <ElTable :data="instanceList" border>
        <ElTableColumn prop="task" label="任务名称" min-width="180" />
        <ElTableColumn prop="instance" label="实例编号" min-width="180" />
        <ElTableColumn prop="startTime" label="启动时间" width="170" />
        <ElTableColumn prop="duration" label="运行时长" width="120" />
        <ElTableColumn prop="status" label="状态" width="100" />
      </ElTable>
    </ElCard>
  </div>
</template>

<script setup lang="ts">
  defineOptions({ name: 'TaskRunStatus' })

  const statCards = ref([
    { title: '运行中任务', value: 18, desc: '较昨日 +2', className: 'text-success' },
    { title: '异常实例', value: 2, desc: '需人工复核', className: 'text-danger' },
    { title: '已完成实例', value: 136, desc: '今日累计', className: 'text-theme' }
  ])

  const instanceList = ref([
    {
      task: '卡口数据实时接入',
      instance: 'run-20260330-001',
      startTime: '2026-03-30 09:20',
      duration: '12 分钟',
      status: '运行中'
    },
    {
      task: '日志归档导入',
      instance: 'run-20260330-002',
      startTime: '2026-03-30 08:50',
      duration: '35 分钟',
      status: '异常'
    }
  ])
</script>
