import axios from 'axios'
import { ElLoading, ElNotification } from 'element-plus'

let loading: { close(): void }

// 创建 axios 实例
const request = axios.create({
  baseURL: '',
  timeout: 60000,
})

// 异常拦截处理器
const errorHandler = (error: { message: string }) => {
  loading.close()
  console.log(`err${error}`)
  ElNotification({
    title: '请求失败',
    message: error.message,
    type: 'error',
  })
  return Promise.reject(error)
}

// request interceptor
request.interceptors.request.use(config => {
  // 请求头携带token
  config.headers['token'] = localStorage.getItem('token') || ''
  loading = ElLoading.service({
    lock: true,
    text: 'Loading',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.4)',
  })
  return config
}, errorHandler)

// response interceptor
request.interceptors.response.use(response => {
  loading.close()
  return response
}, errorHandler)

export default request
