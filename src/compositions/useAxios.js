import { ref } from 'vue'
import axios from 'axios'
import { useUserStore } from '@/stores/userStore.js'


export function useAxios(url, options = {}) {
  const userStore = useUserStore()
  // 设置baseURL
  // 根据环境动态设置 baseURL
  if (import.meta.env.DEV) {
    // 开发环境使用相对路径，让 Vite 代理处理
    axios.defaults.baseURL = ''
  } else {
    // 生产环境使用实际服务器地址
    axios.defaults.baseURL = 'https://lilicould.cn:8888'
  }

  axios.interceptors.request.use((config) => {
    const token = userStore.token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })

  // 响应式数据：存储请求返回的数据
  const data = ref(null)
  // 响应式数据：存储请求过程中的错误信息
  const error = ref(null)
  // 响应式数据：标识请求是否正在进行中
  const loading = ref(false)
  // 响应式数据：存储完整的响应对象
  const response = ref(null)

  // 执行请求
  const execute = async (customUrl, customOptions = {}) => {
    // 设置加载状态为 true
    loading.value = true
    // 清空错误状态
    error.value = null

    try {
      // 优先使用自定义 URL，否则使用传入的默认 URL
      const requestUrl = customUrl || url

      const defaultHeaders = {
        'Content-Type': 'application/json',
      }

      // 合并请求头：优先级 customOptions.headers > options.headers > defaultHeaders
      const mergedHeaders = {
        ...defaultHeaders,
        ...options.headers,
        ...customOptions.headers,
      }

      // 合并其他选项，但单独处理 headers
      const requestOptions = {
        method: 'GET', // 默认方法
        ...options,
        ...customOptions,
        headers: mergedHeaders,
        timeout: 15000, // 默认超时时间
      }

      // 发送 HTTP 请求并等待响应
      const result = await axios(requestUrl, requestOptions)
      // 将响应数据赋值给 data 引用
      data.value = result.data
      // 将完整响应对象赋值给 response 引用
      response.value = result
    } catch (err) {
      // 捕获并存储错误信息
      error.value = err
      // 抛出错误以便调用者处理
      throw err
    } finally {
      // 设置加载状态为 false
      loading.value = false
    }
  }

  // 返回响应式数据和方法对象
  return {
    data, // 响应式数据：请求返回的数据
    error, // 响应式数据：错误信息
    loading, // 响应式数据：加载状态
    response, // 响应式数据：完整响应对象
    execute, // 方法：手动执行请求
  }
}
