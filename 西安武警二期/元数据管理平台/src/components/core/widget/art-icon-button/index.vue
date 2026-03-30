<!-- 按钮组件 -->
<template>
  <!-- Auto Comment: Component Summary: This component renders UI for '元数据管理平台/src/components/core/widget/art-icon-button/index.vue'. -->
  <!-- Auto Comment: Component Responsibility: It provides the view structure, interaction entry points, and display containers for this feature. -->
  <div
    class="size-8.5 inline-flex flex-cc c-p text-g-600 dark:text-g-800 text-xl rounded tad-300 hover:bg-hover-color"
    :class="{ 'rounded-full': circle }"
  >
    <ArtSvgIcon :icon="icon"></ArtSvgIcon>
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
  // Auto Comment: Component Script Notes: This script block manages state, events, and data flow for '元数据管理平台/src/components/core/widget/art-icon-button/index.vue'.
  // Auto Comment: Maintenance Hint: Keep business rules explicit and avoid implicit side effects between handlers.
  defineOptions({ name: 'ArtIconButton' })

  interface Props {
    /** 图标名称 */
    icon: string
    /** 圆角按钮 */
    circle?: boolean
  }

  withDefaults(defineProps<Props>(), {})
</script>
