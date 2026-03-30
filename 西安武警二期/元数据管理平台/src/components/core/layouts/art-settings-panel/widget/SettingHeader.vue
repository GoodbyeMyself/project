<template>
  <!-- Auto Comment: Component Summary: This component renders UI for '元数据管理平台/src/components/core/layouts/art-settings-panel/widget/SettingHeader.vue'. -->
  <!-- Auto Comment: Component Responsibility: It provides the view structure, interaction entry points, and display containers for this feature. -->
  <div>
    <div class="flex justify-end">
      <div
        @click="$emit('close')"
        class="flex-cc c-p size-7.5 !transition-all duration-200 rounded hover:bg-g-300/80"
      >
        <ArtSvgIcon icon="ri:close-fill" class="block text-xl text-g-600" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  // Auto Comment: Component Script Notes: This script block manages state, events, and data flow for '元数据管理平台/src/components/core/layouts/art-settings-panel/widget/SettingHeader.vue'.
  // Auto Comment: Maintenance Hint: Keep business rules explicit and avoid implicit side effects between handlers.
  defineEmits<{
    close: []
  }>()
</script>
