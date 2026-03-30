<template>
  <div class="flex flex-col gap-4 pb-5">
    <ElCard>
      <template #header>
        <div class="flex-cb gap-3">
          <div>
            <h3 class="m-0 text-base font-medium">协议适配与检索</h3>
            <p class="m-0 mt-1 text-sm text-g-700">支持按协议类型、接入方式、状态条件检索适配器配置。</p>
          </div>
          <ElButton type="primary" @click="searchAdapter">查询适配配置</ElButton>
        </div>
      </template>

      <ArtSearchBar v-model="searchForm" :items="searchItems" :show-expand="false" @search="searchAdapter" @reset="resetSearch" />
    </ElCard>

    <ElCard>
      <template #header><span class="font-medium">协议适配能力清单</span></template>
      <ElTable :data="adapterRows" border>
        <ElTableColumn prop="protocol" label="适配类型" min-width="180" />
        <ElTableColumn prop="scene" label="适用场景" min-width="180" />
        <ElTableColumn prop="status" label="状态" width="120" />
      </ElTable>
    </ElCard>
  </div>
</template>

<script setup lang="ts">
  defineOptions({ name: 'CollectionProtocolAdapter' })

  const searchForm = ref({ protocol: '', scene: '', status: '' })

  const searchItems = computed(() => [
    {
      key: 'protocol',
      label: '协议类型',
      type: 'select',
      options: [
        { label: '全部', value: '' },
        { label: 'Hbase 输入', value: 'Hbase 输入' },
        { label: '关系型数据库表输入', value: '关系型数据库表输入' },
        { label: 'Kafka0.9 输入', value: 'Kafka0.9 输入' },
        { label: '华为 Elasticsearch 输入', value: '华为 Elasticsearch 输入' },
        { label: 'SQL 输入', value: 'SQL 输入' },
        { label: 'Excel 读取', value: 'Excel 读取' }
      ]
    },
    {
      key: 'scene',
      label: '适用场景',
      type: 'input',
      props: { placeholder: '请输入适用场景' }
    },
    {
      key: 'status',
      label: '状态',
      type: 'select',
      options: [
        { label: '全部', value: '' },
        { label: '启用', value: '启用' },
        { label: '停用', value: '停用' }
      ]
    }
  ])

  const adapterRows = ref([
    { protocol: 'Hbase 输入', scene: '历史轨迹归档接入', status: '启用' },
    { protocol: '关系型数据库表输入', scene: '业务台账同步', status: '启用' },
    { protocol: 'Kafka0.9 输入', scene: '实时流式采集', status: '启用' },
    { protocol: '华为 Elasticsearch 输入', scene: '全文检索索引采集', status: '停用' },
    { protocol: 'SQL 输入', scene: '批量结构化抽取', status: '启用' },
    { protocol: 'Excel 读取', scene: '离线模板导入', status: '启用' }
  ])

  const searchAdapter = () => ElMessage.success('已执行协议适配检索')
  const resetSearch = () => ElMessage.info('已重置检索条件')
</script>
