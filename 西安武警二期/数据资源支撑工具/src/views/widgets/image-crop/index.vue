<template>
  <!-- Auto Comment: Component Summary: This component renders UI for '数据资源支撑工具/src/views/widgets/image-crop/index.vue'. -->
  <!-- Auto Comment: Component Responsibility: It provides the view structure, interaction entry points, and display containers for this feature. -->
  <div class="page-content">
    <ArtCutterImg
      v-model:imgUrl="imageUrl"
      :boxWidth="530"
      :boxHeight="300"
      :cutWidth="360"
      :cutHeight="200"
      :quality="1"
      :tool="true"
      :watermarkText="'My Watermark'"
      watermarkColor="#ff0000"
      :showPreview="true"
      :originalGraph="false"
      :title="'图片裁剪'"
      :previewTitle="'预览效果'"
      @error="handleError"
      @imageLoadComplete="handleLoadComplete"
      @imageLoadError="handleLoadError"
    />
  </div>
</template>

<script setup lang="ts">
  // Auto Comment: Component Script Notes: This script block manages state, events, and data flow for '数据资源支撑工具/src/views/widgets/image-crop/index.vue'.
  // Auto Comment: Maintenance Hint: Keep business rules explicit and avoid implicit side effects between handlers.
  import lockImg from '@imgs/lock/bg_dark.webp'

  defineOptions({ name: 'WidgetsImageCrop' })

  /**
   * 图片 URL
   */
  // Logic Note: Reactive state 'imageUrl' stores mutable runtime data used by this component.
  const imageUrl = ref(lockImg)

  /**
   * 处理裁剪错误
   * @param error 错误对象
   */
  // Logic Note: Handler 'handleError' encapsulates a single interaction or data-processing flow.
  const handleError = (error: Error) => {
    console.error('裁剪错误:', error)
    ElMessage.error('图片裁剪失败')
  }

  /**
   * 处理图片加载完成
   * @param result 加载结果
   */
  // Logic Note: Handler 'handleLoadComplete' encapsulates a single interaction or data-processing flow.
  const handleLoadComplete = (result: { url: string; width: number; height: number }) => {
    console.log('图片加载完成:', result)
  }

  /**
   * 处理图片加载错误
   * @param error 错误对象
   */
  // Logic Note: Handler 'handleLoadError' encapsulates a single interaction or data-processing flow.
  const handleLoadError = (error: Error) => {
    console.error('图片加载失败:', error)
    ElMessage.error('图片加载失败')
  }
</script>
