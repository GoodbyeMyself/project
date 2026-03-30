<!-- 任务编排页面 -->
<template>
  <div class="flex flex-col gap-5 pb-5">
    <ElCard>
      <template #header>
        <div class="flex-cb gap-3 flex-wrap">
          <div>
            <h3 class="m-0 text-base">任务编排</h3>
            <p class="m-0 mt-1 text-sm text-g-500">支持新增、修改、删除、查询、立即执行、上线/下线、目录维护、复制、移动。</p>
          </div>
          <ElSpace wrap>
            <ElButton type="primary">新增任务编排</ElButton>
            <ElButton>新增目录</ElButton>
            <ElButton type="success" plain>上线任务编排</ElButton>
            <ElButton type="warning" plain>下线任务编排</ElButton>
          </ElSpace>
        </div>
      </template>

      <ElRow :gutter="20">
        <ElCol :xs="24" :lg="7">
          <ElCard shadow="never" class="h-full">
            <template #header><span>任务编排目录</span></template>
            <ElTree :data="treeData" node-key="id" default-expand-all>
              <template #default="{ data }">
                <div class="flex-cb w-full pr-2">
                  <span>{{ data.label }}</span>
                  <span class="text-xs text-g-500">{{ data.count }} 个</span>
                </div>
              </template>
            </ElTree>
          </ElCard>
        </ElCol>
        <ElCol :xs="24" :lg="17">
          <ElCard shadow="never" class="h-full">
            <template #header>
              <div class="flex-cb gap-3 flex-wrap">
                <span>编排任务列表</span>
                <ElSpace wrap>
                  <ElButton>查询任务编排</ElButton>
                  <ElButton>立即执行</ElButton>
                  <ElButton>复制任务编排</ElButton>
                  <ElButton type="warning" plain>移动任务编排</ElButton>
                  <ElButton type="danger" plain>删除任务编排</ElButton>
                </ElSpace>
              </div>
            </template>
            <ElTable :data="orchestrationList" border>
              <ElTableColumn prop="name" label="编排名称" min-width="180" />
              <ElTableColumn prop="directory" label="目录" min-width="140" />
              <ElTableColumn prop="tasks" label="节点数" width="90" />
              <ElTableColumn prop="owner" label="责任人" width="120" />
              <ElTableColumn prop="publish" label="发布状态" width="100" />
              <ElTableColumn prop="updatedAt" label="更新时间" width="170" />
            </ElTable>
          </ElCard>
        </ElCol>
      </ElRow>
    </ElCard>
  </div>
</template>

<script setup lang="ts">
  defineOptions({ name: 'Menus' })

  const treeData = ref([
    {
      id: 1,
      label: '实时接入编排',
      count: 3,
      children: [
        { id: 11, label: '边防链路', count: 2 },
        { id: 12, label: '告警链路', count: 1 }
      ]
    },
    {
      id: 2,
      label: '离线处理编排',
      count: 2,
      children: [{ id: 21, label: '归档链路', count: 2 }]
    }
  ])

  const orchestrationList = ref([
    {
      name: '边防卡口接入总编排',
      directory: '边防链路',
      tasks: 8,
      owner: '张伟',
      publish: '已上线',
      updatedAt: '2026-03-30 09:10'
    },
    {
      name: '日志归档处理编排',
      directory: '归档链路',
      tasks: 5,
      owner: '李峰',
      publish: '已下线',
      updatedAt: '2026-03-29 18:50'
    }
  ])
</script>
