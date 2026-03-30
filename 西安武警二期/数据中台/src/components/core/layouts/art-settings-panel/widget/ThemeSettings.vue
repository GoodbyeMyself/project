<template>
  <!-- Auto Comment: Component Summary: This component renders UI for '数据中台/src/components/core/layouts/art-settings-panel/widget/ThemeSettings.vue'. -->
  <!-- Auto Comment: Component Responsibility: It provides the view structure, interaction entry points, and display containers for this feature. -->
  <SectionTitle :title="$t('setting.theme.title')" />
  <div class="setting-box-wrap">
    <div
      class="setting-item"
      v-for="(item, index) in configOptions.themeList"
      :key="item.theme"
      @click="switchThemeStyles(item.theme)"
    >
      <div class="box" :class="{ 'is-active': item.theme === systemThemeMode }">
        <img :src="item.img" />
      </div>
      <p class="name">{{ $t(`setting.theme.list[${index}]`) }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
  // Auto Comment: Component Script Notes: This script block manages state, events, and data flow for '数据中台/src/components/core/layouts/art-settings-panel/widget/ThemeSettings.vue'.
  // Auto Comment: Maintenance Hint: Keep business rules explicit and avoid implicit side effects between handlers.
  import SectionTitle from './SectionTitle.vue'
  import { useSettingStore } from '@/store/modules/setting'
  import { useSettingsConfig } from '../composables/useSettingsConfig'
  import { useTheme } from '@/hooks/core/useTheme'

  const settingStore = useSettingStore()
  const { systemThemeMode } = storeToRefs(settingStore)
  const { configOptions } = useSettingsConfig()
  const { switchThemeStyles } = useTheme()
</script>
