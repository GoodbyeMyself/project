<template>
  <!-- Auto Comment: Component Summary: This component renders UI for '外部数据接入平台/src/views/dashboard/ecommerce/modules/cart-conversion-rate.vue'. -->
  <!-- Auto Comment: Component Responsibility: It provides the view structure, interaction entry points, and display containers for this feature. -->
  <ArtLineChartCard
    class="mb-5 max-sm:mb-4"
    :value="2545"
    label="购物车转化率"
    :percentage="1.2"
    :height="13.5"
    :chartData="[120, 132, 101, 134, 90, 230, 210]"
    :showAreaColor="true"
  />
</template>
