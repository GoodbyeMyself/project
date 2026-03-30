<template>
  <div class="flex flex-col gap-5 pb-5">
    <ElCard>
      <template #header>
        <div class="flex-cb gap-3 flex-wrap">
          <div>
            <h3 class="m-0 text-base">告警管理</h3>
            <p class="m-0 mt-1 text-sm text-g-500">支持新增、修改、删除、查询告警组及告警组用户配置。</p>
          </div>
          <ElSpace wrap>
            <ElButton type="primary">新增告警组</ElButton>
            <ElButton type="warning" plain>修改告警组</ElButton>
            <ElButton type="danger" plain>删除告警组</ElButton>
          </ElSpace>
        </div>
      </template>
      <ElTable :data="alertGroups" border>
        <ElTableColumn prop="name" label="告警组名称" min-width="180" />
        <ElTableColumn prop="users" label="关联用户" min-width="220" />
        <ElTableColumn prop="scene" label="适用场景" min-width="180" />
        <ElTableColumn prop="channel" label="通知方式" width="160" />
        <ElTableColumn prop="status" label="状态" width="100" />
      </ElTable>
    </ElCard>
  </div>
</template>

<script setup lang="ts">
  defineOptions({ name: 'AlertManagement' })

  const alertGroups = ref([
    {
      name: '接入异常告警组',
      users: '张伟、李峰、王超',
      scene: '任务失败 / 数据延迟',
      channel: '短信 + 站内信',
      status: '启用'
    },
    {
      name: '资源监控告警组',
      users: '运维值班组',
      scene: 'Master / Worker / DB 异常',
      channel: '电话 + 短信',
      status: '启用'
    }
  ])
</script>
