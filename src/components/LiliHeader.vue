<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import LoginModal from '@/components/modals/LoginModal.vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/userStore.js'
import { Avatar, Button, Notice } from 'view-ui-plus'

// 获取当前路由信息
const route = useRoute()

// 根据路由信息确定当前激活的菜单项
const activeMenu = computed(() => {
  return route.name || 'home'
})

const { isLogin, user, token } = storeToRefs(useUserStore())
const { clear } = useUserStore()

const logout = () => {
  clear()
  Notice.success(
    {
      title: '退出成功',
      desc: '已退出登录',
    }
  )
}
</script>

<template>
  <div class="lili-header">
    <div class="header-content">
      <div class="logo">
        <router-link to="/">
          <h2>LiliBlog</h2>
        </router-link>
      </div>
      <div class="nav-menu">
        <ul>
          <li :class="{ active: activeMenu === 'home' }">
            <router-link to="/">首页</router-link>
          </li>
          <li :class="{ active: activeMenu === 'about' }">
            <router-link to="/about">关于</router-link>
          </li>
          <li :class="{ active: activeMenu === 'contact' }">
            <router-link to="/contact">联系</router-link>
          </li>
        </ul>
      </div>
      <div class="user-actions">
        <!--登录模态框，附带登录按钮 -->
        <LoginModal />
        <Button v-if="isLogin" type="error" @click="logout">退出</Button>
        <Avatar v-if="isLogin" style="color: #f56a00; background-color: #fde3cf">{{user.nickname?.slice(0, 1) }}</Avatar>
      </div>
    </div>
  </div>
</template>

<style scoped>
.lili-header {
  background-color: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  padding: 0 20px;
  position: relative;
  z-index: 100;
  border-bottom: 1px solid #eee;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  max-width: 1200px;
  margin: 0 auto;
}

.logo a {
  text-decoration: none;
  color: #409eff;
}

.logo h2 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
}

.nav-menu ul {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  align-items: center;
}

.nav-menu li {
  margin: 0 15px;
  position: relative;
}

.nav-menu li a {
  text-decoration: none;
  color: #515a6e;
  font-size: 14px;
  padding: 8px 0;
  transition: color 0.2s ease;
  position: relative;
}

.nav-menu li a:hover {
  color: #2d8cf0;
}

.nav-menu li.active a {
  color: #2d8cf0;
  font-weight: 500;
}

.nav-menu li.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background-color: #2d8cf0;
}

.user-actions {
  display: flex;
  gap: 10px;
}
</style>
