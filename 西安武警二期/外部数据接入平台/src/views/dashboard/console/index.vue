<!-- 外部数据接入平台概览 -->
<template>
  <div class="flex flex-col gap-5 pb-5">
    <ElRow :gutter="20">
      <ElCol :xs="24" :sm="12" :lg="6" v-for="card in summaryCards" :key="card.title">
        <ElCard shadow="hover">
          <div class="flex-cb">
            <div>
              <p class="m-0 text-sm text-g-500">{{ card.title }}</p>
              <h2 class="m-0 mt-3 text-3xl">{{ card.value }}</h2>
              <p class="m-0 mt-2 text-sm" :class="card.className">{{ card.desc }}</p>
            </div>
            <div class="flex-c size-12 rounded-3xl text-white" :style="{ background: card.color }">
              <ArtSvgIcon :icon="card.icon" class="text-2xl" />
            </div>
          </div>
        </ElCard>
      </ElCol>
    </ElRow>

    <ElRow :gutter="20">
      <ElCol :xs="24" :lg="15">
        <ElCard>
          <template #header>
            <div class="flex-cb gap-3 flex-wrap">
              <div>
                <h3 class="m-0 text-base">接入模块概览</h3>
                <p class="m-0 mt-1 text-sm text-g-500">围绕数据源、模板、任务、调度、共享五大业务域进行统一管理。</p>
              </div>
              <ElTag type="success">平台运行正常</ElTag>
            </div>
          </template>
          <ElTable :data="moduleList" border>
            <ElTableColumn prop="module" label="模块" min-width="160" />
            <ElTableColumn prop="functions" label="核心能力" min-width="280" />
            <ElTableColumn prop="owner" label="责任域" width="140" />
            <ElTableColumn prop="status" label="状态" width="100" />
          </ElTable>
        </ElCard>
      </ElCol>
      <ElCol :xs="24" :lg="9">
        <ElCard>
          <template #header>
            <span>今日重点事项</span>
          </template>
          <ElTimeline>
            <ElTimelineItem v-for="item in todoList" :key="item.title" :timestamp="item.time" :type="item.type">
              {{ item.title }}
            </ElTimelineItem>
          </ElTimeline>
        </ElCard>
      </ElCol>
    </ElRow>
  </div>
</template>

<script setup lang="ts">
  defineOptions({ name: 'Console' })

  const summaryCards = ref([
    {
      title: '接入数据源',
      value: 26,
      desc: '异常 2 个',
      className: 'text-danger',
      icon: 'ri:database-line',
      color: 'linear-gradient(135deg, #377dff, #69a8ff)'
    },
    {
      title: '模板总数',
      value: 18,
      desc: '待下放 3 个版本',
      className: 'text-warning',
      icon: 'ri:file-copy-2-line',
      color: 'linear-gradient(135deg, #7a7fff, #9a9cff)'
    },
    {
      title: '运行中任务',
      value: 18,
      desc: '今日完成 136 次',
      className: 'text-success',
      icon: 'ri:task-line',
      color: 'linear-gradient(135deg, #13deb9, #3de6ca)'
    },
    {
      title: '共享服务',
      value: 11,
      desc: '已发布 8 个',
      className: 'text-theme',
      icon: 'ri:share-line',
      color: 'linear-gradient(135deg, #ff8a34, #ffb15c)'
    }
  ])

  const moduleList = ref([
    {
      module: '接入来源管理',
      functions: '数据源新增、编辑、检测、异常查看、安全管理配置',
      owner: '数据接入组',
      status: '运行中'
    },
    {
      module: '数据模板配置',
      functions: '模板目录、字段映射、模板下放、版本管理',
      owner: '模板管理组',
      status: '运行中'
    },
    {
      module: '接入任务管理',
      functions: '血缘查看、运行状态、任务管理、状态控制',
      owner: '调度管理组',
      status: '运行中'
    },
    {
      module: '数据共享管理',
      functions: '服务网关、表资源、标签资源、指标服务、接口服务、文件服务',
      owner: '共享服务组',
      status: '运行中'
    }
  ])

  const todoList = ref([
    { title: '复核异常数据源并重新检测', time: '09:30', type: 'warning' },
    { title: '完成模板 v2.3.1 下放反馈确认', time: '10:00', type: 'primary' },
    { title: '跟踪日志归档任务异常实例', time: '11:20', type: 'danger' },
    { title: '发布边防卡口表资源服务', time: '14:00', type: 'success' }
  ])
</script>
