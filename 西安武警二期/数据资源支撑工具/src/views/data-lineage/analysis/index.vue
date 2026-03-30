<template>
  <!-- Auto Comment: Component Summary: This component renders UI for '数据资源支撑工具/src/views/data-lineage/analysis/index.vue'. -->
  <!-- Auto Comment: Component Responsibility: It provides the view structure, interaction entry points, and display containers for this feature. -->
  <div class="flex flex-col gap-4 pb-5">
    <ElCard shadow="never">
      <template #header>
        <div class="flex-cb">
          <span class="text-base font-semibold">数据溯源分析</span>
          <ElTag type="primary" effect="light">来源 / 快照 / 血缘可视化</ElTag>
        </div>
      </template>
      <ElSpace wrap>
        <ElSelect v-model="selectedDataSet" style="width: 240px">
          <ElOption v-for="item in dataSets" :key="item" :label="item" :value="item" />
        </ElSelect>
        <ElButton type="primary" @click="loadLineage">加载血缘图</ElButton>
        <ElButton @click="createSnapshot">生成快照</ElButton>
      </ElSpace>
    </ElCard>

    <ElRow :gutter="12">
      <ElCol :xs="24" :md="10">
        <ElCard shadow="never">
          <template #header>数据来源</template>
          <ElTimeline>
            <ElTimelineItem
              v-for="item in sourceTimeline"
              :key="item.time"
              :timestamp="item.time"
              :type="item.type"
            >
              {{ item.text }}
            </ElTimelineItem>
          </ElTimeline>
        </ElCard>
      </ElCol>
      <ElCol :xs="24" :md="14">
        <ElCard shadow="never">
          <template #header>数据血缘可视化（简版）</template>
          <ElSteps direction="vertical" :active="lineageSteps.length">
            <ElStep
              v-for="(step, index) in lineageSteps"
              :key="step"
              :title="step"
              :description="`节点 ${index + 1}`"
            />
          </ElSteps>
        </ElCard>
      </ElCol>
    </ElRow>
  </div>
</template>

<script setup lang="ts">
  // Auto Comment: Component Script Notes: This script block manages state, events, and data flow for '数据资源支撑工具/src/views/data-lineage/analysis/index.vue'.
  // Auto Comment: Maintenance Hint: Keep business rules explicit and avoid implicit side effects between handlers.
  import { ref } from 'vue'
  import { ElMessage } from 'element-plus'

  defineOptions({ name: 'DataLineageAnalysis' })

  const dataSets = ['人员主数据集', '装备运行数据集']
  // Logic Note: Reactive state 'selectedDataSet' stores mutable runtime data used by this component.
  const selectedDataSet = ref(dataSets[0])

  // Logic Note: Reactive state 'sourceTimeline' stores mutable runtime data used by this component.
  const sourceTimeline = ref([
    { time: '2026-03-30 08:00', text: '采集源：主中心业务库', type: 'primary' as const },
    { time: '2026-03-30 08:05', text: '处理源：数据清洗服务', type: 'success' as const },
    { time: '2026-03-30 08:08', text: '落地源：模型仓库', type: 'warning' as const }
  ])

  // Logic Note: Reactive state 'lineageSteps' stores mutable runtime data used by this component.
  const lineageSteps = ref([
    '源库表：base_person',
    '清洗映射：person_standard_map',
    '模型表：dm_person_core',
    '报表视图：vw_person_overview'
  ])

  // Logic Note: Handler 'loadLineage' encapsulates a single interaction or data-processing flow.
  const loadLineage = () => {
    ElMessage.success(`已加载 ${selectedDataSet.value} 的血缘关系`)
  }

  // Logic Note: Handler 'createSnapshot' encapsulates a single interaction or data-processing flow.
  const createSnapshot = () => {
    sourceTimeline.value.unshift({
      time: new Date().toLocaleString(),
      text: `快照生成：${selectedDataSet.value}`,
      type: 'success'
    })
    ElMessage.success('数据快照已生成')
  }
</script>
