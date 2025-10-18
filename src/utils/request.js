import axios from 'axios'
import { ElMessage, ElLoading } from 'element-plus'
import { config } from '@/config'

// 创建axios实例
const service = axios.create({
  baseURL: config.api.baseURL,
  timeout: config.api.timeout,
  headers: {
    'Content-Type': 'application/json'
  }
})

let loadingInstance = null

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 显示loading
    if (config.showLoading !== false) {
      loadingInstance = ElLoading.service({
        lock: true,
        text: '加载中...',
        background: 'rgba(0, 0, 0, 0.7)'
      })
    }

    // 添加token
    const token = localStorage.getItem('jwt') || sessionStorage.getItem('jwt')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }

    // 添加用户ID
    const userId = sessionStorage.getItem('currentUser') || sessionStorage.getItem('account_num')
    if (userId) {
      config.headers['x-user-id'] = userId
    }

    return config
  },
  error => {
    // 关闭loading
    if (loadingInstance) {
      loadingInstance.close()
    }
    console.error('请求错误:', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    // 关闭loading
    if (loadingInstance) {
      loadingInstance.close()
    }

    const res = response.data

    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    if (response.status === 200) {
      return res
    } else {
      // 否则的话抛出错误
      ElMessage.error(res.msg || '请求失败')
      return Promise.reject(new Error(res.msg || '请求失败'))
    }
  },
  error => {
    // 关闭loading
    if (loadingInstance) {
      loadingInstance.close()
    }

    console.error('响应错误:', error)
    
    if (error.response) {
      const { status, data } = error.response
      
      switch (status) {
        case 401:
          ElMessage.error('未授权，请重新登录')
          // 清除token
          localStorage.removeItem('jwt')
          sessionStorage.removeItem('jwt')
          sessionStorage.removeItem('currentUser')
          // 跳转到登录页
          window.location.href = '/login'
          break
        case 403:
          ElMessage.error('拒绝访问')
          break
        case 404:
          ElMessage.error('请求地址出错')
          break
        case 500:
          ElMessage.error('服务器内部错误')
          break
        default:
          ElMessage.error(data?.msg || '请求失败')
      }
    } else {
      ElMessage.error('网络错误，请检查网络连接')
    }
    
    return Promise.reject(error)
  }
)

export default service