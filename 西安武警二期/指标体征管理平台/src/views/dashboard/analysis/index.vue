<!-- 分析页页面 -->
<template>
  <!-- Auto Comment: Component Summary: This component renders UI for '指标体征管理平台/src/views/dashboard/analysis/index.vue'. -->
  <!-- Auto Comment: Component Responsibility: It provides the view structure, interaction entry points, and display containers for this feature. -->
  <div>
    <ElRow :gutter="20">
      <ElCol :xl="14" :lg="15" :xs="24">
        <TodaySales />
      </ElCol>
      <ElCol :xl="10" :lg="9" :xs="24">
        <VisitorInsights />
      </ElCol>
    </ElRow>

    <ElRow :gutter="20">
      <ElCol :xl="10" :lg="10" :xs="24">
        <TotalRevenue />
      </ElCol>
      <ElCol :xl="7" :lg="7" :xs="24">
        <CustomerSatisfaction />
      </ElCol>
      <ElCol :xl="7" :lg="7" :xs="24">
        <TargetVsReality />
      </ElCol>
    </ElRow>

    <ElRow :gutter="20">
      <ElCol :xl="10" :lg="10" :xs="24">
        <TopProducts />
      </ElCol>
      <ElCol :xl="7" :lg="7" :xs="24">
        <SalesMappingByCountry />
      </ElCol>
      <ElCol :xl="7" :lg="7" :xs="24">
        <VolumeServiceLevel />
      </ElCol>
    </ElRow>
  </div>
</template>

<script setup lang="ts">
  // Auto Comment: Component Script Notes: This script block manages state, events, and data flow for '指标体征管理平台/src/views/dashboard/analysis/index.vue'.
  // Auto Comment: Maintenance Hint: Keep business rules explicit and avoid implicit side effects between handlers.
  import TodaySales from './modules/today-sales.vue'
  import VisitorInsights from './modules/visitor-insights.vue'
  import TotalRevenue from './modules/total-revenue.vue'
  import CustomerSatisfaction from './modules/customer-satisfaction.vue'
  import TargetVsReality from './modules/target-vs-reality.vue'
  import TopProducts from './modules/top-products.vue'
  import SalesMappingByCountry from './modules/sales-mapping-by-country.vue'
  import VolumeServiceLevel from './modules/volume-service-level.vue'

  defineOptions({ name: 'Analysis' })
</script>
