<template>
  <!-- Auto Comment: Component Summary: This component renders UI for '数据中台/src/views/template/map/index.vue'. -->
  <!-- Auto Comment: Component Responsibility: It provides the view structure, interaction entry points, and display containers for this feature. -->
  <div class="page-content mb-5" element-loading-text="加载中...">
    <ArtMapChart />
  </div>
</template>

<script setup lang="ts">
  // Auto Comment: Component Script Notes: This script block manages state, events, and data flow for '数据中台/src/views/template/map/index.vue'.
  // Auto Comment: Maintenance Hint: Keep business rules explicit and avoid implicit side effects between handlers.
  defineOptions({ name: 'TemplateMap' })

  /**
   * 异步加载地图组件
   * 减少初始加载体积
   */
  const ArtMapChart = defineAsyncComponent(
    () => import('@/components/core/charts/art-map-chart/index.vue')
  )
</script>
