<template>
  <div class="flex flex-col gap-5 pb-5">
    <ElCard>
      <template #header>
        <div class="flex-cb gap-3 flex-wrap">
          <div>
            <h3 class="m-0 text-base">数据模板管理</h3>
            <p class="m-0 mt-1 text-sm text-g-500">覆盖模板目录、模板维护与版本追踪的全流程配置。</p>
          </div>
          <ElSpace wrap>
            <ElButton type="primary">新增模板</ElButton>
            <ElButton>新增模板目录</ElButton>
            <ElButton type="warning" plain>修改模板目录</ElButton>
            <ElButton type="danger" plain>删除模板目录</ElButton>
          </ElSpace>
        </div>
      </template>

      <ElRow :gutter="20">
        <ElCol :xs="24" :lg="7">
          <ElCard shadow="never" class="h-full">
            <template #header>
              <div class="flex-cb">
                <span>模板目录</span>
                <ElTag type="info">支持查询</ElTag>
              </div>
            </template>
            <ElInput v-model="keyword" clearable placeholder="请输入目录名称" class="mb-4" />
            <ElTree :data="directoryTree" node-key="id" default-expand-all>
              <template #default="{ data }">
                <div class="flex-cb w-full pr-2">
                  <span>{{ data.label }}</span>
                  <span class="text-xs text-g-500">{{ data.count }} 个模板</span>
                </div>
              </template>
            </ElTree>
          </ElCard>
        </ElCol>

        <ElCol :xs="24" :lg="17">
          <ElCard shadow="never" class="h-full">
            <template #header>
              <div class="flex-cb gap-3 flex-wrap">
                <span>模板清单</span>
                <ElSpace wrap>
                  <ElSelect v-model="templateStatus" style="width: 160px">
                    <ElOption label="全部状态" value="全部状态" />
                    <ElOption label="已发布" value="已发布" />
                    <ElOption label="草稿" value="草稿" />
                    <ElOption label="待审核" value="待审核" />
                  </ElSelect>
                  <ElButton>查看模板</ElButton>
                  <ElButton type="warning" plain>编辑模板</ElButton>
                  <ElButton type="danger" plain>删除模板</ElButton>
                </ElSpace>
              </div>
            </template>
            <ElTable :data="templateList" border>
              <ElTableColumn prop="name" label="模板名称" min-width="180" />
              <ElTableColumn prop="directory" label="所属目录" min-width="140" />
              <ElTableColumn prop="fields" label="字段数" width="90" />
              <ElTableColumn prop="version" label="当前版本" width="110" />
              <ElTableColumn prop="updatedAt" label="更新时间" width="170" />
              <ElTableColumn label="状态" width="110">
                <template #default="{ row }">
                  <ElTag :type="row.status === '已发布' ? 'success' : row.status === '待审核' ? 'warning' : 'info'">
                    {{ row.status }}
                  </ElTag>
                </template>
              </ElTableColumn>
            </ElTable>
          </ElCard>
        </ElCol>
      </ElRow>
    </ElCard>
  </div>
</template>

<script setup lang="ts">
  defineOptions({ name: 'TemplateManagement' })

  const keyword = ref('')
  const templateStatus = ref('全部状态')

  const directoryTree = ref([
    {
      id: 1,
      label: '基础模板库',
      count: 8,
      children: [
        { id: 11, label: '结构化接入', count: 4 },
        { id: 12, label: '非结构化接入', count: 4 }
      ]
    },
    {
      id: 2,
      label: '专题模板库',
      count: 5,
      children: [
        { id: 21, label: '边防业务', count: 2 },
        { id: 22, label: '综合研判', count: 3 }
      ]
    }
  ])

  const templateList = ref([
    {
      name: '边防卡口结构化模板',
      directory: '结构化接入',
      fields: 42,
      version: 'v2.3.1',
      updatedAt: '2026-03-28 10:30',
      status: '已发布'
    },
    {
      name: '日志归档模板',
      directory: '非结构化接入',
      fields: 18,
      version: 'v1.8.0',
      updatedAt: '2026-03-27 16:20',
      status: '待审核'
    },
    {
      name: '情报交换模板',
      directory: '综合研判',
      fields: 27,
      version: 'v1.2.5',
      updatedAt: '2026-03-26 09:10',
      status: '草稿'
    }
  ])
</script>
