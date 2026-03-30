<template>
  <div class="page-content data-page">
    <ElAlert
      title="数据仓体系模块覆盖数仓目录与表信息管理，可直接承接新增、修改、删除、查询等二开需求。"
      type="success"
      :closable="false"
      class="mb-4"
    />

    <ElRow :gutter="16" class="mb-4">
      <ElCol :xs="24" :sm="12" :lg="6" v-for="card in summaryCards" :key="card.label">
        <ElCard shadow="hover" class="summary-card">
          <div class="summary-card__label">{{ card.label }}</div>
          <div class="summary-card__value">{{ card.value }}</div>
          <div class="summary-card__desc">{{ card.desc }}</div>
        </ElCard>
      </ElCol>
    </ElRow>

    <ElRow :gutter="16">
      <ElCol :xs="24" :lg="10">
        <ElCard header="数仓目录管理" class="module-card">
          <template #header>
            <div class="card-header">
              <span>数仓目录管理</span>
              <ElSpace>
                <ElButton type="primary">新增目录</ElButton>
                <ElButton>查询目录</ElButton>
              </ElSpace>
            </div>
          </template>

          <ElTable :data="warehouseCatalogList" border>
            <ElTableColumn prop="catalogCode" label="目录编码" min-width="120" />
            <ElTableColumn prop="catalogName" label="目录名称" min-width="160" />
            <ElTableColumn prop="owner" label="负责人" min-width="100" />
            <ElTableColumn prop="tableCount" label="表数量" min-width="90" />
            <ElTableColumn prop="updateTime" label="更新时间" min-width="160" />
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

      <ElCol :xs="24" :lg="14">
        <ElCard class="module-card">
          <template #header>
            <div class="card-header">
              <span>表信息管理</span>
              <ElSpace>
                <ElButton type="primary">新增表信息</ElButton>
                <ElButton>查询表信息</ElButton>
              </ElSpace>
            </div>
          </template>

          <ElTable :data="tableInfoList" border>
            <ElTableColumn prop="tableName" label="表名称" min-width="180" />
            <ElTableColumn prop="catalogName" label="所属目录" min-width="140" />
            <ElTableColumn prop="storageType" label="存储类型" min-width="110" />
            <ElTableColumn prop="level" label="分层" min-width="90" />
            <ElTableColumn prop="status" label="状态" min-width="100">
              <template #default="scope">
                <ElTag :type="scope.row.status === '已投产' ? 'success' : 'warning'">
                  {{ scope.row.status }}
                </ElTag>
              </template>
            </ElTableColumn>
            <ElTableColumn prop="updateTime" label="更新时间" min-width="160" />
            <ElTableColumn label="操作" width="220" fixed="right">
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

    <ElCard class="module-card mt-4" header="功能覆盖说明">
      <ElDescriptions :column="2" border>
        <ElDescriptionsItem label="数仓目录">
          新增数仓目录、修改数仓目录、删除数仓目录、查询数仓目录
        </ElDescriptionsItem>
        <ElDescriptionsItem label="表信息">
          新增表信息、修改表信息、删除表信息、查询表信息
        </ElDescriptionsItem>
        <ElDescriptionsItem label="推荐接入方式">
          页面按钮与表格操作位已预留，可直接对接后端 CRUD 接口。
        </ElDescriptionsItem>
        <ElDescriptionsItem label="当前展示方式">
          使用静态示例数据承载业务结构，避免改造阶段依赖真实接口。
        </ElDescriptionsItem>
      </ElDescriptions>
    </ElCard>
  </div>
</template>

<script setup lang="ts">
  defineOptions({ name: 'DataWarehouseCatalogManagement' })

  const summaryCards = [
    { label: '数仓目录', value: '12', desc: '已建业务目录' },
    { label: '数据表', value: '86', desc: '已纳管表信息' },
    { label: '主题域', value: '8', desc: '覆盖核心业务域' },
    { label: '待完善项', value: '14', desc: '待补充元数据' }
  ]

  const warehouseCatalogList = [
    {
      catalogCode: 'DW-ODS-01',
      catalogName: '警务采集域',
      owner: '张伟',
      tableCount: 24,
      updateTime: '2026-03-28 14:20:00'
    },
    {
      catalogCode: 'DW-DWD-02',
      catalogName: '执勤主题域',
      owner: '王峰',
      tableCount: 18,
      updateTime: '2026-03-27 09:10:00'
    },
    {
      catalogCode: 'DW-ADS-03',
      catalogName: '指挥分析域',
      owner: '李敏',
      tableCount: 11,
      updateTime: '2026-03-25 18:40:00'
    }
  ]

  const tableInfoList = [
    {
      tableName: 'ods_police_duty_record',
      catalogName: '警务采集域',
      storageType: 'Hive',
      level: 'ODS',
      status: '已投产',
      updateTime: '2026-03-28 15:00:00'
    },
    {
      tableName: 'dwd_command_task_summary',
      catalogName: '执勤主题域',
      storageType: 'MySQL',
      level: 'DWD',
      status: '建设中',
      updateTime: '2026-03-27 11:30:00'
    },
    {
      tableName: 'ads_alarm_dispatch_board',
      catalogName: '指挥分析域',
      storageType: 'ClickHouse',
      level: 'ADS',
      status: '已投产',
      updateTime: '2026-03-26 10:15:00'
    }
  ]
</script>

<style scoped lang="scss">
  .data-page {
    .summary-card {
      margin-bottom: 16px;

      &__label {
        color: var(--el-text-color-secondary);
        font-size: 14px;
      }

      &__value {
        margin: 10px 0 6px;
        color: var(--el-text-color-primary);
        font-size: 28px;
        font-weight: 600;
      }

      &__desc {
        color: var(--el-text-color-secondary);
        font-size: 13px;
      }
    }

    .module-card {
      margin-bottom: 0;
    }

    .card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }
  }
</style>
