<template>
  <div class="flex flex-col gap-4 pb-5">
    <ElCard shadow="never">
      <template #header>
        <div class="flex-cb">
          <span class="text-base font-semibold">报告下钻</span>
          <ElTag type="primary" effect="light">指标下钻 / 对比分析 / 导出</ElTag>
        </div>
      </template>
      <ElSpace wrap>
        <ElSelect v-model="selectedMetric" style="width: 220px">
          <ElOption v-for="item in metricOptions" :key="item" :label="item" :value="item" />
        </ElSelect>
        <ElButton type="primary" @click="loadMetricData">执行下钻</ElButton>
        <ElButton @click="exportReport">导出报告</ElButton>
      </ElSpace>
    </ElCard>

    <ElCard shadow="never">
      <ElTable :data="rows" border>
        <ElTableColumn prop="dimension" label="分析维度" min-width="180" />
        <ElTableColumn prop="baseline" label="基线值" width="110" />
        <ElTableColumn prop="current" label="当前值" width="110" />
        <ElTableColumn label="对比结果" width="120">
          <template #default="{ row }">
            <ElTag :type="row.current >= row.baseline ? 'success' : 'danger'" effect="light">
              {{ row.current >= row.baseline ? '上升' : '下降' }}
            </ElTag>
          </template>
        </ElTableColumn>
        <ElTableColumn prop="detail" label="数据展示" min-width="260" />
      </ElTable>
    </ElCard>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { ElMessage } from 'element-plus'

  defineOptions({ name: 'ReportDrilldown' })

  interface DrilldownRow {
    dimension: string
    baseline: number
    current: number
    detail: string
  }

  const metricOptions = ['模型覆盖率', '同步成功率', '资产完备率']
  const selectedMetric = ref(metricOptions[0])

  const rows = ref<DrilldownRow[]>([
    {
      dimension: '人员域',
      baseline: 92,
      current: 95,
      detail: '模型覆盖实体 152 个，新增 6 个'
    },
    {
      dimension: '装备域',
      baseline: 88,
      current: 87,
      detail: '字段合规率下降，需补充字典映射'
    }
  ])

  const loadMetricData = () => {
    ElMessage.success(`已完成 ${selectedMetric.value} 指标下钻分析`)
  }

  const exportReport = () => {
    ElMessage.success('下钻报告已导出')
  }
</script>
