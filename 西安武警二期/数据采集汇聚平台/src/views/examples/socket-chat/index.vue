<template>
  <div class="flex flex-col gap-4 pb-5">
    <ElCard>
      <template #header>
        <div class="flex-cb gap-3">
          <div>
            <h3 class="m-0 text-base font-medium">调度预览与监控</h3>
            <p class="m-0 mt-1 text-sm text-g-700">展示采集调度、执行链路状态、监控日志与连接回执。</p>
          </div>
          <ElTag type="success">实时监控</ElTag>
        </div>
      </template>

      <ElRow :gutter="20">
        <ElCol :xs="24" :md="8" v-for="item in stats" :key="item.label">
          <div class="stat-box">
            <div class="text-lg font-semibold">{{ item.value }}</div>
            <div class="mt-1 text-sm text-g-700">{{ item.label }}</div>
          </div>
        </ElCol>
      </ElRow>
    </ElCard>

    <ElRow :gutter="20">
      <ElCol :xs="24" :lg="12">
        <ElCard>
          <template #header><span class="font-medium">调度预览</span></template>
          <ElDescriptions :column="1" border>
            <ElDescriptionsItem label="调度表达式">0 */10 * * * ?</ElDescriptionsItem>
            <ElDescriptionsItem label="下次执行时间">2026-03-30 16:40:00</ElDescriptionsItem>
            <ElDescriptionsItem label="执行链路">采集网关 -> 输入传输 -> 存储节点</ElDescriptionsItem>
          </ElDescriptions>
        </ElCard>
      </ElCol>
      <ElCol :xs="24" :lg="12">
        <ElCard>
          <template #header><span class="font-medium">监控日志</span></template>
          <ElTimeline>
            <ElTimelineItem timestamp="16:20" type="success">调度实例执行成功</ElTimelineItem>
            <ElTimelineItem timestamp="16:10" type="primary">开始拉取 Kafka0.9 输入数据</ElTimelineItem>
            <ElTimelineItem timestamp="16:00" type="warning">发现单设备采集速率波动</ElTimelineItem>
          </ElTimeline>
        </ElCard>
      </ElCol>
    </ElRow>
  </div>
</template>

<script setup lang="ts">
  defineOptions({ name: 'CollectionScheduleMonitor' })

  const stats = computed(() => [
    { label: '当前运行调度', value: '12 个' },
    { label: '成功执行次数', value: '286 次' },
    { label: '异常实例', value: '2 个' }
  ])
</script>

<style scoped>
  .stat-box {
    padding: 16px;
    border: 1px solid var(--el-border-color-light);
    border-radius: 12px;
    background: var(--el-fill-color-blank);
  }
</style>
