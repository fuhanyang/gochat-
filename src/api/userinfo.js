// 用户信息相关API接口
import service from '@/utils/request'

// @Summary 更新用户信息
// @Produce  application/json
// @Param data body {avatar:"string",name:"string",job:"string",email:"string",location:"string",description:"string"}
// @Router /user/info [post]
export const updateUserInfo = (data) => {
  return service({
    url: '/user/info',
    method: 'post',
    data: data
  })
}

// @Summary 获取用户信息
// @Produce  application/json
// @Router /user/info [get]
export const getUserInfo = () => {
  return service({
    url: '/user/info',
    method: 'get'
  })
}
