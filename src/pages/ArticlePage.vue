<script setup>
import { useRoute } from 'vue-router'
import { computed, onMounted } from 'vue'
import { useArticleStore } from '@/stores/articleStore.js'
import { storeToRefs } from 'pinia'
import { Card, Tag, Divider, Avatar, Icon } from 'view-ui-plus'

const route = useRoute()
const id = route.params.id // 获取路径参数

const articleStore = useArticleStore()
const { articles } = storeToRefs(articleStore)
const { getArticles } = articleStore

onMounted(async () => {
  await getArticles()
})

const article = computed(() => {
  return articles.value.find(article => article.id === parseInt(id))
})
</script>

<template>
  <div class="article-detail">
    <Card v-if="article" class="article-card">
      <template #title>
        <h1 class="article-title">{{ article.title }}</h1>
      </template>

      <template #extra>
        <div class="article-meta">
          <Tag v-if="article.isTop" color="red">置顶</Tag>
          <Tag v-if="article.isRecommend" color="blue">推荐</Tag>
          <Tag color="green">{{ article.categoryName || '未分类' }}</Tag>
          <Tag v-for="tag in article.tags" :key="tag.id" color="default">{{ tag.name }}</Tag>
        </div>
      </template>

      <div class="article-header">
        <div class="author-info">
          <Avatar size="large" class="author-avatar">{{ article.authorName?.charAt(0) }}</Avatar>
          <div class="author-details">
            <div class="author-name">{{ article.authorName || '未知作者' }}</div>
            <div class="publish-time">{{ article.publishTime }}</div>
          </div>
        </div>

        <div class="article-stats">
          <div class="stat-item">
            <Icon type="ios-eye" />
            <span>{{ article.viewCount }} 浏览</span>
          </div>
          <div class="stat-item">
            <Icon type="ios-thumbs-up" />
            <span>{{ article.likeCount }} 点赞</span>
          </div>
          <div class="stat-item">
            <Icon type="ios-chatbubbles" />
            <span>{{ article.commentCount }} 评论</span>
          </div>
        </div>
      </div>

      <Divider />

      <div class="article-summary" v-if="article.summary">
        <h3>摘要</h3>
        <p>{{ article.summary }}</p>
      </div>

      <div class="article-content" v-html="article.contentHtml"></div>

      <Divider />

      <div class="article-footer">
        <div class="publish-info">
          <p>发布时间: {{ article.publishTime }}</p>
          <p>更新时间: {{ article.updateTime }}</p>
        </div>
      </div>
    </Card>

    <Card v-else class="no-article">
      <div class="no-content">
        <Icon type="ios-filing" size="48" />
        <h3>文章不存在</h3>
        <p>未找到ID为 {{ id }} 的文章</p>
      </div>
    </Card>
  </div>
</template>

<style scoped>
.article-detail {
  max-width: 900px;
  margin: 20px auto;
  padding: 0 15px;
}

.article-card {
  border-radius: 8px;
  overflow: hidden;
}

.article-title {
  margin: 0;
  font-size: 28px;
  font-weight: bold;
  color: #333;
  text-align: center;
}

.article-meta {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.article-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  flex-wrap: wrap;
  gap: 15px;
}

.author-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.author-avatar {
  background-color: #2d8cf0;
  color: white;
  font-weight: bold;
}

.author-details {
  display: flex;
  flex-direction: column;
}

.author-name {
  font-weight: bold;
  color: #333;
}

.publish-time {
  font-size: 14px;
  color: #999;
}

.article-stats {
  display: flex;
  gap: 20px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 5px;
  color: #666;
}

.article-summary {
  margin: 20px 0;
  padding: 15px;
  background-color: #f8f9fa;
  border-left: 4px solid #2d8cf0;
  border-radius: 4px;
}

.article-summary h3 {
  margin-top: 0;
  color: #333;
}

.article-content {
  margin: 25px 0;
  line-height: 1.8;
  font-size: 16px;
  color: #444;
}

.article-content :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 6px;
  margin: 10px 0;
}

.article-content :deep(p) {
  margin: 15px 0;
}

.article-content :deep(h1),
.article-content :deep(h2),
.article-content :deep(h3),
.article-content :deep(h4),
.article-content :deep(h5),
.article-content :deep(h6) {
  margin: 20px 0 10px;
  color: #222;
}

.article-footer {
  margin-top: 20px;
}

.publish-info {
  color: #999;
  font-size: 14px;
}

.no-article {
  text-align: center;
  padding: 40px;
}

.no-content {
  color: #999;
}

.no-content h3 {
  margin: 15px 0;
  color: #666;
}

@media (max-width: 768px) {
  .article-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .article-stats {
    width: 100%;
    justify-content: center;
  }

  .article-title {
    font-size: 24px;
  }
}
</style>
