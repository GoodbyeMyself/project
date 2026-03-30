<template>
  <!-- Auto Comment: Component Summary: This component renders UI for '指标体征管理平台/src/views/dashboard/ecommerce/modules/sales-growth.vue'. -->
  <!-- Auto Comment: Component Responsibility: It provides the view structure, interaction entry points, and display containers for this feature. -->
  <div class="art-card p-5 pt-3.5 mb-5 h-46 max-sm:mb-4">
    <div class="art-card-header">
      <div class="title">
        <h4 class="text-2xl">
          <span>12%</span>
          <ArtSvgIcon icon="ri:arrow-right-up-line" class="text-success text-lg ml-1" />
        </h4>
        <p>增长</p>
      </div>
    </div>

    <ArtLineChart
      :showAreaColor="true"
      :showAxisLabel="false"
      :showAxisLine="false"
      :showSplitLine="false"
      :data="[50, 85, 65, 95, 75, 130, 180]"
      barWidth="16px"
      height="5rem"
    />
  </div>
</template>
