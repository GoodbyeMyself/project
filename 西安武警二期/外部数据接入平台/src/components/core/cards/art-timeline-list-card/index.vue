<!-- 时间轴列表卡片 -->
<template>
  <!-- Auto Comment: Component Summary: This component renders UI for '外部数据接入平台/src/components/core/cards/art-timeline-list-card/index.vue'. -->
  <!-- Auto Comment: Component Responsibility: It provides the view structure, interaction entry points, and display containers for this feature. -->
  <div class="art-card p-5">
    <div class="pb-3.5">
      <p class="text-lg font-medium">{{ title }}</p>
      <p class="text-sm text-g-600">{{ subtitle }}</p>
    </div>
    <ElScrollbar :style="{ height: maxHeight }">
      <ElTimeline class="!pl-0.5">
        <ElTimelineItem
          v-for="item in list"
          :key="item.time"
          :timestamp="item.time"
          :placement="TIMELINE_PLACEMENT"
          :color="item.status"
          :center="true"
        >
          <div class="flex-c gap-3">
            <div class="flex-c gap-2">
              <span class="text-sm">{{ item.content }}</span>
              <span v-if="item.code" class="text-sm text-theme"> #{{ item.code }} </span>
            </div>
          </div>
        </ElTimelineItem>
      </ElTimeline>
    </ElScrollbar>
  </div>
</template>

<script setup lang="ts">
  // Auto Comment: Component Script Notes: This script block manages state, events, and data flow for '外部数据接入平台/src/components/core/cards/art-timeline-list-card/index.vue'.
  // Auto Comment: Maintenance Hint: Keep business rules explicit and avoid implicit side effects between handlers.
  defineOptions({ name: 'ArtTimelineListCard' })

  // 常量配置
  const ITEM_HEIGHT = 65
  const TIMELINE_PLACEMENT = 'top'
  const DEFAULT_MAX_COUNT = 5

  interface TimelineItem {
    /** 时间 */
    time: string
    /** 状态颜色 */
    status: string
    /** 内容 */
    content: string
    /** 代码标识 */
    code?: string
  }

  interface Props {
    /** 时间轴列表数据 */
    list: TimelineItem[]
    /** 标题 */
    title: string
    /** 副标题 */
    subtitle?: string
    /** 最大显示数量 */
    maxCount?: number
  }

  // Props 定义和验证
  const props = withDefaults(defineProps<Props>(), {
    title: '',
    subtitle: '',
    maxCount: DEFAULT_MAX_COUNT
  })

  // 计算最大高度
  const maxHeight = computed(() => `${ITEM_HEIGHT * props.maxCount}px`)
</script>
