<template>
  <div class="flex flex-col gap-4 pb-5">
    <ElCard shadow="never">
      <template #header>
        <div class="flex-cb">
          <span class="text-base font-semibold">概念模型管理</span>
          <ElTag type="primary" effect="light">签入 / 签出 / 版本</ElTag>
        </div>
      </template>
      <div class="flex flex-wrap gap-2">
        <ElTag v-for="item in capabilityTags" :key="item" effect="light">{{ item }}</ElTag>
      </div>
    </ElCard>

    <ElCard shadow="never">
      <ElSpace wrap class="mb-3">
        <ElButton type="primary" @click="addModel">新增概念模型</ElButton>
        <ElButton @click="notifyChange">变更通知</ElButton>
      </ElSpace>

      <ElTable :data="rows" border>
        <ElTableColumn prop="name" label="模型名称" min-width="180" />
        <ElTableColumn prop="domain" label="业务域" width="140" />
        <ElTableColumn prop="version" label="版本" width="110" />
        <ElTableColumn prop="owner" label="负责人" width="120" />
        <ElTableColumn prop="roleScope" label="角色权限" width="160" />
        <ElTableColumn label="签入/签出" width="120">
          <template #default="{ row }">
            <ElTag :type="row.checkedOut ? 'warning' : 'success'" effect="light">
              {{ row.checkedOut ? '已签出' : '已签入' }}
            </ElTag>
          </template>
        </ElTableColumn>
        <ElTableColumn prop="updatedAt" label="更新时间" width="170" />
        <ElTableColumn label="操作" width="260" fixed="right">
          <template #default="{ row }">
            <ElSpace>
              <ElButton link type="primary" @click="toggleCheckState(row)">
                {{ row.checkedOut ? '签入' : '签出' }}
              </ElButton>
              <ElButton link @click="viewVersion(row)">版本查看</ElButton>
              <ElButton link type="danger" @click="deleteModel(row.id)">删除</ElButton>
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

  defineOptions({ name: 'ConceptModel' })

  interface ConceptRow {
    id: number
    name: string
    domain: string
    version: string
    owner: string
    roleScope: string
    checkedOut: boolean
    updatedAt: string
  }

  const capabilityTags = [
    '新增概念模型',
    '修改概念模型',
    '删除概念模型',
    '版本查看',
    '签入签出',
    '权限与角色配置',
    '模型概念变更通知'
  ]

  const rows = ref<ConceptRow[]>([
    {
      id: 1,
      name: '人员对象概念模型',
      domain: '人员管理',
      version: 'v1.3',
      owner: '张强',
      roleScope: '建模组/审核组',
      checkedOut: false,
      updatedAt: '2026-03-28 14:22:00'
    },
    {
      id: 2,
      name: '装备对象概念模型',
      domain: '装备管理',
      version: 'v2.0',
      owner: '刘涛',
      roleScope: '建模组',
      checkedOut: true,
      updatedAt: '2026-03-30 09:18:00'
    }
  ])

  const addModel = () => {
    rows.value.unshift({
      id: Date.now(),
      name: '新建概念模型',
      domain: '待分类',
      version: 'v1.0',
      owner: '当前用户',
      roleScope: '建模组',
      checkedOut: true,
      updatedAt: new Date().toLocaleString()
    })
    ElMessage.success('已新增概念模型并自动签出')
  }

  const toggleCheckState = (row: ConceptRow) => {
    row.checkedOut = !row.checkedOut
    ElMessage.success(`${row.name} 已${row.checkedOut ? '签出' : '签入'}`)
  }

  const viewVersion = (row: ConceptRow) => {
    ElMessage.info(`已打开 ${row.name} 的版本历史：${row.version}`)
  }

  const deleteModel = async (id: number) => {
    try {
      await ElMessageBox.confirm('删除后将保留历史版本记录，是否继续？', '删除确认', {
        type: 'warning'
      })
      rows.value = rows.value.filter((item) => item.id !== id)
      ElMessage.success('概念模型已删除')
    } catch {
      ElMessage.info('已取消删除')
    }
  }

  const notifyChange = () => {
    ElMessage.success('模型概念变更通知已发送至相关角色')
  }
</script>
