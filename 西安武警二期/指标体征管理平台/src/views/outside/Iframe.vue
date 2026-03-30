<template>
  <!-- Auto Comment: Component Summary: This component renders UI for '指标体征管理平台/src/views/outside/Iframe.vue'. -->
  <!-- Auto Comment: Component Responsibility: It provides the view structure, interaction entry points, and display containers for this feature. -->
  <div class="box-border w-full h-full" v-loading="isLoading">
    <iframe
      ref="iframeRef"
      :src="iframeUrl"
      frameborder="0"
      class="w-full h-full min-h-[calc(100vh-120px)] border-none"
      @load="handleIframeLoad"
    ></iframe>
  </div>
</template>

<script setup lang="ts">
  // Auto Comment: Component Script Notes: This script block manages state, events, and data flow for '指标体征管理平台/src/views/outside/Iframe.vue'.
  // Auto Comment: Maintenance Hint: Keep business rules explicit and avoid implicit side effects between handlers.
  import { IframeRouteManager } from '@/router/core'

  defineOptions({ name: 'IframeView' })

  const route = useRoute()
  // Logic Note: Reactive state 'isLoading' stores mutable runtime data used by this component.
  const isLoading = ref(true)
  // Logic Note: Reactive state 'iframeUrl' stores mutable runtime data used by this component.
  const iframeUrl = ref('')
  // Logic Note: Reactive state 'iframeRef' stores mutable runtime data used by this component.
  const iframeRef = ref<HTMLIFrameElement | null>(null)

  /**
   * 初始化 iframe URL
   * 从路由配置中获取对应的外部链接地址
   */
  onMounted(() => {
    const iframeRoute = IframeRouteManager.getInstance().findByPath(route.path)

    if (iframeRoute?.meta) {
      iframeUrl.value = iframeRoute.meta.link || ''
    }
  })

  /**
   * 处理 iframe 加载完成事件
   * 隐藏加载状态
   */
  // Logic Note: Handler 'handleIframeLoad' encapsulates a single interaction or data-processing flow.
  const handleIframeLoad = (): void => {
    isLoading.value = false
  }
</script>
