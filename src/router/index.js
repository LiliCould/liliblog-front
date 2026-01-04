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
      path: '/about',
      name: 'about',
      component: () => import('@/pages/AboutUs.vue'),
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('@/pages/ContactUs.vue'),
    },
    {
      path: '/*',
      redirect: '/',
    },
  ],
})

export default router
