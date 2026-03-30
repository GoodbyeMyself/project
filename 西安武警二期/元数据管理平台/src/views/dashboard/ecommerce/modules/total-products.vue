<template>
  <!-- Auto Comment: Component Summary: This component renders UI for '元数据管理平台/src/views/dashboard/ecommerce/modules/total-products.vue'. -->
  <!-- Auto Comment: Component Responsibility: It provides the view structure, interaction entry points, and display containers for this feature. -->
  <div class="art-card h-53 p-5 pt-3.5 mb-5 max-sm:mb-4">
    <div class="art-card-header">
      <div class="title">
        <h4 class="text-2xl font-medium">55,231</h4>
        <p>商品总数</p>
      </div>
    </div>

    <ArtBarChart
      :showAxisLabel="false"
      :showAxisLine="false"
      :showSplitLine="false"
      :data="[50, 80, 40, 90, 60, 70]"
      height="7rem"
      barWidth="18px"
    />
  </div>
</template>
