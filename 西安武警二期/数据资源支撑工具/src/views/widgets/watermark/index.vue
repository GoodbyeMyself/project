<template>
  <!-- Auto Comment: Component Summary: This component renders UI for '数据资源支撑工具/src/views/widgets/watermark/index.vue'. -->
  <!-- Auto Comment: Component Responsibility: It provides the view structure, interaction entry points, and display containers for this feature. -->
  <div class="page-content mb-5">
    <!-- 基础文字水印 -->
    <ElCard class="mb-7.5">
      <template #header>基础文字水印</template>
      <ElWatermark content="Art Design Pro" :font="{ color: 'rgba(128, 128, 128, 0.2)' }">
        <div style="height: 200px"></div>
      </ElWatermark>
    </ElCard>

    <!-- 多行文字水印 -->
    <ElCard class="mb-7.5">
      <template #header>多行文字水印</template>
      <ElWatermark
        :content="['Art Design Pro', '专注用户体验，视觉设计']"
        :font="{ fontSize: 16, color: 'rgba(128, 128, 128, 0.2)' }"
      >
        <div style="height: 200px"></div>
      </ElWatermark>
    </ElCard>

    <!-- 图片水印 -->
    <ElCard class="mb-7.5">
      <template #header>图片水印</template>
      <ElWatermark :image="watermarkImage" :opacity="0.2" :width="80" :height="20">
        <div style="height: 200px"></div>
      </ElWatermark>
    </ElCard>

    <!-- 自定义样式水印 -->
    <ElCard class="mb-7.5">
      <template #header>自定义样式水印</template>
      <ElWatermark
        content="Art Design Pro"
        :font="{
          fontSize: 20,
          fontFamily: 'Arial',
          color: 'rgba(255, 0, 0, 0.3)'
        }"
        :rotate="-22"
        :gap="[100, 100]"
      >
        <div style="height: 200px"></div>
      </ElWatermark>
    </ElCard>

    <ElButton
      :type="settingStore.watermarkVisible ? 'danger' : 'primary'"
      @click="handleWatermarkVisible"
    >
      {{ settingStore.watermarkVisible ? '隐藏全局水印' : '显示全局水印' }}
    </ElButton>
  </div>
</template>

<script setup lang="ts">
  // Auto Comment: Component Script Notes: This script block manages state, events, and data flow for '数据资源支撑工具/src/views/widgets/watermark/index.vue'.
  // Auto Comment: Maintenance Hint: Keep business rules explicit and avoid implicit side effects between handlers.
  import { useSettingStore } from '@/store/modules/setting'

  defineOptions({ name: 'Watermark' })

  const settingStore = useSettingStore()

  /**
   * 水印图片 URL
   */
  // Logic Note: Reactive state 'watermarkImage' stores mutable runtime data used by this component.
  const watermarkImage = ref('https://element-plus.org/images/element-plus-logo.svg')

  /**
   * 切换全局水印显示状态
   */
  // Logic Note: Handler 'handleWatermarkVisible' encapsulates a single interaction or data-processing flow.
  const handleWatermarkVisible = () => {
    useSettingStore().setWatermarkVisible(!settingStore.watermarkVisible)
    ElMessage.success(settingStore.watermarkVisible ? '已显示全局水印' : '已隐藏全局水印')
  }
</script>
