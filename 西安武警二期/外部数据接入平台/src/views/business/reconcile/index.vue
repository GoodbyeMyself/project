<template>
  <div class="flex flex-col gap-5 pb-5">
    <ElCard>
      <template #header>
        <div class="flex-cb gap-3 flex-wrap">
          <div>
            <h3 class="m-0 text-base">对账任务管理</h3>
            <p class="m-0 mt-1 text-sm text-g-500">同时适配结构化与非结构化对账任务的新增、修改、删除、查询、上线、下线与复制。</p>
          </div>
          <ElSpace wrap>
            <ElButton type="primary">新增对账任务</ElButton>
            <ElButton>复制任务</ElButton>
            <ElButton type="success" plain>任务上线</ElButton>
            <ElButton type="warning" plain>任务下线</ElButton>
            <ElButton type="danger" plain>删除任务</ElButton>
          </ElSpace>
        </div>
      </template>
      <ElTable :data="reconcileList" border>
        <ElTableColumn prop="name" label="任务名称" min-width="180" />
        <ElTableColumn prop="mode" label="对账类型" width="120" />
        <ElTableColumn prop="source" label="来源对象" min-width="180" />
        <ElTableColumn prop="target" label="目标对象" min-width="180" />
        <ElTableColumn prop="status" label="状态" width="100" />
        <ElTableColumn prop="updatedAt" label="更新时间" width="170" />
      </ElTable>
    </ElCard>
  </div>
</template>

<script setup lang="ts">
  defineOptions({ name: 'BusinessReconcile' })

  const reconcileList = ref([
    {
      name: '卡口主数据结构化对账',
      mode: '结构化',
      source: 'ods_border_record',
      target: 'dw_border_record',
      status: '已上线',
      updatedAt: '2026-03-30 08:40'
    },
    {
      name: '日志归档文件对账',
      mode: '非结构化',
      source: 'archive_log_file',
      target: 'log_parse_result',
      status: '已下线',
      updatedAt: '2026-03-29 20:10'
    }
  ])
</script>
