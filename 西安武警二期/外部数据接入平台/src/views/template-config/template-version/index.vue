<template>
  <!-- Auto Comment: Component Summary: This component renders UI for '外部数据接入平台/src/views/template-config/template-version/index.vue'. -->
  <!-- Auto Comment: Component Responsibility: It provides the view structure, interaction entry points, and display containers for this feature. -->
  <div class="flex flex-col gap-5 pb-5">
    <ElCard>
      <template #header>
        <div class="flex-cb gap-3 flex-wrap">
          <div>
            <h3 class="m-0 text-base">模板版本管理</h3>
            <p class="m-0 mt-1 text-sm text-g-500">按模板查看版本链路、发布状态与回退建议。</p>
          </div>
          <ElSpace wrap>
            <ElButton type="primary">新建版本</ElButton>
            <ElButton>查看差异</ElButton>
            <ElButton type="warning" plain>版本回退</ElButton>
          </ElSpace>
        </div>
      </template>

      <ElTimeline>
        <ElTimelineItem v-for="item in versionList" :key="item.version" :timestamp="item.time" :type="item.type">
          <div class="flex-cb gap-3 flex-wrap">
            <div>
              <div class="font-medium">{{ item.template }} / {{ item.version }}</div>
              <div class="mt-1 text-sm text-g-500">{{ item.desc }}</div>
            </div>
            <ElTag>{{ item.status }}</ElTag>
          </div>
        </ElTimelineItem>
      </ElTimeline>
    </ElCard>
  </div>
</template>

<script setup lang="ts">
  // Auto Comment: Component Script Notes: This script block manages state, events, and data flow for '外部数据接入平台/src/views/template-config/template-version/index.vue'.
  // Auto Comment: Maintenance Hint: Keep business rules explicit and avoid implicit side effects between handlers.
  defineOptions({ name: 'TemplateVersionManagement' })

  // Logic Note: Reactive state 'versionList' stores mutable runtime data used by this component.
  const versionList = ref([
    {
      template: '边防卡口结构化模板',
      version: 'v2.3.1',
      time: '2026-03-30 08:30',
      desc: '新增 5 个结构化字段并优化目录引用关系。',
      status: '当前版本',
      type: 'primary'
    },
    {
      template: '边防卡口结构化模板',
      version: 'v2.3.0',
      time: '2026-03-24 16:00',
      desc: '补充唯一标识规则与字段映射校验。',
      status: '历史版本',
      type: 'success'
    },
    {
      template: '日志归档模板',
      version: 'v1.8.0',
      time: '2026-03-22 11:10',
      desc: '适配日志模板目录下放流程。',
      status: '待发布',
      type: 'warning'
    }
  ])
</script>
