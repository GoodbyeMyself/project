<!-- 统计卡片 -->
<template>
  <!-- Auto Comment: Component Summary: This component renders UI for '元数据管理平台/src/components/core/cards/art-stats-card/index.vue'. -->
  <!-- Auto Comment: Component Responsibility: It provides the view structure, interaction entry points, and display containers for this feature. -->
  <div
    class="art-card h-32 flex-c px-5 transition-transform duration-200 hover:-translate-y-0.5"
    :class="boxStyle"
  >
    <div v-if="icon" class="mr-4 size-11 flex-cc rounded-lg text-xl text-white" :class="iconStyle">
      <ArtSvgIcon :icon="icon"></ArtSvgIcon>
    </div>
    <div class="flex-1">
      <p class="m-0 text-lg font-medium" :style="{ color: textColor }" v-if="title">
        {{ title }}
      </p>
      <ArtCountTo
        class="m-0 text-2xl font-medium"
        v-if="count !== undefined"
        :target="count"
        :duration="2000"
        :decimals="decimals"
        :separator="separator"
      />
      <p
        class="mt-1 text-sm text-g-500 opacity-90"
        :style="{ color: textColor }"
        v-if="description"
        >{{ description }}</p
      >
    </div>
    <div v-if="showArrow">
      <ArtSvgIcon icon="ri:arrow-right-s-line" class="text-xl text-g-500" />
    </div>
  </div>
</template>

<script setup lang="ts">
  // Auto Comment: Component Script Notes: This script block manages state, events, and data flow for '元数据管理平台/src/components/core/cards/art-stats-card/index.vue'.
  // Auto Comment: Maintenance Hint: Keep business rules explicit and avoid implicit side effects between handlers.
  defineOptions({ name: 'ArtStatsCard' })

  interface StatsCardProps {
    /** 盒子样式 */
    boxStyle?: string
    /** 图标 */
    icon?: string
    /** 图标样式 */
    iconStyle?: string
    /** 标题 */
    title?: string
    /** 数值 */
    count?: number
    /** 小数位 */
    decimals?: number
    /** 分隔符 */
    separator?: string
    /** 描述 */
    description: string
    /** 文本颜色 */
    textColor?: string
    /** 是否显示箭头 */
    showArrow?: boolean
  }

  withDefaults(defineProps<StatsCardProps>(), {
    iconSize: 30,
    iconBgRadius: 50,
    decimals: 0,
    separator: ','
  })
</script>
