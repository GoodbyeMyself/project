<template>
  <div class="flex flex-col gap-4 pb-5">
    <ElCard shadow="never">
      <template #header>
        <div class="flex-cb">
          <span class="text-base font-semibold">数据资产管理</span>
          <ElTag type="primary" effect="light">元数据获取 / 统一搜索 / 元数据同步</ElTag>
        </div>
      </template>
      <ElForm :model="queryForm" inline>
        <ElFormItem label="统一搜索">
          <ElInput v-model="queryForm.keyword" placeholder="资产名称、数据域、负责人" clearable />
        </ElFormItem>
        <ElFormItem>
          <ElButton type="primary" @click="handleSearch">查询</ElButton>
          <ElButton @click="syncMetadata">元数据同步</ElButton>
        </ElFormItem>
      </ElForm>
    </ElCard>

    <ElCard shadow="never">
      <ElTable :data="filteredRows" border>
        <ElTableColumn prop="assetName" label="资产名称" min-width="200" />
        <ElTableColumn prop="domain" label="数据域" width="140" />
        <ElTableColumn prop="owner" label="负责人" width="120" />
        <ElTableColumn prop="metaSource" label="元数据来源" width="160" />
        <ElTableColumn prop="lastSyncTime" label="最近同步时间" width="170" />
        <ElTableColumn prop="qualityScore" label="质量评分" width="100" />
      </ElTable>
    </ElCard>
  </div>
</template>

<script setup lang="ts">
  import { computed, reactive, ref } from 'vue'
  import { ElMessage } from 'element-plus'

  defineOptions({ name: 'DataAssetManagement' })

  interface AssetRow {
    id: number
    assetName: string
    domain: string
    owner: string
    metaSource: string
    lastSyncTime: string
    qualityScore: number
  }

  const queryForm = reactive({
    keyword: ''
  })

  const rows = ref<AssetRow[]>([
    {
      id: 1,
      assetName: '人员综合主数据资产',
      domain: '人员域',
      owner: '张强',
      metaSource: '主中心 PostgreSQL',
      lastSyncTime: '2026-03-30 06:10:00',
      qualityScore: 97
    },
    {
      id: 2,
      assetName: '装备生命周期资产',
      domain: '装备域',
      owner: '刘涛',
      metaSource: '边缘 MySQL',
      lastSyncTime: '2026-03-30 05:42:00',
      qualityScore: 93
    }
  ])

  const filteredRows = computed(() => {
    if (!queryForm.keyword) {
      return rows.value
    }
    return rows.value.filter((item) => {
      return (
        item.assetName.includes(queryForm.keyword) ||
        item.domain.includes(queryForm.keyword) ||
        item.owner.includes(queryForm.keyword)
      )
    })
  })

  const handleSearch = () => {
    ElMessage.success('已完成统一搜索')
  }

  const syncMetadata = () => {
    rows.value = rows.value.map((item) => ({
      ...item,
      lastSyncTime: new Date().toLocaleString()
    }))
    ElMessage.success('元数据同步任务已执行')
  }
</script>
