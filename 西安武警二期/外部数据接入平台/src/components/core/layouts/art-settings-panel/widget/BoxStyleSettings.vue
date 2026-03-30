<template>
  <!-- Auto Comment: Component Summary: This component renders UI for '外部数据接入平台/src/components/core/layouts/art-settings-panel/widget/BoxStyleSettings.vue'. -->
  <!-- Auto Comment: Component Responsibility: It provides the view structure, interaction entry points, and display containers for this feature. -->
  <div>
    <SectionTitle :title="$t('setting.box.title')" class="mt-10" />
    <div class="box-border flex-cb p-1 mt-5 rounded-lg bg-g-200">
      <div
        v-for="option in boxStyleOptions"
        :key="option.value"
        class="w-[calc(50%-3px)] h-8.5 leading-8.5 text-sm text-center c-p select-none rounded-md transition-all duration-200"
        :class="
          isActive(option.type)
            ? 'text-g-800 bg-[var(--default-box-color)] dark:!text-white dark:bg-g-300'
            : 'hover:text-g-800 hover:bg-black/[0.04] dark:hover:bg-black/20'
        "
        @click="boxStyleHandlers.setBoxMode(option.type)"
      >
        {{ option.label }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  // Auto Comment: Component Script Notes: This script block manages state, events, and data flow for '外部数据接入平台/src/components/core/layouts/art-settings-panel/widget/BoxStyleSettings.vue'.
  // Auto Comment: Maintenance Hint: Keep business rules explicit and avoid implicit side effects between handlers.
  import SectionTitle from './SectionTitle.vue'
  import { useSettingStore } from '@/store/modules/setting'
  import { useSettingsConfig } from '../composables/useSettingsConfig'
  import { useSettingsHandlers } from '../composables/useSettingsHandlers'
  import { storeToRefs } from 'pinia'

  const settingStore = useSettingStore()
  const { boxBorderMode } = storeToRefs(settingStore)
  const { boxStyleOptions } = useSettingsConfig()
  const { boxStyleHandlers } = useSettingsHandlers()

  // 判断当前选项是否激活
  const isActive = (type: 'border-mode' | 'shadow-mode') => {
    return type === 'border-mode' ? boxBorderMode.value : !boxBorderMode.value
  }
</script>
