// 登录工具函数

// 获取当前用户账号
export function getCurrentUserAccount() {
  return sessionStorage.getItem('currentUser') || sessionStorage.getItem('account_num')
}

// 获取当前用户JWT Token
export function getCurrentUserJWT() {
  const accountNum = getCurrentUserAccount()
  if (accountNum) {
    const userTokens = JSON.parse(localStorage.getItem('userTokens') || '{}')
    return userTokens[accountNum]?.jwt || sessionStorage.getItem('jwt')
  }
  return sessionStorage.getItem('jwt')
}

// 保存用户登录信息
export function saveUserLoginInfo(accountNum, jwt) {
  const userTokens = JSON.parse(localStorage.getItem('userTokens') || '{}')
  userTokens[accountNum] = {
    jwt: jwt,
    account_num: accountNum,
    loginTime: new Date().toISOString()
  }
  localStorage.setItem('userTokens', JSON.stringify(userTokens))
  sessionStorage.setItem('jwt', jwt)
  sessionStorage.setItem('currentUser', accountNum)
}

// 清除用户登录信息
export function clearUserLoginInfo() {
  localStorage.removeItem('userTokens')
  sessionStorage.removeItem('jwt')
  sessionStorage.removeItem('currentUser')
  sessionStorage.removeItem('account_num')
  sessionStorage.removeItem('password')
}

// 检查是否已登录
export function checkLoginStatus() {
  const accountNum = getCurrentUserAccount()
  const jwt = getCurrentUserJWT()
  return !!(accountNum && jwt)
}

// 获取请求头
export function getAuthHeaders() {
  const jwt = getCurrentUserJWT()
  return {
    'Authorization': jwt ? `Bearer ${jwt}` : '',
    'Content-Type': 'application/json'
  }
}
