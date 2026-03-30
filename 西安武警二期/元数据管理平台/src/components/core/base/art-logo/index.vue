<!-- 系统logo -->
<template>
  <!-- Auto Comment: Component Summary: This component renders UI for '元数据管理平台/src/components/core/base/art-logo/index.vue'. -->
  <!-- Auto Comment: Component Responsibility: It provides the view structure, interaction entry points, and display containers for this feature. -->
  <div class="flex-cc">
    <img :style="logoStyle" src="@imgs/common/logo.webp" alt="logo" class="w-full h-full" />
  </div>
</template>

<script setup lang="ts">
  // Auto Comment: Component Script Notes: This script block manages state, events, and data flow for '元数据管理平台/src/components/core/base/art-logo/index.vue'.
  // Auto Comment: Maintenance Hint: Keep business rules explicit and avoid implicit side effects between handlers.
  defineOptions({ name: 'ArtLogo' })

  interface Props {
    /** logo 大小 */
    size?: number | string
  }

  const props = withDefaults(defineProps<Props>(), {
    size: 36
  })

  // Logic Note: Computed value 'logoStyle' derives UI state from reactive sources and updates automatically.
  const logoStyle = computed(() => ({ width: `${props.size}px` }))
</script>
