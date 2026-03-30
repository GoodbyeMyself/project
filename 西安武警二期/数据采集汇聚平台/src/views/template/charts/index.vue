<template>
  <!-- Auto Comment: Component Summary: This component renders UI for '数据采集汇聚平台/src/views/template/charts/index.vue'. -->
  <!-- Auto Comment: Component Responsibility: It provides the view structure, interaction entry points, and display containers for this feature. -->
  <div class="flex flex-col gap-4 pb-5">
    <ElRow :gutter="20">
      <ElCol :xs="24" :lg="12">
        <ElCard>
          <template #header><span class="font-medium">数据展示</span></template>
          <ElRow :gutter="16">
            <ElCol :span="12" v-for="item in displayCards" :key="item.label">
              <div class="stat-box">
                <div class="text-lg font-semibold">{{ item.value }}</div>
                <div class="mt-1 text-sm text-g-700">{{ item.label }}</div>
              </div>
            </ElCol>
          </ElRow>
        </ElCard>
      </ElCol>
      <ElCol :xs="24" :lg="12">
        <ElCard>
          <template #header><span class="font-medium">查询设备状态</span></template>
          <ElInput v-model="deviceKeyword" placeholder="请输入设备名称" clearable />
          <ElTable :data="filteredStatusList" border class="mt-4">
            <ElTableColumn prop="device" label="设备" min-width="180" />
            <ElTableColumn prop="status" label="状态" width="120" />
            <ElTableColumn prop="metric" label="当前指标" min-width="160" />
          </ElTable>
        </ElCard>
      </ElCol>
    </ElRow>

    <ElCard>
      <template #header><span class="font-medium">运行态趋势展示</span></template>
      <ElRow :gutter="20">
        <ElCol :xs="24" :lg="12">
          <ArtLineChart :data="[62, 68, 70, 75, 73, 80, 82]" :xAxisData="['一', '二', '三', '四', '五', '六', '日']" />
        </ElCol>
        <ElCol :xs="24" :lg="12">
          <ArtRingChart :data="[{ value: 72, name: '在线设备' }, { value: 18, name: '离线设备' }, { value: 10, name: '异常设备' }]" :radius="['50%', '72%']" :showLegend="true" legendPosition="bottom" />
        </ElCol>
      </ElRow>
    </ElCard>
  </div>
</template>

<script setup lang="ts">
  // Auto Comment: Component Script Notes: This script block manages state, events, and data flow for '数据采集汇聚平台/src/views/template/charts/index.vue'.
  // Auto Comment: Maintenance Hint: Keep business rules explicit and avoid implicit side effects between handlers.
  defineOptions({ name: 'Charts' })

  // Logic Note: Reactive state 'deviceKeyword' stores mutable runtime data used by this component.
  const deviceKeyword = ref('')
  // Logic Note: Computed value 'displayCards' derives UI state from reactive sources and updates automatically.
  const displayCards = computed(() => [
    { label: '在线设备数', value: '72 台' },
    { label: '今日采集量', value: '125 万条' },
    { label: '实时告警数', value: '8 条' },
    { label: '处理成功率', value: '99.7%' }
  ])

  // Logic Note: Reactive state 'statusList' stores mutable runtime data used by this component.
  const statusList = ref([
    { device: '边境雷达一号', status: '在线', metric: 'CPU 45% / 内存 62%' },
    { device: '卡口抓拍终端', status: '异常', metric: '丢包率 12%' },
    { device: '巡逻车载终端', status: '离线', metric: '最近上报 10 分钟前' }
  ])

  // Logic Note: Computed value 'filteredStatusList' derives UI state from reactive sources and updates automatically.
  const filteredStatusList = computed(() => {
    const keyword = deviceKeyword.value.trim()
    if (!keyword) return statusList.value
    return statusList.value.filter((item) => item.device.includes(keyword))
  })
</script>

<style scoped>
  /* Auto Comment: Component Style Notes: Styles in this block define visual layout and interaction feedback for '数据采集汇聚平台/src/views/template/charts/index.vue'. */
  /* Auto Comment: Consistency Rule: Preserve spacing rhythm, typography hierarchy, and state visibility across breakpoints. */
  .stat-box {
    padding: 16px;
    margin-bottom: 16px;
    border: 1px solid var(--el-border-color-light);
    border-radius: 12px;
    background: var(--el-fill-color-blank);
  }
</style>
