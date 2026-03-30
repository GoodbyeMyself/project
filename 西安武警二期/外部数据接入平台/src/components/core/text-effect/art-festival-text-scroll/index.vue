<!-- 节日文本滚动 -->
<template>
  <!-- Auto Comment: Component Summary: This component renders UI for '外部数据接入平台/src/components/core/text-effect/art-festival-text-scroll/index.vue'. -->
  <!-- Auto Comment: Component Responsibility: It provides the view structure, interaction entry points, and display containers for this feature. -->
  <div
    class="overflow-hidden transition-[height] duration-600 ease-in-out"
    :style="{
      height: showFestivalText ? '48px' : '0'
    }"
  >
    <ArtTextScroll
      v-if="showFestivalText && currentFestivalData?.scrollText !== ''"
      :text="currentFestivalData?.scrollText || ''"
      style="margin-bottom: 12px"
      showClose
      @close="handleClose"
    />
  </div>
</template>

<script setup lang="ts">
  // Auto Comment: Component Script Notes: This script block manages state, events, and data flow for '外部数据接入平台/src/components/core/text-effect/art-festival-text-scroll/index.vue'.
  // Auto Comment: Maintenance Hint: Keep business rules explicit and avoid implicit side effects between handlers.
  import { useSettingStore } from '@/store/modules/setting'
  import { useCeremony } from '@/hooks/core/useCeremony'

  defineOptions({ name: 'ArtFestivalTextScroll' })

  const settingStore = useSettingStore()
  const { showFestivalText } = storeToRefs(settingStore)
  const { currentFestivalData } = useCeremony()

  // Logic Note: Handler 'handleClose' encapsulates a single interaction or data-processing flow.
  const handleClose = () => {
    settingStore.setShowFestivalText(false)
  }
</script>
