<!-- 返回顶部按钮 -->
<template>
  <!-- Auto Comment: Component Summary: This component renders UI for '元数据管理平台/src/components/core/base/art-back-to-top/index.vue'. -->
  <!-- Auto Comment: Component Responsibility: It provides the view structure, interaction entry points, and display containers for this feature. -->
  <Transition
    enter-active-class="tad-300 ease-out"
    leave-active-class="tad-200 ease-in"
    enter-from-class="opacity-0 translate-y-2"
    enter-to-class="opacity-100 translate-y-0"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 translate-y-2"
  >
    <div
      v-show="showButton"
      class="fixed right-10 bottom-15 size-9.5 flex-cc c-p border border-g-300 rounded-md tad-300 hover:bg-g-200"
      @click="scrollToTop"
    >
      <ArtSvgIcon icon="ri:arrow-up-wide-line" class="text-g-500 text-lg" />
    </div>
  </Transition>
</template>

<script setup lang="ts">
  // Auto Comment: Component Script Notes: This script block manages state, events, and data flow for '元数据管理平台/src/components/core/base/art-back-to-top/index.vue'.
  // Auto Comment: Maintenance Hint: Keep business rules explicit and avoid implicit side effects between handlers.
  import { useCommon } from '@/hooks/core/useCommon'

  defineOptions({ name: 'ArtBackToTop' })

  const { scrollToTop } = useCommon()

  // Logic Note: Reactive state 'showButton' stores mutable runtime data used by this component.
  const showButton = ref(false)
  const scrollThreshold = 300

  onMounted(() => {
    const scrollContainer = document.getElementById('app-main')
    if (scrollContainer) {
      const { y } = useScroll(scrollContainer)
      // Logic Note: Watcher keeps dependent state synchronized when observed sources change.
      watch(y, (newY: number) => {
        showButton.value = newY > scrollThreshold
      })
    }
  })
</script>
