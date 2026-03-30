<template>
  <!-- Auto Comment: Component Summary: This component renders UI for '外部数据接入平台/src/views/dashboard/ecommerce/modules/sales-trend.vue'. -->
  <!-- Auto Comment: Component Responsibility: It provides the view structure, interaction entry points, and display containers for this feature. -->
  <div class="art-card p-5 mb-5 h-105 max-sm:mb-4">
    <div class="art-card-header">
      <div class="title">
        <h4>销售趋势</h4>
        <p>月度销售对比</p>
      </div>
    </div>

    <ArtDualBarCompareChart
      :positiveData="[50, 80, 120, 90, 60]"
      :negativeData="[30, 60, 90, 70, 40]"
      :xAxisData="['一月', '二月', '三月', '四月', '五月']"
      height="19rem"
    />
  </div>
</template>
