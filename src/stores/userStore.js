import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', () => {
  const isLogin = ref(false)

  const token = ref( '')
  token.value = localStorage.getItem('token')

  const user = ref({
    username: '',
    email: '',
    nickname: '',
    avatar: '',
    lastLoginTeme: '',
    createdTime: '',
  })

  const clear = () => {
    localStorage.removeItem('token')
    isLogin.value = false
    token.value = ''
    user.value = {}
  }

  return {
    isLogin,
    user,
    token,
    clear
  }
},{
  persist: {
    key: 'user',
    storage: localStorage,
  },
})
