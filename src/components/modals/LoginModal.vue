<script setup>
import {
  Button,
  Checkbox,
  Icon,
  Login,
  Modal,
  Notice,
  Password,
  Space,
  Spin,
  Submit,
  UserName,
} from 'view-ui-plus'
import { computed, ref, watch } from 'vue'
import { useAuth } from '@/service/useAuth.js'
import { useTimeStampToDate } from '@/utils/useTimeStampToDate.js'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/userStore.js'

const loginModal = ref(false)

const autoLogin = ref(true)

const lastLoginTime = ref(null)

const { isLogin } = storeToRefs(useUserStore())

const { login, loginError, loginLoading, loginData } = useAuth()

const handleSubmit = async (valid, { username, password }) => {
  if (valid) {
    // 节流,如果登录间隔小于5秒，则返回
    if (lastLoginTime.value && new Date().getTime() - lastLoginTime.value < 5000) {
      Modal.error({
        title: '登录失败',
        content: '请勿频繁登录',
      })
      isLoading.value = false
      return
    }
    // 更新最后登录时间
    lastLoginTime.value = new Date().getTime()

    try {
      await login(username, password).then(() => {
        // 登录成功
        if (loginData.value.code === 200) {
          localStorage.setItem('token', loginData.value.data.token)

          Notice.success({
            title: '登录成功',
            desc:
              '<div>登录用户：' +
              loginData.value.data.nickname +
              '</div>' +
              '<div>登录时间：' +
              useTimeStampToDate(loginData.value.timestamp) +
              '</div>',
            duration: 3,
          })
          isLogin.value = true
          loginModal.value = false
        } else {
          Notice.error({
            title: '登录失败',
            desc: '错误信息：' + loginData.value.message,
          })
        }
      })
    } catch (err) {
      if (err.code === 'ECONNABORTED' || err.message.includes('timeout')) {
        Modal.error({
          title: '登录失败',
          content: '请求超时，请检查网络',
        })
      } else {
        Modal.error({
          title: '登录失败',
          content: loginError.value,
        })
      }
    }
  }
}
</script>

<template>
  <Space wrap>
    <!-- 显示的登录按钮 -->
    <Button @click="loginModal = true" v-if="!isLogin">登录</Button>

    <Modal v-model="loginModal" draggable sticky :mask="true" title="登录">
      <div class="login-container">
        <Login @on-submit="handleSubmit" enter>
          <UserName name="username" />
          <Password name="password" />
          <div class="auto-login">
            <Checkbox v-model="autoLogin" size="large">自动登录</Checkbox>
            <a @click="Modal.info({ title: '提示', content: '暂不支持找回密码' })">忘记密码</a>
          </div>
          <Submit :class="{ disabled: loginLoading }" />
        </Login>
        <!-- 登录加载动画 -->
        <Spin fix v-if="loginLoading">
          <Icon type="ios-loading" size="18" class="spin-icon-load"></Icon>
          <div>正在登录...</div>
        </Spin>
      </div>
      <template #footer>
        <p></p>
      </template>
    </Modal>
  </Space>
</template>

<style>
.login-container {
  width: 400px;
  margin: 0 auto !important;
}
.auto-login {
  margin-bottom: 24px;
  text-align: left;
}
.auto-login a {
  float: right;
}

// 加载动画
.spin-col .circular {
  width: 25px;
  height: 25px;
}
.spin-icon-load {
  animation: ani-demo-spin 1s linear infinite;
}
@keyframes ani-spin {
  from {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
