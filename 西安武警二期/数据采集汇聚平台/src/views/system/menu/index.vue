<template>
  <!-- Auto Comment: Component Summary: This component renders UI for '数据采集汇聚平台/src/views/system/menu/index.vue'. -->
  <!-- Auto Comment: Component Responsibility: It provides the view structure, interaction entry points, and display containers for this feature. -->
  <div class="flex flex-col gap-4 pb-5">
    <ElRow :gutter="20">
      <ElCol :xs="24" :lg="15">
        <ElCard>
          <template #header>
            <div class="flex-cb gap-3">
              <div>
                <h3 class="m-0 text-base font-medium">用户权限授权</h3>
                <p class="m-0 mt-1 text-sm text-g-700">围绕通知下发管理场景配置角色权限、操作权限与授权范围。</p>
              </div>
              <ElButton type="primary" @click="savePermissionConfig">保存权限配置</ElButton>
            </div>
          </template>

          <ElForm label-width="96px">
            <ElFormItem label="角色选择">
              <ElRadioGroup v-model="selectedRole">
                <ElRadioButton label="通知管理员" value="通知管理员" />
                <ElRadioButton label="值班审核员" value="值班审核员" />
                <ElRadioButton label="普通执行员" value="普通执行员" />
              </ElRadioGroup>
            </ElFormItem>

            <ElFormItem label="授权范围">
              <ElCheckboxGroup v-model="permissionScope">
                <ElCheckbox label="内容定制" value="内容定制" />
                <ElCheckbox label="记录追踪" value="记录追踪" />
                <ElCheckbox label="权限配置" value="权限配置" />
              </ElCheckboxGroup>
            </ElFormItem>
          </ElForm>

          <ElTree
            ref="permissionTreeRef"
            node-key="id"
            show-checkbox
            default-expand-all
            :data="permissionTree"
            :default-checked-keys="checkedPermissionKeys"
          />
        </ElCard>
      </ElCol>

      <ElCol :xs="24" :lg="9">
        <ElCard>
          <template #header>
            <span class="font-medium">配置摘要</span>
          </template>
          <div class="flex flex-col gap-3">
            <div class="summary-row">
              <span>当前角色</span>
              <strong>{{ selectedRole }}</strong>
            </div>
            <div class="summary-row">
              <span>授权范围</span>
              <strong>{{ permissionScope.join('、') }}</strong>
            </div>
            <div class="summary-row">
              <span>已勾选权限</span>
              <strong>{{ checkedPermissionKeys.length }} 项</strong>
            </div>
          </div>

          <ElDivider />

          <ElAlert
            title="权限配置说明"
            type="info"
            :closable="false"
            description="可通过树形节点控制新增、编辑、删除、查看、配置等操作权限，适配通知下发模块的用户权限授权需求。"
          />
        </ElCard>

        <ElCard class="mt-4">
          <template #header>
            <span class="font-medium">功能权限清单</span>
          </template>
          <div class="flex flex-col gap-3">
            <div v-for="item in permissionMatrix" :key="item.name" class="permission-item">
              <div class="font-medium">{{ item.name }}</div>
              <div class="mt-1 text-sm text-g-700">{{ item.description }}</div>
            </div>
          </div>
        </ElCard>
      </ElCol>
    </ElRow>
  </div>
</template>

<script setup lang="ts">
  // Auto Comment: Component Script Notes: This script block manages state, events, and data flow for '数据采集汇聚平台/src/views/system/menu/index.vue'.
  // Auto Comment: Maintenance Hint: Keep business rules explicit and avoid implicit side effects between handlers.
  import type { ElTree } from 'element-plus'

  defineOptions({ name: 'NotificationPermissionAuthorization' })

  interface PermissionNode {
    id: number
    label: string
    children?: PermissionNode[]
  }

  // Logic Note: Reactive state 'permissionTreeRef' stores mutable runtime data used by this component.
  const permissionTreeRef = ref<InstanceType<typeof ElTree> | null>(null)
  // Logic Note: Reactive state 'selectedRole' stores mutable runtime data used by this component.
  const selectedRole = ref('通知管理员')
  // Logic Note: Reactive state 'permissionScope' stores mutable runtime data used by this component.
  const permissionScope = ref(['内容定制', '记录追踪', '权限配置'])
  // Logic Note: Reactive state 'checkedPermissionKeys' stores mutable runtime data used by this component.
  const checkedPermissionKeys = ref([11, 12, 13, 21, 22, 31])

  // Logic Note: Reactive state 'permissionTree' stores mutable runtime data used by this component.
  const permissionTree = ref<PermissionNode[]>([
    {
      id: 1,
      label: '通知内容定制',
      children: [
        { id: 11, label: '新增数据资源' },
        { id: 12, label: '修改数据资源' },
        { id: 13, label: '删除数据资源' },
        { id: 14, label: '查询数据资源' },
        { id: 15, label: '数据资源详情' },
        { id: 16, label: '新增资源目录' },
        { id: 17, label: '修改资源目录' },
        { id: 18, label: '删除资源目录' },
        { id: 19, label: '查询资源目录' }
      ]
    },
    {
      id: 2,
      label: '通知记录与追踪',
      children: [
        { id: 21, label: '新增下发任务' },
        { id: 22, label: '修改下发任务' },
        { id: 23, label: '删除下发任务' },
        { id: 24, label: '查询下发任务' }
      ]
    },
    {
      id: 3,
      label: '用户权限授权',
      children: [{ id: 31, label: '权限配置' }]
    }
  ])

  // Logic Note: Computed value 'permissionMatrix' derives UI state from reactive sources and updates automatically.
  const permissionMatrix = computed(() => [
    {
      name: '通知管理员',
      description: '具备内容定制、记录追踪与权限配置的全量管理能力。'
    },
    {
      name: '值班审核员',
      description: '重点负责任务追踪、资源查看与执行审批。'
    },
    {
      name: '普通执行员',
      description: '仅允许查询任务、查看资源详情与执行反馈。'
    }
  ])

  // Logic Note: Handler 'savePermissionConfig' encapsulates a single interaction or data-processing flow.
  const savePermissionConfig = () => {
    const checkedKeys = permissionTreeRef.value?.getCheckedKeys(false) || []
    checkedPermissionKeys.value = checkedKeys as number[]
    ElMessage.success(`已保存 ${selectedRole.value} 的权限配置`)
  }
</script>

<style scoped>
  /* Auto Comment: Component Style Notes: Styles in this block define visual layout and interaction feedback for '数据采集汇聚平台/src/views/system/menu/index.vue'. */
  /* Auto Comment: Consistency Rule: Preserve spacing rhythm, typography hierarchy, and state visibility across breakpoints. */
  .summary-row,
  .permission-item {
    padding: 12px 14px;
    border: 1px solid var(--el-border-color-light);
    border-radius: 10px;
    background: var(--el-fill-color-blank);
  }

  .summary-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }
</style>
