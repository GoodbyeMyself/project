<template>
  <!-- Auto Comment: Component Summary: This component renders UI for '数据采集汇聚平台/src/views/article/comment/index.vue'. -->
  <!-- Auto Comment: Component Responsibility: It provides the view structure, interaction entry points, and display containers for this feature. -->
  <div class="flex flex-col gap-4 pb-5">
    <ElCard>
      <template #header>
        <div class="flex-cb gap-3">
          <div>
            <h3 class="m-0 text-base font-medium">{{ pageConfig.title }}</h3>
            <p class="m-0 mt-1 text-sm text-g-700">{{ pageConfig.description }}</p>
          </div>
          <ElTag :type="pageConfig.tagType">{{ pageConfig.tagText }}</ElTag>
        </div>
      </template>

      <ElTable :data="pageConfig.tableData" border>
        <ElTableColumn v-for="column in pageConfig.columns" :key="column.prop" :prop="column.prop" :label="column.label" :width="column.width" :min-width="column.minWidth" />
      </ElTable>
    </ElCard>

    <ElCard>
      <template #header><span class="font-medium">{{ pageConfig.statsTitle }}</span></template>
      <ElRow :gutter="20">
        <ElCol :xs="24" :md="8" v-for="item in pageConfig.stats" :key="item.label">
          <div class="stat-box">
            <div class="text-lg font-semibold">{{ item.value }}</div>
            <div class="mt-1 text-sm text-g-700">{{ item.label }}</div>
          </div>
        </ElCol>
      </ElRow>
    </ElCard>
  </div>
</template>

<script setup lang="ts">
  // Auto Comment: Component Script Notes: This script block manages state, events, and data flow for '数据采集汇聚平台/src/views/article/comment/index.vue'.
  // Auto Comment: Maintenance Hint: Keep business rules explicit and avoid implicit side effects between handlers.
  import { useRoute } from 'vue-router'

  defineOptions({ name: 'ArticleCommentBusinessPage' })

  type TagType = 'primary' | 'success' | 'warning' | 'danger' | 'info'

  interface TableColumn {
    prop: string
    label: string
    width?: number
    minWidth?: number
  }

  interface StatItem {
    label: string
    value: string
  }

  interface PageConfig {
    title: string
    description: string
    tagText: string
    tagType: TagType
    statsTitle: string
    columns: TableColumn[]
    tableData: Record<string, string>[]
    stats: StatItem[]
  }

  const route = useRoute()

  // Logic Note: Computed value 'pageConfig' derives UI state from reactive sources and updates automatically.
  const pageConfig = computed<PageConfig>(() => {
    if (route.name === 'AbnormalDataProcess') {
      return {
        title: '异常数据处理',
        description: '集中查看异常数据类型、处理策略、影响范围与修复建议。',
        tagText: '待处理 4 条',
        tagType: 'warning',
        statsTitle: '异常处理统计',
        columns: [
          { prop: 'name', label: '数据名称', minWidth: 180 },
          { prop: 'type', label: '异常类型', width: 140 },
          { prop: 'source', label: '来源任务', minWidth: 160 },
          { prop: 'impact', label: '影响范围', minWidth: 180 },
          { prop: 'suggestion', label: '处理建议', minWidth: 220 }
        ],
        tableData: [
          { name: '人员画像批次-0329', type: '字段缺失', source: '目标画像标准化', impact: '2 条记录无法入库', suggestion: '补录证件号后重新执行标准化' },
          { name: '车辆轨迹批次-041', type: '时间格式错误', source: '轨迹清洗任务', impact: '时间轴排序异常', suggestion: '统一转换为 yyyy-MM-dd HH:mm:ss' },
          { name: '布控名单批次-007', type: '重复数据', source: '名单同步任务', impact: '命中结果重复', suggestion: '按证件号去重并保留最新版本' }
        ],
        stats: [
          { label: '字段异常', value: '2 项' },
          { label: '格式异常', value: '1 项' },
          { label: '重复数据', value: '1 项' }
        ]
      }
    }

    if (route.name === 'MessageHandleManage') {
      return {
        title: '消息通知处理',
        description: '查看通知消息状态、接收对象、处置进度与跟踪结果。',
        tagText: '未读消息 2 条',
        tagType: 'primary',
        statsTitle: '通知处理统计',
        columns: [
          { prop: 'title', label: '消息标题', minWidth: 200 },
          { prop: 'channel', label: '通知方式', width: 120 },
          { prop: 'receiver', label: '接收对象', minWidth: 160 },
          { prop: 'status', label: '处理状态', width: 120 },
          { prop: 'result', label: '跟踪结果', minWidth: 220 }
        ],
        tableData: [
          { title: '边境雷达一号心跳超时', channel: '站内信', receiver: '边境设备值守组', status: '已送达', result: '值班员已确认并开始排查' },
          { title: '采集链路延迟波动提醒', channel: '短信', receiver: '平台运维组', status: '处理中', result: '正在检查 Kafka 输入消费堆积情况' },
          { title: '夜间备份任务执行成功', channel: '邮件', receiver: '数据管理组', status: '已归档', result: '通知记录已同步至台账' }
        ],
        stats: [
          { label: '已送达', value: '2 条' },
          { label: '处理中', value: '1 条' },
          { label: '已归档', value: '1 条' }
        ]
      }
    }

    return {
      title: '异常设备列表',
      description: '集中查看异常设备、异常类型、影响范围和处置建议。',
      tagText: '异常设备 3 台',
      tagType: 'danger',
      statsTitle: '异常统计',
      columns: [
        { prop: 'name', label: '设备名称', minWidth: 180 },
        { prop: 'type', label: '异常类型', width: 140 },
        { prop: 'level', label: '告警级别', width: 120 },
        { prop: 'impact', label: '影响范围', minWidth: 180 },
        { prop: 'suggestion', label: '处置建议', minWidth: 220 }
      ],
      tableData: [
        { name: '卡口抓拍终端', type: '连接中断', level: '严重', impact: '视频采集链路不可用', suggestion: '检查网络与终端电源，恢复后重新建立连接' },
        { name: '巡逻车载终端', type: '数据延迟', level: '一般', impact: '轨迹数据上报延后', suggestion: '检查车载网络信号与缓存队列' },
        { name: '边境雷达二号', type: '心跳异常', level: '一般', impact: '设备状态不稳定', suggestion: '核对采集频率与超时阈值配置' }
      ],
      stats: [
        { label: '严重异常', value: '1 台' },
        { label: '一般异常', value: '2 台' },
        { label: '待处置', value: '3 项' }
      ]
    }
  })
</script>

<style scoped>
  /* Auto Comment: Component Style Notes: Styles in this block define visual layout and interaction feedback for '数据采集汇聚平台/src/views/article/comment/index.vue'. */
  /* Auto Comment: Consistency Rule: Preserve spacing rhythm, typography hierarchy, and state visibility across breakpoints. */
  .stat-box {
    padding: 16px;
    border: 1px solid var(--el-border-color-light);
    border-radius: 12px;
    background: var(--el-fill-color-blank);
  }
</style>
