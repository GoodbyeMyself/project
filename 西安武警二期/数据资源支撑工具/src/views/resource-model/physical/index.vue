<template>
  <div class="flex flex-col gap-4 pb-5">
    <ElCard shadow="never">
      <template #header>
        <div class="flex-cb">
          <span class="text-base font-semibold">物理模型管理</span>
          <ElTag type="primary" effect="light">转换 / 迁移 / 测试</ElTag>
        </div>
      </template>
      <div class="flex flex-wrap gap-2">
        <ElTag v-for="item in capabilityTags" :key="item" effect="light">{{ item }}</ElTag>
      </div>
    </ElCard>

    <ElCard shadow="never">
      <ElSpace wrap class="mb-3">
        <ElButton type="primary" @click="createPhysicalModel">新增物理模型</ElButton>
        <ElButton @click="autoConvert">自动转换</ElButton>
        <ElButton type="success" @click="runValidation">验证与测试</ElButton>
      </ElSpace>

      <ElTable :data="rows" border>
        <ElTableColumn prop="name" label="物理模型" min-width="180" />
        <ElTableColumn prop="dbType" label="数据库类型" width="120" />
        <ElTableColumn prop="sourceModel" label="来源逻辑模型" min-width="160" />
        <ElTableColumn prop="version" label="版本" width="100" />
        <ElTableColumn prop="migrationStatus" label="迁移状态" width="120" />
        <ElTableColumn prop="testResult" label="测试结果" width="120">
          <template #default="{ row }">
            <ElTag :type="row.testResult === '通过' ? 'success' : 'danger'" effect="light">
              {{ row.testResult }}
            </ElTag>
          </template>
        </ElTableColumn>
        <ElTableColumn prop="updatedAt" label="更新时间" width="170" />
        <ElTableColumn label="操作" width="240" fixed="right">
          <template #default="{ row }">
            <ElSpace>
              <ElButton link type="primary" @click="migrateModel(row)">迁移</ElButton>
              <ElButton link @click="viewReport(row)">测试报告</ElButton>
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

  defineOptions({ name: 'PhysicalModel' })

  interface PhysicalRow {
    id: number
    name: string
    dbType: string
    sourceModel: string
    version: string
    migrationStatus: string
    testResult: '通过' | '失败'
    updatedAt: string
  }

  const capabilityTags = [
    '自动转换功能',
    '新增物理模型',
    '修改物理模型',
    '删除物理模型',
    '版本查看',
    '迁移模型',
    '验证与测试',
    '测试报告结果查询'
  ]

  const rows = ref<PhysicalRow[]>([
    {
      id: 1,
      name: '人员中心库模型',
      dbType: 'PostgreSQL',
      sourceModel: '人员逻辑模型',
      version: 'v2.1',
      migrationStatus: '已完成',
      testResult: '通过',
      updatedAt: '2026-03-30 11:03:00'
    },
    {
      id: 2,
      name: '装备台账库模型',
      dbType: 'MySQL',
      sourceModel: '装备逻辑模型',
      version: 'v1.7',
      migrationStatus: '待迁移',
      testResult: '失败',
      updatedAt: '2026-03-29 20:15:00'
    }
  ])

  const createPhysicalModel = () => {
    rows.value.unshift({
      id: Date.now(),
      name: '新建物理模型',
      dbType: 'PostgreSQL',
      sourceModel: '待关联逻辑模型',
      version: 'v1.0',
      migrationStatus: '待迁移',
      testResult: '失败',
      updatedAt: new Date().toLocaleString()
    })
    ElMessage.success('已新增物理模型')
  }

  const autoConvert = () => {
    ElMessage.success('自动转换任务已提交，正在生成物理模型')
  }

  const runValidation = () => {
    rows.value.forEach((item) => {
      item.testResult = '通过'
      item.updatedAt = new Date().toLocaleString()
    })
    ElMessage.success('验证与测试执行完成')
  }

  const migrateModel = (row: PhysicalRow) => {
    row.migrationStatus = '已完成'
    row.updatedAt = new Date().toLocaleString()
    ElMessage.success(`${row.name} 迁移完成`)
  }

  const viewReport = (row: PhysicalRow) => {
    ElMessage.info(`已打开 ${row.name} 的测试报告`)
  }

  const removeModel = async (id: number) => {
    try {
      await ElMessageBox.confirm('删除后将不可恢复，是否继续？', '删除确认', { type: 'warning' })
      rows.value = rows.value.filter((item) => item.id !== id)
      ElMessage.success('物理模型已删除')
    } catch {
      ElMessage.info('已取消删除')
    }
  }
</script>
