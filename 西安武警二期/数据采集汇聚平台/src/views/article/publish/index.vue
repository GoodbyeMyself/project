<template>
  <div class="flex flex-col gap-4 pb-5">
    <ElRow :gutter="20">
      <ElCol :xs="24" :xl="14">
        <ElCard>
          <template #header>
            <div class="flex-cb gap-3">
              <div>
                <h3 class="m-0 text-base font-medium">告警组管理</h3>
                <p class="m-0 mt-1 text-sm text-g-700">提供创建、修改、删除、查询告警组及告警组用户配置能力。</p>
              </div>
              <ElButton type="primary" @click="addAlarmGroup">创建告警组</ElButton>
            </div>
          </template>

          <ArtTable :data="alarmGroups" :columns="groupColumns" :show-table-header="false">
            <template #operation="{ row }">
              <ElSpace wrap>
                <ElButton link type="primary" @click="configGroupUsers(row)">告警组用户配置</ElButton>
                <ElButton link type="primary" @click="editAlarmGroup(row)">修改告警组</ElButton>
                <ElPopconfirm title="确认删除该告警组吗？" @confirm="deleteAlarmGroup(row.id)">
                  <template #reference><ElButton link type="danger">删除告警组</ElButton></template>
                </ElPopconfirm>
              </ElSpace>
            </template>
          </ArtTable>
        </ElCard>
      </ElCol>

      <ElCol :xs="24" :xl="10">
        <ElCard>
          <template #header><span class="font-medium">消息通知处理管理</span></template>
          <ArtTable :data="messages" :columns="messageColumns" :show-table-header="false">
            <template #status="{ row }">
              <ElTag :type="row.read ? 'success' : 'warning'" effect="light">{{ row.read ? '已读' : '未读' }}</ElTag>
            </template>
            <template #operation="{ row }">
              <ElSpace wrap>
                <ElButton link type="primary" @click="queryMessage(row)">查询消息</ElButton>
                <ElButton link type="primary" @click="markRead(row)">消息标记已读</ElButton>
                <ElPopconfirm title="确认删除该消息吗？" @confirm="deleteMessage(row.id)">
                  <template #reference><ElButton link type="danger">删除消息</ElButton></template>
                </ElPopconfirm>
              </ElSpace>
            </template>
          </ArtTable>
        </ElCard>
      </ElCol>
    </ElRow>

    <ElCard>
      <template #header>
        <div class="flex-cb gap-3">
          <div>
            <h3 class="m-0 text-base font-medium">告警规则管理</h3>
            <p class="m-0 mt-1 text-sm text-g-700">支持新增、修改、删除、查询、一键巡检、查询告警报告、下载告警报告。</p>
          </div>
          <ElSpace wrap>
            <ElButton type="primary" @click="addRule">新增告警规则</ElButton>
            <ElButton @click="inspectRules">一键巡检告警规则</ElButton>
          </ElSpace>
        </div>
      </template>

      <ArtTable :data="rules" :columns="ruleColumns" :show-table-header="false">
        <template #status="{ row }">
          <ElTag :type="row.enabled ? 'success' : 'info'" effect="light">{{ row.enabled ? '启用' : '停用' }}</ElTag>
        </template>
        <template #operation="{ row }">
          <ElSpace wrap>
            <ElButton link type="primary" @click="editRule(row)">修改告警规则</ElButton>
            <ElButton link type="primary" @click="queryReport(row)">查询告警报告</ElButton>
            <ElButton link type="primary" @click="downloadReport(row)">下载告警报告</ElButton>
            <ElPopconfirm title="确认删除该告警规则吗？" @confirm="deleteRule(row.id)">
              <template #reference><ElButton link type="danger">删除告警规则</ElButton></template>
            </ElPopconfirm>
          </ElSpace>
        </template>
      </ArtTable>
    </ElCard>
  </div>
</template>

<script setup lang="ts">
  import type { ColumnOption } from '@/types'

  defineOptions({ name: 'AlarmNotificationCenter' })

  const alarmGroups = ref([
    { id: 1, name: '一级值班告警组', users: '张三、李四', scene: '边境巡检' },
    { id: 2, name: '平台运维告警组', users: '王五、赵六', scene: '系统故障' }
  ])

  const messages = ref([
    { id: 1, title: '设备离线告警', source: '巡检系统', read: false },
    { id: 2, title: '规则命中通知', source: '告警引擎', read: true }
  ])

  const rules = ref([
    { id: 1, name: '设备离线超时规则', level: '严重', enabled: true },
    { id: 2, name: '采集波动预警规则', level: '一般', enabled: true }
  ])

  const groupColumns: ColumnOption[] = [
    { prop: 'name', label: '告警组名称', minWidth: 180 },
    { prop: 'users', label: '组内用户', minWidth: 160 },
    { prop: 'scene', label: '适用场景', minWidth: 160 },
    { prop: 'operation', label: '操作', minWidth: 220, useSlot: true }
  ]

  const messageColumns: ColumnOption[] = [
    { prop: 'title', label: '消息标题', minWidth: 180 },
    { prop: 'source', label: '消息来源', minWidth: 140 },
    { prop: 'status', label: '阅读状态', width: 100, useSlot: true },
    { prop: 'operation', label: '操作', minWidth: 220, useSlot: true }
  ]

  const ruleColumns: ColumnOption[] = [
    { prop: 'name', label: '规则名称', minWidth: 220 },
    { prop: 'level', label: '告警级别', width: 120 },
    { prop: 'status', label: '启停状态', width: 100, useSlot: true },
    { prop: 'operation', label: '操作', minWidth: 320, useSlot: true, fixed: 'right' }
  ]

  const addAlarmGroup = () => {
    alarmGroups.value.unshift({ id: Date.now(), name: '新建告警组', users: '待配置', scene: '待指定' })
    ElMessage.success('已创建告警组')
  }
  const editAlarmGroup = (row: { name: string }) => {
    row.name = `${row.name}-已修改`
    ElMessage.success('已修改告警组')
  }
  const deleteAlarmGroup = (id: number) => {
    alarmGroups.value = alarmGroups.value.filter((item) => item.id !== id)
    ElMessage.success('已删除告警组')
  }
  const configGroupUsers = (row: { name: string }) => ElMessage.info(`告警组用户配置：${row.name}`)

  const queryMessage = (row: { title: string }) => ElMessage.info(`查询消息：${row.title}`)
  const markRead = (row: { read: boolean }) => {
    row.read = true
    ElMessage.success('消息已标记已读')
  }
  const deleteMessage = (id: number) => {
    messages.value = messages.value.filter((item) => item.id !== id)
    ElMessage.success('已删除消息')
  }

  const addRule = () => {
    rules.value.unshift({ id: Date.now(), name: '新建告警规则', level: '一般', enabled: true })
    ElMessage.success('已新增告警规则')
  }
  const editRule = (row: { name: string }) => {
    row.name = `${row.name}-已修改`
    ElMessage.success('已修改告警规则')
  }
  const deleteRule = (id: number) => {
    rules.value = rules.value.filter((item) => item.id !== id)
    ElMessage.success('已删除告警规则')
  }
  const inspectRules = () => ElMessage.success('已执行一键巡检告警规则')
  const queryReport = (row: { name: string }) => ElMessage.info(`查询告警报告：${row.name}`)
  const downloadReport = (row: { name: string }) => ElMessage.success(`开始下载告警报告：${row.name}`)
</script>
