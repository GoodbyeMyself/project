<template>
  <div class="flex flex-col gap-5 pb-5">
    <ElCard>
      <template #header>
        <div class="flex-cb gap-3 flex-wrap">
          <div>
            <h3 class="m-0 text-base">数据接入策略</h3>
            <p class="m-0 mt-1 text-sm text-g-500">统一管理接入频率、失败重试、并发控制与数据保留策略。</p>
          </div>
          <ElSpace wrap>
            <ElButton type="primary">新增策略</ElButton>
            <ElButton>复制策略</ElButton>
          </ElSpace>
        </div>
      </template>
      <ElTable :data="strategyList" border>
        <ElTableColumn prop="name" label="策略名称" min-width="160" />
        <ElTableColumn prop="frequency" label="执行频率" width="130" />
        <ElTableColumn prop="retry" label="失败重试" width="120" />
        <ElTableColumn prop="parallel" label="并发上限" width="120" />
        <ElTableColumn prop="retain" label="保留周期" width="120" />
        <ElTableColumn prop="scope" label="适用范围" min-width="180" />
      </ElTable>
    </ElCard>
  </div>
</template>

<script setup lang="ts">
  defineOptions({ name: 'AccessStrategy' })

  const strategyList = ref([
    {
      name: '实时接入策略',
      frequency: '5 分钟',
      retry: '3 次',
      parallel: '10',
      retain: '90 天',
      scope: 'Kafka、华为 Elasticsearch'
    },
    {
      name: '离线批处理策略',
      frequency: '每日 02:00',
      retry: '2 次',
      parallel: '4',
      retain: '180 天',
      scope: 'Excel、表接入'
    }
  ])
</script>
