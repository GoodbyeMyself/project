<template>
  <!-- Auto Comment: Component Summary: This component renders UI for '数据采集汇聚平台/src/views/examples/tables/tree.vue'. -->
  <!-- Auto Comment: Component Responsibility: It provides the view structure, interaction entry points, and display containers for this feature. -->
  <div class="flex flex-col gap-4 pb-5">
    <ElRow :gutter="20">
      <ElCol :xs="24" :lg="7">
        <ElCard>
          <template #header><span class="font-medium">任务目录树</span></template>
          <ElTree :data="catalogTree" node-key="id" default-expand-all highlight-current />
        </ElCard>
      </ElCol>
      <ElCol :xs="24" :lg="17">
        <ElCard>
          <template #header>
            <div class="flex-cb gap-3">
              <div>
                <h3 class="m-0 text-base font-medium">任务目录管理 / 监控日志</h3>
                <p class="m-0 mt-1 text-sm text-g-700">复用为目录管理、日志查看、运行明细等树表联动页。</p>
              </div>
              <ElSpace>
                <ElButton type="primary" @click="addCatalog">新增目录</ElButton>
                <ElButton @click="editCatalog">修改目录</ElButton>
                <ElButton type="danger" @click="deleteCatalog">删除目录</ElButton>
              </ElSpace>
            </div>
          </template>

          <ElTable :data="tableRows" border>
            <ElTableColumn prop="name" label="名称" min-width="180" />
            <ElTableColumn prop="type" label="类型" width="120" />
            <ElTableColumn prop="owner" label="责任单位" min-width="140" />
            <ElTableColumn prop="status" label="状态" width="120" />
            <ElTableColumn prop="updateTime" label="更新时间" min-width="180" />
          </ElTable>
        </ElCard>
      </ElCol>
    </ElRow>
  </div>
</template>

<script setup lang="ts">
  // Auto Comment: Component Script Notes: This script block manages state, events, and data flow for '数据采集汇聚平台/src/views/examples/tables/tree.vue'.
  // Auto Comment: Maintenance Hint: Keep business rules explicit and avoid implicit side effects between handlers.
  defineOptions({ name: 'TreeTable' })

  // Logic Note: Reactive state 'catalogTree' stores mutable runtime data used by this component.
  const catalogTree = ref([
    { id: 1, label: '视频采集目录', children: [{ id: 11, label: '前端卡口' }] },
    { id: 2, label: '标准化目录', children: [{ id: 21, label: '行政区划标准' }] },
    { id: 3, label: '监控日志目录', children: [{ id: 31, label: '今日运行日志' }] }
  ])

  // Logic Note: Reactive state 'tableRows' stores mutable runtime data used by this component.
  const tableRows = ref([
    { name: '边境视频流采集', type: '采集任务', owner: '情报采集组', status: '启用', updateTime: '2026-03-30 16:20' },
    { name: '目标画像标准化', type: '处理任务', owner: '数据处理组', status: '停用', updateTime: '2026-03-30 15:40' },
    { name: '批次监控日志', type: '监控日志', owner: '平台运维组', status: '正常', updateTime: '2026-03-30 16:28' }
  ])

  // Logic Note: Handler 'addCatalog' encapsulates a single interaction or data-processing flow.
  const addCatalog = () => ElMessage.success('已新增目录')
  // Logic Note: Handler 'editCatalog' encapsulates a single interaction or data-processing flow.
  const editCatalog = () => ElMessage.success('已修改目录')
  // Logic Note: Handler 'deleteCatalog' encapsulates a single interaction or data-processing flow.
  const deleteCatalog = () => ElMessage.success('已删除目录')
</script>
