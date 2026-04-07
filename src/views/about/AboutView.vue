<template>
  <div class="about-page page-container">
    <!-- 背景效果 -->
    <div class="about-background">
      <div class="bg-particles"></div>
    </div>

    <div class="about-header">
      <h1 class="about-title">关于我</h1>
      <p class="about-subtitle">Java 后端开发</p>
    </div>

    <div class="about-content">
      <!-- 个人信息卡片 -->
      <div class="about-card personal-card">
        <div class="about-avatar">
          <img src="/xiaodingdang.png" alt="个人头像" />
          <div class="avatar-glow"></div>
        </div>

        <div class="about-info">
          <h2 class="about-name">立里可</h2>
          <p class="about-desc">Java 后端开发</p>
          <div class="info-items">
            <div class="info-item">
              <el-icon class="info-icon">
                <Message />
              </el-icon>
              <span>lilicould@qq.com</span>
            </div>
            <div class="info-item">
              <el-icon class="info-icon">
                <School />
              </el-icon>
              <span>大学本科 | 华东交通大学</span>
            </div>
          </div>
          <div class="social-links">
            <a href="https://github.com/lilicould" class="social-link" title="GitHub" target="_blank">
              <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub"
                class="social-icon" />
            </a>
            <a href="https://lilicould.cn" class="social-link" title="博客主页" target="_blank">
              <img src="/favicon.svg" alt="博客主页" class="social-icon" />
            </a>
          </div>
        </div>
      </div>

      <!-- 技能栈卡片 -->
      <div class="about-card skills-card">
        <h3 class="card-title">技能栈</h3>
        <div class="skills-container">
          <div class="skill-category">
            <h4 class="category-title">后端技术</h4>
            <div class="skill-items">
              <div class="skill-item">
                <span class="skill-name">Java</span>
                <div class="skill-progress">
                  <div class="skill-bar" style="width: 90%"></div>
                </div>
              </div>
              <div class="skill-item">
                <span class="skill-name">Spring</span>
                <div class="skill-progress">
                  <div class="skill-bar" style="width: 85%"></div>
                </div>
              </div>
              <div class="skill-item">
                <span class="skill-name">Spring Boot</span>
                <div class="skill-progress">
                  <div class="skill-bar" style="width: 80%"></div>
                </div>
              </div>
              <div class="skill-item">
                <span class="skill-name">Spring MVC</span>
                <div class="skill-progress">
                  <div class="skill-bar" style="width: 75%"></div>
                </div>
              </div>
              <div class="skill-item">
                <span class="skill-name">MyBatis</span>
                <div class="skill-progress">
                  <div class="skill-bar" style="width: 70%"></div>
                </div>
              </div>
              <div class="skill-item">
                <span class="skill-name">MySQL</span>
                <div class="skill-progress">
                  <div class="skill-bar" style="width: 80%"></div>
                </div>
              </div>
              <div class="skill-item">
                <span class="skill-name">Redis</span>
                <div class="skill-progress">
                  <div class="skill-bar" style="width: 65%"></div>
                </div>
              </div>
              <div class="skill-item">
                <span class="skill-name">Linux</span>
                <div class="skill-progress">
                  <div class="skill-bar" style="width: 60%"></div>
                </div>
              </div>
            </div>
          </div>

          <div class="skill-category">
            <h4 class="category-title">前端技术</h4>
            <div class="skill-items">
              <div class="skill-item">
                <span class="skill-name">HTML</span>
                <div class="skill-progress">
                  <div class="skill-bar" style="width: 75%"></div>
                </div>
              </div>
              <div class="skill-item">
                <span class="skill-name">CSS</span>
                <div class="skill-progress">
                  <div class="skill-bar" style="width: 70%"></div>
                </div>
              </div>
              <div class="skill-item">
                <span class="skill-name">JavaScript</span>
                <div class="skill-progress">
                  <div class="skill-bar" style="width: 65%"></div>
                </div>
              </div>
              <div class="skill-item">
                <span class="skill-name">Vue 3</span>
                <div class="skill-progress">
                  <div class="skill-bar" style="width: 60%"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 项目经验卡片 -->
      <div class="about-card projects-card">
        <h3 class="card-title">项目经验</h3>
        <div class="projects-container">
          <div class="project-item" @mouseenter="hoveredProject = 0" @mouseleave="hoveredProject = -1">
            <div class="project-icon">
              <el-icon>
                <Document />
              </el-icon>
            </div>
            <h4 class="project-title">博客系统</h4>
            <p class="project-desc">前后端分离的博客系统，使用 Vue 3 + TypeScript 前端，Java + Spring Boot 后端，支持 Markdown
              编辑、文章管理、用户认证等功能。</p>
            <div class="project-tech">
              <span class="tech-tag">Vue 3</span>
              <span class="tech-tag">TypeScript</span>
              <span class="tech-tag">Spring Boot</span>
              <span class="tech-tag">MySQL</span>
            </div>
          </div>
          <div class="project-item" @mouseenter="hoveredProject = 1" @mouseleave="hoveredProject = -1">
            <div class="project-icon">
              <el-icon>
                <Cloudy />
              </el-icon>
            </div>
            <h4 class="project-title">云客平台</h4>
            <p class="project-desc">待开发项目，计划实现云服务管理平台，支持云资源管理、监控、自动化部署等功能。</p>
            <div class="project-tech">
              <span class="tech-tag">Java</span>
              <span class="tech-tag">Spring Cloud</span>
              <span class="tech-tag">Docker</span>
              <span class="tech-tag">Kubernetes</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 个人简介卡片 -->
      <div class="about-card bio-card">
        <h3 class="card-title">个人简介</h3>
        <div class="bio-content">
          <p class="about-bio">
            主要专注于 <span class="highlight">Java 后端开发</span>，熟悉 Spring 生态系统和相关技术栈。同时也具备前端开发能力，能够独立完成全栈项目的开发。
          </p>
          <p class="about-bio">
            我热爱编程，喜欢解决问题，并且不断学习新技术。目前正在学习 <span class="highlight">微服务架构</span> 和 <span
              class="highlight">分布式系统</span>，希望未来能够成为一名优秀的全栈工程师。
          </p>
          <p class="about-bio">
            我相信技术的力量可以改变世界，因此我不断努力提升自己的技术能力，希望能够通过技术创造有价值的产品和服务。
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Message, School, Document, Cloudy } from '@element-plus/icons-vue'

// 项目悬停状态
const hoveredProject = ref(-1)
</script>

<style scoped>
/* 背景效果 */
.about-background {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.bg-particles {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: radial-gradient(var(--color-primary) 1px, transparent 1px);
  background-size: 30px 30px;
  opacity: 0.1;
  animation: float 20s ease-in-out infinite;
}

@keyframes float {
  0% {
    transform: translateY(0) rotate(0deg);
  }

  50% {
    transform: translateY(-20px) rotate(180deg);
  }

  100% {
    transform: translateY(0) rotate(360deg);
  }
}

/* 页面容器 */
.about-page {
  padding-top: 60px;
  padding-bottom: 80px;
  min-height: 100vh;
  position: relative;
}

.about-header {
  text-align: center;
  margin-bottom: 48px;
  position: relative;
}

.about-title {
  font-size: 36px;
  font-weight: 700;
  color: var(--color-title);
  margin-bottom: 12px;
  position: relative;
  display: inline-block;
}

.about-title::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, var(--color-primary), transparent);
  border-radius: 2px;
}

.about-subtitle {
  font-size: 16px;
  color: var(--color-body);
  margin-bottom: 0;
}

.about-content {
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

/* 卡片样式 */
.about-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(16px);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  padding: 32px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.about-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: linear-gradient(to bottom, var(--color-primary), var(--color-accent));
  opacity: 0;
  transition: opacity 0.3s ease;
}

.about-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

.about-card:hover::before {
  opacity: 1;
}

/* 个人信息卡片 */
.personal-card {
  display: flex;
  align-items: center;
  gap: 40px;
}

.about-avatar {
  position: relative;
  flex-shrink: 0;
}

.about-avatar img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid var(--color-primary);
  box-shadow: 0 4px 20px rgba(232, 97, 60, 0.2);
  transition: all 0.3s ease;
}

.about-avatar:hover img {
  transform: scale(1.05);
  box-shadow: 0 6px 25px rgba(232, 97, 60, 0.3);
}

.avatar-glow {
  position: absolute;
  top: -8px;
  left: -8px;
  right: -8px;
  bottom: -8px;
  border-radius: 50%;
  background: linear-gradient(45deg, var(--color-primary), var(--color-accent));
  opacity: 0.3;
  animation: pulse 2s ease-in-out infinite;
  z-index: -1;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 0.3;
  }

  50% {
    transform: scale(1.1);
    opacity: 0.5;
  }

  100% {
    transform: scale(1);
    opacity: 0.3;
  }
}

.about-info {
  flex: 1;
  text-align: left;
}

.about-name {
  font-size: 28px;
  font-weight: 700;
  color: var(--color-title);
  margin-bottom: 12px;
}

.about-desc {
  font-size: 16px;
  color: var(--color-body);
  margin-bottom: 20px;
}

.info-items {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  color: var(--color-body);
}

.info-icon {
  color: var(--color-primary);
  font-size: 18px;
}

.social-links {
  display: flex;
  gap: 16px;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--color-bg);
  color: var(--color-primary);
  transition: all 0.3s ease;
  text-decoration: none;
}

.social-link:hover {
  background: var(--color-primary);
  color: #fff;
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(232, 97, 60, 0.3);
}

.social-icon {
  width: 20px;
  height: 20px;
  object-fit: contain;
  transition: all 0.3s ease;
}

.social-link:hover .social-icon {
  transform: scale(1.1);
}

/* 技能栈卡片 */
.skills-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.skill-category {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.category-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--color-title);
  margin-bottom: 8px;
}

.skill-items {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.skill-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.skill-name {
  font-size: 14px;
  font-weight: 500;
  color: var(--color-body);
}

.skill-progress {
  width: 100%;
  height: 8px;
  background: var(--color-bg);
  border-radius: 4px;
  overflow: hidden;
  position: relative;
}

.skill-bar {
  height: 100%;
  background: linear-gradient(90deg, var(--color-primary), var(--color-accent));
  border-radius: 4px;
  transition: width 1.5s ease;
  position: relative;
}

.skill-bar::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  animation: shimmer 2s ease-in-out infinite;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(100%);
  }
}

/* 项目经验卡片 */
.projects-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}

.project-item {
  background: rgba(248, 249, 250, 0.8);
  border-radius: var(--radius-md);
  padding: 24px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  border: 1px solid var(--color-border);
}

.project-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.9);
}

.project-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, var(--color-primary), var(--color-accent));
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.project-item:hover::before {
  transform: scaleX(1);
}

.project-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, var(--color-primary-light), var(--color-primary-light-2));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  font-size: 24px;
  color: var(--color-primary);
  transition: all 0.3s ease;
}

.project-item:hover .project-icon {
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  color: #fff;
  transform: scale(1.1);
}

.project-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--color-title);
  margin-bottom: 12px;
}

.project-desc {
  font-size: 14px;
  color: var(--color-body);
  line-height: 1.6;
  margin-bottom: 16px;
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tech-tag {
  padding: 4px 12px;
  background: var(--color-bg);
  color: var(--color-primary);
  border-radius: var(--radius-full);
  font-size: 12px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.project-item:hover .tech-tag {
  background: var(--color-primary-light);
  color: var(--color-primary-hover);
}

/* 个人简介卡片 */
.bio-content {
  position: relative;
}

.about-bio {
  font-size: 15px;
  color: var(--color-body);
  line-height: 1.7;
  margin-bottom: 16px;
  position: relative;
  z-index: 1;
}

.highlight {
  color: var(--color-primary);
  font-weight: 600;
  position: relative;
}

.highlight::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: var(--color-primary-light);
  z-index: -1;
  transition: all 0.3s ease;
}

.about-bio:hover .highlight::after {
  height: 6px;
  opacity: 0.5;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .about-page {
    padding-top: 40px;
    padding-bottom: 60px;
  }

  .about-title {
    font-size: 28px;
  }

  .about-content {
    gap: 24px;
  }

  .about-card {
    padding: 24px;
  }

  .personal-card {
    flex-direction: column;
    text-align: center;
    gap: 32px;
  }

  .about-avatar img {
    width: 120px;
    height: 120px;
  }

  .about-info {
    text-align: center;
  }

  .info-item {
    justify-content: center;
  }

  .projects-container {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .about-title {
    font-size: 24px;
  }

  .about-subtitle {
    font-size: 14px;
  }

  .about-card {
    padding: 20px;
  }

  .about-name {
    font-size: 24px;
  }

  .about-desc {
    font-size: 14px;
  }
}
</style>