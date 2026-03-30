<template>
  <!-- Auto Comment: Component Summary: This component renders UI for '外部数据接入平台/src/views/result/fail/index.vue'. -->
  <!-- Auto Comment: Component Responsibility: It provides the view structure, interaction entry points, and display containers for this feature. -->
  <ArtResultPage
    type="fail"
    title="提交失败"
    message="请核对并修改以下信息后，再重新提交。"
    iconCode="ri:close-fill"
  >
    <template #content>
      <p>您提交的内容有如下错误：</p>
      <p>
        <ArtSvgIcon icon="ri:close-circle-line" class="text-red-500 mr-1" />
        <span>您的账户已被冻结</span>
      </p>
      <p>
        <ArtSvgIcon icon="ri:close-circle-line" class="text-red-500 mr-1" />
        <span>您的账户还不具备申请资格</span>
      </p>
    </template>
    <template #buttons>
      <ElButton type="primary" v-ripple>返回修改</ElButton>
      <ElButton v-ripple>查看</ElButton>
    </template>
  </ArtResultPage>
</template>

<script setup lang="ts">
  // Auto Comment: Component Script Notes: This script block manages state, events, and data flow for '外部数据接入平台/src/views/result/fail/index.vue'.
  // Auto Comment: Maintenance Hint: Keep business rules explicit and avoid implicit side effects between handlers.
  defineOptions({ name: 'ResultFail' })
</script>
