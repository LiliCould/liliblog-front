import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getChatMessages } from '@/api/public'
import { getToken } from '@/utils/storage'

interface Message {
  id?: number
  senderId?: number
  senderUsername?: string
  senderName?: string
  senderAvatar?: string
  content: string
  type: string
  parentId?: number
  ipAddress?: string
  createTime?: string
}

interface SendMessage {
  content: string
  type: string
  parentId: number
}

export const useChatStore = defineStore('chat', () => {
  const ws = ref<WebSocket | null>(null)
  const messages = ref<Message[]>([])
  const isConnected = ref(false)
  const isLoading = ref(false)
  const hasMore = ref(true)
  const unreadCount = ref(0)
  const reconnectTimeout = ref<number | null>(null)
  const isConnecting = ref(false)

  // 根据环境变量生成 WebSocket 地址
  const getWsUrl = (): string => {
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
    if (apiBaseUrl) {
      // 将 http:// 或 https:// 替换为 ws:// 或 wss://
      return apiBaseUrl.replace(/^http/, 'ws') + '/ws/chat'
    }
    // 开发环境默认地址
    return 'ws://localhost:8080/ws/chat'
  }
  const wsUrl = ref(getWsUrl())

  const chatMessages = computed(() => {
    return messages.value.filter(msg => msg.type !== 'SYSTEM')
  })

  function initialize() {
    if (ws.value && ws.value.readyState === WebSocket.OPEN) {
      return
    }

    connectWebSocket()
    loadInitialMessages()
  }

  function connectWebSocket() {
    if (isConnecting.value || (ws.value && ws.value.readyState === WebSocket.OPEN)) {
      return
    }

    const token = getToken()
    if (!token) {
      console.log('No token found, cannot connect to WebSocket')
      isConnected.value = false
      return
    }

    try {
      isConnecting.value = true
      const url = `${wsUrl.value}?token=${token}`
      ws.value = new WebSocket(url)

      ws.value.onopen = () => {
        console.log('WebSocket connected')
        isConnected.value = true
        isConnecting.value = false
        if (reconnectTimeout.value) {
          clearTimeout(reconnectTimeout.value)
          reconnectTimeout.value = null
        }
      }

      ws.value.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data) as Message
          messages.value.push(message)
        } catch (error) {
          console.error('Failed to parse WebSocket message:', error)
        }
      }

      ws.value.onclose = () => {
        console.log('WebSocket disconnected')
        isConnected.value = false
        isConnecting.value = false
        scheduleReconnect()
      }

      ws.value.onerror = (error) => {
        console.error('WebSocket error:', error)
        isConnected.value = false
        isConnecting.value = false
      }
    } catch (error) {
      console.error('Failed to create WebSocket connection:', error)
      isConnected.value = false
      isConnecting.value = false
    }
  }

  function scheduleReconnect() {
    if (reconnectTimeout.value) {
      clearTimeout(reconnectTimeout.value)
    }

    reconnectTimeout.value = window.setTimeout(() => {
      console.log('Attempting to reconnect...')
      connectWebSocket()
    }, 3000)
  }

  async function loadInitialMessages() {
    try {
      isLoading.value = true
      const response = await getChatMessages()
      messages.value = response.data?.data || []
      hasMore.value = messages.value.length >= 50
    } catch (error) {
      console.error('Failed to load initial messages:', error)
      messages.value = []
      hasMore.value = false
    } finally {
      isLoading.value = false
    }
  }

  async function loadMoreMessages() {
    if (isLoading.value || !hasMore.value) return

    try {
      isLoading.value = true
      const oldestMessage = messages.value.find(msg => msg.id)
      if (!oldestMessage || !oldestMessage.id) {
        hasMore.value = false
        return
      }

      const response = await getChatMessages(oldestMessage.id)
      const newMessages = response.data?.data || []
      
      if (newMessages.length < 50) {
        hasMore.value = false
      }

      messages.value = [...newMessages, ...messages.value]
    } catch (error) {
      console.error('Failed to load more messages:', error)
    } finally {
      isLoading.value = false
    }
  }

  function sendMessage(message: SendMessage) {
    if (!ws.value || ws.value.readyState !== WebSocket.OPEN) {
      console.error('WebSocket is not connected')
      return
    }

    try {
      ws.value.send(JSON.stringify(message))
    } catch (error) {
      console.error('Failed to send message:', error)
    }
  }

  async function updateReadPosition() {
    // 接口不可用，暂时空实现
    console.log('Update read position not available')
  }

  async function getUnreadCount() {
    // 接口不可用，暂时空实现
    console.log('Get unread count not available')
  }

  function closeConnection() {
    if (ws.value) {
      ws.value.close()
      ws.value = null
    }

    if (reconnectTimeout.value) {
      clearTimeout(reconnectTimeout.value)
      reconnectTimeout.value = null
    }

    isConnected.value = false
    isConnecting.value = false
  }

  return {
    messages,
    chatMessages,
    isConnected,
    isLoading,
    hasMore,
    unreadCount,
    initialize,
    loadMoreMessages,
    sendMessage,
    updateReadPosition,
    getUnreadCount,
    closeConnection
  }
})
