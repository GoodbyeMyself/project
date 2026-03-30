<template>
  <!-- Auto Comment: Component Summary: This component renders UI for '数据资源支撑工具/src/views/report-analysis/download/index.vue'. -->
  <!-- Auto Comment: Component Responsibility: It provides the view structure, interaction entry points, and display containers for this feature. -->
  <div class="flex flex-col gap-4 pb-5">
    <ElCard shadow="never">
      <template #header>
        <div class="flex-cb">
          <span class="text-base font-semibold">一键下载报告</span>
          <ElTag type="primary" effect="light">图标样式编辑 / 报告下载</ElTag>
        </div>
      </template>
      <ElForm :model="styleForm" inline>
        <ElFormItem label="图标风格">
          <ElSelect v-model="styleForm.iconStyle" style="width: 180px">
            <ElOption label="线性风格" value="线性风格" />
            <ElOption label="填充风格" value="填充风格" />
            <ElOption label="双色风格" value="双色风格" />
          </ElSelect>
        </ElFormItem>
        <ElFormItem label="图标颜色">
          <ElColorPicker v-model="styleForm.iconColor" />
        </ElFormItem>
        <ElFormItem>
          <ElButton type="primary" @click="applyIconStyle">应用样式</ElButton>
        </ElFormItem>
      </ElForm>
    </ElCard>

    <ElCard shadow="never">
      <ElTable :data="reportRows" border>
        <ElTableColumn prop="name" label="报告名称" min-width="200" />
        <ElTableColumn prop="cycle" label="统计周期" width="140" />
        <ElTableColumn prop="format" label="导出格式" width="110" />
        <ElTableColumn prop="updatedAt" label="更新时间" width="170" />
        <ElTableColumn label="操作" width="180" fixed="right">
          <template #default="{ row }">
            <ElButton link type="primary" @click="downloadReport(row)">一键下载</ElButton>
          </template>
        </ElTableColumn>
      </ElTable>
    </ElCard>
  </div>
</template>

<script setup lang="ts">
  // Auto Comment: Component Script Notes: This script block manages state, events, and data flow for '数据资源支撑工具/src/views/report-analysis/download/index.vue'.
  // Auto Comment: Maintenance Hint: Keep business rules explicit and avoid implicit side effects between handlers.
  import { reactive, ref } from 'vue'
  import { ElMessage } from 'element-plus'

  defineOptions({ name: 'ReportDownload' })

  interface ReportRow {
    id: number
    name: string
    cycle: string
    format: string
    updatedAt: string
  }

  // Logic Note: Reactive state 'styleForm' stores mutable runtime data used by this component.
  const styleForm = reactive({
    iconStyle: '线性风格',
    iconColor: '#409EFF'
  })

  // Logic Note: Reactive state 'reportRows' stores mutable runtime data used by this component.
  const reportRows = ref<ReportRow[]>([
    {
      id: 1,
      name: '模型健康度分析报告',
      cycle: '2026-03',
      format: 'PDF',
      updatedAt: '2026-03-30 09:10:00'
    },
    {
      id: 2,
      name: '数据资产盘点报告',
      cycle: '2026-03',
      format: 'Excel',
      updatedAt: '2026-03-30 09:25:00'
    }
  ])

  // Logic Note: Handler 'applyIconStyle' encapsulates a single interaction or data-processing flow.
  const applyIconStyle = () => {
    ElMessage.success(`图标样式已更新为${styleForm.iconStyle}`)
  }

  // Logic Note: Handler 'downloadReport' encapsulates a single interaction or data-processing flow.
  const downloadReport = (row: ReportRow) => {
    ElMessage.success(`已触发《${row.name}》下载任务`)
  }
</script>
