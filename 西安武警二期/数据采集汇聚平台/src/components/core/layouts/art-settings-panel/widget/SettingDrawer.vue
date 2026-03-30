<template>
  <!-- Auto Comment: Component Summary: This component renders UI for '数据采集汇聚平台/src/components/core/layouts/art-settings-panel/widget/SettingDrawer.vue'. -->
  <!-- Auto Comment: Component Responsibility: It provides the view structure, interaction entry points, and display containers for this feature. -->
  <div class="setting-drawer">
    <ElDrawer
      size="300px"
      v-model="visible"
      :lock-scroll="true"
      :with-header="false"
      :before-close="handleClose"
      :destroy-on-close="false"
      modal-class="setting-modal"
      @open="handleOpen"
      @close="handleDrawerClose"
    >
      <div class="drawer-con">
        <slot />
      </div>
    </ElDrawer>
  </div>
</template>

<script setup lang="ts">
  // Auto Comment: Component Script Notes: This script block manages state, events, and data flow for '数据采集汇聚平台/src/components/core/layouts/art-settings-panel/widget/SettingDrawer.vue'.
  // Auto Comment: Maintenance Hint: Keep business rules explicit and avoid implicit side effects between handlers.
  interface Props {
    modelValue: boolean
  }

  interface Emits {
    (e: 'update:modelValue', value: boolean): void
    (e: 'open'): void
    (e: 'close'): void
  }

  const props = defineProps<Props>()
  const emit = defineEmits<Emits>()

  // Logic Note: Computed value 'visible' derives UI state from reactive sources and updates automatically.
  const visible = computed({
    get: () => props.modelValue,
    set: (value: boolean) => emit('update:modelValue', value)
  })

  // Logic Note: Handler 'handleOpen' encapsulates a single interaction or data-processing flow.
  const handleOpen = () => {
    emit('open')
  }

  // Logic Note: Handler 'handleDrawerClose' encapsulates a single interaction or data-processing flow.
  const handleDrawerClose = () => {
    emit('close')
  }

  // Logic Note: Handler 'handleClose' encapsulates a single interaction or data-processing flow.
  const handleClose = () => {
    visible.value = false
  }
</script>
