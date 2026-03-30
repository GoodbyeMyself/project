<template>
  <!-- Auto Comment: Component Summary: This component renders UI for '数据资源支撑工具/src/components/core/layouts/art-settings-panel/widget/ColorSettings.vue'. -->
  <!-- Auto Comment: Component Responsibility: It provides the view structure, interaction entry points, and display containers for this feature. -->
  <div>
    <SectionTitle :title="$t('setting.color.title')" class="mt-10" />
    <div class="-mr-4">
      <div class="flex flex-wrap">
        <div
          v-for="color in configOptions.mainColors"
          :key="color"
          class="flex items-center justify-center size-[23px] mr-4 mb-2.5 cursor-pointer rounded-full transition-all duration-200 hover:opacity-85"
          :style="{ background: `${color} !important` }"
          @click="colorHandlers.selectColor(color)"
        >
          <ArtSvgIcon
            icon="ri:check-fill"
            class="text-base !text-white"
            v-show="color === systemThemeColor"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  // Auto Comment: Component Script Notes: This script block manages state, events, and data flow for '数据资源支撑工具/src/components/core/layouts/art-settings-panel/widget/ColorSettings.vue'.
  // Auto Comment: Maintenance Hint: Keep business rules explicit and avoid implicit side effects between handlers.
  import SectionTitle from './SectionTitle.vue'
  import { useSettingStore } from '@/store/modules/setting'
  import { useSettingsConfig } from '../composables/useSettingsConfig'
  import { useSettingsHandlers } from '../composables/useSettingsHandlers'
  import { storeToRefs } from 'pinia'

  const settingStore = useSettingStore()
  const { systemThemeColor } = storeToRefs(settingStore)
  const { configOptions } = useSettingsConfig()
  const { colorHandlers } = useSettingsHandlers()
</script>
