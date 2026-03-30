<template>
  <div class="flex flex-col gap-5 pb-5">
    <ElCard>
      <template #header>
        <div class="flex-cb gap-3 flex-wrap">
          <div>
            <h3 class="m-0 text-base">数据接入类型</h3>
            <p class="m-0 mt-1 text-sm text-g-500">提供表接入、HBase、Kafka、Elasticsearch、SQL、Excel 等类型配置。</p>
          </div>
          <ElButton type="primary">新增接入类型配置</ElButton>
        </div>
      </template>

      <ElRow :gutter="20">
        <ElCol :xs="24" :sm="12" :lg="8" v-for="item in typeCards" :key="item.name">
          <ElCard shadow="hover" class="mb-5 h-[180px]">
            <div class="flex-cb items-start gap-3">
              <div>
                <div class="text-base font-medium">{{ item.name }}</div>
                <div class="mt-2 text-sm leading-6 text-g-500">{{ item.desc }}</div>
              </div>
              <ElTag :type="item.type">{{ item.status }}</ElTag>
            </div>
            <div class="mt-5 flex flex-wrap gap-2">
              <ElTag v-for="feature in item.features" :key="feature" effect="plain">{{ feature }}</ElTag>
            </div>
          </ElCard>
        </ElCol>
      </ElRow>
    </ElCard>
  </div>
</template>

<script setup lang="ts">
  defineOptions({ name: 'AccessTypes' })

  const typeCards = ref([
    {
      name: '表接入',
      desc: '面向关系型库表接入，支持字段映射、增量拉取与定时同步。',
      status: '已启用',
      type: 'success',
      features: ['表接入', 'SQL 采集', '增量主键']
    },
    {
      name: '大数据接入',
      desc: '适配 HBase、Kafka0.9、华为 Elasticsearch 输入链路。',
      status: '可配置',
      type: 'warning',
      features: ['HBase', 'Kafka0.9', '华为 ES']
    },
    {
      name: '文件接入',
      desc: '面向 Excel 读取与离线文件导入场景，适合快速落库。',
      status: '已启用',
      type: 'primary',
      features: ['Excel 读取', '模板校验', '批次导入']
    }
  ])
</script>
