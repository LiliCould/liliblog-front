import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useAxios } from '@/compositions/useAxios.js'
import { Notice } from 'view-ui-plus'

export const useArticleStore = defineStore('articleStore', () => {
  const articles = ref([])
  // 文章数量
  const articleLength = computed(() => articles.value.length)

  const articleApi =  useAxios('/api/public/articles')

  // 获取文章列表
  const getArticles = async () => {
    try {
      await articleApi.execute().then(() =>{
        if (articleApi.data.value.code === 200) {
          Notice.success({
            title: '成功',
            desc: articleApi.data.value.message,
            duration: 1,
          })
          articles.value = articleApi.data.value.data
        } else {
          Notice.error({
            title: '错误',
            desc: articleApi.data.value.message,
          })
        }
      })
    } catch ( error) {
      Notice.error({
        title: '错误',
        desc: error.message,
      })
    }
  }

  return {
    articles,
    articleLength,
    getArticles,
  }
})