<template>
  <!-- Auto Comment: Component Summary: This component renders UI for '指标体征管理平台/src/components/core/layouts/art-settings-panel/widget/MenuLayoutSettings.vue'. -->
  <!-- Auto Comment: Component Responsibility: It provides the view structure, interaction entry points, and display containers for this feature. -->
  <div v-if="width > 1000">
    <SectionTitle :title="$t('setting.menuType.title')" />
    <div class="setting-box-wrap">
      <div
        class="setting-item"
        v-for="(item, index) in configOptions.menuLayoutList"
        :key="item.value"
        @click="switchMenuLayouts(item.value)"
      >
        <div class="box" :class="{ 'is-active': item.value === menuType, 'mt-16': index > 2 }">
          <img :src="item.img" />
        </div>
        <p class="name">{{ $t(`setting.menuType.list[${index}]`) }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  // Auto Comment: Component Script Notes: This script block manages state, events, and data flow for '指标体征管理平台/src/components/core/layouts/art-settings-panel/widget/MenuLayoutSettings.vue'.
  // Auto Comment: Maintenance Hint: Keep business rules explicit and avoid implicit side effects between handlers.
  import SectionTitle from './SectionTitle.vue'
  import { useSettingStore } from '@/store/modules/setting'
  import { useSettingsConfig } from '../composables/useSettingsConfig'
  import { useSettingsState } from '../composables/useSettingsState'

  const { width } = useWindowSize()
  const settingStore = useSettingStore()
  const { menuType } = storeToRefs(settingStore)
  const { configOptions } = useSettingsConfig()
  const { switchMenuLayouts } = useSettingsState()
</script>
