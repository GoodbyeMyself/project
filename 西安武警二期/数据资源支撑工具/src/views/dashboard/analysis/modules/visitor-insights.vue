<template>
  <!-- Auto Comment: Component Summary: This component renders UI for '数据资源支撑工具/src/views/dashboard/analysis/modules/visitor-insights.vue'. -->
  <!-- Auto Comment: Component Responsibility: It provides the view structure, interaction entry points, and display containers for this feature. -->
  <div class="art-card h-82 p-5 mb-5 max-sm:mb-4">
    <div class="art-card-header">
      <div class="title">
        <h4>访客洞察</h4>
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
  // Auto Comment: Component Script Notes: This script block manages state, events, and data flow for '数据资源支撑工具/src/views/dashboard/analysis/modules/visitor-insights.vue'.
  // Auto Comment: Maintenance Hint: Keep business rules explicit and avoid implicit side effects between handlers.
  import type { LineDataItem } from '@/types/component/chart'

  /**
   * X 轴数据配置
   * 表示一年的月份（1-12月）
   */
  const xAxisData = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']

  /**
   * 访客洞察图表数据
   * 对比老客户和新客户的全年访问趋势
   */
  // Logic Note: Computed value 'chartData' derives UI state from reactive sources and updates automatically.
  const chartData = computed<LineDataItem[]>(() => [
    {
      name: '老客户',
      data: [280, 350, 300, 250, 230, 210, 240, 280, 320, 350, 300, 200]
    },
    {
      name: '新客户',
      data: [260, 200, 150, 130, 180, 270, 340, 380, 300, 220, 170, 130]
    }
  ])
</script>
