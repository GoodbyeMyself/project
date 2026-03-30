<template>
  <!-- Auto Comment: Component Summary: This component renders UI for '外部数据接入平台/src/views/dashboard/analysis/modules/customer-satisfaction.vue'. -->
  <!-- Auto Comment: Component Responsibility: It provides the view structure, interaction entry points, and display containers for this feature. -->
  <div class="art-card h-100 p-5 mb-5 max-sm:mb-4">
    <div class="art-card-header">
      <div class="title">
        <h4>客户满意度</h4>
      </div>
    </div>
    <ArtLineChart
      height="calc(100% - 30px)"
      :data="chartData"
      :xAxisData="xAxisData"
      :showLegend="true"
      :showAxisLabel="true"
      :showAxisLine="false"
      :showSplitLine="true"
    />
  </div>
</template>

<script setup lang="ts">
  // Auto Comment: Component Script Notes: This script block manages state, events, and data flow for '外部数据接入平台/src/views/dashboard/analysis/modules/customer-satisfaction.vue'.
  // Auto Comment: Maintenance Hint: Keep business rules explicit and avoid implicit side effects between handlers.
  import type { LineDataItem } from '@/types/component/chart'

  const AREA_STYLE_CONFIG = {
    startOpacity: 0.08,
    endOpacity: 0
  } as const

  /**
   * X 轴数据配置
   * 表示一周的天数（周一到周日）
   */
  const xAxisData = ['1', '2', '3', '4', '5', '6', '7']

  /**
   * 客户满意度图表数据
   * 对比上个月和本月的满意度趋势
   */
  // Logic Note: Computed value 'chartData' derives UI state from reactive sources and updates automatically.
  const chartData = computed<LineDataItem[]>(() => [
    {
      name: '上个月',
      data: [65, 72, 68, 75, 82, 78, 85],
      areaStyle: AREA_STYLE_CONFIG
    },
    {
      name: '本月',
      data: [78, 85, 82, 88, 92, 89, 95],
      areaStyle: AREA_STYLE_CONFIG
    }
  ])
</script>
