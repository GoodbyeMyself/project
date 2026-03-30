<template>
  <div class="flex flex-col gap-4 pb-5">
    <ElCard shadow="never">
      <template #header>
        <div class="flex-cb">
          <span class="text-base font-semibold">多种风格统计分析报告</span>
          <ElTag type="primary" effect="light">模板编辑 / 模板定制</ElTag>
        </div>
      </template>
      <ElAlert
        title="支持按业务场景快速生成不同风格的统计分析报告模板。"
        type="success"
        :closable="false"
      />
    </ElCard>

    <ElCard shadow="never">
      <ElRow :gutter="12">
        <ElCol :xs="24" :md="8" v-for="template in templates" :key="template.id">
          <ElCard class="mb-3" shadow="hover">
            <h4 class="m-0 mb-2">{{ template.name }}</h4>
            <p class="m-0 mb-3 text-g-600">{{ template.desc }}</p>
            <ElTag effect="light">{{ template.style }}</ElTag>
            <div class="mt-3">
              <ElButton type="primary" link @click="editTemplate(template)">模板编辑</ElButton>
              <ElButton link @click="customTemplate(template)">模板定制</ElButton>
            </div>
          </ElCard>
        </ElCol>
      </ElRow>
    </ElCard>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { ElMessage } from 'element-plus'

  defineOptions({ name: 'ReportStyle' })

  interface ReportTemplate {
    id: number
    name: string
    style: string
    desc: string
  }

  const templates = ref<ReportTemplate[]>([
    { id: 1, name: '综合态势周报', style: '指挥视图', desc: '适用于周维度综合态势分析。' },
    { id: 2, name: '模型健康月报', style: '治理视图', desc: '聚焦模型质量与稳定性趋势。' },
    { id: 3, name: '资产运行日报', style: '运维视图', desc: '按日展示资产规模与异常情况。' }
  ])

  const editTemplate = (template: ReportTemplate) => {
    ElMessage.success(`已进入《${template.name}》模板编辑`)
  }

  const customTemplate = (template: ReportTemplate) => {
    ElMessage.info(`已加载《${template.name}》的定制参数面板`)
  }
</script>
