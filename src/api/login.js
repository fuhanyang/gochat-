// 登录相关API接口
import request from '@/utils/request'

// 用户注册
export function register(data) {
  return request({
    url: '/api/v1/user/register',
    method: 'post',
    data: {
      username: data.username,
      password: data.password,
      passwordConfirm: data.passwordConfirm,
      ip: data.ip || 'localhost',
      handlerName: 'Register'
    }
  })
}

// 用户登录
export function login(data) {
  return request({
    url: '/api/v1/user/login',
    method: 'post',
    data: {
      accountNum: data.accountNum,
      password: data.password,
      ip: data.ip || 'localhost:8080',
      handlerName: 'Login'
    }
  })
}

// 用户登出
export function logout(data) {
  return request({
    url: '/api/v1/user/logoff',
    method: 'post',
    data: {
      accountNum: data.accountNum,
      password: data.password,
      ip: '127.0.0.1',
      handlerName: 'LogOff'
    }
  })
}
