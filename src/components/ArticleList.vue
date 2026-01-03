<script setup>
import { Card, Grid, GridItem, Modal } from 'view-ui-plus'
import { useArticleStore } from '@/stores/articleStore.js'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'

const articleStore = useArticleStore()

const { articles } = storeToRefs(articleStore)
const { articleLength, getArticles } = articleStore

const showDetail = () => {
  Modal.info({
    title: '文章详情',
    content: '文章详情',
  })
}

onMounted(async () => {
  await articleStore.getArticles()
})
</script>

<template>
  <div class="ivu-article-list">
    <Card
      v-for="article in articles"
      :key="article.id"
      @click="showDetail"
      class="ivu-article-card"
    >
      <template #title>
        {{ article.title }}
      </template>

      <!-- 文章摘要 -->
      <div class="article-summary">
        {{ article.summary }}
      </div>

      <!-- 文章元信息 -->
      <template #extra>
        <div class="article-meta">
          <span class="publish-time">{{ article.publishTime }}</span>
        </div>
      </template>
    </Card>
  </div>
</template>

<style scoped>
.ivu-article-card {
  min-width: 400px;
  margin: 10px auto;
  cursor: pointer;
}
</style>
