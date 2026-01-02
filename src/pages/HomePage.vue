<script setup>
import { Content, Layout } from 'view-ui-plus'
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

        <div class="features">
          <div class="container">
            <h2>特色功能</h2>
            <div class="feature-cards">
              <div class="feature-card">
                <div class="feature-icon">📝</div>
                <h3>文章创作</h3>
                <p>简洁易用的编辑器，支持富文本和 Markdown，让创作更专注</p>
              </div>
              <div class="feature-card">
                <div class="feature-icon">💬</div>
                <h3>互动交流</h3>
                <p>评论系统和社区功能，与读者建立深度连接</p>
              </div>
              <div class="feature-card">
                <div class="feature-icon">📊</div>
                <h3>数据分析</h3>
                <p>详细的数据统计，了解文章表现和读者喜好</p>
              </div>
            </div>
          </div>
        </div>

        <div class="footer">
          <div class="container">
            <div class="footer-content">
              <div class="footer-section">
                <h4>关于我们</h4>
                <p>
                  LiliBlog
                  是一个专注于技术分享的平台，致力于为开发者提供高质量的技术文章和交流环境。
                </p>
              </div>
              <div class="footer-section">
                <h4>快速链接</h4>
                <ul>
                  <li><a href="#">首页</a></li>
                  <li><a href="#">文章列表</a></li>
                  <li><a href="#">关于</a></li>
                  <li><a href="#">联系</a></li>
                </ul>
              </div>
              <div class="footer-section">
                <h4>联系方式</h4>
                <p>邮箱：contact@liliblog.com</p>
                <p>微信：liliblog</p>
              </div>
            </div>
            <div class="copyright">
              <p>&copy; 2026 LiliBlog. 版权所有。</p>
            </div>
          </div>
        </div>
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
  background: linear-gradient(135deg, #74b9ff, #0984e3);
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

.feature-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.feature-card {
  background: white;
  border-radius: 8px;
  padding: 30px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 20px;
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

.articles {
  padding: 60px 20px;
}

.articles h2 {
  font-size: 2rem;
  margin-bottom: 30px;
  color: #2d3748;
  text-align: center;
}

.article-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 30px;
}

.article-card {
  display: flex;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
}

.article-card:hover {
  transform: translateY(-5px);
}

.article-image {
  width: 150px;
  min-height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
}

.article-info {
  padding: 20px;
  flex: 1;
}

.article-info h3 {
  margin: 0 0 10px 0;
  font-size: 1.3rem;
  color: #2d3748;
}

.article-meta {
  color: #718096;
  font-size: 0.9rem;
  margin-bottom: 10px;
}

.article-summary {
  color: #718096;
  line-height: 1.6;
}

.footer {
  background-color: #2d3748;
  color: white;
  padding: 40px 20px 20px;
  margin-top: 60px;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  margin-bottom: 30px;
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
