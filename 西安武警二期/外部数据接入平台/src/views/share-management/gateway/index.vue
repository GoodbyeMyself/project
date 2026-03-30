<template>
  <div class="flex flex-col gap-5 pb-5">
    <ElCard>
      <template #header>
        <div class="flex-cb gap-3 flex-wrap">
          <div>
            <h3 class="m-0 text-base">服务网关</h3>
            <p class="m-0 mt-1 text-sm text-g-500">支持网关上线、下线、修改与查询。</p>
          </div>
          <ElSpace wrap>
            <ElButton type="success">上线网关</ElButton>
            <ElButton type="warning" plain>下线网关</ElButton>
            <ElButton>修改网关</ElButton>
          </ElSpace>
        </div>
      </template>
      <ElTable :data="gatewayList" border>
        <ElTableColumn prop="name" label="网关名称" min-width="180" />
        <ElTableColumn prop="domain" label="访问域名" min-width="220" />
        <ElTableColumn prop="routeCount" label="路由数" width="100" />
        <ElTableColumn prop="updatedAt" label="更新时间" width="170" />
        <ElTableColumn prop="status" label="状态" width="100" />
      </ElTable>
    </ElCard>
  </div>
</template>

<script setup lang="ts">
  defineOptions({ name: 'ServiceGateway' })

  const gatewayList = ref([
    {
      name: '共享服务主网关',
      domain: 'share-gateway.internal',
      routeCount: 28,
      updatedAt: '2026-03-30 09:00',
      status: '已上线'
    },
    {
      name: '文件服务网关',
      domain: 'file-gateway.internal',
      routeCount: 12,
      updatedAt: '2026-03-29 15:20',
      status: '已下线'
    }
  ])
</script>
