<template>
  <div class="flex flex-col gap-4 pb-5">
    <ElCard>
      <template #header>
        <div class="flex-cb gap-3">
          <div>
            <h3 class="m-0 text-base font-medium">通知内容定制</h3>
            <p class="m-0 mt-1 text-sm text-g-700">
              提供数据资源与资源目录的新增、修改、删除、查询、详情等能力。
            </p>
          </div>
          <ElSpace wrap>
            <ElInput v-model="resourceKeyword" placeholder="查询数据资源 / 目录" clearable class="max-w-64" />
            <ElButton type="primary" @click="openResourceDialog('add')">新增数据资源</ElButton>
            <ElButton @click="openCatalogDialog('add')">新增资源目录</ElButton>
          </ElSpace>
        </div>
      </template>

      <ElTabs v-model="activeTab">
        <ElTabPane label="数据资源管理" name="resource">
          <ArtTable :data="filteredResources" :columns="resourceColumns" :show-table-header="false">
            <template #status="{ row }">
              <ElTag :type="row.status === '启用' ? 'success' : 'info'" effect="light">{{ row.status }}</ElTag>
            </template>

            <template #operation="{ row }">
              <ElSpace wrap>
                <ElButton link type="primary" @click="viewResourceDetail(row)">数据资源详情</ElButton>
                <ElButton link type="primary" @click="openResourceDialog('edit', row)">修改数据资源</ElButton>
                <ElPopconfirm title="确认删除该数据资源吗？" @confirm="deleteResource(row.id)">
                  <template #reference>
                    <ElButton link type="danger">删除数据资源</ElButton>
                  </template>
                </ElPopconfirm>
              </ElSpace>
            </template>
          </ArtTable>
        </ElTabPane>

        <ElTabPane label="资源目录管理" name="catalog">
          <ArtTable :data="filteredCatalogs" :columns="catalogColumns" :show-table-header="false">
            <template #status="{ row }">
              <ElTag :type="row.status === '启用' ? 'success' : 'warning'" effect="light">{{ row.status }}</ElTag>
            </template>

            <template #operation="{ row }">
              <ElSpace wrap>
                <ElButton link type="primary" @click="openCatalogDialog('edit', row)">修改资源目录</ElButton>
                <ElPopconfirm title="确认删除该资源目录吗？" @confirm="deleteCatalog(row.id)">
                  <template #reference>
                    <ElButton link type="danger">删除资源目录</ElButton>
                  </template>
                </ElPopconfirm>
              </ElSpace>
            </template>
          </ArtTable>
        </ElTabPane>
      </ElTabs>
    </ElCard>

    <ElDialog v-model="resourceDialogVisible" :title="resourceDialogTitle" width="560px">
      <ElForm :model="resourceForm" label-width="90px">
        <ElFormItem label="资源名称">
          <ElInput v-model="resourceForm.name" placeholder="请输入资源名称" />
        </ElFormItem>
        <ElFormItem label="资源编码">
          <ElInput v-model="resourceForm.code" placeholder="请输入资源编码" />
        </ElFormItem>
        <ElFormItem label="所属目录">
          <ElSelect v-model="resourceForm.catalog" placeholder="请选择目录">
            <ElOption v-for="item in catalogs" :key="item.id" :label="item.name" :value="item.name" />
          </ElSelect>
        </ElFormItem>
        <ElFormItem label="资源说明">
          <ElInput v-model="resourceForm.description" type="textarea" :rows="3" />
        </ElFormItem>
      </ElForm>
      <template #footer>
        <ElButton @click="resourceDialogVisible = false">取消</ElButton>
        <ElButton type="primary" @click="submitResource">保存</ElButton>
      </template>
    </ElDialog>

    <ElDialog v-model="catalogDialogVisible" :title="catalogDialogTitle" width="520px">
      <ElForm :model="catalogForm" label-width="90px">
        <ElFormItem label="目录名称">
          <ElInput v-model="catalogForm.name" placeholder="请输入目录名称" />
        </ElFormItem>
        <ElFormItem label="目录编码">
          <ElInput v-model="catalogForm.code" placeholder="请输入目录编码" />
        </ElFormItem>
        <ElFormItem label="目录说明">
          <ElInput v-model="catalogForm.description" type="textarea" :rows="3" />
        </ElFormItem>
      </ElForm>
      <template #footer>
        <ElButton @click="catalogDialogVisible = false">取消</ElButton>
        <ElButton type="primary" @click="submitCatalog">保存</ElButton>
      </template>
    </ElDialog>

    <ElDialog v-model="detailDialogVisible" title="数据资源详情" width="520px">
      <ElDescriptions v-if="currentResource" :column="1" border>
        <ElDescriptionsItem label="资源名称">{{ currentResource.name }}</ElDescriptionsItem>
        <ElDescriptionsItem label="资源编码">{{ currentResource.code }}</ElDescriptionsItem>
        <ElDescriptionsItem label="所属目录">{{ currentResource.catalog }}</ElDescriptionsItem>
        <ElDescriptionsItem label="更新时间">{{ currentResource.updateTime }}</ElDescriptionsItem>
        <ElDescriptionsItem label="资源说明">{{ currentResource.description }}</ElDescriptionsItem>
      </ElDescriptions>
    </ElDialog>
  </div>
</template>

<script setup lang="ts">
  import type { ColumnOption } from '@/types'

  defineOptions({ name: 'NotificationContentCustomization' })

  interface DataResource {
    id: number
    name: string
    code: string
    catalog: string
    status: string
    updateTime: string
    description: string
  }

  interface ResourceCatalog {
    id: number
    name: string
    code: string
    status: string
    updateTime: string
    description: string
  }

  const activeTab = ref('resource')
  const resourceKeyword = ref('')
  const resourceDialogVisible = ref(false)
  const catalogDialogVisible = ref(false)
  const detailDialogVisible = ref(false)
  const resourceMode = ref<'add' | 'edit'>('add')
  const catalogMode = ref<'add' | 'edit'>('add')
  const editingResourceId = ref<number | null>(null)
  const editingCatalogId = ref<number | null>(null)
  const currentResource = ref<DataResource | null>(null)

  const resources = ref<DataResource[]>([
    {
      id: 1,
      name: '重点目标画像数据',
      code: 'RES_001',
      catalog: '情报资源目录',
      status: '启用',
      updateTime: '2026-03-30 10:20',
      description: '用于通知模板中引用重点目标画像数据资源。'
    },
    {
      id: 2,
      name: '边境卡口采集数据',
      code: 'RES_002',
      catalog: '边防资源目录',
      status: '启用',
      updateTime: '2026-03-29 16:00',
      description: '用于卡口通知与任务下发的数据引用。'
    },
    {
      id: 3,
      name: '历史告警归档数据',
      code: 'RES_003',
      catalog: '告警资源目录',
      status: '停用',
      updateTime: '2026-03-28 09:45',
      description: '用于历史记录比对的归档数据。'
    }
  ])

  const catalogs = ref<ResourceCatalog[]>([
    {
      id: 1,
      name: '情报资源目录',
      code: 'CAT_001',
      status: '启用',
      updateTime: '2026-03-30 09:00',
      description: '情报采集类资源目录。'
    },
    {
      id: 2,
      name: '边防资源目录',
      code: 'CAT_002',
      status: '启用',
      updateTime: '2026-03-29 09:30',
      description: '边境卡口类资源目录。'
    },
    {
      id: 3,
      name: '告警资源目录',
      code: 'CAT_003',
      status: '维护中',
      updateTime: '2026-03-27 11:10',
      description: '告警与处置记录目录。'
    }
  ])

  const resourceForm = reactive({
    name: '',
    code: '',
    catalog: '',
    description: ''
  })

  const catalogForm = reactive({
    name: '',
    code: '',
    description: ''
  })

  const resourceColumns: ColumnOption[] = [
    { prop: 'name', label: '资源名称', minWidth: 180 },
    { prop: 'code', label: '资源编码', width: 140 },
    { prop: 'catalog', label: '所属目录', minWidth: 160 },
    { prop: 'status', label: '状态', width: 100, useSlot: true },
    { prop: 'updateTime', label: '更新时间', width: 180 },
    { prop: 'operation', label: '操作', minWidth: 240, useSlot: true, fixed: 'right' }
  ]

  const catalogColumns: ColumnOption[] = [
    { prop: 'name', label: '目录名称', minWidth: 180 },
    { prop: 'code', label: '目录编码', width: 140 },
    { prop: 'status', label: '状态', width: 100, useSlot: true },
    { prop: 'updateTime', label: '更新时间', width: 180 },
    { prop: 'description', label: '目录说明', minWidth: 220 },
    { prop: 'operation', label: '操作', minWidth: 180, useSlot: true, fixed: 'right' }
  ]

  const filteredResources = computed(() => {
    const keyword = resourceKeyword.value.trim()
    if (!keyword) {
      return resources.value
    }

    return resources.value.filter(
      (item) =>
        item.name.includes(keyword) || item.code.includes(keyword) || item.catalog.includes(keyword)
    )
  })

  const filteredCatalogs = computed(() => {
    const keyword = resourceKeyword.value.trim()
    if (!keyword) {
      return catalogs.value
    }

    return catalogs.value.filter((item) => item.name.includes(keyword) || item.code.includes(keyword))
  })

  const resourceDialogTitle = computed(() =>
    resourceMode.value === 'add' ? '新增数据资源' : '修改数据资源'
  )
  const catalogDialogTitle = computed(() =>
    catalogMode.value === 'add' ? '新增资源目录' : '修改资源目录'
  )

  const resetResourceForm = () => {
    resourceForm.name = ''
    resourceForm.code = ''
    resourceForm.catalog = ''
    resourceForm.description = ''
  }

  const resetCatalogForm = () => {
    catalogForm.name = ''
    catalogForm.code = ''
    catalogForm.description = ''
  }

  const openResourceDialog = (mode: 'add' | 'edit', row?: DataResource) => {
    resourceMode.value = mode
    resourceDialogVisible.value = true

    if (row) {
      editingResourceId.value = row.id
      resourceForm.name = row.name
      resourceForm.code = row.code
      resourceForm.catalog = row.catalog
      resourceForm.description = row.description
      return
    }

    editingResourceId.value = null
    resetResourceForm()
  }

  const openCatalogDialog = (mode: 'add' | 'edit', row?: ResourceCatalog) => {
    catalogMode.value = mode
    catalogDialogVisible.value = true

    if (row) {
      editingCatalogId.value = row.id
      catalogForm.name = row.name
      catalogForm.code = row.code
      catalogForm.description = row.description
      return
    }

    editingCatalogId.value = null
    resetCatalogForm()
  }

  const submitResource = () => {
    if (resourceMode.value === 'add') {
      resources.value.unshift({
        id: Date.now(),
        name: resourceForm.name,
        code: resourceForm.code,
        catalog: resourceForm.catalog,
        status: '启用',
        updateTime: '2026-03-30 15:00',
        description: resourceForm.description
      })
      ElMessage.success('已新增数据资源')
    } else {
      const target = resources.value.find((item) => item.id === editingResourceId.value)
      if (target) {
        target.name = resourceForm.name
        target.code = resourceForm.code
        target.catalog = resourceForm.catalog
        target.description = resourceForm.description
        target.updateTime = '2026-03-30 15:00'
      }
      ElMessage.success('已修改数据资源')
    }

    resourceDialogVisible.value = false
  }

  const submitCatalog = () => {
    if (catalogMode.value === 'add') {
      catalogs.value.unshift({
        id: Date.now(),
        name: catalogForm.name,
        code: catalogForm.code,
        status: '启用',
        updateTime: '2026-03-30 15:00',
        description: catalogForm.description
      })
      ElMessage.success('已新增资源目录')
    } else {
      const target = catalogs.value.find((item) => item.id === editingCatalogId.value)
      if (target) {
        target.name = catalogForm.name
        target.code = catalogForm.code
        target.description = catalogForm.description
        target.updateTime = '2026-03-30 15:00'
      }
      ElMessage.success('已修改资源目录')
    }

    catalogDialogVisible.value = false
  }

  const deleteResource = (id: number) => {
    resources.value = resources.value.filter((item) => item.id !== id)
    ElMessage.success('已删除数据资源')
  }

  const deleteCatalog = (id: number) => {
    catalogs.value = catalogs.value.filter((item) => item.id !== id)
    ElMessage.success('已删除资源目录')
  }

  const viewResourceDetail = (row: DataResource) => {
    currentResource.value = row
    detailDialogVisible.value = true
  }
</script>
