<!-- 403页面 -->
<template>
  <!-- Auto Comment: Component Summary: This component renders UI for '数据中台/src/views/exception/403/index.vue'. -->
  <!-- Auto Comment: Component Responsibility: It provides the view structure, interaction entry points, and display containers for this feature. -->
  <ArtException
    :data="{
      title: '403',
      desc: $t('exceptionPage.403'),
      btnText: $t('exceptionPage.gohome'),
      imgUrl
    }"
  />
</template>

<script setup lang="ts">
  // Auto Comment: Component Script Notes: This script block manages state, events, and data flow for '数据中台/src/views/exception/403/index.vue'.
  // Auto Comment: Maintenance Hint: Keep business rules explicit and avoid implicit side effects between handlers.
  import imgUrl from '@imgs/svg/403.svg'
  defineOptions({ name: 'Exception403' })
</script>
