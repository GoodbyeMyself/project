<template>
  <div class="flex flex-col gap-4 pb-5">
    <ElRow :gutter="20">
      <ElCol :xs="24" :lg="8">
        <ElCard>
          <template #header><span class="font-medium">分区和索引同步</span></template>
          <ElInput v-model="partitionKeyword" placeholder="数据查询" clearable />
          <ElTable :data="filteredPartitionRows" border class="mt-4">
            <ElTableColumn prop="name" label="分区/索引" min-width="180" />
            <ElTableColumn prop="status" label="同步状态" width="120" />
            <ElTableColumn prop="time" label="最近同步时间" min-width="160" />
          </ElTable>
        </ElCard>
      </ElCol>

      <ElCol :xs="24" :lg="6">
        <ElCard>
          <template #header><span class="font-medium">数据恢复</span></template>
          <ElForm label-width="80px">
            <ElFormItem label="恢复点"><ElInput v-model="restoreForm.point" placeholder="请输入恢复点" /></ElFormItem>
            <ElFormItem label="恢复说明"><ElInput v-model="restoreForm.remark" type="textarea" :rows="3" /></ElFormItem>
          </ElForm>
          <ElButton type="primary" @click="recoverData">数据恢复</ElButton>
        </ElCard>
      </ElCol>

      <ElCol :xs="24" :lg="10">
        <ElCard>
          <template #header>
            <div class="flex-cb gap-3">
              <div>
                <span class="font-medium">数据备份</span>
                <p class="m-0 mt-1 text-sm text-g-700">覆盖上传文件、编辑文件、删除文件、查询文件、移动文件、新建/修改/删除/查询文件夹、下载文件。</p>
              </div>
            </div>
          </template>

          <ElSpace wrap>
            <ElButton type="primary" @click="uploadFile">上传文件</ElButton>
            <ElButton @click="editFile">编辑文件</ElButton>
            <ElButton @click="moveFile">移动文件</ElButton>
            <ElButton @click="newFolder">新建文件夹</ElButton>
            <ElButton @click="editFolder">修改文件夹</ElButton>
            <ElButton @click="queryFolder">查询文件夹</ElButton>
            <ElButton @click="queryFile">查询文件</ElButton>
            <ElButton @click="downloadFile">下载文件</ElButton>
            <ElButton type="danger" @click="deleteFile">删除文件</ElButton>
            <ElButton type="danger" @click="deleteFolder">删除文件夹</ElButton>
          </ElSpace>

          <ElDivider />

          <ElTable :data="backupFiles" border>
            <ElTableColumn prop="name" label="文件名称" min-width="180" />
            <ElTableColumn prop="folder" label="所属文件夹" min-width="140" />
            <ElTableColumn prop="updateTime" label="更新时间" min-width="160" />
          </ElTable>
        </ElCard>
      </ElCol>
    </ElRow>
  </div>
</template>

<script setup lang="ts">
  defineOptions({ name: 'WidgetsExcel' })

  const partitionKeyword = ref('')
  const restoreForm = reactive({ point: '2026-03-30 00:00:00', remark: '恢复至凌晨全量备份点' })

  const partitionRows = ref([
    { name: 'ods_device_event_p202603', status: '已同步', time: '2026-03-30 02:10' },
    { name: 'idx_alarm_rule_name', status: '待同步', time: '2026-03-29 23:20' }
  ])

  const backupFiles = ref([
    { name: 'daily-backup-01.zip', folder: '日备份目录', updateTime: '2026-03-30 01:00' },
    { name: 'device-archive.xlsx', folder: '归档目录', updateTime: '2026-03-29 20:30' }
  ])

  const filteredPartitionRows = computed(() => {
    const keyword = partitionKeyword.value.trim()
    if (!keyword) return partitionRows.value
    return partitionRows.value.filter((item) => item.name.includes(keyword))
  })

  const recoverData = () => ElMessage.success(`已执行数据恢复：${restoreForm.point}`)
  const uploadFile = () => ElMessage.success('已执行上传文件')
  const editFile = () => ElMessage.success('已执行编辑文件')
  const deleteFile = () => ElMessage.success('已执行删除文件')
  const queryFile = () => ElMessage.info('已执行查询文件')
  const moveFile = () => ElMessage.success('已执行移动文件')
  const newFolder = () => ElMessage.success('已执行新建文件夹')
  const editFolder = () => ElMessage.success('已执行修改文件夹')
  const deleteFolder = () => ElMessage.success('已执行删除文件夹')
  const queryFolder = () => ElMessage.info('已执行查询文件夹')
  const downloadFile = () => ElMessage.success('已执行下载文件')
</script>
