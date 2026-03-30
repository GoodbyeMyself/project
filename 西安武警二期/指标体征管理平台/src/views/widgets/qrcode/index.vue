<template>
  <!-- Auto Comment: Component Summary: This component renders UI for '指标体征管理平台/src/views/widgets/qrcode/index.vue'. -->
  <!-- Auto Comment: Component Responsibility: It provides the view structure, interaction entry points, and display containers for this feature. -->
  <div class="page-content">
    <ElRow :gutter="20">
      <ElCol
        :span="6"
        :md="12"
        :sm="12"
        :xs="24"
        v-for="preset in qrcodePresets"
        :key="preset.title"
      >
        <ElCard class="mb-5">
          <template #header>
            <div>
              <span class="text-base font-bold">{{ preset.title }}</span>
            </div>
          </template>

          <div class="flex-cc p-5 rounded">
            <QrcodeVue :value="qrValue" v-bind="preset.config" />
          </div>
        </ElCard>
      </ElCol>
    </ElRow>
  </div>
</template>

<script setup lang="ts">
  // Auto Comment: Component Script Notes: This script block manages state, events, and data flow for '指标体征管理平台/src/views/widgets/qrcode/index.vue'.
  // Auto Comment: Maintenance Hint: Keep business rules explicit and avoid implicit side effects between handlers.
  import QrcodeVue from 'qrcode.vue'
  import type { Level, RenderAs, ImageSettings } from 'qrcode.vue'

  defineOptions({ name: 'WidgetsQrcode' })

  /**
   * 二维码内容
   */
  // Logic Note: Reactive state 'qrValue' stores mutable runtime data used by this component.
  const qrValue = ref('https://www.artd.pro')
  // Logic Note: Reactive state 'isShowLogo' stores mutable runtime data used by this component.
  const isShowLogo = ref(false)

  /**
   * 预设二维码样式配置
   */
  const qrcodePresets = [
    {
      title: '渲染成 svg 标签',
      config: {
        size: 160,
        level: 'H' as Level,
        renderAs: 'svg' as RenderAs,
        margin: 0,
        background: '#ffffff',
        foreground: '#000000'
      }
    },
    {
      title: '渲染成 canvas 标签',
      config: {
        size: 160,
        level: 'H' as Level,
        renderAs: 'canvas' as RenderAs,
        margin: 0,
        background: '#ffffff',
        foreground: '#000000'
      }
    },
    {
      title: '自定义颜色',
      config: {
        size: 160,
        level: 'H' as Level,
        renderAs: 'canvas' as RenderAs,
        margin: 0,
        background: '#f0f0f0',
        foreground: '#4080ff'
      }
    },
    {
      title: '带有Logo',
      config: {
        size: 160,
        level: 'H' as Level,
        renderAs: 'canvas' as RenderAs,
        margin: 0,
        background: '#ffffff',
        foreground: '#000000',
        imageSettings: {
          src: 'https://www.artd.pro/assets/draw1-Ce1WF34i.png',
          width: 40,
          height: 40,
          excavate: true
        }
      }
    }
  ]

  /**
   * 二维码配置
   */
  // Logic Note: Reactive state 'qrcodeConfig' stores mutable runtime data used by this component.
  const qrcodeConfig = reactive({
    size: 160,
    level: 'H' as Level,
    renderAs: 'canvas' as RenderAs,
    margin: 0,
    background: '#ffffff',
    foreground: '#000000',
    imageSettings: {
      src: 'https://www.artd.pro/assets/draw1-Ce1WF34i.png',
      width: 40,
      height: 40,
      excavate: true
    } as ImageSettings
  })

  /**
   * 监听是否显示 logo
   * 根据状态动态设置二维码中心的 logo 图片
   */
  // Logic Note: Watcher keeps dependent state synchronized when observed sources change.
  watch(isShowLogo, (val) => {
    if (!val) {
      qrcodeConfig.imageSettings = {} as ImageSettings
    } else {
      qrcodeConfig.imageSettings = {
        src: 'https://www.artd.pro/assets/draw1-Ce1WF34i.png',
        width: 40,
        height: 40,
        excavate: true
      }
    }
  })
</script>
