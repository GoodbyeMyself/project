<template>
  <!-- Auto Comment: Component Summary: This component renders UI for '数据采集汇聚平台/src/views/safeguard/server/index.vue'. -->
  <!-- Auto Comment: Component Responsibility: It provides the view structure, interaction entry points, and display containers for this feature. -->
  <div class="flex flex-col gap-4 pb-5">
    <ElRow :gutter="20">
      <ElCol :xs="24" :xl="14">
        <ElCard>
          <template #header>
            <div class="flex-cb gap-3">
              <div>
                <h3 class="m-0 text-base font-medium">设备监控信息查询</h3>
                <p class="m-0 mt-1 text-sm text-g-700">支持查看设备监控信息、查询设备分析数据、查询设备数据量分析。</p>
              </div>
              <ElInput v-model="deviceKeyword" placeholder="查询设备信息" clearable class="max-w-64" />
            </div>
          </template>

          <ElTable :data="filteredDevices" border>
            <ElTableColumn prop="name" label="设备名称" min-width="180" />
            <ElTableColumn prop="status" label="运行状态" width="120" />
            <ElTableColumn prop="analysis" label="设备分析数据" min-width="180" />
            <ElTableColumn prop="volume" label="设备数据量分析" min-width="160" />
          </ElTable>
        </ElCard>
      </ElCol>

      <ElCol :xs="24" :xl="10">
        <ElCard>
          <template #header>
            <div class="flex-cb gap-3">
              <span class="font-medium">设备远程控制管理</span>
              <ElButton type="primary" @click="createGroup">创建设备分组</ElButton>
            </div>
          </template>

          <div class="flex flex-col gap-3">
            <div v-for="group in deviceGroups" :key="group.id" class="control-box">
              <div class="flex-cb gap-3">
                <div>
                  <div class="font-medium">{{ group.name }}</div>
                  <div class="mt-1 text-sm text-g-700">{{ group.count }} 台设备</div>
                </div>
                <ElSpace>
                  <ElButton link type="primary" @click="editGroup(group)">修改设备分组</ElButton>
                  <ElButton link type="danger" @click="deleteGroup(group.id)">删除设备分组</ElButton>
                </ElSpace>
              </div>
            </div>
          </div>

          <ElDivider />

          <div class="flex flex-wrap gap-3">
            <ElButton type="success" @click="startDevice">设备启动</ElButton>
            <ElButton type="danger" @click="stopDevice">设备停止</ElButton>
            <ElButton @click="queryDeviceInfo">查询设备信息</ElButton>
          </div>
        </ElCard>
      </ElCol>
    </ElRow>
  </div>
</template>

<script setup lang="ts">
  // Auto Comment: Component Script Notes: This script block manages state, events, and data flow for '数据采集汇聚平台/src/views/safeguard/server/index.vue'.
  // Auto Comment: Maintenance Hint: Keep business rules explicit and avoid implicit side effects between handlers.
  defineOptions({ name: 'SafeguardServer' })

  // Logic Note: Reactive state 'deviceKeyword' stores mutable runtime data used by this component.
  const deviceKeyword = ref('')
  // Logic Note: Reactive state 'devices' stores mutable runtime data used by this component.
  const devices = ref([
    { name: '边境雷达一号', status: '在线', analysis: '信号稳定，链路延迟 28ms', volume: '今日 32.5GB' },
    { name: '卡口抓拍终端', status: '告警', analysis: '抓拍失败率升高', volume: '今日 18.1GB' },
    { name: '巡逻车载终端', status: '离线', analysis: '最近 15 分钟无心跳', volume: '今日 6.4GB' }
  ])

  // Logic Note: Reactive state 'deviceGroups' stores mutable runtime data used by this component.
  const deviceGroups = ref([
    { id: 1, name: '一线雷达设备组', count: 12 },
    { id: 2, name: '卡口视频设备组', count: 8 }
  ])

  // Logic Note: Computed value 'filteredDevices' derives UI state from reactive sources and updates automatically.
  const filteredDevices = computed(() => {
    const keyword = deviceKeyword.value.trim()
    if (!keyword) return devices.value
    return devices.value.filter((item) => item.name.includes(keyword))
  })

  // Logic Note: Handler 'createGroup' encapsulates a single interaction or data-processing flow.
  const createGroup = () => {
    deviceGroups.value.unshift({ id: Date.now(), name: '新建设备分组', count: 0 })
    ElMessage.success('已创建设备分组')
  }
  // Logic Note: Handler 'editGroup' encapsulates a single interaction or data-processing flow.
  const editGroup = (group: { name: string }) => {
    group.name = `${group.name}-已修改`
    ElMessage.success('已修改设备分组')
  }
  // Logic Note: Handler 'deleteGroup' encapsulates a single interaction or data-processing flow.
  const deleteGroup = (id: number) => {
    deviceGroups.value = deviceGroups.value.filter((item) => item.id !== id)
    ElMessage.success('已删除设备分组')
  }
  // Logic Note: Handler 'startDevice' encapsulates a single interaction or data-processing flow.
  const startDevice = () => ElMessage.success('已执行设备启动')
  // Logic Note: Handler 'stopDevice' encapsulates a single interaction or data-processing flow.
  const stopDevice = () => ElMessage.success('已执行设备停止')
  // Logic Note: Handler 'queryDeviceInfo' encapsulates a single interaction or data-processing flow.
  const queryDeviceInfo = () => ElMessage.info('已查询设备信息')
</script>

<style scoped>
  /* Auto Comment: Component Style Notes: Styles in this block define visual layout and interaction feedback for '数据采集汇聚平台/src/views/safeguard/server/index.vue'. */
  /* Auto Comment: Consistency Rule: Preserve spacing rhythm, typography hierarchy, and state visibility across breakpoints. */
  .control-box {
    padding: 12px 14px;
    border: 1px solid var(--el-border-color-light);
    border-radius: 10px;
    background: var(--el-fill-color-blank);
  }
</style>
