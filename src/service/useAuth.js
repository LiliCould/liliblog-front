import { useAxios } from '@/compositions/useAxios.js'
import { ref } from 'vue'

export function useAuth() {
  const username = ref('')
  const password = ref('')
  const nickname = ref('')
  const token = ref('')

  // 注册相关
  const registerApi = useAxios('/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  // 登录相关
  const loginApi = useAxios('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const register = async (username, password, nickname, email) => {
    return registerApi.execute(null, {
      data: {
        username,
        password,
        nickname,
        email,
      },
    })
  }

  const login = async (username, password) => {
    return loginApi.execute(null, {
      data: {
        username,
        password,
      },
    })
  }

  return {
    // 用户信息
    username,
    password,
    nickname,
    token,
    // 注册相关状态
    registerData: registerApi.data,
    registerError: registerApi.error,
    registerLoading: registerApi.loading,
    register,
    // 登录相关状态
    loginData: loginApi.data,
    loginError: loginApi.error,
    loginLoading: loginApi.loading,
    login,
  }
}

// 正确返回示例
// {
//   "code": 200,
//   "message": "success",
//   "data": {
//   "token": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJMaWxpQ291bGQiLCJyb2xlIjoiVklTSVRPUiIsImlhdCI6MTc2NzM1Mzk0MiwiZXhwIjoxNzY3NDQwMzQyfQ.diJ2OjTRhvrmCibjy_Z_X5j2uhQ2egWEJv54YOvSdhg",
//     "username": "LiliCould",
//     "nickname": "立里可",
//     "role": "VISITOR",
//     "avatar": null
// },
//   "timestamp": 1767353942250
// }

// 错误返回示例
// {
//   "code": 500,
//   "message": "用户名或密码错误",
//   "data": null,
//   "timestamp": 1767355181097
// }
