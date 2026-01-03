<script setup>
import { Content, Layout, List } from 'view-ui-plus'
import ArticleList from '@/components/ArticleList.vue'
</script>

<template>
  <div class="home-page">
    <Layout class="layout">
      <Content class="content">
        <div class="banner">
          <div class="banner-content">
            <h1>欢迎来到 LiliBlog</h1>
            <p>分享知识，记录生活，发现更广阔的世界</p>
            <div class="banner-buttons">
              <button class="btn-primary">开始探索</button>
              <button class="btn-secondary">了解更多</button>
            </div>
          </div>
        </div>


        <ArticleList />

      </Content>
    </Layout>
  </div>
</template>

<style scoped>
.home-page {
  min-height: 100vh;
}

.layout {
  min-height: 100vh;
}

.content {
  min-height: calc(100vh - 60px);
}

.banner {
  background: #5cadff;
  color: white;
  padding: 80px 20px;
  text-align: center;
}

.banner-content h1 {
  font-size: 2.5rem;
  margin-bottom: 15px;
}

.banner-content p {
  font-size: 1.2rem;
  margin-bottom: 30px;
  opacity: 0.9;
}

.banner-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.btn-primary,
.btn-secondary {
  padding: 12px 30px;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
}

.btn-primary {
  background-color: #fff;
  color: #0984e3;
  font-weight: bold;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.btn-secondary {
  background-color: transparent;
  color: #fff;
  border: 2px solid white;
}

.btn-secondary:hover {
  background-color: white;
  color: #0984e3;
}

.features {
  padding: 60px 20px;
  background-color: #f8f9fa;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.features h2 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 40px;
  color: #2d3748;
}



.feature-card h3 {
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: #2d3748;
}

.feature-card p {
  color: #718096;
  line-height: 1.6;
}


.footer-section h4 {
  margin-bottom: 15px;
  color: #a0aec0;
}

.footer-section ul {
  list-style: none;
  padding: 0;
}

.footer-section ul li {
  margin-bottom: 8px;
}

.footer-section ul li a {
  color: #cbd5e0;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-section ul li a:hover {
  color: white;
}

.copyright {
  text-align: center;
  padding-top: 20px;
  border-top: 1px solid #4a5568;
  color: #a0aec0;
  max-width: 1200px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .banner-content h1 {
    font-size: 2rem;
  }

  .banner-buttons {
    flex-direction: column;
    align-items: center;
  }

  .article-list {
    grid-template-columns: 1fr;
  }

  .article-card {
    flex-direction: column;
  }

  .article-image {
    width: 100%;
    height: 150px;
  }
}
</style>
