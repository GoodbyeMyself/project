<template>
  <!-- Auto Comment: Component Summary: This component renders UI for '元数据管理平台/src/views/dashboard/analysis/modules/total-revenue.vue'. -->
  <!-- Auto Comment: Component Responsibility: It provides the view structure, interaction entry points, and display containers for this feature. -->
  <div class="art-card h-100 p-5 mb-5 max-sm:mb-4">
    <div class="art-card-header">
      <div class="title">
        <h4>总收入</h4>
      </div>
    </div>
    <ArtBarChart
      height="calc(100% - 30px)"
      :data="revenueData"
      :xAxisData="weekDays"
      :showLegend="true"
      :showAxisLine="false"
      barWidth="18%"
    />
  </div>
</template>

<script setup lang="ts">
  // Auto Comment: Component Script Notes: This script block manages state, events, and data flow for '元数据管理平台/src/views/dashboard/analysis/modules/total-revenue.vue'.
  // Auto Comment: Maintenance Hint: Keep business rules explicit and avoid implicit side effects between handlers.
  interface RevenueDataItem {
    name: string
    data: number[]
  }

  /**
   * 一周的日期标签
   */
  // Logic Note: Reactive state 'weekDays' stores mutable runtime data used by this component.
  const weekDays = ref(['周一', '周二', '周三', '周四', '周五', '周六', '周日'])

  /**
   * 总收入数据
   * 对比线上和线下销售的一周收入情况
   */
  // Logic Note: Reactive state 'revenueData' stores mutable runtime data used by this component.
  const revenueData = ref<RevenueDataItem[]>([
    {
      name: '线上销售',
      data: [12, 13, 5, 15, 10, 15, 18]
    },
    {
      name: '线下销售',
      data: [10, 11, 20, 5, 11, 13, 10]
    }
  ])
</script>
