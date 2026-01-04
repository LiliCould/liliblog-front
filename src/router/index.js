import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/pages/HomePage.vue'),
    },
    {
      path: '/article/:id',
      name: 'article',
      component: () => import('@/pages/ArticlePage.vue'),
      props: true,
    },
    {
      path: '/article/add',
      name: 'add-article',
      component: () => import('@/pages/AddArticlePage.vue'),
    },
    {
      path: '/*',
      redirect: '/',
    },
  ],
})

export default router
