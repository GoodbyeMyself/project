<template>
  <div class="flex flex-col gap-5 pb-5">
    <ElCard>
      <template #header>
        <div class="flex-cb gap-3 flex-wrap">
          <div>
            <h3 class="m-0 text-base">资源服务管理</h3>
            <p class="m-0 mt-1 text-sm text-g-500">统一适配表资源、标签资源、指标资源、接口资源、文件资源的启停与发布管理。</p>
          </div>
          <ElSpace wrap>
            <ElButton type="primary">新增资源服务</ElButton>
            <ElButton type="success" plain>发布服务</ElButton>
            <ElButton type="warning" plain>取消发布</ElButton>
            <ElButton>启用服务</ElButton>
            <ElButton type="danger" plain>停用服务</ElButton>
          </ElSpace>
        </div>
      </template>
      <ElTable :data="serviceList" border>
        <ElTableColumn prop="name" label="服务名称" min-width="180" />
        <ElTableColumn prop="category" label="服务类型" width="140" />
        <ElTableColumn prop="resource" label="资源对象" min-width="180" />
        <ElTableColumn prop="owner" label="责任人" width="120" />
        <ElTableColumn prop="enabled" label="启用状态" width="100" />
        <ElTableColumn prop="publish" label="发布状态" width="100" />
      </ElTable>
    </ElCard>
  </div>
</template>

<script setup lang="ts">
  defineOptions({ name: 'BusinessResourceService' })

  const serviceList = ref([
    {
      name: '边防卡口表资源服务',
      category: '表资源服务',
      resource: 'dw_border_record',
      owner: '刘凯',
      enabled: '启用',
      publish: '已发布'
    },
    {
      name: '重点人员标签服务',
      category: '标签数据资源服务',
      resource: 'tag_focus_person',
      owner: '王敏',
      enabled: '停用',
      publish: '未发布'
    },
    {
      name: '告警指标服务',
      category: '数据指标服务',
      resource: 'metric_alert_summary',
      owner: '周晨',
      enabled: '启用',
      publish: '已发布'
    }
  ])
</script>
