<!-- 文章详情页面 -->
<template>
  <!-- Auto Comment: Component Summary: This component renders UI for '数据共享交换平台/src/views/article/detail/index.vue'. -->
  <!-- Auto Comment: Component Responsibility: It provides the view structure, interaction entry points, and display containers for this feature. -->
  <div class="article-detail page-content">
    <div class="max-w-200 m-auto mt-15">
      <h1 class="text-3xl font-semibold">{{ articleTitle }}</h1>
      <div class="markdown-body mt-12.5" v-highlight v-html="articleHtml"></div>
    </div>
    <ArtBackToTop />
  </div>
</template>

<script setup lang="ts">
  // Auto Comment: Component Script Notes: This script block manages state, events, and data flow for '数据共享交换平台/src/views/article/detail/index.vue'.
  // Auto Comment: Maintenance Hint: Keep business rules explicit and avoid implicit side effects between handlers.
  import '@/assets/styles/core/md.scss'
  import '@/assets/styles/custom/one-dark-pro.scss'
  import { useCommon } from '@/hooks/core/useCommon'
  import axios from 'axios'

  defineOptions({ name: 'ArticleDetail' })

  interface ArticleResponse {
    code: number
    data: {
      title: string
      html_content: string
    }
  }

  const route = useRoute()
  // Logic Note: Computed value 'articleId' derives UI state from reactive sources and updates automatically.
  const articleId = computed(() => Number(route.params.id))
  // Logic Note: Reactive state 'articleTitle' stores mutable runtime data used by this component.
  const articleTitle = ref('')
  // Logic Note: Reactive state 'articleHtml' stores mutable runtime data used by this component.
  const articleHtml = shallowRef('')
  // Logic Note: Reactive state 'loading' stores mutable runtime data used by this component.
  const loading = ref(false)
  // Logic Note: Reactive state 'error' stores mutable runtime data used by this component.
  const error = ref<string | null>(null)

  // Logic Note: Handler 'getArticleDetail' encapsulates a single interaction or data-processing flow.
  const getArticleDetail = async () => {
    if (!articleId.value) return

    loading.value = true
    error.value = null

    try {
      const { data } = await axios.get<ArticleResponse>(
        'https://www.qiniu.lingchen.kim/blog_detail.json'
      )

      if (data.code === 200) {
        articleTitle.value = data.data.title
        articleHtml.value = data.data.html_content
      }
    } catch (err) {
      error.value = '文章加载失败'
      console.error('获取文章详情失败:', err)
    } finally {
      loading.value = false
    }
  }

  const { scrollToTop } = useCommon()

  onMounted(() => {
    scrollToTop()
    getArticleDetail()
  })
</script>

<style lang="scss" scoped>
  /* Auto Comment: Component Style Notes: Styles in this block define visual layout and interaction feedback for '数据共享交换平台/src/views/article/detail/index.vue'. */
  /* Auto Comment: Consistency Rule: Preserve spacing rhythm, typography hierarchy, and state visibility across breakpoints. */
  .article-detail {
    :deep(.markdown-body) {
      margin-top: 60px;

      img {
        width: 100%;
        border: 1px solid var(--art-gray-200);
      }

      pre {
        position: relative;

        &:hover {
          .copy-button {
            opacity: 1;
          }
        }

        &::before {
          position: absolute;
          top: 0;
          left: 50px;
          width: 1px;
          height: 100%;
          content: '';
          background: #0a0a0e;
        }
      }

      .code-wrapper {
        overflow-x: auto;
      }

      .line-number {
        position: sticky;
        left: 0;
        z-index: 2;
        box-sizing: border-box;
        display: inline-block;
        width: 50px;
        margin-right: 10px;
        font-size: 14px;
        color: #9e9e9e;
        text-align: center;
      }

      .copy-button {
        position: absolute;
        top: 6px;
        right: 6px;
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        font-size: 20px;
        line-height: 40px;
        color: #999;
        text-align: center;
        cursor: pointer;
        background-color: #000;
        border: none;
        border-radius: 8px;
        opacity: 0;
        transition: all 0.2s;
      }
    }
  }
</style>
