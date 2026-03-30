<template>
  <!-- Auto Comment: Component Summary: This component renders UI for '外部数据接入平台/src/views/task-management/lineage/index.vue'. -->
  <!-- Auto Comment: Component Responsibility: It provides the view structure, interaction entry points, and display containers for this feature. -->
  <div class="flex flex-col gap-5 pb-5">
    <ElCard>
      <template #header>
        <div class="flex-cb gap-3 flex-wrap">
          <div>
            <h3 class="m-0 text-base">任务血缘查看</h3>
            <p class="m-0 mt-1 text-sm text-g-500">支持血缘查询与数据库表详情查看。</p>
          </div>
          <ElSpace wrap>
            <ElInput v-model="searchName" placeholder="输入任务或表名" style="width: 220px" clearable />
            <ElButton type="primary">血缘查询</ElButton>
          </ElSpace>
        </div>
      </template>
      <ElRow :gutter="20">
        <ElCol :xs="24" :lg="14">
          <ElCard shadow="never">
            <template #header><span>血缘链路</span></template>
            <ElSteps direction="vertical" :active="4">
              <ElStep title="源表 ods_border_record" description="原始接入表" />
              <ElStep title="清洗任务 clean_border_record" description="字段清洗与去重" />
              <ElStep title="对账任务 reconcile_border_record" description="结构化对账校验" />
              <ElStep title="共享服务 border_record_api" description="对外共享接口服务" />
            </ElSteps>
          </ElCard>
        </ElCol>
        <ElCol :xs="24" :lg="10">
          <ElCard shadow="never">
            <template #header><span>数据库表详情</span></template>
            <ElDescriptions :column="1" border>
              <ElDescriptionsItem label="表名">ods_border_record</ElDescriptionsItem>
              <ElDescriptionsItem label="存储类型">MySQL / InnoDB</ElDescriptionsItem>
              <ElDescriptionsItem label="主键">record_id</ElDescriptionsItem>
              <ElDescriptionsItem label="字段数量">42</ElDescriptionsItem>
              <ElDescriptionsItem label="最近更新时间">2026-03-30 09:25</ElDescriptionsItem>
            </ElDescriptions>
          </ElCard>
        </ElCol>
      </ElRow>
    </ElCard>
  </div>
</template>

<script setup lang="ts">
  // Auto Comment: Component Script Notes: This script block manages state, events, and data flow for '外部数据接入平台/src/views/task-management/lineage/index.vue'.
  // Auto Comment: Maintenance Hint: Keep business rules explicit and avoid implicit side effects between handlers.
  defineOptions({ name: 'TaskLineage' })

  // Logic Note: Reactive state 'searchName' stores mutable runtime data used by this component.
  const searchName = ref('')
</script>
