import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', () => {
  const isLogin = ref(false)

  return {
    isLogin,
  }
})
