<template>
  <!-- Auto Comment: Component Summary: This component renders UI for '数据资源支撑工具/src/components/core/layouts/art-settings-panel/widget/SectionTitle.vue'. -->
  <!-- Auto Comment: Component Responsibility: It provides the view structure, interaction entry points, and display containers for this feature. -->
  <p
    class="relative mt-7.5 mb-5.5 text-sm text-center text-g-800 before:absolute before:top-[10px] before:left-0 before:w-[50px] before:m-auto before:content-[''] before:border-b before:border-[var(--art-gray-300)] after:absolute after:top-[10px] after:right-0 after:w-[50px] after:m-auto after:content-[''] after:border-b after:border-g-300"
    :style="style"
  >
    {{ title }}
  </p>
</template>

<script setup lang="ts">
  // Auto Comment: Component Script Notes: This script block manages state, events, and data flow for '数据资源支撑工具/src/components/core/layouts/art-settings-panel/widget/SectionTitle.vue'.
  // Auto Comment: Maintenance Hint: Keep business rules explicit and avoid implicit side effects between handlers.
  interface Props {
    title: string
    style?: Record<string, any>
  }

  defineProps<Props>()
</script>
