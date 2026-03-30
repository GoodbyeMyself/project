<template>
  <div class="page-content governance-page">
    <ElAlert
      title="数据治理模块聚焦数据标准完善与数据资源目录完善，页面已合并成统一治理工作台。"
      type="info"
      :closable="false"
      class="mb-4"
    />

    <ElRow :gutter="16">
      <ElCol :xs="24" :xl="12">
        <ElCard class="module-card">
          <template #header>
            <div class="card-header">
              <span>数据标准完善</span>
              <ElSpace>
                <ElButton type="primary">新增数据标准</ElButton>
                <ElButton>查询数据标准</ElButton>
              </ElSpace>
            </div>
          </template>

          <ElTable :data="standardList" border>
            <ElTableColumn prop="standardCode" label="标准编号" min-width="120" />
            <ElTableColumn prop="standardName" label="标准名称" min-width="160" />
            <ElTableColumn prop="category" label="标准分类" min-width="120" />
            <ElTableColumn prop="version" label="版本" min-width="90" />
            <ElTableColumn prop="status" label="状态" min-width="100">
              <template #default="scope">
                <ElTag :type="scope.row.status === '已发布' ? 'success' : 'warning'">
                  {{ scope.row.status }}
                </ElTag>
              </template>
            </ElTableColumn>
            <ElTableColumn label="操作" width="200" fixed="right">
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

      <ElCol :xs="24" :xl="12">
        <ElCard class="module-card">
          <template #header>
            <div class="card-header">
              <span>数据资源目录完善</span>
              <ElSpace>
                <ElButton type="primary">新增资源目录</ElButton>
                <ElButton>查询资源目录</ElButton>
              </ElSpace>
            </div>
          </template>

          <ElTable :data="resourceCatalogList" border>
            <ElTableColumn prop="resourceCode" label="资源编号" min-width="120" />
            <ElTableColumn prop="resourceName" label="资源名称" min-width="160" />
            <ElTableColumn prop="sourceSystem" label="来源系统" min-width="120" />
            <ElTableColumn prop="shareLevel" label="共享级别" min-width="110" />
            <ElTableColumn prop="status" label="状态" min-width="100">
              <template #default="scope">
                <ElTag :type="scope.row.status === '已启用' ? 'success' : 'info'">
                  {{ scope.row.status }}
                </ElTag>
              </template>
            </ElTableColumn>
            <ElTableColumn label="操作" width="200" fixed="right">
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

    <ElCard class="mt-4">
      <template #header>
        <div class="card-header">
          <span>治理建设进度</span>
          <ElTag type="success">需求已覆盖</ElTag>
        </div>
      </template>

      <ElSteps :active="3" finish-status="success" align-center>
        <ElStep title="标准梳理" description="新增、修改、删除、查询能力入口已预留" />
        <ElStep title="资源建档" description="目录完善操作位与状态展示已建立" />
        <ElStep title="治理执行" description="后续仅需接入接口与表单提交逻辑" />
      </ElSteps>
    </ElCard>
  </div>
</template>

<script setup lang="ts">
  defineOptions({ name: 'DataGovernanceStandardAndResource' })

  const standardList = [
    {
      standardCode: 'STD-001',
      standardName: '警员基础信息标准',
      category: '主数据',
      version: 'V1.2',
      status: '已发布'
    },
    {
      standardCode: 'STD-002',
      standardName: '任务事件编码标准',
      category: '编码标准',
      version: 'V1.0',
      status: '修订中'
    },
    {
      standardCode: 'STD-003',
      standardName: '执勤记录数据标准',
      category: '业务数据',
      version: 'V2.1',
      status: '已发布'
    }
  ]

  const resourceCatalogList = [
    {
      resourceCode: 'RES-101',
      resourceName: '执勤台账资源目录',
      sourceSystem: '执勤管理系统',
      shareLevel: '内部共享',
      status: '已启用'
    },
    {
      resourceCode: 'RES-102',
      resourceName: '警情处置资源目录',
      sourceSystem: '警情平台',
      shareLevel: '受控共享',
      status: '待审核'
    },
    {
      resourceCode: 'RES-103',
      resourceName: '巡逻轨迹资源目录',
      sourceSystem: '移动终端系统',
      shareLevel: '内部共享',
      status: '已启用'
    }
  ]
</script>

<style scoped lang="scss">
  .governance-page {
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
