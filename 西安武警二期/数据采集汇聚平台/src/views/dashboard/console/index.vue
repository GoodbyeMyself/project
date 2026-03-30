<template>
  <!-- Auto Comment: Component Summary: This component renders UI for '数据采集汇聚平台/src/views/dashboard/console/index.vue'. -->
  <!-- Auto Comment: Component Responsibility: It provides the view structure, interaction entry points, and display containers for this feature. -->
  <div class="flex flex-col gap-4 pb-5">
    <ElRow :gutter="20">
      <ElCol :xs="24" :lg="16">
        <ElCard class="h-full">
          <template #header>
            <div class="flex-cb gap-3">
              <div>
                <h3 class="m-0 text-base font-medium">上报计划制定与选择</h3>
                <p class="m-0 mt-1 text-sm text-g-700">覆盖制定上报计划、选择上报计划两项核心能力。</p>
              </div>
              <ElTag type="primary">计划总数 {{ reportPlans.length }}</ElTag>
            </div>
          </template>

          <ElForm :model="planForm" label-width="96px" class="grid-form">
            <ElRow :gutter="16">
              <ElCol :xs="24" :md="12">
                <ElFormItem label="计划名称">
                  <ElInput v-model="planForm.name" placeholder="请输入上报计划名称" />
                </ElFormItem>
              </ElCol>
              <ElCol :xs="24" :md="12">
                <ElFormItem label="计划类型">
                  <ElSelect v-model="planForm.type" placeholder="请选择计划类型">
                    <ElOption label="定时报送" value="定时报送" />
                    <ElOption label="按需报送" value="按需报送" />
                    <ElOption label="专项报送" value="专项报送" />
                  </ElSelect>
                </ElFormItem>
              </ElCol>
              <ElCol :xs="24" :md="12">
                <ElFormItem label="上报周期">
                  <ElSelect v-model="planForm.period" placeholder="请选择周期">
                    <ElOption label="每日" value="每日" />
                    <ElOption label="每周" value="每周" />
                    <ElOption label="每月" value="每月" />
                  </ElSelect>
                </ElFormItem>
              </ElCol>
              <ElCol :xs="24" :md="12">
                <ElFormItem label="责任部门">
                  <ElSelect v-model="planForm.department" placeholder="请选择责任部门">
                    <ElOption label="情报采集组" value="情报采集组" />
                    <ElOption label="边防数据组" value="边防数据组" />
                    <ElOption label="指挥保障组" value="指挥保障组" />
                  </ElSelect>
                </ElFormItem>
              </ElCol>
              <ElCol :xs="24">
                <ElFormItem label="计划说明">
                  <ElInput
                    v-model="planForm.description"
                    type="textarea"
                    :rows="3"
                    maxlength="120"
                    show-word-limit
                    placeholder="请输入计划说明"
                  />
                </ElFormItem>
              </ElCol>
            </ElRow>
          </ElForm>

          <div class="flex flex-wrap gap-3">
            <ElButton type="primary" @click="createPlan">制定上报计划</ElButton>
            <ElButton @click="selectPreferredPlan">选择上报计划</ElButton>
            <ElButton text type="primary">当前选中：{{ selectedPlanName }}</ElButton>
          </div>
        </ElCard>
      </ElCol>

      <ElCol :xs="24" :lg="8">
        <ElCard class="h-full">
          <template #header>
            <div class="flex-cb gap-3">
              <span class="font-medium">执行概览</span>
              <ElTag type="success">本周</ElTag>
            </div>
          </template>

          <div class="grid grid-cols-2 gap-3">
            <div v-for="item in overviewCards" :key="item.label" class="metric-card">
              <div class="metric-value">{{ item.value }}</div>
              <div class="metric-label">{{ item.label }}</div>
            </div>
          </div>

          <ElDivider />

          <div class="flex flex-col gap-3">
            <div
              v-for="plan in reportPlans"
              :key="plan.id"
              class="rounded-lg border border-[var(--el-border-color-light)] p-3"
            >
              <div class="flex-cb gap-3">
                <div class="font-medium">{{ plan.name }}</div>
                <ElTag :type="plan.id === selectedPlanId ? 'primary' : 'info'" effect="light">
                  {{ plan.id === selectedPlanId ? '已选中' : plan.type }}
                </ElTag>
              </div>
              <div class="mt-2 text-sm text-g-700">
                {{ plan.period }} / {{ plan.department }} / {{ plan.nextTime }}
              </div>
            </div>
          </div>
        </ElCard>
      </ElCol>
    </ElRow>

    <ElCard>
      <template #header>
        <div class="flex-cb gap-3">
          <div>
            <h3 class="m-0 text-base font-medium">文件夹与文件操作</h3>
            <p class="m-0 mt-1 text-sm text-g-700">
              提供删除文件夹、查询文件夹、下载文件三项能力，便于上报资料集中管理。
            </p>
          </div>
          <ElInput v-model="folderKeyword" placeholder="请输入文件夹关键字" clearable class="max-w-64" />
        </div>
      </template>

      <ArtTable :data="filteredFolders" :columns="folderColumns" :show-table-header="false">
        <template #folderName="{ row }">
          <div class="flex items-center gap-2">
            <ElIcon class="text-theme"><FolderOpened /></ElIcon>
            <span>{{ row.folderName }}</span>
          </div>
        </template>

        <template #files="{ row }">
          <div class="flex flex-wrap gap-2">
            <ElTag v-for="file in row.files" :key="file.name" type="info" effect="plain">
              {{ file.name }}
            </ElTag>
          </div>
        </template>

        <template #status="{ row }">
          <ElTag :type="row.status === '正常' ? 'success' : 'warning'" effect="light">
            {{ row.status }}
          </ElTag>
        </template>

        <template #operation="{ row }">
          <ElSpace wrap>
            <ElButton link type="primary" @click="queryFolder(row.folderName)">查询文件夹</ElButton>
            <ElDropdown @command="(fileName: string) => downloadFile(row.folderName, fileName)">
              <ElButton link type="primary">下载文件</ElButton>
              <template #dropdown>
                <ElDropdownMenu>
                  <ElDropdownItem v-for="file in row.files" :key="file.name" :command="file.name">
                    {{ file.name }}
                  </ElDropdownItem>
                </ElDropdownMenu>
              </template>
            </ElDropdown>
            <ElPopconfirm title="确认删除该文件夹吗？" @confirm="deleteFolder(row.id)">
              <template #reference>
                <ElButton link type="danger">删除文件夹</ElButton>
              </template>
            </ElPopconfirm>
          </ElSpace>
        </template>
      </ArtTable>
    </ElCard>
  </div>
</template>

<script setup lang="ts">
  // Auto Comment: Component Script Notes: This script block manages state, events, and data flow for '数据采集汇聚平台/src/views/dashboard/console/index.vue'.
  // Auto Comment: Maintenance Hint: Keep business rules explicit and avoid implicit side effects between handlers.
  import { FolderOpened } from '@element-plus/icons-vue'
  import type { ColumnOption } from '@/types'

  defineOptions({ name: 'ReportPlanCenter' })

  interface ReportPlan {
    id: number
    name: string
    type: string
    period: string
    department: string
    nextTime: string
    description: string
  }

  interface ReportFile {
    name: string
    size: string
  }

  interface ReportFolder {
    id: number
    folderName: string
    owner: string
    updateTime: string
    status: string
    files: ReportFile[]
  }

  // Logic Note: Reactive state 'reportPlans' stores mutable runtime data used by this component.
  const reportPlans = ref<ReportPlan[]>([
    {
      id: 1,
      name: '重点区域日采集上报',
      type: '定时报送',
      period: '每日 18:00',
      department: '情报采集组',
      nextTime: '2026-03-31 18:00',
      description: '用于汇聚重点区域当日采集结果并定时上报。'
    },
    {
      id: 2,
      name: '月度资源汇总上报',
      type: '专项报送',
      period: '每月 25 日',
      department: '边防数据组',
      nextTime: '2026-04-25 09:00',
      description: '针对月度重点资源形成集中汇总材料。'
    },
    {
      id: 3,
      name: '突发事件按需报送',
      type: '按需报送',
      period: '按事件触发',
      department: '指挥保障组',
      nextTime: '待触发',
      description: '针对临时事件快速收集并上报。'
    }
  ])

  // Logic Note: Reactive state 'selectedPlanId' stores mutable runtime data used by this component.
  const selectedPlanId = ref(1)
  // Logic Note: Reactive state 'folderKeyword' stores mutable runtime data used by this component.
  const folderKeyword = ref('')

  // Logic Note: Reactive state 'planForm' stores mutable runtime data used by this component.
  const planForm = reactive({
    name: '边境设备数据专项上报',
    type: '专项报送',
    period: '每周',
    department: '边防数据组',
    description: '针对边境设备采集数据进行专项汇聚与人工审核后上报。'
  })

  // Logic Note: Reactive state 'folders' stores mutable runtime data used by this component.
  const folders = ref<ReportFolder[]>([
    {
      id: 1,
      folderName: '2026一季度数据资源',
      owner: '情报采集组',
      updateTime: '2026-03-28 15:20',
      status: '正常',
      files: [
        { name: '边境采集日报.xlsx', size: '2.3MB' },
        { name: '视频摘要.zip', size: '18MB' }
      ]
    },
    {
      id: 2,
      folderName: '专项核验材料',
      owner: '指挥保障组',
      updateTime: '2026-03-27 10:05',
      status: '待复核',
      files: [
        { name: '核验记录.docx', size: '540KB' },
        { name: '附件清单.pdf', size: '360KB' }
      ]
    },
    {
      id: 3,
      folderName: '历史归档资料',
      owner: '边防数据组',
      updateTime: '2026-03-26 09:30',
      status: '正常',
      files: [{ name: '归档目录.xlsx', size: '120KB' }]
    }
  ])

  // Logic Note: Computed value 'overviewCards' derives UI state from reactive sources and updates automatically.
  const overviewCards = computed(() => [
    { label: '执行中计划', value: `${reportPlans.value.length} 个` },
    { label: '待上报批次', value: '12 批' },
    { label: '待处理文件夹', value: `${folders.value.length} 个` },
    { label: '已归档文件', value: `${folders.value.reduce((sum, item) => sum + item.files.length, 0)} 个` }
  ])

  // Logic Note: Computed value 'selectedPlanName' derives UI state from reactive sources and updates automatically.
  const selectedPlanName = computed(() => {
    return reportPlans.value.find((item) => item.id === selectedPlanId.value)?.name || '未选择'
  })

  // Logic Note: Computed value 'filteredFolders' derives UI state from reactive sources and updates automatically.
  const filteredFolders = computed(() => {
    const keyword = folderKeyword.value.trim()
    if (!keyword) {
      return folders.value
    }

    return folders.value.filter((item) => item.folderName.includes(keyword))
  })

  const folderColumns: ColumnOption[] = [
    { prop: 'folderName', label: '文件夹名称', minWidth: 220, useSlot: true },
    { prop: 'owner', label: '归属部门', width: 140 },
    { prop: 'updateTime', label: '最近更新时间', width: 180 },
    { prop: 'files', label: '文件列表', minWidth: 260, useSlot: true },
    { prop: 'status', label: '状态', width: 120, useSlot: true },
    { prop: 'operation', label: '操作', minWidth: 220, useSlot: true, fixed: 'right' }
  ]

  // Logic Note: Handler 'createPlan' encapsulates a single interaction or data-processing flow.
  const createPlan = () => {
    const newPlan: ReportPlan = {
      id: Date.now(),
      name: planForm.name,
      type: planForm.type,
      period: planForm.period,
      department: planForm.department,
      nextTime: '待排期',
      description: planForm.description
    }

    reportPlans.value.unshift(newPlan)
    selectedPlanId.value = newPlan.id
    ElMessage.success(`已制定上报计划：${newPlan.name}`)
  }

  // Logic Note: Handler 'selectPreferredPlan' encapsulates a single interaction or data-processing flow.
  const selectPreferredPlan = () => {
    const nextPlan = reportPlans.value.find((item) => item.id !== selectedPlanId.value)
    if (!nextPlan) {
      ElMessage.info('当前仅有一个上报计划')
      return
    }

    selectedPlanId.value = nextPlan.id
    ElMessage.success(`已选择上报计划：${nextPlan.name}`)
  }

  // Logic Note: Handler 'queryFolder' encapsulates a single interaction or data-processing flow.
  const queryFolder = (folderName: string) => {
    ElMessage.info(`已查询文件夹：${folderName}`)
  }

  // Logic Note: Handler 'downloadFile' encapsulates a single interaction or data-processing flow.
  const downloadFile = (folderName: string, fileName: string) => {
    ElMessage.success(`开始下载 ${folderName} / ${fileName}`)
  }

  // Logic Note: Handler 'deleteFolder' encapsulates a single interaction or data-processing flow.
  const deleteFolder = (id: number) => {
    const index = folders.value.findIndex((item) => item.id === id)
    if (index === -1) {
      return
    }

    const [folder] = folders.value.splice(index, 1)
    ElMessage.success(`已删除文件夹：${folder.folderName}`)
  }
</script>

<style scoped>
  /* Auto Comment: Component Style Notes: Styles in this block define visual layout and interaction feedback for '数据采集汇聚平台/src/views/dashboard/console/index.vue'. */
  /* Auto Comment: Consistency Rule: Preserve spacing rhythm, typography hierarchy, and state visibility across breakpoints. */
  .grid-form :deep(.el-form-item) {
    margin-bottom: 18px;
  }

  .metric-card {
    padding: 16px;
    border: 1px solid var(--el-border-color-light);
    border-radius: 12px;
    background: var(--el-fill-color-blank);
  }

  .metric-value {
    font-size: 22px;
    font-weight: 600;
    color: var(--el-text-color-primary);
  }

  .metric-label {
    margin-top: 6px;
    font-size: 13px;
    color: var(--art-gray-600);
  }
</style>
