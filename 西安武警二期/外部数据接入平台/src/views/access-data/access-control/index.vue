<template>
  <div class="flex flex-col gap-5 pb-5">
    <ElCard>
      <template #header>
        <div class="flex-cb gap-3 flex-wrap">
          <div>
            <h3 class="m-0 text-base">数据访问控制</h3>
            <p class="m-0 mt-1 text-sm text-g-500">支持新增、修改、删除、查询访问控制规则。</p>
          </div>
          <ElSpace wrap>
            <ElButton type="primary">新增访问控制</ElButton>
            <ElButton type="warning" plain>修改规则</ElButton>
            <ElButton type="danger" plain>删除规则</ElButton>
          </ElSpace>
        </div>
      </template>
      <ElTable :data="controlList" border>
        <ElTableColumn prop="name" label="规则名称" min-width="160" />
        <ElTableColumn prop="object" label="控制对象" min-width="180" />
        <ElTableColumn prop="scope" label="访问范围" min-width="180" />
        <ElTableColumn prop="mode" label="控制方式" width="140" />
        <ElTableColumn prop="owner" label="责任人" width="120" />
        <ElTableColumn prop="status" label="状态" width="100" />
      </ElTable>
    </ElCard>
  </div>
</template>

<script setup lang="ts">
  defineOptions({ name: 'DataAccessControl' })

  const controlList = ref([
    {
      name: '边防数据最小权限控制',
      object: '边防卡口结构化库',
      scope: '支队级 / 只读',
      mode: 'RBAC + 标签',
      owner: '王超',
      status: '启用'
    },
    {
      name: '日志下载审批控制',
      object: '日志归档文件',
      scope: '按任务审批',
      mode: '审批流',
      owner: '李娜',
      status: '启用'
    }
  ])
</script>
