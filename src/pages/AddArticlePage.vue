<script setup lang="js">
import MyEditor from '@/components/MyEditor.vue'
import { computed, ref, watch } from 'vue'
import { Button, Content, Form, FormItem, Icon, Input, Option, Select } from 'view-ui-plus'

// 引入新增文章方法
import { useArticleStore } from '@/stores/articleStore.js'
const articleStore = useArticleStore()
const { addArticle } = articleStore

const formData = ref({
  title: '',
  slug: '',
  summary: '',
  content: '',
  contentHtml: '',
  coverImage: 'https://p1.ssl.qhimg.com/t01b03e8bba2e789ef5.jpg',
  status: '',
  categoryId: 1,
  tagIds: [],
})

const statusOptions = computed(() => [
  {
    label: '发布',
    value: 'PUBLISHED',
  },
  {
    label: '草稿',
    value: 'DRAFT',
  },
  {
    label: '隐藏',
    value: 'HIDDEN',
  },
])

const handleSubmit = () => {
  console.log(formData.value)

  // 将contentHtml 转换为 content,移除html元素
  formData.value.content = formData.value.contentHtml.replace(/<[^>]+>/g, '')
  addArticle(formData.value)
}
</script>

<template>
  <div class="ivu-article-add">
    <Content :style="{ margin: '20px', background: '#fff', minHeight: '600px' }">
      <Form @submit.prevent="handleSubmit">
        <FormItem label="标题">
          <Input v-model="formData.title" type="text" placeholder="请输入文章标题" />
        </FormItem>
        <FormItem label="摘要">
          <Input v-model="formData.summary" type="textarea" placeholder="请输入文章摘要" />
        </FormItem>
        <FormItem label="别名">
          <Input v-model="formData.slug" type="textarea" placeholder="请输入文章别名" />
        </FormItem>
        <FormItem label="状态">
          <Select v-model="formData.status" style="width: 200px">
            <Option v-for="option in statusOptions" :value="option.value" :key="option.value">
              {{ option.label }}
            </Option>
          </Select>
        </FormItem>
        <MyEditor v-model="formData.contentHtml" />

        <Button type="primary" @click="handleSubmit">提交</Button>
      </Form>
    </Content>
  </div>
</template>

<style scoped></style>
