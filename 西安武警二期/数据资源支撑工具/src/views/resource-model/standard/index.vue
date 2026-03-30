<template>
  <!-- Auto Comment: Component Summary: This component renders UI for '数据资源支撑工具/src/views/resource-model/standard/index.vue'. -->
  <!-- Auto Comment: Component Responsibility: It provides the view structure, interaction entry points, and display containers for this feature. -->
  <div class="flex flex-col gap-4 pb-5">
    <ElCard shadow="never">
      <template #header>
        <div class="flex-cb">
          <span class="text-base font-semibold">数据标准管理</span>
          <ElTag type="primary" effect="light">数据资源体系模型设计</ElTag>
        </div>
      </template>
      <ElAlert
        title="支持标准变更追踪、模型依赖分析、变更提示、影响修复、权限配置和送审流程。"
        type="info"
        :closable="false"
      />
      <div class="mt-3 flex flex-wrap gap-2">
        <ElTag v-for="item in capabilityTags" :key="item" effect="light">{{ item }}</ElTag>
      </div>
    </ElCard>

    <ElCard shadow="never">
      <ElForm :model="queryForm" inline>
        <ElFormItem label="关键字">
          <ElInput v-model="queryForm.keyword" placeholder="标准编码/名称" clearable />
        </ElFormItem>
        <ElFormItem label="状态">
          <ElSelect v-model="queryForm.status" placeholder="全部" clearable style="width: 160px">
            <ElOption label="启用" value="启用" />
            <ElOption label="评审中" value="评审中" />
            <ElOption label="待修复" value="待修复" />
          </ElSelect>
        </ElFormItem>
        <ElFormItem>
          <ElButton type="primary" @click="handleSearch">查询</ElButton>
          <ElButton @click="handleReset">重置</ElButton>
          <ElButton @click="openCreateDialog">新增标准</ElButton>
          <ElButton type="success" @click="submitReview">送审</ElButton>
        </ElFormItem>
      </ElForm>

      <ElTable :data="filteredRows" border>
        <ElTableColumn prop="code" label="标准编码" min-width="140" />
        <ElTableColumn prop="name" label="标准名称" min-width="180" />
        <ElTableColumn prop="version" label="版本" width="90" />
        <ElTableColumn prop="affectedModels" label="影响模型数" width="110" />
        <ElTableColumn prop="reviewStatus" label="送审状态" width="120">
          <template #default="{ row }">
            <ElTag :type="row.reviewStatus === '已通过' ? 'success' : 'warning'" effect="light">
              {{ row.reviewStatus }}
            </ElTag>
          </template>
        </ElTableColumn>
        <ElTableColumn prop="status" label="状态" width="100" />
        <ElTableColumn prop="updatedAt" label="更新时间" width="170" />
        <ElTableColumn label="操作" width="240" fixed="right">
          <template #default="{ row }">
            <ElSpace>
              <ElButton link type="primary" @click="trackDependency(row)">依赖分析</ElButton>
              <ElButton link type="warning" @click="repairImpact(row)">修复影响</ElButton>
              <ElButton link @click="editRow(row)">编辑</ElButton>
            </ElSpace>
          </template>
        </ElTableColumn>
      </ElTable>
    </ElCard>

    <ElDialog v-model="dialogVisible" :title="dialogTitle" width="560px">
      <ElForm :model="editForm" label-width="110px">
        <ElFormItem label="标准编码">
          <ElInput v-model="editForm.code" />
        </ElFormItem>
        <ElFormItem label="标准名称">
          <ElInput v-model="editForm.name" />
        </ElFormItem>
        <ElFormItem label="权限角色">
          <ElCheckboxGroup v-model="editForm.roles">
            <ElCheckbox label="R_SUPER">超级管理员</ElCheckbox>
            <ElCheckbox label="R_ADMIN">管理员</ElCheckbox>
            <ElCheckbox label="R_USER">业务用户</ElCheckbox>
          </ElCheckboxGroup>
        </ElFormItem>
        <ElFormItem label="变更说明">
          <ElInput v-model="editForm.changeNote" type="textarea" :rows="3" />
        </ElFormItem>
      </ElForm>
      <template #footer>
        <ElButton @click="dialogVisible = false">取消</ElButton>
        <ElButton type="primary" @click="saveRow">保存</ElButton>
      </template>
    </ElDialog>
  </div>
</template>

<script setup lang="ts">
  // Auto Comment: Component Script Notes: This script block manages state, events, and data flow for '数据资源支撑工具/src/views/resource-model/standard/index.vue'.
  // Auto Comment: Maintenance Hint: Keep business rules explicit and avoid implicit side effects between handlers.
  import { computed, reactive, ref } from 'vue'
  import { ElMessage } from 'element-plus'

  defineOptions({ name: 'ResourceStandard' })

  interface StandardRow {
    id: number
    code: string
    name: string
    version: string
    status: '启用' | '评审中' | '待修复'
    reviewStatus: '未送审' | '送审中' | '已通过'
    affectedModels: number
    updatedAt: string
  }

  interface EditForm {
    id?: number
    code: string
    name: string
    roles: string[]
    changeNote: string
  }

  const capabilityTags = [
    '数据标准变更追踪',
    '数据模型依赖分析',
    '变更提示',
    '修复影响模型',
    '用户权限配置',
    '数据标准送审'
  ]

  // Logic Note: Reactive state 'rows' stores mutable runtime data used by this component.
  const rows = ref<StandardRow[]>([
    {
      id: 1,
      code: 'STD_USER_001',
      name: '人员基础信息标准',
      version: 'v2.1',
      status: '启用',
      reviewStatus: '已通过',
      affectedModels: 12,
      updatedAt: '2026-03-28 10:24:00'
    },
    {
      id: 2,
      code: 'STD_EVENT_013',
      name: '事件日志标准',
      version: 'v1.8',
      status: '评审中',
      reviewStatus: '送审中',
      affectedModels: 7,
      updatedAt: '2026-03-29 19:31:00'
    },
    {
      id: 3,
      code: 'STD_EQUIP_004',
      name: '装备档案标准',
      version: 'v3.0',
      status: '待修复',
      reviewStatus: '未送审',
      affectedModels: 5,
      updatedAt: '2026-03-30 09:12:00'
    }
  ])

  // Logic Note: Reactive state 'queryForm' stores mutable runtime data used by this component.
  const queryForm = reactive({
    keyword: '',
    status: ''
  })

  // Logic Note: Reactive state 'dialogVisible' stores mutable runtime data used by this component.
  const dialogVisible = ref(false)
  // Logic Note: Reactive state 'dialogTitle' stores mutable runtime data used by this component.
  const dialogTitle = ref('新增数据标准')
  // Logic Note: Reactive state 'editForm' stores mutable runtime data used by this component.
  const editForm = reactive<EditForm>({
    code: '',
    name: '',
    roles: ['R_ADMIN'],
    changeNote: ''
  })

  // Logic Note: Computed value 'filteredRows' derives UI state from reactive sources and updates automatically.
  const filteredRows = computed(() => {
    return rows.value.filter((item) => {
      const matchKeyword =
        !queryForm.keyword ||
        item.code.includes(queryForm.keyword) ||
        item.name.includes(queryForm.keyword)
      const matchStatus = !queryForm.status || item.status === queryForm.status
      return matchKeyword && matchStatus
    })
  })

  // Logic Note: Handler 'handleSearch' encapsulates a single interaction or data-processing flow.
  const handleSearch = () => {
    ElMessage.success('已按条件筛选标准列表')
  }

  // Logic Note: Handler 'handleReset' encapsulates a single interaction or data-processing flow.
  const handleReset = () => {
    queryForm.keyword = ''
    queryForm.status = ''
  }

  // Logic Note: Handler 'openCreateDialog' encapsulates a single interaction or data-processing flow.
  const openCreateDialog = () => {
    dialogTitle.value = '新增数据标准'
    editForm.id = undefined
    editForm.code = ''
    editForm.name = ''
    editForm.roles = ['R_ADMIN']
    editForm.changeNote = ''
    dialogVisible.value = true
  }

  // Logic Note: Handler 'editRow' encapsulates a single interaction or data-processing flow.
  const editRow = (row: StandardRow) => {
    dialogTitle.value = '编辑数据标准'
    editForm.id = row.id
    editForm.code = row.code
    editForm.name = row.name
    editForm.roles = ['R_SUPER', 'R_ADMIN']
    editForm.changeNote = `基于 ${row.version} 进行字段兼容性调整`
    dialogVisible.value = true
  }

  // Logic Note: Handler 'saveRow' encapsulates a single interaction or data-processing flow.
  const saveRow = () => {
    if (!editForm.code || !editForm.name) {
      ElMessage.warning('请填写完整标准信息')
      return
    }

    if (editForm.id) {
      rows.value = rows.value.map((item) =>
        item.id === editForm.id ? { ...item, code: editForm.code, name: editForm.name } : item
      )
      ElMessage.success('标准已更新')
    } else {
      rows.value.unshift({
        id: Date.now(),
        code: editForm.code,
        name: editForm.name,
        version: 'v1.0',
        status: '评审中',
        reviewStatus: '未送审',
        affectedModels: 0,
        updatedAt: new Date().toLocaleString()
      })
      ElMessage.success('标准已新增')
    }
    dialogVisible.value = false
  }

  // Logic Note: Handler 'trackDependency' encapsulates a single interaction or data-processing flow.
  const trackDependency = (row: StandardRow) => {
    ElMessage.info(`已触发 ${row.code} 的模型依赖分析`)
  }

  // Logic Note: Handler 'repairImpact' encapsulates a single interaction or data-processing flow.
  const repairImpact = (row: StandardRow) => {
    ElMessage.success(`已启动 ${row.name} 的影响模型修复任务`)
  }

  // Logic Note: Handler 'submitReview' encapsulates a single interaction or data-processing flow.
  const submitReview = () => {
    ElMessage.success('已提交当前筛选范围标准进入送审流程')
  }
</script>
