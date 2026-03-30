<!-- 数据列表卡片 -->
<template>
  <!-- Auto Comment: Component Summary: This component renders UI for '指标体征管理平台/src/components/core/cards/art-data-list-card/index.vue'. -->
  <!-- Auto Comment: Component Responsibility: It provides the view structure, interaction entry points, and display containers for this feature. -->
  <div class="art-card p-5">
    <div class="pb-3.5">
      <p class="text-lg font-medium">{{ title }}</p>
      <p class="text-sm text-g-600">{{ subtitle }}</p>
    </div>
    <ElScrollbar :style="{ height: maxHeight }">
      <div v-for="(item, index) in list" :key="index" class="flex-c py-3">
        <div v-if="item.icon" class="flex-cc mr-3 size-10 rounded-lg" :class="item.class">
          <ArtSvgIcon :icon="item.icon" class="text-xl" />
        </div>
        <div class="flex-1">
          <div class="mb-1 text-sm">{{ item.title }}</div>
          <div class="text-xs text-g-500">{{ item.status }}</div>
        </div>
        <div class="ml-3 text-xs text-g-500">{{ item.time }}</div>
      </div>
    </ElScrollbar>
    <ElButton
      class="mt-[25px] w-full text-center"
      v-if="showMoreButton"
      v-ripple
      @click="handleMore"
      >查看更多</ElButton
    >
  </div>
</template>

<script setup lang="ts">
  // Auto Comment: Component Script Notes: This script block manages state, events, and data flow for '指标体征管理平台/src/components/core/cards/art-data-list-card/index.vue'.
  // Auto Comment: Maintenance Hint: Keep business rules explicit and avoid implicit side effects between handlers.
  defineOptions({ name: 'ArtDataListCard' })

  interface Props {
    /** 数据列表 */
    list: Activity[]
    /** 标题 */
    title: string
    /** 副标题 */
    subtitle?: string
    /** 最大显示数量 */
    maxCount?: number
    /** 是否显示更多按钮 */
    showMoreButton?: boolean
  }

  interface Activity {
    /** 标题 */
    title: string
    /** 状态 */
    status: string
    /** 时间 */
    time: string
    /** 样式类名 */
    class: string
    /** 图标 */
    icon: string
  }

  const ITEM_HEIGHT = 66
  const DEFAULT_MAX_COUNT = 5

  const props = withDefaults(defineProps<Props>(), {
    maxCount: DEFAULT_MAX_COUNT
  })

  // Logic Note: Computed value 'maxHeight' derives UI state from reactive sources and updates automatically.
  const maxHeight = computed(() => `${ITEM_HEIGHT * props.maxCount}px`)

  const emit = defineEmits<{
    /** 点击更多按钮事件 */
    (e: 'more'): void
  }>()

  // Logic Note: Handler 'handleMore' encapsulates a single interaction or data-processing flow.
  const handleMore = () => emit('more')
</script>
