<template>
  <!-- Auto Comment: Component Summary: This component renders UI for '数据中台/src/components/core/layouts/art-settings-panel/widget/BasicSettings.vue'. -->
  <!-- Auto Comment: Component Responsibility: It provides the view structure, interaction entry points, and display containers for this feature. -->
  <div>
    <SectionTitle :title="$t('setting.basics.title')" class="mt-10" />
    <SettingItem
      v-for="config in basicSettingsConfig"
      :key="config.key"
      :config="config"
      :model-value="getSettingValue(config.key)"
      @change="handleSettingChange(config.handler, $event)"
    />
  </div>
</template>

<script setup lang="ts">
  // Auto Comment: Component Script Notes: This script block manages state, events, and data flow for '数据中台/src/components/core/layouts/art-settings-panel/widget/BasicSettings.vue'.
  // Auto Comment: Maintenance Hint: Keep business rules explicit and avoid implicit side effects between handlers.
  import SectionTitle from './SectionTitle.vue'
  import SettingItem from './SettingItem.vue'
  import { useSettingStore } from '@/store/modules/setting'
  import { useSettingsConfig } from '../composables/useSettingsConfig'
  import { useSettingsHandlers } from '../composables/useSettingsHandlers'
  import { storeToRefs } from 'pinia'

  const settingStore = useSettingStore()
  const { basicSettingsConfig } = useSettingsConfig()
  const { basicHandlers } = useSettingsHandlers()

  // 获取store的响应式状态
  const {
    uniqueOpened,
    showMenuButton,
    showFastEnter,
    showRefreshButton,
    showCrumbs,
    showWorkTab,
    showLanguage,
    showNprogress,
    colorWeak,
    watermarkVisible,
    menuOpenWidth,
    tabStyle,
    pageTransition,
    customRadius
  } = storeToRefs(settingStore)

  // 创建设置值映射
  const settingValueMap = {
    uniqueOpened,
    showMenuButton,
    showFastEnter,
    showRefreshButton,
    showCrumbs,
    showWorkTab,
    showLanguage,
    showNprogress,
    colorWeak,
    watermarkVisible,
    menuOpenWidth,
    tabStyle,
    pageTransition,
    customRadius
  }

  // 获取设置值的方法
  const getSettingValue = (key: string) => {
    const settingRef = settingValueMap[key as keyof typeof settingValueMap]
    return settingRef?.value ?? null
  }

  // 统一的设置变更处理
  const handleSettingChange = (handlerName: string, value: any) => {
    const handler = (basicHandlers as any)[handlerName]
    if (typeof handler === 'function') {
      handler(value)
    } else {
      console.warn(`Handler "${handlerName}" not found in basicHandlers`)
    }
  }
</script>
