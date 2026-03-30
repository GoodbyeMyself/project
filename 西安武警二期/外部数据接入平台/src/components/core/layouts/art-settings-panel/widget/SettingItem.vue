<template>
  <!-- Auto Comment: Component Summary: This component renders UI for '外部数据接入平台/src/components/core/layouts/art-settings-panel/widget/SettingItem.vue'. -->
  <!-- Auto Comment: Component Responsibility: It provides the view structure, interaction entry points, and display containers for this feature. -->
  <div class="flex-cb mb-4 last:mb-2" :class="{ 'mobile-hide': config.mobileHide }">
    <span class="text-sm">{{ config.label }}</span>

    <!-- 开关类型 -->
    <ElSwitch v-if="config.type === 'switch'" :model-value="modelValue" @change="handleChange" />

    <!-- 数字输入类型 -->
    <ElInputNumber
      v-else-if="config.type === 'input-number'"
      :model-value="modelValue"
      :min="config.min"
      :max="config.max"
      :step="config.step"
      :style="config.style"
      :controls-position="config.controlsPosition"
      @change="handleChange"
    />

    <!-- 选择器类型 -->
    <ElSelect
      v-else-if="config.type === 'select'"
      :model-value="modelValue"
      :style="config.style"
      @change="handleChange"
    >
      <ElOption
        v-for="option in normalizedOptions"
        :key="option.value"
        :label="option.label"
        :value="option.value"
      />
    </ElSelect>
  </div>
</template>

<script setup lang="ts">
  // Auto Comment: Component Script Notes: This script block manages state, events, and data flow for '外部数据接入平台/src/components/core/layouts/art-settings-panel/widget/SettingItem.vue'.
  // Auto Comment: Maintenance Hint: Keep business rules explicit and avoid implicit side effects between handlers.
  import type { ComputedRef } from 'vue'

  interface SettingItemConfig {
    key: string
    label: string
    type: 'switch' | 'input-number' | 'select'
    handler: string
    mobileHide?: boolean
    min?: number
    max?: number
    step?: number
    style?: Record<string, string>
    controlsPosition?: '' | 'right'
    options?:
      | Array<{ value: any; label: string }>
      | ComputedRef<Array<{ value: any; label: string }>>
  }

  interface Props {
    config: SettingItemConfig
    modelValue: any
  }

  interface Emits {
    (e: 'change', value: any): void
  }

  const props = defineProps<Props>()
  const emit = defineEmits<Emits>()

  // 标准化选项，处理computed和普通数组
  const normalizedOptions = computed(() => {
    if (!props.config.options) return []

    try {
      // 如果是 ComputedRef，则返回其值
      if (typeof props.config.options === 'object' && 'value' in props.config.options) {
        return props.config.options.value || []
      }

      // 如果是普通数组，直接返回
      return Array.isArray(props.config.options) ? props.config.options : []
    } catch (error) {
      console.warn('Error processing options for config:', props.config.key, error)
      return []
    }
  })

  // Logic Note: Handler 'handleChange' encapsulates a single interaction or data-processing flow.
  const handleChange = (value: any) => {
    try {
      emit('change', value)
    } catch (error) {
      console.error('Error handling change for config:', props.config.key, error)
    }
  }
</script>

<style lang="scss" scoped>
  /* Auto Comment: Component Style Notes: Styles in this block define visual layout and interaction feedback for '外部数据接入平台/src/components/core/layouts/art-settings-panel/widget/SettingItem.vue'. */
  /* Auto Comment: Consistency Rule: Preserve spacing rhythm, typography hierarchy, and state visibility across breakpoints. */
  @media screen and (width <= 768px) {
    .mobile-hide {
      display: none !important;
    }
  }
</style>
