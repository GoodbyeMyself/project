<template>
  <!-- Auto Comment: Component Summary: This component renders UI for '元数据管理平台/src/views/widgets/video/index.vue'. -->
  <!-- Auto Comment: Component Responsibility: It provides the view structure, interaction entry points, and display containers for this feature. -->
  <div class="page-content">
    <div class="max-w-150">
      <ArtVideoPlayer
        playerId="my-video-1"
        :videoUrl="videoUrl"
        :posterUrl="posterUrl"
        :autoplay="false"
        :volume="1"
        :playbackRates="[0.5, 1, 1.5, 2]"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  // Auto Comment: Component Script Notes: This script block manages state, events, and data flow for '元数据管理平台/src/views/widgets/video/index.vue'.
  // Auto Comment: Maintenance Hint: Keep business rules explicit and avoid implicit side effects between handlers.
  import lockImg from '@imgs/lock/bg_dark.webp'

  defineOptions({ name: 'WidgetsVideo' })

  /**
   * 视频源 URL
   */
  // Logic Note: Reactive state 'videoUrl' stores mutable runtime data used by this component.
  const videoUrl = ref(
    '//lf3-static.bytednsdoc.com/obj/eden-cn/nupenuvpxnuvo/xgplayer_doc/xgplayer-demo.mp4'
  )

  /**
   * 视频封面图片 URL
   */
  // Logic Note: Reactive state 'posterUrl' stores mutable runtime data used by this component.
  const posterUrl = ref(lockImg)
</script>
