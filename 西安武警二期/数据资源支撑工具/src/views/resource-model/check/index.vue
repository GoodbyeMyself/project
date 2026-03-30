<template>
  <div class="flex flex-col gap-4 pb-5">
    <ElCard shadow="never">
      <template #header>
        <div class="flex-cb">
          <span class="text-base font-semibold">模型检查</span>
          <ElTag type="primary" effect="light">检查执行功能</ElTag>
        </div>
      </template>
      <ElForm label-width="130px">
        <ElFormItem label="检查模型">
          <ElSelect v-model="checkForm.modelName" style="width: 260px">
            <ElOption label="人员逻辑模型 v2.2" value="人员逻辑模型 v2.2" />
            <ElOption label="装备物理模型 v1.7" value="装备物理模型 v1.7" />
          </ElSelect>
        </ElFormItem>
        <ElFormItem label="检查规则">
          <ElCheckboxGroup v-model="checkForm.rules">
            <ElCheckbox label="命名规范检查" />
            <ElCheckbox label="字段完整性检查" />
            <ElCheckbox label="索引规范检查" />
            <ElCheckbox label="引用一致性检查" />
          </ElCheckboxGroup>
        </ElFormItem>
        <ElFormItem>
          <ElButton type="success" @click="runCheck">执行检查</ElButton>
        </ElFormItem>
      </ElForm>
    </ElCard>

    <ElCard shadow="never">
      <template #header>
        <span class="text-base font-semibold">检查结果</span>
      </template>
      <ElTable :data="checkLogs" border>
        <ElTableColumn prop="modelName" label="模型" min-width="180" />
        <ElTableColumn prop="rules" label="规则项" min-width="220" />
        <ElTableColumn prop="result" label="结果" width="120">
          <template #default="{ row }">
            <ElTag :type="row.result === '通过' ? 'success' : 'danger'" effect="light">
              {{ row.result }}
            </ElTag>
          </template>
        </ElTableColumn>
        <ElTableColumn prop="checkedBy" label="执行人" width="120" />
        <ElTableColumn prop="checkedAt" label="执行时间" width="170" />
      </ElTable>
    </ElCard>
  </div>
</template>

<script setup lang="ts">
  import { reactive, ref } from 'vue'
  import { ElMessage } from 'element-plus'

  defineOptions({ name: 'ModelCheck' })

  interface CheckLog {
    id: number
    modelName: string
    rules: string
    result: '通过' | '失败'
    checkedBy: string
    checkedAt: string
  }

  const checkForm = reactive({
    modelName: '人员逻辑模型 v2.2',
    rules: ['命名规范检查', '字段完整性检查']
  })

  const checkLogs = ref<CheckLog[]>([
    {
      id: 1,
      modelName: '人员逻辑模型 v2.1',
      rules: '命名规范检查、字段完整性检查',
      result: '通过',
      checkedBy: '张强',
      checkedAt: '2026-03-29 17:16:00'
    }
  ])

  const runCheck = () => {
    if (!checkForm.modelName || checkForm.rules.length === 0) {
      ElMessage.warning('请选择检查模型和规则')
      return
    }

    checkLogs.value.unshift({
      id: Date.now(),
      modelName: checkForm.modelName,
      rules: checkForm.rules.join('、'),
      result: '通过',
      checkedBy: '当前用户',
      checkedAt: new Date().toLocaleString()
    })
    ElMessage.success('模型检查执行完成')
  }
</script>
