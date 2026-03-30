<template>
  <div class="flex flex-col gap-4 pb-5">
    <ElRow :gutter="20">
      <ElCol :xs="24" :lg="16">
        <ElCard>
          <template #header>
            <div class="flex-cb gap-3">
              <div>
                <h3 class="m-0 text-base font-medium">合规性校验</h3>
                <p class="m-0 mt-1 text-sm text-g-700">针对上报批次执行规则校验，识别缺项、超时与敏感字段风险。</p>
              </div>
              <ElButton type="primary" @click="runComplianceCheck">执行合规校验</ElButton>
            </div>
          </template>

          <ArtTable :data="complianceRules" :columns="complianceColumns" :show-table-header="false">
            <template #result="{ row }">
              <ElTag :type="row.resultType" effect="light">{{ row.result }}</ElTag>
            </template>
          </ArtTable>
        </ElCard>
      </ElCol>

      <ElCol :xs="24" :lg="8">
        <ElCard class="h-full">
          <template #header>
            <div class="flex-cb gap-3">
              <span class="font-medium">校验摘要</span>
              <ElTag type="warning">人工复核</ElTag>
            </div>
          </template>

          <div class="flex flex-col gap-3">
            <div class="summary-item">
              <span>本次校验批次</span>
              <strong>{{ complianceSummary.batchNo }}</strong>
            </div>
            <div class="summary-item">
              <span>通过规则</span>
              <strong>{{ complianceSummary.passCount }} 项</strong>
            </div>
            <div class="summary-item">
              <span>预警规则</span>
              <strong>{{ complianceSummary.warnCount }} 项</strong>
            </div>
            <div class="summary-item">
              <span>校验时间</span>
              <strong>{{ complianceSummary.checkTime }}</strong>
            </div>
          </div>

          <ElDivider />

          <ElTimeline>
            <ElTimelineItem
              v-for="item in complianceTimeline"
              :key="item.content"
              :timestamp="item.time"
              :type="item.type"
            >
              {{ item.content }}
            </ElTimelineItem>
          </ElTimeline>
        </ElCard>
      </ElCol>
    </ElRow>

    <ElCard>
      <template #header>
        <div class="flex-cb gap-3">
          <div>
            <h3 class="m-0 text-base font-medium">监控告警</h3>
            <p class="m-0 mt-1 text-sm text-g-700">展示数据上报链路的告警监控状态，支持关注级别、来源与处置时限。</p>
          </div>
          <ElSpace wrap>
            <ElTag type="danger">严重 {{ dangerCount }}</ElTag>
            <ElTag type="warning">一般 {{ warningCount }}</ElTag>
          </ElSpace>
        </div>
      </template>

      <div class="grid grid-cols-1 gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <ArtTable :data="alertRecords" :columns="alertColumns" :show-table-header="false">
          <template #level="{ row }">
            <ElTag :type="row.levelType" effect="light">{{ row.level }}</ElTag>
          </template>

          <template #status="{ row }">
            <ElTag :type="row.statusType" effect="light">{{ row.status }}</ElTag>
          </template>
        </ArtTable>

        <div class="flex flex-col gap-4">
          <ElCard shadow="never">
            <template #header>
              <span class="font-medium">监控指标</span>
            </template>
            <div class="metric-stack">
              <div v-for="item in monitorMetrics" :key="item.label" class="summary-item">
                <span>{{ item.label }}</span>
                <strong>{{ item.value }}</strong>
              </div>
            </div>
          </ElCard>

          <ElCard shadow="never">
            <template #header>
              <span class="font-medium">近期告警处置建议</span>
            </template>
            <ElSteps direction="vertical" :active="2">
              <ElStep title="补充缺失字段" description="优先修复批次 20260330-01 的结构缺项。" />
              <ElStep title="核对责任单位" description="提醒情报采集组在 30 分钟内完成复核。" />
              <ElStep title="再次触发校验" description="复核完成后重新执行合规校验，闭环告警。" />
            </ElSteps>
          </ElCard>
        </div>
      </div>
    </ElCard>
  </div>
</template>

<script setup lang="ts">
  import type { ColumnOption } from '@/types'

  defineOptions({ name: 'ReportComplianceMonitor' })

  interface ComplianceRule {
    id: number
    item: string
    rule: string
    result: string
    resultType: 'success' | 'warning' | 'danger' | 'info'
  }

  interface AlertRecord {
    id: number
    level: string
    levelType: 'success' | 'warning' | 'danger' | 'info'
    title: string
    source: string
    deadline: string
    status: string
    statusType: 'success' | 'warning' | 'info'
  }

  const complianceRules = ref<ComplianceRule[]>([
    {
      id: 1,
      item: '批次完整性',
      rule: '必填字段覆盖率 100%',
      result: '通过',
      resultType: 'success'
    },
    {
      id: 2,
      item: '字段格式',
      rule: '时间、编号、行政区划编码格式正确',
      result: '通过',
      resultType: 'success'
    },
    {
      id: 3,
      item: '敏感信息检测',
      rule: '敏感字段需脱敏后上报',
      result: '发现预警',
      resultType: 'warning'
    },
    {
      id: 4,
      item: '时效要求',
      rule: '上报时延不超过 30 分钟',
      result: '超时预警',
      resultType: 'danger'
    }
  ])

  const complianceSummary = reactive({
    batchNo: '20260330-01',
    passCount: 2,
    warnCount: 2,
    checkTime: '2026-03-30 14:30'
  })

  const complianceTimeline = ref([
    { time: '14:00', content: '批次材料进入待校验队列', type: 'primary' },
    { time: '14:12', content: '自动校验完成，识别到 2 项异常', type: 'warning' },
    { time: '14:30', content: '生成人工复核通知', type: 'danger' }
  ])

  const alertRecords = ref<AlertRecord[]>([
    {
      id: 1,
      level: '严重',
      levelType: 'danger',
      title: '上报批次超时未提交',
      source: '数据接入链路',
      deadline: '15 分钟内',
      status: '待处置',
      statusType: 'warning'
    },
    {
      id: 2,
      level: '一般',
      levelType: 'warning',
      title: '敏感字段脱敏不完整',
      source: '合规校验引擎',
      deadline: '30 分钟内',
      status: '处理中',
      statusType: 'info'
    },
    {
      id: 3,
      level: '一般',
      levelType: 'warning',
      title: '责任单位未确认计划',
      source: '计划执行监控',
      deadline: '60 分钟内',
      status: '已通知',
      statusType: 'success'
    }
  ])

  const complianceColumns: ColumnOption[] = [
    { prop: 'item', label: '校验项', minWidth: 150 },
    { prop: 'rule', label: '校验规则', minWidth: 260 },
    { prop: 'result', label: '结果', width: 120, useSlot: true }
  ]

  const alertColumns: ColumnOption[] = [
    { prop: 'level', label: '告警级别', width: 110, useSlot: true },
    { prop: 'title', label: '告警标题', minWidth: 220 },
    { prop: 'source', label: '告警来源', minWidth: 160 },
    { prop: 'deadline', label: '处置时限', width: 120 },
    { prop: 'status', label: '状态', width: 110, useSlot: true }
  ]

  const dangerCount = computed(() => alertRecords.value.filter((item) => item.level === '严重').length)
  const warningCount = computed(() => alertRecords.value.filter((item) => item.level === '一般').length)

  const monitorMetrics = computed(() => [
    { label: '实时接入成功率', value: '98.6%' },
    { label: '平均校验耗时', value: '4.8 分钟' },
    { label: '当前待处置告警', value: `${alertRecords.value.length} 条` },
    { label: '自动闭环率', value: '76%' }
  ])

  const runComplianceCheck = () => {
    complianceSummary.checkTime = '2026-03-30 15:00'
    ElMessage.success('已触发新一轮合规校验')
  }
</script>

<style scoped>
  .summary-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 12px 14px;
    border: 1px solid var(--el-border-color-light);
    border-radius: 10px;
    background: var(--el-fill-color-blank);
  }

  .metric-stack {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
</style>
