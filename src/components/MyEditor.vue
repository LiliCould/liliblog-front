<script setup>
import { QuillEditor } from '@vueup/vue-quill'
import { ref, watch } from 'vue'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

const editorConfig = {
  theme: 'snow',
  modules: {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ color: [] }, { background: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ align: [] }],
      ['link', 'image', 'video'],
      ['clean'],
    ],
  },
  placeholder: '请输入内容...',
  formats: [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'color',
    'background',
    'list',
    'bullet',
    'align',
    'link',
    'image',
    'video',
  ],
}

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:modelValue'])

const content = ref(props.modelValue)

// 监听内容变化并通知父组件
watch(content, (newContent) => {
  emit('update:modelValue', newContent)
})

// 监听父组件传入的值变化
watch(
  () => props.modelValue,
  (newValue) => {
    if (content.value !== newValue) {
      content.value = newValue
    }
  },
)

// 处理编辑器的加载事件
const onEditorReady = (quill) => {
  console.log('编辑器准备完成:', quill)
}
</script>

<template>
  <div class="editor-container">
    <QuillEditor v-model:content="content" placeholder="请输入文章内容..." contentType="html" @ready="onEditorReady" />
  </div>
</template>

<style scoped>
.editor-container {
  margin: 20px 0;
}

/* 如果需要自定义工具栏样式 */
:deep(.ql-toolbar) {
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  border: 1px solid #ccc;
}

:deep(.ql-container) {
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  border: 1px solid #ccc;
  border-top: none;
  font-size: 16px;
}
</style>
