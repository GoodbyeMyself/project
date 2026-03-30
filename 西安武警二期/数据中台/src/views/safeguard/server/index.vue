<template>
  <!-- Auto Comment: Component Summary: This component renders UI for '数据中台/src/views/safeguard/server/index.vue'. -->
  <!-- Auto Comment: Component Responsibility: It provides the view structure, interaction entry points, and display containers for this feature. -->
  <div class="page-content protection-page">
    <ElAlert
      title="数据保护模块已整合权限管理、数据加密、数据脱敏、数据流量管理、数字水印防护五类子功能。"
      type="warning"
      :closable="false"
      class="mb-4"
    />

    <ElRow :gutter="16" class="mb-4">
      <ElCol :xs="24" :lg="12">
        <ElCard class="module-card" header="权限管理">
          <ElDescriptions :column="1" border>
            <ElDescriptionsItem label="角色权限关联配置">
              已预留角色、资源、权限项关联配置区块。
            </ElDescriptionsItem>
            <ElDescriptionsItem label="权限日志查询">
              支持按操作人、模块、时间范围进行查询。
            </ElDescriptionsItem>
            <ElDescriptionsItem label="权限申请审批流程">
              已预留申请、审批、驳回、追踪状态入口。
            </ElDescriptionsItem>
          </ElDescriptions>
          <ElSpace class="mt-4" wrap>
            <ElButton type="primary">关联配置</ElButton>
            <ElButton>日志查询</ElButton>
            <ElButton>审批流程</ElButton>
          </ElSpace>
        </ElCard>
      </ElCol>

      <ElCol :xs="24" :lg="12">
        <ElCard class="module-card" header="数据流量管理">
          <ElTable :data="flowList" border>
            <ElTableColumn prop="channel" label="通道名称" min-width="140" />
            <ElTableColumn prop="strategy" label="流量策略" min-width="140" />
            <ElTableColumn prop="limit" label="阈值" min-width="100" />
            <ElTableColumn prop="status" label="状态" min-width="100">
              <template #default="scope">
                <ElTag :type="scope.row.status === '运行中' ? 'success' : 'info'">
                  {{ scope.row.status }}
                </ElTag>
              </template>
            </ElTableColumn>
            <ElTableColumn label="操作" width="180">
              <template #default>
                <ElSpace>
                  <ElButton link type="primary">配置</ElButton>
                  <ElButton link>查看</ElButton>
                </ElSpace>
              </template>
            </ElTableColumn>
          </ElTable>
        </ElCard>
      </ElCol>
    </ElRow>

    <ElRow :gutter="16" class="mb-4">
      <ElCol :xs="24" :lg="12">
        <ElCard class="module-card">
          <template #header>
            <div class="card-header">
              <span>数据加密配置</span>
              <ElButton type="primary">新增数据加密配置</ElButton>
            </div>
          </template>
          <ElTable :data="encryptionList" border>
            <ElTableColumn prop="name" label="配置名称" min-width="160" />
            <ElTableColumn prop="algorithm" label="加密算法" min-width="120" />
            <ElTableColumn prop="scope" label="适用范围" min-width="140" />
            <ElTableColumn label="操作" width="200">
              <template #default>
                <ElSpace>
                  <ElButton link type="primary">修改</ElButton>
                  <ElButton link type="danger">删除</ElButton>
                  <ElButton link>查询</ElButton>
                </ElSpace>
              </template>
            </ElTableColumn>
          </ElTable>
        </ElCard>
      </ElCol>

      <ElCol :xs="24" :lg="12">
        <ElCard class="module-card">
          <template #header>
            <div class="card-header">
              <span>数据脱敏配置</span>
              <ElButton type="primary">新增数据脱敏配置</ElButton>
            </div>
          </template>
          <ElTable :data="maskingList" border>
            <ElTableColumn prop="name" label="配置名称" min-width="160" />
            <ElTableColumn prop="rule" label="脱敏规则" min-width="140" />
            <ElTableColumn prop="field" label="目标字段" min-width="140" />
            <ElTableColumn label="操作" width="200">
              <template #default>
                <ElSpace>
                  <ElButton link type="primary">修改</ElButton>
                  <ElButton link type="danger">删除</ElButton>
                  <ElButton link>查询</ElButton>
                </ElSpace>
              </template>
            </ElTableColumn>
          </ElTable>
        </ElCard>
      </ElCol>
    </ElRow>

    <ElCard class="module-card">
      <template #header>
        <div class="card-header">
          <span>数字水印防护</span>
          <ElSpace>
            <ElButton type="primary">新增数字水印防护</ElButton>
            <ElButton>查询数字水印防护</ElButton>
          </ElSpace>
        </div>
      </template>

      <ElTable :data="watermarkList" border>
        <ElTableColumn prop="name" label="防护名称" min-width="160" />
        <ElTableColumn prop="target" label="防护对象" min-width="160" />
        <ElTableColumn prop="creator" label="创建人" min-width="100" />
        <ElTableColumn prop="createTime" label="创建时间" min-width="160" />
        <ElTableColumn label="操作" width="240" fixed="right">
          <template #default>
            <ElSpace>
              <ElButton link type="primary">下载</ElButton>
              <ElButton link type="danger">删除</ElButton>
              <ElButton link>查询</ElButton>
            </ElSpace>
          </template>
        </ElTableColumn>
      </ElTable>
    </ElCard>
  </div>
</template>

<script setup lang="ts">
  // Auto Comment: Component Script Notes: This script block manages state, events, and data flow for '数据中台/src/views/safeguard/server/index.vue'.
  // Auto Comment: Maintenance Hint: Keep business rules explicit and avoid implicit side effects between handlers.
  defineOptions({ name: 'DataProtectionSecurityCenter' })

  const flowList = [
    { channel: '共享交换通道', strategy: '峰值限流', limit: '2000 req/min', status: '运行中' },
    { channel: '服务网关通道', strategy: '黑白名单控制', limit: 'IP 级', status: '运行中' },
    { channel: '外部接入通道', strategy: '时段限流', limit: '500 req/min', status: '待生效' }
  ]

  const encryptionList = [
    { name: '身份证号加密', algorithm: 'SM4', scope: '人员基础表' },
    { name: '手机号加密', algorithm: 'AES', scope: '用户档案表' }
  ]

  const maskingList = [
    { name: '姓名脱敏', rule: '保留姓氏', field: 'person_name' },
    { name: '联系电话脱敏', rule: '中间四位掩码', field: 'phone_number' }
  ]

  const watermarkList = [
    {
      name: '外发报表水印',
      target: '统计报表PDF',
      creator: '管理员',
      createTime: '2026-03-29 10:20:00'
    },
    {
      name: '截图追踪水印',
      target: '敏感查询页面',
      creator: '审计员',
      createTime: '2026-03-28 16:45:00'
    }
  ]
</script>

<style scoped lang="scss">
  /* Auto Comment: Component Style Notes: Styles in this block define visual layout and interaction feedback for '数据中台/src/views/safeguard/server/index.vue'. */
  /* Auto Comment: Consistency Rule: Preserve spacing rhythm, typography hierarchy, and state visibility across breakpoints. */
  .protection-page {
    .module-card {
      margin-bottom: 16px;
    }

    .card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }
  }
</style>
