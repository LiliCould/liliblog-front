import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useAxios } from '@/compositions/useAxios.js'
import { Notice } from 'view-ui-plus'

export const useArticleStore = defineStore('articleStore', () => {
  const articles = ref([])
  // 文章数量
  const articleLength = computed(() => articles.value.length)

  const articlesApi =  useAxios('/api/public/articles')

  // 获取文章列表
  const getArticles = async (content={}) => {
    try {
      await articlesApi.execute().then(() =>{
        if (articlesApi.data.value.code === 200) {
          articles.value = articlesApi.data.value.data
        } else {
          Notice.error({
            title: '错误',
            desc: articlesApi.data.value.message,
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

  const articleApi =  useAxios('/api/article')

  // 增加文章，方式为POST
  const addArticle = async (article) => {
    try {
      await articleApi.execute(null, {
        method: 'POST',
        data: article,
      }).then(() =>{
        if (articleApi.data.value.code === 200) {
          Notice.success({
            title: '成功',
            desc: articleApi.data.value.message,
          })
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

    addArticle,
  }
})