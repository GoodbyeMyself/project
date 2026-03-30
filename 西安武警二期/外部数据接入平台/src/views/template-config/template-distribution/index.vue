<template>
  <div class="flex flex-col gap-5 pb-5">
    <ElCard>
      <template #header>
        <div class="flex-cb gap-3 flex-wrap">
          <div>
            <h3 class="m-0 text-base">数据模板下放</h3>
            <p class="m-0 mt-1 text-sm text-g-500">统一管理模板下放目标、批次状态与反馈结果。</p>
          </div>
          <ElSpace wrap>
            <ElButton type="primary">发起下放</ElButton>
            <ElButton>重试下放</ElButton>
            <ElButton type="info" plain>查看反馈</ElButton>
          </ElSpace>
        </div>
      </template>

      <ElRow :gutter="20">
        <ElCol :xs="24" :lg="8" v-for="card in distributionCards" :key="card.title">
          <ElCard shadow="hover" class="mb-5">
            <div class="flex-cb">
              <div>
                <p class="m-0 text-sm text-g-500">{{ card.title }}</p>
                <h2 class="m-0 mt-3 text-3xl">{{ card.value }}</h2>
              </div>
              <ElTag :type="card.type">{{ card.tag }}</ElTag>
            </div>
          </ElCard>
        </ElCol>
      </ElRow>

      <ElTable :data="distributionList" border>
        <ElTableColumn prop="template" label="模板名称" min-width="180" />
        <ElTableColumn prop="version" label="版本" width="100" />
        <ElTableColumn prop="target" label="下放目标" min-width="160" />
        <ElTableColumn prop="operator" label="发起人" width="120" />
        <ElTableColumn prop="time" label="下放时间" width="170" />
        <ElTableColumn label="状态" width="110">
          <template #default="{ row }">
            <ElTag :type="row.status === '成功' ? 'success' : row.status === '执行中' ? 'warning' : 'danger'">
              {{ row.status }}
            </ElTag>
          </template>
        </ElTableColumn>
      </ElTable>
    </ElCard>
  </div>
</template>

<script setup lang="ts">
  defineOptions({ name: 'TemplateDistribution' })

  const distributionCards = ref([
    { title: '今日下放批次', value: 12, tag: '稳定', type: 'success' },
    { title: '待确认反馈', value: 3, tag: '处理中', type: 'warning' },
    { title: '失败批次', value: 1, tag: '需关注', type: 'danger' }
  ])

  const distributionList = ref([
    {
      template: '边防卡口结构化模板',
      version: 'v2.3.1',
      target: '西安支队 / 一大队',
      operator: '张伟',
      time: '2026-03-30 09:30',
      status: '成功'
    },
    {
      template: '日志归档模板',
      version: 'v1.8.0',
      target: '情指中心',
      operator: '李峰',
      time: '2026-03-30 10:20',
      status: '执行中'
    },
    {
      template: '情报交换模板',
      version: 'v1.2.5',
      target: '机动中队',
      operator: '王磊',
      time: '2026-03-29 18:10',
      status: '失败'
    }
  ])
</script>
