<template>
  <div class="flex flex-col gap-4 pb-5">
    <ElCard shadow="never">
      <template #header>
        <div class="flex-cb">
          <span class="text-base font-semibold">逻辑模型管理</span>
          <ElTag type="primary" effect="light">多用户协作</ElTag>
        </div>
      </template>
      <div class="flex flex-wrap gap-2">
        <ElTag v-for="item in capabilityTags" :key="item" effect="light">{{ item }}</ElTag>
      </div>
    </ElCard>

    <ElCard shadow="never">
      <ElSpace wrap class="mb-3">
        <ElButton type="primary" @click="addModel">新增逻辑模型</ElButton>
        <ElButton @click="openShareConfig">模型共享权限</ElButton>
      </ElSpace>

      <ElTable :data="rows" border>
        <ElTableColumn prop="name" label="模型名称" min-width="180" />
        <ElTableColumn prop="subjectArea" label="主题域" width="150" />
        <ElTableColumn prop="version" label="版本" width="110" />
        <ElTableColumn prop="collaborators" label="协作成员" min-width="220" />
        <ElTableColumn prop="shareScope" label="共享范围" width="140" />
        <ElTableColumn prop="updatedAt" label="更新时间" width="170" />
        <ElTableColumn label="操作" width="260" fixed="right">
          <template #default="{ row }">
            <ElSpace>
              <ElButton link type="primary" @click="editModel(row)">编辑</ElButton>
              <ElButton link @click="viewVersion(row)">版本</ElButton>
              <ElButton link type="danger" @click="removeModel(row.id)">删除</ElButton>
            </ElSpace>
          </template>
        </ElTableColumn>
      </ElTable>
    </ElCard>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { ElMessage, ElMessageBox } from 'element-plus'

  defineOptions({ name: 'LogicalModel' })

  interface LogicalRow {
    id: number
    name: string
    subjectArea: string
    version: string
    collaborators: string
    shareScope: string
    updatedAt: string
  }

  const capabilityTags = [
    '新增逻辑模型',
    '修改逻辑模型',
    '删除逻辑模型',
    '版本查看',
    '多用户协作',
    '模型共享权限配置'
  ]

  const rows = ref<LogicalRow[]>([
    {
      id: 1,
      name: '人员逻辑模型',
      subjectArea: '人员管理',
      version: 'v2.2',
      collaborators: '张强、王磊、陈欣',
      shareScope: '全局可读',
      updatedAt: '2026-03-30 10:11:00'
    },
    {
      id: 2,
      name: '装备逻辑模型',
      subjectArea: '装备管理',
      version: 'v1.6',
      collaborators: '刘涛、杨凯',
      shareScope: '部门可读',
      updatedAt: '2026-03-29 16:45:00'
    }
  ])

  const addModel = () => {
    rows.value.unshift({
      id: Date.now(),
      name: '新增逻辑模型',
      subjectArea: '待分类',
      version: 'v1.0',
      collaborators: '当前用户',
      shareScope: '私有',
      updatedAt: new Date().toLocaleString()
    })
    ElMessage.success('逻辑模型已新增')
  }

  const editModel = (row: LogicalRow) => {
    row.version = `v${(Number(row.version.replace('v', '')) + 0.1).toFixed(1)}`
    row.updatedAt = new Date().toLocaleString()
    ElMessage.success(`${row.name} 已更新并生成新版本`)
  }

  const viewVersion = (row: LogicalRow) => {
    ElMessage.info(`已展示 ${row.name} 的版本轨迹（当前 ${row.version}）`)
  }

  const removeModel = async (id: number) => {
    try {
      await ElMessageBox.confirm('确认删除该逻辑模型吗？', '删除确认', { type: 'warning' })
      rows.value = rows.value.filter((item) => item.id !== id)
      ElMessage.success('逻辑模型已删除')
    } catch {
      ElMessage.info('已取消删除')
    }
  }

  const openShareConfig = () => {
    ElMessage.success('已进入模型共享权限配置流程')
  }
</script>
