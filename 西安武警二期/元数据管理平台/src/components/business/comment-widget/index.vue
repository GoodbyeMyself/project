<template>
  <!-- Auto Comment: Component Summary: This component renders UI for '元数据管理平台/src/components/business/comment-widget/index.vue'. -->
  <!-- Auto Comment: Component Responsibility: It provides the view structure, interaction entry points, and display containers for this feature. -->
  <div>
    <ElForm @submit.prevent="addComment" class="w-full mx-auto mb-10">
      <ElFormItem prop="author" class="mt-5">
        <ElInput
          v-model="newComment.author"
          placeholder="你的名称"
          class="block w-full"
          clearable
        />
      </ElFormItem>
      <ElFormItem prop="content">
        <ElInput
          v-model="newComment.content"
          placeholder="简单说两句..."
          type="textarea"
          :rows="5"
          clearable
        />
      </ElFormItem>
      <ElFormItem>
        <div class="flex justify-end w-full">
          <ElButton type="primary" @click="addComment"> 发布 </ElButton>
        </div>
      </ElFormItem>
    </ElForm>

    <ul>
      <div class="pb-5 text-lg font-medium"> 评论 {{ comments.length }} </div>
      <CommentItem
        v-for="comment in comments.slice().reverse()"
        :key="comment.id"
        :comment="comment"
        :show-reply-form="showReplyForm"
        @toggle-reply="toggleReply"
        @add-reply="addReply"
        class="pb-2.5 mb-5 border-b border-g-400"
      />
    </ul>
  </div>
</template>

<script setup lang="ts">
  // Auto Comment: Component Script Notes: This script block manages state, events, and data flow for '元数据管理平台/src/components/business/comment-widget/index.vue'.
  // Auto Comment: Maintenance Hint: Keep business rules explicit and avoid implicit side effects between handlers.
  import { ref } from 'vue'
  import CommentItem from './widget/CommentItem.vue'
  import { commentList, Comment } from '@/mock/temp/commentDetail'
  const comments = commentList

  // Logic Note: Reactive state 'newComment' stores mutable runtime data used by this component.
  const newComment = ref<Partial<Comment>>({
    author: '',
    content: ''
  })

  // Logic Note: Reactive state 'showReplyForm' stores mutable runtime data used by this component.
  const showReplyForm = ref<number | null>(null)

  // Logic Note: Handler 'addComment' encapsulates a single interaction or data-processing flow.
  const addComment = () => {
    if (!newComment.value.author?.trim() || !newComment.value.content?.trim()) {
      ElMessage.warning('请填写完整的评论信息')
      return
    }

    comments.value.push({
      id: Date.now(),
      author: newComment.value.author.trim(),
      content: newComment.value.content.trim(),
      timestamp: new Date().toISOString(),
      replies: []
    })

    newComment.value.author = ''
    newComment.value.content = ''
    ElMessage.success('评论发布成功')
  }

  // Logic Note: Handler 'addReply' encapsulates a single interaction or data-processing flow.
  const addReply = (commentId: number, replyAuthor: string, replyContent: string) => {
    if (!replyAuthor?.trim() || !replyContent?.trim()) {
      ElMessage.warning('请填写完整的回复信息')
      return
    }

    const comment = findComment(comments.value, commentId)
    if (comment) {
      comment.replies.push({
        id: Date.now(),
        author: replyAuthor.trim(),
        content: replyContent.trim(),
        timestamp: new Date().toISOString(),
        replies: []
      })
      showReplyForm.value = null
      ElMessage.success('回复发布成功')
    }
  }

  // Logic Note: Handler 'toggleReply' encapsulates a single interaction or data-processing flow.
  const toggleReply = (commentId: number) => {
    showReplyForm.value = showReplyForm.value === commentId ? null : commentId
  }

  // Logic Note: Handler 'findComment' encapsulates a single interaction or data-processing flow.
  const findComment = (comments: Comment[], commentId: number): Comment | undefined => {
    for (const comment of comments) {
      if (comment.id === commentId) {
        return comment
      }
      const found = findComment(comment.replies, commentId)
      if (found) {
        return found
      }
    }
    return undefined
  }
</script>
