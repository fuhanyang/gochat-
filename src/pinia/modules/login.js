// 登录状态管理
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useLoginStore = defineStore('login', () => {
  // 状态
  const isLoggedIn = ref(false)
  const currentUser = ref(null)
  const userTokens = ref({})
  const loading = ref(false)

  // 计算属性
  const hasValidToken = computed(() => {
    return currentUser.value && userTokens.value[currentUser.value]?.jwt
  })

  // 动作
  const setLoginStatus = (status) => {
    isLoggedIn.value = status
  }

  const setCurrentUser = (user) => {
    currentUser.value = user
  }

  const setUserToken = (accountNum, tokenData) => {
    userTokens.value[accountNum] = {
      jwt: tokenData.jwt,
      account_num: accountNum,
      loginTime: new Date().toISOString()
    }
    localStorage.setItem('userTokens', JSON.stringify(userTokens.value))
  }

  const getCurrentUserToken = () => {
    if (currentUser.value && userTokens.value[currentUser.value]) {
      return userTokens.value[currentUser.value].jwt
    }
    return null
  }

  const clearUserData = () => {
    isLoggedIn.value = false
    currentUser.value = null
    userTokens.value = {}
    localStorage.removeItem('userTokens')
    sessionStorage.removeItem('jwt')
    sessionStorage.removeItem('currentUser')
  }

  const setLoading = (status) => {
    loading.value = status
  }

  return {
    // 状态
    isLoggedIn,
    currentUser,
    userTokens,
    loading,
    // 计算属性
    hasValidToken,
    // 动作
    setLoginStatus,
    setCurrentUser,
    setUserToken,
    getCurrentUserToken,
    clearUserData,
    setLoading
  }
})
