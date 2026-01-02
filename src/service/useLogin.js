import { useAxios } from '@/compositions/useAxios.js'

export function useLogin(username, password) {
  const { data, error, loading, response, execute } = useAxios('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      username: username,
      password: password,
    },
  })

  if (data)
    return {
      data,
      error,
      loading,
      response,
      execute,
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
