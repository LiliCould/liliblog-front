<template>
  <div class="chat-room-view">
    <AppHeader />
    <div class="chat-room-container">
      <div class="chat-room-header">
        <h1 class="chat-room-title">✨ 聊天室 ✨</h1>
        <div class="status-bar">
          <span class="status-text">
            <span class="status-dot" :class="{ 'connected': chatStore.isConnected }">
              {{ chatStore.isConnected ? '✨' : '○' }}
            </span>
            {{ chatStore.isConnected ? '已连接' : '连接中...' }}
          </span>
        </div>
      </div>

      <div class="chat-room-content">
        <!-- 侧边栏：在线人数和在线用户 -->
        <div class="chat-sidebar">
          <div class="sidebar-section">
            <h3 class="sidebar-title">👥 在线用户</h3>
            <div class="online-count">
              <span class="count-label">在线人数：</span>
              <span class="count-value">{{ onlineUsers.length }}</span>
            </div>
            <div class="online-users">
              <div v-for="user in onlineUsers" :key="user.id" class="online-user">
                <el-avatar :size="32" :src="user.avatar || 'https://lilicould.cn/xiaodingdang.png'" class="user-avatar">
                  {{ user.name?.charAt(0) || 'U' }}
                </el-avatar>
                <span class="user-name">{{ user.name }}</span>
              </div>
              <div v-if="onlineUsers.length === 0" class="no-online-users">
                暂无在线用户
              </div>
            </div>
          </div>
        </div>

        <!-- 消息区域 -->
        <div class="chat-main">
          <div class="messages-container" ref="messagesContainer" @scroll="handleScroll">
            <div v-if="chatStore.isLoading" class="loading-message">
              <el-icon class="loading-icon">
                <Loading />
              </el-icon>
              加载历史消息...
            </div>

            <div v-for="message in chatStore.messages" :key="message.id || message.content" class="message-item" :class="{
              'system-message': message.type === 'SYSTEM',
              'own-message': message.senderUsername === userStore.username
            }">
              <div v-if="message.type !== 'SYSTEM'" class="message-avatar">
                <el-avatar :size="36" :src="message.senderAvatar || 'https://lilicould.cn/xiaodingdang.png'">
                  {{ message.senderName?.charAt(0) || 'U' }}
                </el-avatar>
              </div>

              <div v-if="message.type === 'SYSTEM'" class="system-content">
                {{ message.content }}
              </div>
              <div v-else class="message-content-wrapper">
                <div class="message-header">
                  <span class="sender-name">{{ message.senderName }}</span>
                  <span class="message-time">{{ formatMessageTime(message.createTime) }}</span>
                </div>
                <div class="message-content">{{ message.content }}</div>
              </div>
            </div>
          </div>

          <!-- 输入区域 -->
          <div class="input-area">
            <el-input v-model="inputMessage" placeholder="输入消息..." @keyup.enter="sendMessage"
              :disabled="!chatStore.isConnected" class="message-input" :class="{ 'has-content': inputMessage.trim() }">
              <template #append>
                <el-button type="primary" @click="sendMessage"
                  :disabled="!chatStore.isConnected || !inputMessage.trim()" class="send-button"
                  :class="{ 'can-send': chatStore.isConnected && inputMessage.trim() }">
                  🚀 发送
                </el-button>
              </template>
            </el-input>
          </div>
        </div>
      </div>
    </div>
    <MobileNav />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { Loading } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/user'
import { useChatStore } from '@/stores/chat'
import { formatMessageTime } from '@/utils/format'
import AppHeader from '@/components/layout/AppHeader.vue'
import MobileNav from '@/components/layout/MobileNav.vue'

const messagesContainer = ref<HTMLElement>()
const inputMessage = ref('')
const onlineUsers = ref<any[]>([])

const userStore = useUserStore()
const chatStore = useChatStore()

function sendMessage() {
  const content = inputMessage.value.trim()
  if (!content || !chatStore.isConnected) return

  chatStore.sendMessage({
    content,
    type: 'TEXT',
    parentId: 0
  })

  inputMessage.value = ''
  scrollToBottom()
}

function handleScroll() {
  const container = messagesContainer.value
  if (!container) return

  if (container.scrollTop === 0 && chatStore.hasMore && !chatStore.isLoading) {
    chatStore.loadMoreMessages()
  }
}

function scrollToBottom() {
  nextTick(() => {
    const container = messagesContainer.value
    if (container) {
      container.scrollTop = container.scrollHeight
    }
  })
}


// 监听消息变化，滚动到底部
watch(() => chatStore.messages, () => {
  scrollToBottom()
}, { deep: true })

// 初始化聊天房间
onMounted(() => {
  chatStore.initialize()
  chatStore.updateReadPosition()
  // 模拟在线用户数据，实际应从后端获取
  onlineUsers.value = [
    { id: 1, name: '张三', avatar: 'https://example.com/avatar1.jpg' },
    { id: 2, name: '李四', avatar: 'https://example.com/avatar2.jpg' },
    { id: 3, name: '王五', avatar: '' }
  ]
})

onUnmounted(() => {
  chatStore.closeConnection()
})
</script>

<style scoped>
.chat-room-view {
  min-height: 100vh;
  height: 100vh;
  background: #f0f0f0;
  font-family: 'Noto Sans SC', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.chat-room-container {
  flex: 1;
  padding: 16px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  overflow: hidden;
}

.chat-room-header {
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 2px solid rgba(255, 105, 180, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.chat-room-title {
  font-size: 20px;
  font-weight: 700;
  color: #ff69b4;
  margin: 0;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
  animation: sparkle 2s infinite;
}

@keyframes sparkle {

  0%,
  100% {
    text-shadow: 1px 1px 2px rgba(255, 105, 180, 0.5);
  }

  50% {
    text-shadow: 2px 2px 4px rgba(255, 105, 180, 0.8), 0 0 10px rgba(255, 105, 180, 0.3);
  }
}

.status-bar {
  font-size: 12px;
  color: #666;
  display: flex;
  align-items: center;
}

.status-text {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 20px;
  border: 1px solid rgba(255, 105, 180, 0.3);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.status-dot {
  font-size: 10px;
  transition: all 0.3s;
  animation: pulse 2s infinite;
}

.status-dot.connected {
  color: #ff69b4;
  animation: twinkle 1s infinite;
}

@keyframes pulse {
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.5;
  }

  100% {
    opacity: 1;
  }
}

@keyframes twinkle {

  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }

  50% {
    opacity: 0.7;
    transform: scale(1.1);
  }
}

.chat-room-content {
  display: flex;
  gap: 16px;
  flex: 1;
  min-height: 350px;
  overflow: hidden;
}

.chat-sidebar {
  width: 240px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 16px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  padding: 20px;
  overflow-y: auto;
  transition: all 0.3s;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 105, 180, 0.1);
}

.sidebar-section {
  margin-bottom: 20px;
}

.sidebar-title {
  font-size: 14px;
  font-weight: 600;
  color: #ff69b4;
  margin-bottom: 12px;
  padding-bottom: 6px;
  border-bottom: 1px solid rgba(255, 105, 180, 0.2);
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.05);
}

.online-count {
  margin-bottom: 12px;
  font-size: 13px;
  color: #666;
  font-weight: 500;
}

.count-value {
  font-weight: 600;
  color: #ff69b4;
  background: rgba(255, 105, 180, 0.1);
  padding: 2px 8px;
  border-radius: 12px;
  margin-left: 8px;
  border: 1px solid rgba(255, 105, 180, 0.3);
}

.online-users {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.online-user {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  border-radius: 12px;
  transition: all 0.3s;
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(255, 105, 180, 0.1);
}

.online-user:hover {
  background: rgba(255, 105, 180, 0.05);
  transform: translateX(5px);
  box-shadow: 0 2px 8px rgba(255, 105, 180, 0.1);
}

.user-avatar {
  transition: all 0.3s;
  border: 2px solid rgba(255, 105, 180, 0.2);
}

.online-user:hover .user-avatar {
  transform: scale(1.1) rotate(5deg);
  border-color: rgba(255, 105, 180, 0.5);
}

.user-name {
  font-size: 13px;
  color: #333;
  font-weight: 500;
  flex: 1;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.05);
}

.no-online-users {
  font-size: 13px;
  color: #999;
  text-align: center;
  padding: 20px 0;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 12px;
  border: 1px dashed rgba(255, 105, 180, 0.2);
}

.chat-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 16px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: all 0.3s;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 105, 180, 0.1);
  min-height: 0;
}

.messages-container {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  scroll-behavior: smooth;
  background-color: rgba(255, 255, 255, 0.9);
}

.messages-container::-webkit-scrollbar {
  width: 8px;
}

.messages-container::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.5);
  border-radius: 4px;
}

.messages-container::-webkit-scrollbar-thumb {
  background: rgba(255, 105, 180, 0.3);
  border-radius: 4px;
  border: 2px solid rgba(255, 255, 255, 0.8);
}

.messages-container::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 105, 180, 0.5);
}

.loading-message {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 0;
  color: #666;
  font-size: 13px;
  gap: 8px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 12px;
  margin: 10px 0;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.loading-icon {
  font-size: 14px;
  animation: spin 1s linear infinite;
  color: #ff69b4;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.message-item {
  margin-bottom: 16px;
  display: flex;
  align-items: flex-end;
  gap: 10px;
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.message-item.system-message {
  align-items: center;
  margin: 12px 0;
  justify-content: center;
}

.system-content {
  background: transparent;
  color: #999;
  padding: 4px 12px;
  border-radius: 0;
  font-size: 12px;
  box-shadow: none;
  border: none;
  backdrop-filter: none;
  text-align: center;
  font-style: italic;
}

.message-item.own-message {
  flex-direction: row-reverse;
}

.message-avatar {
  flex-shrink: 0;
  transition: all 0.3s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.message-item:hover .message-avatar {
  transform: scale(1.1) rotate(5deg);
}

.message-content-wrapper {
  max-width: 70%;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 16px;
  padding: 10px 14px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s;
  position: relative;
  border: 1px solid rgba(255, 105, 180, 0.1);
  backdrop-filter: blur(5px);
}

.message-item.own-message .message-content-wrapper {
  background: rgba(255, 105, 180, 0.1);
  color: #333;
  border-color: rgba(255, 105, 180, 0.3);
  box-shadow: 0 2px 8px rgba(255, 105, 180, 0.15);
}

.message-content-wrapper:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.message-item.own-message .message-content-wrapper:hover {
  box-shadow: 0 4px 12px rgba(255, 105, 180, 0.2);
}

.message-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
  font-size: 11px;
}

.sender-name {
  font-weight: 600;
  color: #ff69b4;
  font-size: 12px;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.05);
}

.message-item.own-message .sender-name {
  color: #333;
}

.message-time {
  color: #999;
  margin-left: 10px;
  font-size: 10px;
}

.message-content {
  font-size: 14px;
  line-height: 1.5;
  word-break: break-word;
  white-space: pre-wrap;
  color: #333;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.05);
}

.input-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 10px;
  border-top: 1px solid rgba(255, 105, 180, 0.2);
  background: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  transition: all 0.3s;
  font-size: 12px;
  color: #ff69b4;
  font-weight: 500;
}

.input-toggle:hover {
  background: rgba(255, 105, 180, 0.1);
  transform: translateY(-1px);
  box-shadow: 0 2px 5px rgba(255, 105, 180, 0.1);
}

.input-area {
  padding: 16px 20px;
  border-top: 1px solid rgba(255, 105, 180, 0.2);
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease-in-out;
  animation: slideDown 0.3s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.message-input {
  border-radius: 20px;
  border: 1px solid rgba(255, 105, 180, 0.3);
  transition: all 0.3s;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.message-input:focus {
  border-color: #ff69b4;
  box-shadow: 0 0 0 3px rgba(255, 105, 180, 0.1);
  background: rgba(255, 255, 255, 0.95);
}

.message-input.has-content {
  border-color: #ff69b4;
  box-shadow: 0 0 0 2px rgba(255, 105, 180, 0.08);
}

.send-button {
  border-radius: 20px;
  font-weight: 500;
  transition: all 0.3s;
  min-width: 80px;
  background: rgba(255, 105, 180, 0.1);
  border: 1px solid rgba(255, 105, 180, 0.3);
  color: #ff69b4;
}

.send-button.can-send {
  background: linear-gradient(135deg, #ff69b4, #ff85c2);
  border-color: #ff69b4;
  color: #fff;
  box-shadow: 0 4px 12px rgba(255, 105, 180, 0.3);
  animation: buttonPulse 2s infinite;
}

@keyframes buttonPulse {

  0%,
  100% {
    box-shadow: 0 4px 12px rgba(255, 105, 180, 0.3);
  }

  50% {
    box-shadow: 0 6px 16px rgba(255, 105, 180, 0.5);
  }
}

.send-button.can-send:hover {
  background: linear-gradient(135deg, #ff5aa8, #ff70b0);
  border-color: #ff5aa8;
  box-shadow: 0 6px 16px rgba(255, 105, 180, 0.4);
  transform: translateY(-2px);
}

.send-button:disabled {
  background: rgba(255, 255, 255, 0.7);
  border-color: #ddd;
  color: #999;
  box-shadow: none;
  cursor: not-allowed;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .chat-sidebar {
    width: 200px;
    padding: 16px;
  }
}

@media (max-width: 768px) {
  .chat-room-view {
    padding: 0;
  }

  .chat-room-container {
    padding: 10px;
  }

  .chat-room-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    margin-bottom: 12px;
    padding: 10px 12px;
  }

  .chat-room-title {
    font-size: 18px;
  }

  .chat-room-content {
    flex-direction: column;
    flex: 1;
    gap: 12px;
  }

  .chat-sidebar {
    width: 100%;
    height: 140px;
    padding: 14px;
  }

  .sidebar-title {
    font-size: 13px;
    margin-bottom: 10px;
  }

  .online-user {
    padding: 6px 8px;
  }

  .chat-main {
    flex: 1;
  }

  .messages-container {
    padding: 16px;
  }

  .message-item {
    margin-bottom: 12px;
    gap: 8px;
  }

  .message-avatar {
    size: 32px;
  }

  .message-content-wrapper {
    max-width: 75%;
    padding: 8px 12px;
  }

  .input-area {
    padding: 12px 16px;
  }

  .send-button {
    min-width: 70px;
    font-size: 12px;
  }
}

@media (max-width: 480px) {
  .chat-room-title {
    font-size: 16px;
  }

  .chat-sidebar {
    height: 120px;
  }

  .message-content-wrapper {
    max-width: 80%;
  }

  .messages-container {
    padding: 12px;
  }
}
</style>