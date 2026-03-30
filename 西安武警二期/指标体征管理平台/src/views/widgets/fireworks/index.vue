<template>
  <!-- Auto Comment: Component Summary: This component renders UI for '指标体征管理平台/src/views/widgets/fireworks/index.vue'. -->
  <!-- Auto Comment: Component Responsibility: It provides the view structure, interaction entry points, and display containers for this feature. -->
  <div class="page-content">
    <div class="mb-5">
      <ElSpace wrap>
        <ElButton :disabled="isLaunching" v-ripple @click="handleSingleLaunch"
          >✨ 放个小礼花</ElButton
        >
        <ElButton :disabled="isLaunching" v-ripple @click="handleImageLaunch(bp)"
          >🎉 打开幸运红包</ElButton
        >
        <ElButton :disabled="isLaunching" v-ripple @click="handleMultipleLaunch('')"
          >🎆 璀璨烟火秀</ElButton
        >
        <ElButton :disabled="isLaunching" v-ripple @click="handleImageLaunch(sd)"
          >❄️ 飘点小雪花</ElButton
        >
        <ElButton :disabled="isLaunching" v-ripple @click="handleMultipleLaunch(sd)"
          >❄️ 浪漫暴风雪</ElButton
        >
      </ElSpace>
    </div>

    <ElDescriptions
      title="礼花组件说明"
      direction="vertical"
      :column="1"
      border
      style="margin-top: 50px"
    >
      <ElDescriptionsItem label="显示时机">
        礼花效果组件已全局注册，触发时机由配置文件控制。默认配置中的日期已过，不会在你使用过程中再次触发，无需担心。
      </ElDescriptionsItem>
      <ElDescriptionsItem label="礼花样式">
        默认显示几何图形，可以配置图片，图片需要提前在
        src/components/core/layouts/art-fireworks-effect/index.vue 文件预先定义
      </ElDescriptionsItem>
      <ElDescriptionsItem label="配置文件">
        在 src/config/festival.ts 文件中，可以配置节日和对应的礼花样式
      </ElDescriptionsItem>
      <ElDescriptionsItem label="快捷键">
        command + shift + p 或者 ctrl + shift + p
      </ElDescriptionsItem>
    </ElDescriptions>
  </div>
</template>

<script setup lang="ts">
  // Auto Comment: Component Script Notes: This script block manages state, events, and data flow for '指标体征管理平台/src/views/widgets/fireworks/index.vue'.
  // Auto Comment: Maintenance Hint: Keep business rules explicit and avoid implicit side effects between handlers.
  import { mittBus } from '@/utils/sys'
  import bp from '@imgs/ceremony/hb.png'
  import sd from '@imgs/ceremony/sd.png'

  defineOptions({ name: 'WidgetsFireworks' })

  // Logic Note: Reactive state 'timerRef' stores mutable runtime data used by this component.
  const timerRef = ref<ReturnType<typeof setInterval> | null>(null)
  // Logic Note: Reactive state 'isLaunching' stores mutable runtime data used by this component.
  const isLaunching = ref(false)

  /**
   * 触发连续礼花效果
   * @param count 发射次数
   * @param src 图片资源路径
   */
  // Logic Note: Handler 'triggerFireworks' encapsulates a single interaction or data-processing flow.
  const triggerFireworks = (count: number, src: string) => {
    // 清除之前的定时器
    if (timerRef.value) {
      clearInterval(timerRef.value)
      timerRef.value = null
    }

    isLaunching.value = true

    let fired = 0
    timerRef.value = setInterval(() => {
      mittBus.emit('triggerFireworks', src)
      fired++

      if (fired >= count) {
        clearInterval(timerRef.value!)
        timerRef.value = null
        isLaunching.value = false
      }
    }, 1000)
  }

  /**
   * 发射单个礼花
   */
  // Logic Note: Handler 'handleSingleLaunch' encapsulates a single interaction or data-processing flow.
  const handleSingleLaunch = () => {
    mittBus.emit('triggerFireworks')
  }

  /**
   * 发射多个礼花
   * @param src 图片资源路径
   */
  // Logic Note: Handler 'handleMultipleLaunch' encapsulates a single interaction or data-processing flow.
  const handleMultipleLaunch = (src: string) => {
    triggerFireworks(10, src)
  }

  /**
   * 发射带图片的礼花
   * @param src 图片资源路径
   */
  // Logic Note: Handler 'handleImageLaunch' encapsulates a single interaction or data-processing flow.
  const handleImageLaunch = (src: string) => {
    mittBus.emit('triggerFireworks', src)
  }

  /**
   * 组件卸载时清理定时器
   */
  onUnmounted(() => {
    if (timerRef.value) {
      clearInterval(timerRef.value)
      timerRef.value = null
    }
  })
</script>
