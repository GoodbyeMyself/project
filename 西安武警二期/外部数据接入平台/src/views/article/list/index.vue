<!-- 数据源管理页面 -->
<template>
  <div class="flex flex-col gap-5 pb-5">
    <ElCard>
      <template #header>
        <div class="flex-cb gap-3 flex-wrap">
          <div>
            <h3 class="m-0 text-base">数据源管理</h3>
            <p class="m-0 mt-1 text-sm text-g-500">支持新增、编辑、删除、查看、异常识别、详情查看、安全管理配置与数据源检测。</p>
          </div>
          <ElSpace wrap>
            <ElButton type="primary" v-auth="'add'">新增数据源</ElButton>
            <ElButton v-auth="'edit'">编辑数据源</ElButton>
            <ElButton type="danger" plain v-auth="'delete'">删除数据源</ElButton>
            <ElButton type="warning" plain v-auth="'check'">数据源检测</ElButton>
          </ElSpace>
        </div>
      </template>

      <ElRow :gutter="20" class="mb-5">
        <ElCol :xs="24" :md="8">
          <ElInput v-model="keyword" clearable placeholder="请输入数据源名称 / 地址" />
        </ElCol>
        <ElCol :xs="24" :md="6">
          <ElSelect v-model="status" style="width: 100%">
            <ElOption label="全部状态" value="全部状态" />
            <ElOption label="正常" value="正常" />
            <ElOption label="异常" value="异常" />
            <ElOption label="检测中" value="检测中" />
          </ElSelect>
        </ElCol>
        <ElCol :xs="24" :md="10" class="flex justify-end gap-3 max-md:justify-start max-md:mt-3">
          <ElButton>查看异常数据源</ElButton>
          <ElButton>查看详情</ElButton>
          <ElButton>安全管理配置</ElButton>
        </ElCol>
      </ElRow>

      <ElTable :data="dataSourceList" border>
        <ElTableColumn prop="name" label="数据源名称" min-width="180" />
        <ElTableColumn prop="type" label="类型" width="120" />
        <ElTableColumn prop="endpoint" label="接入地址" min-width="220" />
        <ElTableColumn prop="owner" label="责任人" width="120" />
        <ElTableColumn prop="safeLevel" label="安全等级" width="120" />
        <ElTableColumn label="运行状态" width="110">
          <template #default="{ row }">
            <ElTag :type="row.status === '正常' ? 'success' : row.status === '检测中' ? 'warning' : 'danger'">
              {{ row.status }}
            </ElTag>
          </template>
        </ElTableColumn>
        <ElTableColumn prop="updatedAt" label="最近检测时间" width="170" />
      </ElTable>
    </ElCard>
  </div>
</template>

<script setup lang="ts">
  defineOptions({ name: 'ArticleList' })

  const keyword = ref('')
  const status = ref('全部状态')

  const dataSourceList = ref([
    {
      name: '边防卡口主库',
      type: 'MySQL',
      endpoint: '10.10.10.21:3306/border_main',
      owner: '张伟',
      safeLevel: '三级',
      status: '正常',
      updatedAt: '2026-03-30 09:18'
    },
    {
      name: '日志接入 Kafka 集群',
      type: 'Kafka0.9',
      endpoint: '10.10.11.30:9092/log-topic',
      owner: '李峰',
      safeLevel: '二级',
      status: '检测中',
      updatedAt: '2026-03-30 09:05'
    },
    {
      name: '历史文件导入区',
      type: 'Excel',
      endpoint: '/data/import/history',
      owner: '王磊',
      safeLevel: '三级',
      status: '异常',
      updatedAt: '2026-03-30 08:40'
    }
  ])
</script>
