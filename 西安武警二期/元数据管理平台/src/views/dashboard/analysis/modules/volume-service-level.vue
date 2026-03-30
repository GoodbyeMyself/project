<template>
  <!-- Auto Comment: Component Summary: This component renders UI for '元数据管理平台/src/views/dashboard/analysis/modules/volume-service-level.vue'. -->
  <!-- Auto Comment: Component Responsibility: It provides the view structure, interaction entry points, and display containers for this feature. -->
  <div class="art-card h-82 p-5 mb-5 max-sm:mb-4">
    <div class="art-card-header">
      <div class="title">
        <h4>业务量与服务水平</h4>
      </div>
    </div>

    <ArtBarChart
      class="mt-6"
      height="14.3rem"
      :data="volumeServiceData"
      :xAxisData="serviceCategories"
      :showLegend="true"
      :showAxisLine="false"
      :stack="true"
      barWidth="22%"
    />
  </div>
</template>

<script setup lang="ts">
  // Auto Comment: Component Script Notes: This script block manages state, events, and data flow for '元数据管理平台/src/views/dashboard/analysis/modules/volume-service-level.vue'.
  // Auto Comment: Maintenance Hint: Keep business rules explicit and avoid implicit side effects between handlers.
  interface VolumeServiceDataItem {
    name: string
    data: number[]
    stack: string
  }

  /**
   * 服务类别数据
   * 不同产品的分类标签
   */
  // Logic Note: Reactive state 'serviceCategories' stores mutable runtime data used by this component.
  const serviceCategories = ref(['产品A', '产品B', '产品C', '产品D', '产品E'])

  /**
   * 业务量与服务量数据
   * 展示各产品的业务量和服务量对比，使用堆叠柱状图展示
   */
  // Logic Note: Reactive state 'volumeServiceData' stores mutable runtime data used by this component.
  const volumeServiceData = ref<VolumeServiceDataItem[]>([
    {
      name: '业务量',
      data: [20, 25, 30, 35, 40],
      stack: 'total'
    },
    {
      name: '服务量',
      data: [30, 35, 40, 45, 50],
      stack: 'total'
    }
  ])
</script>
