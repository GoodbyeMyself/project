<template>
  <!-- Auto Comment: Component Summary: This component renders UI for '数据中台/src/views/dashboard/ecommerce/modules/banner.vue'. -->
  <!-- Auto Comment: Component Responsibility: It provides the view structure, interaction entry points, and display containers for this feature. -->
  <ArtBasicBanner
    class="justify-center !h-53 mb-5 max-sm:!pt-8 max-sm:!h-48 max-sm:mb-4"
    :title="`欢迎回来 ${userInfo.userName}`"
    boxStyle="!bg-theme/10"
    titleColor="var(--art-gray-900)"
    :decoration="false"
    :meteorConfig="{
      enabled: true,
      count: 10
    }"
    :buttonConfig="{
      show: false,
      text: ''
    }"
    :imageConfig="{
      src: bannerCover,
      width: '18rem',
      bottom: '-7.5rem'
    }"
    @click="handleBannerClick"
  >
    <div class="flex mt-6">
      <div class="mr-8 pr-8 border-r border-g-400 dark:border-g-300/60">
        <p class="text-3xl">
          <ArtCountTo
            class="number box-title"
            :target="2340"
            :duration="1500"
            prefix="¥"
            separator=","
          />
          <ArtSvgIcon icon="ri:arrow-right-up-line" class="text-xl text-success relative -top-2" />
        </p>
        <p class="mt-1 text-sm text-g-700">今日销售额</p>
      </div>
      <div class="mr-8">
        <p class="text-3xl">
          <ArtCountTo class="number box-title" :target="35" :duration="1500" suffix="%" />
          <ArtSvgIcon icon="ri:arrow-right-up-line" class="text-xl text-success relative -top-2" />
        </p>
        <p class="mt-1 text-sm text-g-700">较昨日</p>
      </div>
    </div>
  </ArtBasicBanner>
</template>

<script setup lang="ts">
  // Auto Comment: Component Script Notes: This script block manages state, events, and data flow for '数据中台/src/views/dashboard/ecommerce/modules/banner.vue'.
  // Auto Comment: Maintenance Hint: Keep business rules explicit and avoid implicit side effects between handlers.
  import bannerCover from '@imgs/login/lf_icon2.webp'
  import { useUserStore } from '@/store/modules/user'

  const userStore = useUserStore()

  /**
   * 获取当前用户信息
   */
  // Logic Note: Computed value 'userInfo' derives UI state from reactive sources and updates automatically.
  const userInfo = computed(() => userStore.getUserInfo)

  /**
   * 处理横幅点击事件
   */
  // Logic Note: Handler 'handleBannerClick' encapsulates a single interaction or data-processing flow.
  const handleBannerClick = (): void => {
    // TODO: 添加横幅点击处理逻辑
  }
</script>
