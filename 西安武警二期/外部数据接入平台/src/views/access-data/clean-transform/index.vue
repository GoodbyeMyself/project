<template>
  <div class="flex flex-col gap-5 pb-5">
    <ElCard>
      <template #header>
        <div class="flex-cb gap-3 flex-wrap">
          <div>
            <h3 class="m-0 text-base">数据清洗转换</h3>
            <p class="m-0 mt-1 text-sm text-g-500">支持清洗转换、过滤、唯一标识、SQL 转换与数据校验。</p>
          </div>
          <ElButton type="primary">新增转换流程</ElButton>
        </div>
      </template>
      <ElSteps :active="4" finish-status="success" align-center>
        <ElStep title="过滤" description="过滤脏数据与空记录" />
        <ElStep title="唯一标识" description="生成主键与去重" />
        <ElStep title="SQL 转换" description="字段拆分与规则转换" />
        <ElStep title="数据校验" description="落库前校验完整性" />
      </ElSteps>
      <ElTable :data="pipelineList" border class="mt-5">
        <ElTableColumn prop="name" label="流程名称" min-width="180" />
        <ElTableColumn prop="type" label="类型" width="120" />
        <ElTableColumn prop="source" label="来源" min-width="160" />
        <ElTableColumn prop="updatedAt" label="更新时间" width="170" />
        <ElTableColumn prop="status" label="状态" width="100" />
      </ElTable>
    </ElCard>
  </div>
</template>

<script setup lang="ts">
  defineOptions({ name: 'DataCleanTransform' })

  const pipelineList = ref([
    {
      name: '边检基础清洗链路',
      type: '结构化',
      source: '边防卡口结构化模板',
      updatedAt: '2026-03-29 11:00',
      status: '启用'
    },
    {
      name: '日志脱敏转换链路',
      type: '非结构化',
      source: '日志归档模板',
      updatedAt: '2026-03-28 17:20',
      status: '草稿'
    }
  ])
</script>
