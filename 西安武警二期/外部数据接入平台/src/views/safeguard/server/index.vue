<!-- 资源监控页面 -->
<template>
  <div class="flex flex-col gap-5 pb-5">
    <ElRow :gutter="20">
      <ElCol :xs="24" :sm="12" :lg="8" v-for="item in monitorCards" :key="item.name">
        <ElCard shadow="hover">
          <div class="flex-cb">
            <div>
              <div class="text-base font-medium">{{ item.name }}</div>
              <div class="mt-2 text-sm text-g-500">{{ item.desc }}</div>
            </div>
            <ElTag :type="item.type">{{ item.status }}</ElTag>
          </div>
          <div class="mt-4">
            <p class="mb-2 text-sm">健康度</p>
            <ElProgress :percentage="item.percent" :status="item.type === 'danger' ? 'exception' : undefined" :stroke-width="16" />
          </div>
        </ElCard>
      </ElCol>
    </ElRow>

    <ElCard>
      <template #header>
        <div class="flex-cb gap-3 flex-wrap">
          <div>
            <h3 class="m-0 text-base">资源监控明细</h3>
            <p class="m-0 mt-1 text-sm text-g-500">覆盖 Master、Worker、Zookeeper、数据库、Carte 运行状态。</p>
          </div>
          <ElButton type="primary">刷新监控</ElButton>
        </div>
      </template>
      <ElTable :data="monitorTable" border>
        <ElTableColumn prop="target" label="监控对象" min-width="150" />
        <ElTableColumn prop="host" label="节点地址" min-width="180" />
        <ElTableColumn prop="cpu" label="CPU" width="100" />
        <ElTableColumn prop="memory" label="内存" width="100" />
        <ElTableColumn prop="connection" label="连接数 / 队列" width="150" />
        <ElTableColumn prop="status" label="状态" width="100" />
      </ElTable>
    </ElCard>
  </div>
</template>

<script setup lang="ts">
  defineOptions({ name: 'SafeguardServer' })

  const monitorCards = ref([
    { name: 'Master 状态', desc: '当前调度主节点负载稳定', status: '正常', type: 'success', percent: 82 },
    { name: 'Worker 状态', desc: '2 个 Worker 需关注负载峰值', status: '告警', type: 'warning', percent: 68 },
    { name: 'Zookeeper 状态', desc: '集群连接正常', status: '正常', type: 'success', percent: 91 },
    { name: '数据库状态', desc: '连接池使用率平稳', status: '正常', type: 'success', percent: 87 },
    { name: 'Carte 状态', desc: '1 个节点通信超时', status: '异常', type: 'danger', percent: 41 }
  ])

  const monitorTable = ref([
    {
      target: 'Master-01',
      host: '10.10.20.11:12345',
      cpu: '42%',
      memory: '61%',
      connection: '26',
      status: '正常'
    },
    {
      target: 'Worker-03',
      host: '10.10.20.23:22345',
      cpu: '78%',
      memory: '72%',
      connection: '54',
      status: '告警'
    },
    {
      target: 'Carte-02',
      host: '10.10.21.12:8080',
      cpu: '33%',
      memory: '45%',
      connection: '超时',
      status: '异常'
    }
  ])
</script>
