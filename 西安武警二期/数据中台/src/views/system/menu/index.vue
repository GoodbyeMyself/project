<template>
  <div class="page-content service-page">
    <ElAlert
      title="数据服务模块已按需求合并第三方服务挂载、访问控制、实体共享、模型共享四大能力。"
      type="success"
      :closable="false"
      class="mb-4"
    />

    <ElTabs type="border-card">
      <ElTabPane label="第三方服务挂载">
        <ElRow :gutter="16">
          <ElCol :xs="24" :xl="12">
            <ElCard class="module-card">
              <template #header>
                <div class="card-header">
                  <span>数据服务挂载</span>
                  <ElButton type="primary">新增服务挂载</ElButton>
                </div>
              </template>
              <ElTable :data="mountList" border>
                <ElTableColumn prop="serviceName" label="服务名称" min-width="160" />
                <ElTableColumn prop="provider" label="提供方" min-width="120" />
                <ElTableColumn prop="protocol" label="协议" min-width="100" />
                <ElTableColumn label="操作" width="220">
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
            <ElCard class="module-card" header="标准化接口服务 / 权限与安全 / 我的订阅">
              <ElDescriptions :column="1" border>
                <ElDescriptionsItem label="标准化接口服务">
                  统一接口入参、出参、错误码与版本规范。
                </ElDescriptionsItem>
                <ElDescriptionsItem label="服务权限与安全管理">
                  预留鉴权方式、签名策略、访问频控、安全等级配置。
                </ElDescriptionsItem>
                <ElDescriptionsItem label="我的订阅服务">
                  支持新增我的订阅、删除我的订阅、查询我的订阅。
                </ElDescriptionsItem>
              </ElDescriptions>
              <ElSpace class="mt-4" wrap>
                <ElButton type="primary">接口标准化</ElButton>
                <ElButton>安全管理配置</ElButton>
                <ElButton>我的订阅</ElButton>
              </ElSpace>
            </ElCard>
          </ElCol>
        </ElRow>
      </ElTabPane>

      <ElTabPane label="数据服务访问控制">
        <ElRow :gutter="16">
          <ElCol :xs="24" :xl="12">
            <ElCard class="module-card">
              <template #header>
                <div class="card-header">
                  <span>服务网关数据服务访问控制</span>
                  <ElButton type="primary">上线网关</ElButton>
                </div>
              </template>
              <ElTable :data="gatewayList" border>
                <ElTableColumn prop="gatewayName" label="网关名称" min-width="160" />
                <ElTableColumn prop="domain" label="网关地址" min-width="180" />
                <ElTableColumn prop="status" label="状态" min-width="100">
                  <template #default="scope">
                    <ElTag :type="scope.row.status === '已上线' ? 'success' : 'warning'">
                      {{ scope.row.status }}
                    </ElTag>
                  </template>
                </ElTableColumn>
                <ElTableColumn label="操作" width="220">
                  <template #default>
                    <ElSpace>
                      <ElButton link type="primary">修改网关</ElButton>
                      <ElButton link type="danger">下线网关</ElButton>
                      <ElButton link>查询网关</ElButton>
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
                  <span>IP 黑白名单管理</span>
                  <ElButton type="primary">新增 IP 黑白名单</ElButton>
                </div>
              </template>
              <ElTable :data="ipList" border>
                <ElTableColumn prop="ip" label="IP 地址" min-width="160" />
                <ElTableColumn prop="type" label="名单类型" min-width="120" />
                <ElTableColumn prop="service" label="关联服务" min-width="160" />
                <ElTableColumn label="操作" width="220">
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
      </ElTabPane>

      <ElTabPane label="共享与发布">
        <ElRow :gutter="16">
          <ElCol :xs="24" :xl="8">
            <ElCard class="module-card" header="数据实体表共享">
              <ElDescriptions :column="1" border>
                <ElDescriptionsItem label="实体共享配置">
                  已预留共享对象、范围、审批状态与生效周期配置区域。
                </ElDescriptionsItem>
              </ElDescriptions>
              <ElButton class="mt-4" type="primary">数据实体共享配置</ElButton>
            </ElCard>
          </ElCol>

          <ElCol :xs="24" :xl="8">
            <ElCard class="module-card">
              <template #header>
                <div class="card-header">
                  <span>数据模型发布</span>
                  <ElButton type="primary">新增数据模型发布</ElButton>
                </div>
              </template>
              <ElTable :data="modelPublishList" border>
                <ElTableColumn prop="name" label="模型名称" min-width="150" />
                <ElTableColumn prop="version" label="版本" min-width="90" />
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

          <ElCol :xs="24" :xl="8">
            <ElCard class="module-card">
              <template #header>
                <div class="card-header">
                  <span>接口服务发布</span>
                  <ElButton type="primary">新增接口服务发布</ElButton>
                </div>
              </template>
              <ElTable :data="apiPublishList" border>
                <ElTableColumn prop="name" label="接口名称" min-width="150" />
                <ElTableColumn prop="method" label="请求方式" min-width="100" />
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
      </ElTabPane>
    </ElTabs>
  </div>
</template>

<script setup lang="ts">
  defineOptions({ name: 'DataServiceMountAccessShare' })

  const mountList = [
    { serviceName: '警情数据挂载服务', provider: '警情平台', protocol: 'REST' },
    { serviceName: '巡逻轨迹挂载服务', provider: '移动终端', protocol: 'HTTP' }
  ]

  const gatewayList = [
    { gatewayName: '内网统一网关', domain: 'https://gateway.internal/api', status: '已上线' },
    { gatewayName: '共享交换网关', domain: 'https://share.gateway/api', status: '待上线' }
  ]

  const ipList = [
    { ip: '10.10.10.15', type: '白名单', service: '警情数据挂载服务' },
    { ip: '172.16.8.99', type: '黑名单', service: '共享交换网关' }
  ]

  const modelPublishList = [
    { name: '执勤态势分析模型', version: 'V1.0' },
    { name: '警情研判模型', version: 'V2.3' }
  ]

  const apiPublishList = [
    { name: '人员信息共享接口', method: 'GET' },
    { name: '任务上报接口', method: 'POST' }
  ]
</script>

<style scoped lang="scss">
  .service-page {
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
