<script setup>
import { Header, Card, Footer, Layout, Content } from 'view-ui-plus'
import LiliHeader from '@/components/LiliHeader.vue'
</script>

<template>
  <div class="layout">
    <Layout>
      <Header>
        <LiliHeader />
      </Header>

      <Content :style="{ padding: '0 50px' }">
        <Card>
          <router-view v-slot="{ Component }">
            <keep-alive :include="['AddArticlePage']">
              <component :is="Component" />
            </keep-alive>
          </router-view>
        </Card>
      </Content>

      <Footer class="layout-footer-center">
        <p>Copyright &copy; 2025-{{ new Date().getFullYear() }} LiliCould</p>
        <p>
          Powered by
          <a href="https://github.com/LiliCould" target="_blank">LiliCould</a>
        </p>
        <p><a href="https://beian.miit.gov.cn" target="_blank">赣ICP备2025078204号-1</a></p>
      </Footer>
    </Layout>
  </div>
</template>

<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}

/* 导航栏底色 */
.layout .ivu-layout-header {
  background: #f8f8f9;
}

.layout-footer-center {
  text-align: center;
}

.layout-footer-center a {
  color: #333;
  text-decoration: none;
  transition: color 0.3s;
  &:hover {
    color: #666;
  }
}
</style>