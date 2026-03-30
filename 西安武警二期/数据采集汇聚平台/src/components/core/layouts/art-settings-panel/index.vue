<!-- 设置面板 -->
<template>
  <!-- Auto Comment: Component Summary: This component renders UI for '数据采集汇聚平台/src/components/core/layouts/art-settings-panel/index.vue'. -->
  <!-- Auto Comment: Component Responsibility: It provides the view structure, interaction entry points, and display containers for this feature. -->
  <div class="layout-settings">
    <SettingDrawer v-model="showDrawer" @open="handleOpen" @close="handleClose">
      <!-- 头部关闭按钮 -->
      <SettingHeader @close="closeDrawer" />
      <!-- 主题风格 -->
      <ThemeSettings />
      <!-- 菜单布局 -->
      <MenuLayoutSettings />
      <!-- 菜单风格 -->
      <MenuStyleSettings />
      <!-- 系统主题色 -->
      <ColorSettings />
      <!-- 盒子样式 -->
      <BoxStyleSettings />
      <!-- 容器宽度 -->
      <ContainerSettings />
      <!-- 基础配置 -->
      <BasicSettings />
      <!-- 操作按钮 -->
      <SettingActions />
    </SettingDrawer>
  </div>
</template>

<script setup lang="ts">
  // Auto Comment: Component Script Notes: This script block manages state, events, and data flow for '数据采集汇聚平台/src/components/core/layouts/art-settings-panel/index.vue'.
  // Auto Comment: Maintenance Hint: Keep business rules explicit and avoid implicit side effects between handlers.
  import { useSettingsPanel } from './composables/useSettingsPanel'

  import SettingDrawer from './widget/SettingDrawer.vue'
  import SettingHeader from './widget/SettingHeader.vue'
  import ThemeSettings from './widget/ThemeSettings.vue'
  import MenuLayoutSettings from './widget/MenuLayoutSettings.vue'
  import MenuStyleSettings from './widget/MenuStyleSettings.vue'
  import ColorSettings from './widget/ColorSettings.vue'
  import BoxStyleSettings from './widget/BoxStyleSettings.vue'
  import ContainerSettings from './widget/ContainerSettings.vue'
  import BasicSettings from './widget/BasicSettings.vue'
  import SettingActions from './widget/SettingActions.vue'

  defineOptions({ name: 'ArtSettingsPanel' })

  interface Props {
    /** 是否打开 */
    open?: boolean
  }

  const props = defineProps<Props>()

  // 使用设置面板逻辑
  const settingsPanel = useSettingsPanel()
  const { showDrawer } = settingsPanel

  // 获取各种处理器
  const { handleOpen, handleClose, closeDrawer } = settingsPanel.useDrawerControl()
  const { initializeSettings, cleanupSettings } = settingsPanel.useSettingsInitializer()

  // 监听 props 变化
  settingsPanel.usePropsWatcher(props)

  onMounted(() => {
    initializeSettings()
  })

  onUnmounted(() => {
    cleanupSettings()
  })
</script>

<style lang="scss">
  /* Auto Comment: Component Style Notes: Styles in this block define visual layout and interaction feedback for '数据采集汇聚平台/src/components/core/layouts/art-settings-panel/index.vue'. */
  /* Auto Comment: Consistency Rule: Preserve spacing rhythm, typography hierarchy, and state visibility across breakpoints. */
  @use './style';
</style>
