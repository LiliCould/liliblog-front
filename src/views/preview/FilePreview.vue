<template>
  <div class="file-preview-page">
    <div class="preview-header">
      <h2 class="preview-title">{{ fileName }}</h2>
      <div class="preview-actions">
        <a :href="fileUrl" download class="download-link">📥 下载文件</a>
        <button @click="closeWindow" class="close-btn">✕ 关闭</button>
      </div>
    </div>

    <div class="preview-content">
      <!-- PDF预览 -->
      <vue-office-pdf v-if="fileType === 'pdf'" :src="fileUrl" style="height: 100%; width: 100%" @rendered="onRendered"
        @error="onError" />

      <!-- Word文档预览 -->
      <vue-office-docx v-else-if="fileType === 'word' || fileType === 'docx'" :src="fileUrl"
        style="height: 100%; width: 100%" @rendered="onRendered" @error="onError" />

      <!-- Excel预览 -->
      <vue-office-excel v-else-if="fileType === 'excel' || fileType === 'xlsx'" :src="fileUrl"
        style="height: 100%; width: 100%" @rendered="onRendered" @error="onError" />

      <!-- PPT预览 -->
      <vue-office-pptx v-else-if="fileType === 'ppt' || fileType === 'pptx'" :src="fileUrl"
        style="height: 100%; width: 100%" @rendered="onRendered" @error="onError" />

      <!-- 其他文件 - 直接显示或提示 -->
      <div v-else class="unsupported-preview">
        <div class="unsupported-icon">📄</div>
        <p>该文件类型暂不支持在线预览</p>
        <a :href="fileUrl" download class="download-btn-large">下载文件查看</a>
      </div>
    </div>

    <!-- 加载中遮罩 -->
    <div v-if="loading && fileUrl" class="loading-overlay">
      <div class="loading-spinner"></div>
      <p>文档加载中...</p>
    </div>

    <!-- 错误提示 -->
    <div v-if="errorMsg && !loading" class="error-overlay">
      <div class="error-icon">⚠️</div>
      <p>{{ errorMsg }}</p>
      <a :href="fileUrl" download class="download-btn-large">下载文件查看</a>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import VueOfficeDocx from '@vue-office/docx'
import VueOfficeExcel from '@vue-office/excel'
import VueOfficePdf from '@vue-office/pdf'
import VueOfficePptx from '@vue-office/pptx'
import '@vue-office/docx/lib/index.css'
import '@vue-office/excel/lib/index.css'

export default {
  components: {
    VueOfficeDocx,
    VueOfficeExcel,
    VueOfficePdf,
    VueOfficePptx
  },
  data() {
    return {
      fileUrl: '',
      fileType: '',
      fileName: '文件预览',
      loading: true,
      errorMsg: ''
    }
  },
  setup() {
    const route = useRoute()
    return { route }
  },
  mounted() {
    this.fileUrl = this.route.query.url || ''
    this.fileType = this.route.query.type || ''
    this.fileName = this.route.query.name || '文件预览'

    document.title = `预览 - ${this.fileName}`

    console.log('文件预览参数:', {
      url: this.fileUrl,
      type: this.fileType,
      name: this.fileName
    })

    if (!this.fileUrl) {
      this.loading = false
      this.errorMsg = '未提供文件地址'
    }
  },
  methods: {
    onRendered() {
      this.loading = false
      console.log('文档渲染完成')
    },
    onError(error) {
      this.loading = false
      this.errorMsg = '文档加载失败，请尝试下载后查看'
      console.error('文档加载失败:', error)
    },
    closeWindow() {
      window.close()
    }
  }
}
</script>

<style scoped>
.file-preview-page {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f5f5f5;
}

.preview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background: #fff;
  border-bottom: 1px solid #e0e0e0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.preview-title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #333;
  max-width: 60%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.preview-actions {
  display: flex;
  gap: 12px;
  align-items: center;
}

.download-link {
  padding: 8px 16px;
  background: linear-gradient(135deg, #07c160, #06ad56);
  color: #fff;
  text-decoration: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.download-link:hover {
  background: linear-gradient(135deg, #06ad56, #059a4c);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(7, 193, 96, 0.25);
}

.close-btn {
  padding: 8px 16px;
  background: #f5f5f5;
  color: #666;
  border: 1px solid #ddd;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
}

.close-btn:hover {
  background: #ff4444;
  color: #fff;
  border-color: #ff4444;
}

.preview-content {
  flex: 1;
  overflow: auto;
  padding: 20px;
  background: #fff;
}

.unsupported-preview {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  color: #999;
}

.unsupported-icon {
  font-size: 80px;
  opacity: 0.3;
}

.unsupported-preview p {
  font-size: 16px;
  margin: 0;
}

.download-btn-large {
  padding: 12px 28px;
  background: linear-gradient(135deg, #07c160, #06ad56);
  color: #fff;
  text-decoration: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(7, 193, 96, 0.25);
}

.download-btn-large:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(7, 193, 96, 0.35);
}

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.95);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  z-index: 1000;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #07c160;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.error-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.95);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  z-index: 1000;
}

.error-icon {
  font-size: 60px;
}
</style>
