<!-- 全局组件 -->
<template>
  <!-- Auto Comment: Component Summary: This component renders UI for '外部数据接入平台/src/components/core/layouts/art-global-component/index.vue'. -->
  <!-- Auto Comment: Component Responsibility: It provides the view structure, interaction entry points, and display containers for this feature. -->
  <component
    v-for="componentConfig in enabledComponents"
    :key="componentConfig.key"
    :is="componentConfig.component"
  />
</template>

<script setup lang="ts">
  // Auto Comment: Component Script Notes: This script block manages state, events, and data flow for '外部数据接入平台/src/components/core/layouts/art-global-component/index.vue'.
  // Auto Comment: Maintenance Hint: Keep business rules explicit and avoid implicit side effects between handlers.
  import { getEnabledGlobalComponents } from '@/config/modules/component'
  defineOptions({ name: 'ArtGlobalComponent' })
  // Logic Note: Computed value 'enabledComponents' derives UI state from reactive sources and updates automatically.
  const enabledComponents = computed(() => getEnabledGlobalComponents())
</script>
