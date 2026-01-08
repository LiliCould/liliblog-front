<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import LoginModal from '@/components/modals/LoginModal.vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/userStore.js'
import { Avatar, Button, Icon, Notice } from 'view-ui-plus'

// 获取当前路由信息
const route = useRoute()

// 根据路由信息确定当前激活的菜单项
const activeMenu = computed(() => {
  return route.name || 'home'
})

const { isLogin, user, token } = storeToRefs(useUserStore())
const { clear } = useUserStore()

// 响应式布局相关
const isMobile = computed(()=>{
  return window.innerWidth < 769
})
const showMobileMenu = ref(false)

// 检测屏幕大小
const checkScreenSize = () => {
  isMobile.value = window.innerWidth < 769
}

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
}

onMounted(() => {
  checkScreenSize()
  window.addEventListener('resize', checkScreenSize)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize)
})

const logout = () => {
  clear()
  Notice.success({
    title: '退出成功',
    desc: '已退出登录',
  })
  showMobileMenu.value = false // 关闭移动端菜单
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

      <!-- 桌面端导航菜单 -->
      <div class="nav-menu">
        <ul>
          <li :class="{ active: activeMenu === 'home' }">
            <router-link to="/">
              <Icon type="md-home" />
              首页
            </router-link>
          </li>
          <li :class="{ active: activeMenu === 'add-article' }">
            <router-link to="/article/add">
              <Icon type="md-add" />
              发布文章
            </router-link>
          </li>
        </ul>
      </div>

      <!-- 移动端汉堡菜单按钮 -->
      <div class="mobile-menu-toggle" @click="toggleMobileMenu" v-if="isMobile">
        <Icon :type="showMobileMenu ? 'md-close' : 'md-menu'" />
      </div>

      <div class="user-actions">
        <!--登录模态框，附带登录按钮 -->
        <LoginModal />
        <Button v-if="isLogin" type="error" @click="logout">退出</Button>
        <Avatar v-if="isLogin" style="color: #f56a00; background-color: #fde3cf">
          {{ user.nickname?.slice(0, 1) }}
        </Avatar>
      </div>
    </div>

    <!-- 移动端下拉菜单 -->
    <div class="mobile-nav-menu" v-if="isMobile && showMobileMenu">
      <ul>
        <li :class="{ active: activeMenu === 'home' }">
          <router-link to="/" @click="showMobileMenu = false">
            <Icon type="md-home" />
            首页
          </router-link>
        </li>
        <li :class="{ active: activeMenu === 'add-article' }">
          <router-link to="/article/add" @click="showMobileMenu = false">
            <Icon type="md-add" />
            发布文章
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

li {
  display: flex;
  align-items: center;
  font-size: 14px;
  cursor: pointer;
  color: #515a6e;
  transition: color 0.2s ease;
  height: 50px;
}

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
  display: flex;
  align-items: center;
  gap: 5px;
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
  align-items: center;
}

/* 移动端特定样式 */
.mobile-menu-toggle {
  display: none;
  font-size: 24px;
  cursor: pointer;
  color: #515a6e;
  padding: 5px;
}

.mobile-nav-menu {
  display: none;
}

@media (max-width: 768px) {
  .header-content {
    height: 50px;
    padding: 0 15px;
  }

  .logo h2 {
    font-size: 18px;
  }

  .nav-menu {
    display: none;
  }

  .mobile-menu-toggle {
    display: block;
  }

  .mobile-nav-menu {
    display: block;
    position: absolute;
    top: 60px;
    left: 0;
    right: 0;
    background-color: white;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    z-index: 99;
  }

  .mobile-nav-menu ul {
    display: flex;
    flex-direction: column;
    padding: 10px 0;
  }

  .mobile-nav-menu li {
    margin: 0;
    padding: 8px 20px;
    border-bottom: 1px solid #eee;
  }

  .mobile-nav-menu li a {
    padding: 8px 0;
    color: #515a6e;
  }

  .user-actions {
    gap: 8px;
  }
}

@media (max-width: 480px) {
  .header-content {
    height: 45px;
  }

  .logo h2 {
    font-size: 16px;
  }

  .mobile-menu-toggle {
    font-size: 20px;
  }

  .user-actions {
    gap: 6px;
  }

  .mobile-nav-menu li {
    padding: 10px 15px;
  }
}

/* 桌面端中等屏幕 */
@media (min-width: 769px) and (max-width: 1024px) {
  .header-content {
    max-width: 1000px;
  }
}

/* 大屏幕优化 */
@media (min-width: 1201px) {
  .header-content {
    max-width: 1400px;
  }
}
</style>
