<template>
  <!-- Auto Comment: Component Summary: This component renders UI for '数据采集汇聚平台/src/views/article/list/index.vue'. -->
  <!-- Auto Comment: Component Responsibility: It provides the view structure, interaction entry points, and display containers for this feature. -->
  <div class="flex flex-col gap-4 pb-5">
    <template v-if="route.name === 'AlarmGroupManage'">
      <ElRow :gutter="20">
        <ElCol :xs="24" :lg="16">
          <ElCard>
            <template #header>
              <div class="flex-cb gap-3">
                <div>
                  <h3 class="m-0 text-base font-medium">告警组管理</h3>
                  <p class="m-0 mt-1 text-sm text-g-700">支持告警组新增、修改、删除、查询与值守范围查看。</p>
                </div>
                <ElSpace wrap>
                  <ElInput v-model="alarmKeyword" placeholder="查询告警组" clearable class="max-w-64" />
                  <ElButton type="primary" @click="openAlarmDialog('add')">新增告警组</ElButton>
                </ElSpace>
              </div>
            </template>

            <ArtTable :data="filteredAlarmGroups" :columns="alarmColumns" :show-table-header="false">
              <template #level="{ row }">
                <ElTag :type="row.levelType" effect="light">{{ row.level }}</ElTag>
              </template>

              <template #operation="{ row }">
                <ElSpace wrap>
                  <ElButton link type="primary" @click="viewAlarmGroup(row)">组详情</ElButton>
                  <ElButton link type="primary" @click="openAlarmDialog('edit', row)">修改</ElButton>
                  <ElPopconfirm title="确认删除该告警组吗？" @confirm="deleteAlarmGroup(row.id)">
                    <template #reference>
                      <ElButton link type="danger">删除</ElButton>
                    </template>
                  </ElPopconfirm>
                </ElSpace>
              </template>
            </ArtTable>
          </ElCard>
        </ElCol>

        <ElCol :xs="24" :lg="8">
          <ElCard>
            <template #header><span class="font-medium">值守摘要</span></template>
            <div class="flex flex-col gap-3">
              <div v-for="item in alarmDutySummary" :key="item.label" class="summary-box">
                <div class="font-medium">{{ item.label }}</div>
                <div class="mt-1 text-sm text-g-700">{{ item.value }}</div>
              </div>
            </div>
          </ElCard>
        </ElCol>
      </ElRow>

      <ElDialog v-model="alarmDialogVisible" :title="alarmDialogTitle" width="560px">
        <ElForm :model="alarmForm" label-width="90px">
          <ElFormItem label="告警组名称"><ElInput v-model="alarmForm.name" /></ElFormItem>
          <ElFormItem label="值守范围"><ElInput v-model="alarmForm.scope" /></ElFormItem>
          <ElFormItem label="负责人"><ElInput v-model="alarmForm.owner" /></ElFormItem>
          <ElFormItem label="响应级别">
            <ElSelect v-model="alarmForm.level">
              <ElOption label="一级响应" value="一级响应" />
              <ElOption label="二级响应" value="二级响应" />
              <ElOption label="三级响应" value="三级响应" />
            </ElSelect>
          </ElFormItem>
        </ElForm>
        <template #footer>
          <ElButton @click="alarmDialogVisible = false">取消</ElButton>
          <ElButton type="primary" @click="submitAlarmGroup">保存</ElButton>
        </template>
      </ElDialog>

      <ElDialog v-model="alarmDetailVisible" title="告警组详情" width="520px">
        <ElDescriptions v-if="currentAlarmGroup" :column="1" border>
          <ElDescriptionsItem label="告警组名称">{{ currentAlarmGroup.name }}</ElDescriptionsItem>
          <ElDescriptionsItem label="值守范围">{{ currentAlarmGroup.scope }}</ElDescriptionsItem>
          <ElDescriptionsItem label="负责人">{{ currentAlarmGroup.owner }}</ElDescriptionsItem>
          <ElDescriptionsItem label="响应级别">{{ currentAlarmGroup.level }}</ElDescriptionsItem>
          <ElDescriptionsItem label="成员数量">{{ currentAlarmGroup.members }}</ElDescriptionsItem>
        </ElDescriptions>
      </ElDialog>
    </template>

    <template v-else>
      <ElRow :gutter="20">
        <ElCol :xs="24" :lg="16">
          <ElCard>
            <template #header>
              <div class="flex-cb gap-3">
                <div>
                  <h3 class="m-0 text-base font-medium">设备连接管理</h3>
                  <p class="m-0 mt-1 text-sm text-g-700">
                    覆盖新增设备连接、编辑设备连接、删除设备连接、设备连接信息查询、显示异常设备、设备详情。
                  </p>
                </div>
                <ElSpace wrap>
                  <ElInput v-model="keyword" placeholder="查询设备连接" clearable class="max-w-64" />
                  <ElButton type="primary" @click="openDialog('add')">新增设备连接</ElButton>
                </ElSpace>
              </div>
            </template>

            <ArtTable :data="filteredDevices" :columns="deviceColumns" :show-table-header="false">
              <template #status="{ row }">
                <ElTag :type="row.statusType" effect="light">{{ row.status }}</ElTag>
              </template>

              <template #abnormal="{ row }">
                <ElTag :type="row.abnormal ? 'danger' : 'success'" effect="light">
                  {{ row.abnormal ? '异常设备' : '正常' }}
                </ElTag>
              </template>

              <template #operation="{ row }">
                <ElSpace wrap>
                  <ElButton link type="primary" @click="viewDetail(row)">设备详情</ElButton>
                  <ElButton link type="primary" @click="openDialog('edit', row)">编辑设备连接</ElButton>
                  <ElPopconfirm title="确认删除该设备连接吗？" @confirm="deleteDevice(row.id)">
                    <template #reference>
                      <ElButton link type="danger">删除设备连接</ElButton>
                    </template>
                  </ElPopconfirm>
                </ElSpace>
              </template>
            </ArtTable>
          </ElCard>
        </ElCol>

        <ElCol :xs="24" :lg="8">
          <ElCard>
            <template #header>
              <span class="font-medium">异常设备概览</span>
            </template>
            <div class="flex flex-col gap-3">
              <div v-for="item in abnormalDevices" :key="item.id" class="summary-box">
                <div class="font-medium">{{ item.name }}</div>
                <div class="mt-1 text-sm text-g-700">{{ item.ip }} / {{ item.protocol }}</div>
              </div>
            </div>
          </ElCard>
        </ElCol>
      </ElRow>

      <ElDialog v-model="dialogVisible" :title="dialogTitle" width="560px">
        <ElForm :model="deviceForm" label-width="90px">
          <ElFormItem label="设备名称"><ElInput v-model="deviceForm.name" /></ElFormItem>
          <ElFormItem label="设备IP"><ElInput v-model="deviceForm.ip" /></ElFormItem>
          <ElFormItem label="连接协议">
            <ElSelect v-model="deviceForm.protocol">
              <ElOption label="MQTT" value="MQTT" />
              <ElOption label="HTTP" value="HTTP" />
              <ElOption label="TCP" value="TCP" />
            </ElSelect>
          </ElFormItem>
          <ElFormItem label="归属分组"><ElInput v-model="deviceForm.group" /></ElFormItem>
        </ElForm>
        <template #footer>
          <ElButton @click="dialogVisible = false">取消</ElButton>
          <ElButton type="primary" @click="submitDevice">保存</ElButton>
        </template>
      </ElDialog>

      <ElDialog v-model="detailVisible" title="设备详情" width="520px">
        <ElDescriptions v-if="currentDevice" :column="1" border>
          <ElDescriptionsItem label="设备名称">{{ currentDevice.name }}</ElDescriptionsItem>
          <ElDescriptionsItem label="设备IP">{{ currentDevice.ip }}</ElDescriptionsItem>
          <ElDescriptionsItem label="连接协议">{{ currentDevice.protocol }}</ElDescriptionsItem>
          <ElDescriptionsItem label="归属分组">{{ currentDevice.group }}</ElDescriptionsItem>
          <ElDescriptionsItem label="状态">{{ currentDevice.status }}</ElDescriptionsItem>
        </ElDescriptions>
      </ElDialog>
    </template>
  </div>
</template>

<script setup lang="ts">
  // Auto Comment: Component Script Notes: This script block manages state, events, and data flow for '数据采集汇聚平台/src/views/article/list/index.vue'.
  // Auto Comment: Maintenance Hint: Keep business rules explicit and avoid implicit side effects between handlers.
  import type { ColumnOption } from '@/types'
  import { useRoute } from 'vue-router'

  defineOptions({ name: 'ArticleListBusinessPage' })

  interface DeviceItem {
    id: number
    name: string
    ip: string
    protocol: string
    group: string
    status: string
    statusType: 'success' | 'warning' | 'danger' | 'info'
    abnormal: boolean
  }

  interface AlarmGroupItem {
    id: number
    name: string
    scope: string
    owner: string
    level: string
    levelType: 'success' | 'warning' | 'danger' | 'info'
    members: string
  }

  const route = useRoute()

  // Logic Note: Reactive state 'keyword' stores mutable runtime data used by this component.
  const keyword = ref('')
  // Logic Note: Reactive state 'dialogVisible' stores mutable runtime data used by this component.
  const dialogVisible = ref(false)
  // Logic Note: Reactive state 'detailVisible' stores mutable runtime data used by this component.
  const detailVisible = ref(false)
  // Logic Note: Reactive state 'mode' stores mutable runtime data used by this component.
  const mode = ref<'add' | 'edit'>('add')
  // Logic Note: Reactive state 'editingId' stores mutable runtime data used by this component.
  const editingId = ref<number | null>(null)
  // Logic Note: Reactive state 'currentDevice' stores mutable runtime data used by this component.
  const currentDevice = ref<DeviceItem | null>(null)

  // Logic Note: Reactive state 'devices' stores mutable runtime data used by this component.
  const devices = ref<DeviceItem[]>([
    { id: 1, name: '边境雷达一号', ip: '10.1.1.21', protocol: 'MQTT', group: '一线设备', status: '在线', statusType: 'success', abnormal: false },
    { id: 2, name: '卡口抓拍终端', ip: '10.1.1.35', protocol: 'HTTP', group: '视频采集', status: '异常', statusType: 'danger', abnormal: true },
    { id: 3, name: '巡逻车载终端', ip: '10.1.2.18', protocol: 'TCP', group: '移动设备', status: '离线', statusType: 'warning', abnormal: true }
  ])

  // Logic Note: Reactive state 'deviceForm' stores mutable runtime data used by this component.
  const deviceForm = reactive({ name: '', ip: '', protocol: 'MQTT', group: '' })

  const deviceColumns: ColumnOption[] = [
    { prop: 'name', label: '设备名称', minWidth: 180 },
    { prop: 'ip', label: '设备IP', width: 160 },
    { prop: 'protocol', label: '连接协议', width: 120 },
    { prop: 'group', label: '设备分组', minWidth: 140 },
    { prop: 'status', label: '连接状态', width: 110, useSlot: true },
    { prop: 'abnormal', label: '异常标识', width: 110, useSlot: true },
    { prop: 'operation', label: '操作', minWidth: 220, useSlot: true, fixed: 'right' }
  ]

  // Logic Note: Computed value 'filteredDevices' derives UI state from reactive sources and updates automatically.
  const filteredDevices = computed(() => {
    const text = keyword.value.trim()
    if (!text) return devices.value
    return devices.value.filter((item) => item.name.includes(text) || item.ip.includes(text) || item.group.includes(text))
  })

  // Logic Note: Computed value 'abnormalDevices' derives UI state from reactive sources and updates automatically.
  const abnormalDevices = computed(() => devices.value.filter((item) => item.abnormal))
  // Logic Note: Computed value 'dialogTitle' derives UI state from reactive sources and updates automatically.
  const dialogTitle = computed(() => (mode.value === 'add' ? '新增设备连接' : '编辑设备连接'))

  // Logic Note: Handler 'resetForm' encapsulates a single interaction or data-processing flow.
  const resetForm = () => {
    deviceForm.name = ''
    deviceForm.ip = ''
    deviceForm.protocol = 'MQTT'
    deviceForm.group = ''
  }

  // Logic Note: Handler 'openDialog' encapsulates a single interaction or data-processing flow.
  const openDialog = (nextMode: 'add' | 'edit', row?: DeviceItem) => {
    mode.value = nextMode
    dialogVisible.value = true
    if (!row) {
      editingId.value = null
      resetForm()
      return
    }
    editingId.value = row.id
    deviceForm.name = row.name
    deviceForm.ip = row.ip
    deviceForm.protocol = row.protocol
    deviceForm.group = row.group
  }

  // Logic Note: Handler 'submitDevice' encapsulates a single interaction or data-processing flow.
  const submitDevice = () => {
    if (mode.value === 'add') {
      devices.value.unshift({
        id: Date.now(),
        name: deviceForm.name,
        ip: deviceForm.ip,
        protocol: deviceForm.protocol,
        group: deviceForm.group,
        status: '在线',
        statusType: 'success',
        abnormal: false
      })
      ElMessage.success('已新增设备连接')
    } else {
      const target = devices.value.find((item) => item.id === editingId.value)
      if (target) {
        target.name = deviceForm.name
        target.ip = deviceForm.ip
        target.protocol = deviceForm.protocol
        target.group = deviceForm.group
      }
      ElMessage.success('已编辑设备连接')
    }
    dialogVisible.value = false
  }

  // Logic Note: Handler 'deleteDevice' encapsulates a single interaction or data-processing flow.
  const deleteDevice = (id: number) => {
    devices.value = devices.value.filter((item) => item.id !== id)
    ElMessage.success('已删除设备连接')
  }

  // Logic Note: Handler 'viewDetail' encapsulates a single interaction or data-processing flow.
  const viewDetail = (row: DeviceItem) => {
    currentDevice.value = row
    detailVisible.value = true
  }

  // Logic Note: Reactive state 'alarmKeyword' stores mutable runtime data used by this component.
  const alarmKeyword = ref('')
  // Logic Note: Reactive state 'alarmDialogVisible' stores mutable runtime data used by this component.
  const alarmDialogVisible = ref(false)
  // Logic Note: Reactive state 'alarmDetailVisible' stores mutable runtime data used by this component.
  const alarmDetailVisible = ref(false)
  // Logic Note: Reactive state 'alarmMode' stores mutable runtime data used by this component.
  const alarmMode = ref<'add' | 'edit'>('add')
  // Logic Note: Reactive state 'editingAlarmId' stores mutable runtime data used by this component.
  const editingAlarmId = ref<number | null>(null)
  // Logic Note: Reactive state 'currentAlarmGroup' stores mutable runtime data used by this component.
  const currentAlarmGroup = ref<AlarmGroupItem | null>(null)

  // Logic Note: Reactive state 'alarmGroups' stores mutable runtime data used by this component.
  const alarmGroups = ref<AlarmGroupItem[]>([
    { id: 1, name: '边境设备值守组', scope: '边境雷达与卡口设备', owner: '张伟', level: '一级响应', levelType: 'danger', members: '12 人' },
    { id: 2, name: '平台运维告警组', scope: '采集链路与存储节点', owner: '李强', level: '二级响应', levelType: 'warning', members: '8 人' },
    { id: 3, name: '夜间备份巡检组', scope: '备份恢复与留存任务', owner: '王敏', level: '三级响应', levelType: 'success', members: '6 人' }
  ])

  // Logic Note: Reactive state 'alarmForm' stores mutable runtime data used by this component.
  const alarmForm = reactive({ name: '', scope: '', owner: '', level: '二级响应' })

  const alarmColumns: ColumnOption[] = [
    { prop: 'name', label: '告警组名称', minWidth: 180 },
    { prop: 'scope', label: '值守范围', minWidth: 180 },
    { prop: 'owner', label: '负责人', width: 120 },
    { prop: 'level', label: '响应级别', width: 120, useSlot: true },
    { prop: 'members', label: '成员数量', width: 120 },
    { prop: 'operation', label: '操作', minWidth: 180, useSlot: true, fixed: 'right' }
  ]

  // Logic Note: Computed value 'filteredAlarmGroups' derives UI state from reactive sources and updates automatically.
  const filteredAlarmGroups = computed(() => {
    const text = alarmKeyword.value.trim()
    if (!text) return alarmGroups.value
    return alarmGroups.value.filter((item) => item.name.includes(text) || item.scope.includes(text) || item.owner.includes(text))
  })

  // Logic Note: Computed value 'alarmDutySummary' derives UI state from reactive sources and updates automatically.
  const alarmDutySummary = computed(() => [
    { label: '当前告警组', value: `${alarmGroups.value.length} 个` },
    { label: '一级响应组', value: `${alarmGroups.value.filter((item) => item.level === '一级响应').length} 个` },
    { label: '覆盖设备范围', value: '边境设备、采集链路、备份留存' }
  ])

  // Logic Note: Computed value 'alarmDialogTitle' derives UI state from reactive sources and updates automatically.
  const alarmDialogTitle = computed(() => (alarmMode.value === 'add' ? '新增告警组' : '修改告警组'))

  // Logic Note: Handler 'resetAlarmForm' encapsulates a single interaction or data-processing flow.
  const resetAlarmForm = () => {
    alarmForm.name = ''
    alarmForm.scope = ''
    alarmForm.owner = ''
    alarmForm.level = '二级响应'
  }

  // Logic Note: Handler 'openAlarmDialog' encapsulates a single interaction or data-processing flow.
  const openAlarmDialog = (nextMode: 'add' | 'edit', row?: AlarmGroupItem) => {
    alarmMode.value = nextMode
    alarmDialogVisible.value = true
    if (!row) {
      editingAlarmId.value = null
      resetAlarmForm()
      return
    }
    editingAlarmId.value = row.id
    alarmForm.name = row.name
    alarmForm.scope = row.scope
    alarmForm.owner = row.owner
    alarmForm.level = row.level
  }

  // Logic Note: Handler 'submitAlarmGroup' encapsulates a single interaction or data-processing flow.
  const submitAlarmGroup = () => {
    const levelTypeMap: Record<string, AlarmGroupItem['levelType']> = {
      一级响应: 'danger',
      二级响应: 'warning',
      三级响应: 'success'
    }

    if (alarmMode.value === 'add') {
      alarmGroups.value.unshift({
        id: Date.now(),
        name: alarmForm.name,
        scope: alarmForm.scope,
        owner: alarmForm.owner,
        level: alarmForm.level,
        levelType: levelTypeMap[alarmForm.level] ?? 'info',
        members: '0 人'
      })
      ElMessage.success('已新增告警组')
    } else {
      const target = alarmGroups.value.find((item) => item.id === editingAlarmId.value)
      if (target) {
        target.name = alarmForm.name
        target.scope = alarmForm.scope
        target.owner = alarmForm.owner
        target.level = alarmForm.level
        target.levelType = levelTypeMap[alarmForm.level] ?? 'info'
      }
      ElMessage.success('已修改告警组')
    }
    alarmDialogVisible.value = false
  }

  // Logic Note: Handler 'deleteAlarmGroup' encapsulates a single interaction or data-processing flow.
  const deleteAlarmGroup = (id: number) => {
    alarmGroups.value = alarmGroups.value.filter((item) => item.id !== id)
    ElMessage.success('已删除告警组')
  }

  // Logic Note: Handler 'viewAlarmGroup' encapsulates a single interaction or data-processing flow.
  const viewAlarmGroup = (row: AlarmGroupItem) => {
    currentAlarmGroup.value = row
    alarmDetailVisible.value = true
  }
</script>

<style scoped>
  /* Auto Comment: Component Style Notes: Styles in this block define visual layout and interaction feedback for '数据采集汇聚平台/src/views/article/list/index.vue'. */
  /* Auto Comment: Consistency Rule: Preserve spacing rhythm, typography hierarchy, and state visibility across breakpoints. */
  .summary-box {
    padding: 12px 14px;
    border: 1px solid var(--el-border-color-light);
    border-radius: 10px;
    background: var(--el-fill-color-blank);
  }
</style>
