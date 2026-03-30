<template>
  <!-- Auto Comment: Component Summary: This component renders UI for '指标体征管理平台/src/components/business/comment-widget/widget/CommentItem.vue'. -->
  <!-- Auto Comment: Component Responsibility: It provides the view structure, interaction entry points, and display containers for this feature. -->
  <li>
    <div>
      <div class="flex-c">
        <div
          class="size-5 mr-2.5 text-xs font-medium text-white rounded-full flex-cc"
          :style="{ background: randomColor() }"
        >
          {{ comment.author.substring(0, 1) }}
        </div>
        <strong class="block text-sm font-medium">{{ comment.author }}</strong>
      </div>
      <span class="block mt-2.5 text-sm text-g-700">{{ comment.content }}</span>
      <div class="flex-c mt-2.5">
        <span class="text-xs text-g-700">{{ formatDate(comment.timestamp) }}</span>
        <div
          class="ml-5 text-xs text-g-700 c-p select-none hover:text-theme"
          @click="toggleReply(comment.id)"
        >
          回复
        </div>
      </div>
    </div>

    <ul class="pl-2.5" v-if="comment.replies.length > 0">
      <CommentItem
        v-for="reply in comment.replies"
        :key="reply.id"
        :comment="reply"
        :show-reply-form="showReplyForm"
        @toggle-reply="toggleReply"
        @add-reply="addReply"
        class="mt-5"
      />
    </ul>

    <ElForm v-if="showReplyForm === comment.id" @submit.prevent="handleSubmit" class="mt-4">
      <ElFormItem prop="author">
        <ElInput v-model="replyAuthor" placeholder="你的名称" clearable />
      </ElFormItem>
      <ElFormItem prop="content">
        <ElInput
          v-model="replyContent"
          placeholder="你的回复..."
          type="textarea"
          :rows="3"
          clearable
        />
      </ElFormItem>
      <ElFormItem>
        <div class="flex justify-end gap-2 w-full">
          <ElButton @click="toggleReply(comment.id)">取消</ElButton>
          <ElButton type="primary" @click="handleSubmit">发布</ElButton>
        </div>
      </ElFormItem>
    </ElForm>
  </li>
</template>

<script setup lang="ts">
  // Auto Comment: Component Script Notes: This script block manages state, events, and data flow for '指标体征管理平台/src/components/business/comment-widget/widget/CommentItem.vue'.
  // Auto Comment: Maintenance Hint: Keep business rules explicit and avoid implicit side effects between handlers.
  import AppConfig from '@/config'
  import { ref } from 'vue'

  interface Comment {
    id: number
    author: string
    content: string
    timestamp: string
    replies: Comment[]
  }

  const props = defineProps<{
    comment: Comment
    showReplyForm: number | null
  }>()

  const emit = defineEmits<{
    (event: 'toggle-reply', commentId: number): void
    (event: 'add-reply', commentId: number, replyAuthor: string, replyContent: string): void
  }>()

  // Logic Note: Reactive state 'replyAuthor' stores mutable runtime data used by this component.
  const replyAuthor = ref('')
  // Logic Note: Reactive state 'replyContent' stores mutable runtime data used by this component.
  const replyContent = ref('')

  // Logic Note: Handler 'toggleReply' encapsulates a single interaction or data-processing flow.
  const toggleReply = (commentId: number) => {
    emit('toggle-reply', commentId)
  }

  // Logic Note: Handler 'addReply' encapsulates a single interaction or data-processing flow.
  const addReply = (commentId: number, author: string, content: string) => {
    emit('add-reply', commentId, author, content)
    replyAuthor.value = ''
    replyContent.value = ''
  }
  // Logic Note: Handler 'handleSubmit' encapsulates a single interaction or data-processing flow.
  const handleSubmit = () => {
    if (!replyAuthor.value.trim() || !replyContent.value.trim()) {
      return
    }
    emit('add-reply', props.comment.id, replyAuthor.value, replyContent.value)
    replyAuthor.value = ''
    replyContent.value = ''
  }

  // Logic Note: Handler 'formatDate' encapsulates a single interaction or data-processing flow.
  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleString()
  }

  let lastColor: string | null = null

  // Logic Note: Handler 'randomColor' encapsulates a single interaction or data-processing flow.
  const randomColor = () => {
    let newColor: string

    do {
      const index = Math.floor(Math.random() * AppConfig.systemMainColor.length)
      newColor = AppConfig.systemMainColor[index]
    } while (newColor === lastColor)

    lastColor = newColor
    return newColor
  }
</script>
