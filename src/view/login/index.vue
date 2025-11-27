<template>
  <div class="login-container">
    
    <!-- 动态背景效果 -->
    <BackgroundEffects />
    
    <div class="main-content">
      <!-- 左侧项目介绍 -->
      <ProjectInfo />
      
      <!-- 右侧登录注册框 -->
      <AuthSection 
        :show-register="showRegister"
        :loading="loading"
        @toggle-register="toggleRegister"
        @login="handleLogin"
        @register="handleRegister"
      />
    </div>
    
    <!-- 成功提示弹窗 -->
    <el-dialog
      v-model="successDialogVisible"
      title="注册成功"
      width="400px"
      center
    >
      <p>{{ successMessage }}</p>
      <template #footer>
        <el-button type="primary" @click="successDialogVisible = false; showRegister = false">
          确定
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { login as loginApi, register as registerApi } from '@/api/login'
import { useLoginStore } from '@/pinia/modules/login'
import { saveUserLoginInfo } from '@/utils/login'

// 导入组件
import BackgroundEffects from './components/BackgroundEffects.vue'
import ProjectInfo from './components/ProjectInfo.vue'
import AuthSection from './components/AuthSection.vue'

const router = useRouter()
const loginStore = useLoginStore()

// 响应式数据
const showRegister = ref(false)
const loading = ref(false)
const successDialogVisible = ref(false)
const successMessage = ref('')

// 切换注册/登录视图
const toggleRegister = () => {
  showRegister.value = !showRegister.value
}

// 处理登录
const handleLogin = async (loginForm) => {
  loading.value = true
  try {
    const response = await loginApi(loginForm)
    if (response.code === 200) {
      const jwt = response.headers?.authorization || response.data?.token
      if (jwt) {
        saveUserLoginInfo(loginForm.accountNum, jwt)
        loginStore.setLoginStatus(true)
        loginStore.setCurrentUser(loginForm.accountNum)
        loginStore.setUserToken(loginForm.accountNum, { jwt })
        ElMessage.success('登录成功！')
        router.push('/home')
      } else {
        ElMessage.error('登录失败：未获取到有效Token')
      }
    } else {
      ElMessage.error(response.message || '登录失败')
    }
  } catch (error) {
    console.error('登录失败:', error)
    ElMessage.error('登录失败：' + (error.message || '网络错误'))
  } finally {
    loading.value = false
  }
}

// 处理注册
const handleRegister = async (registerForm) => {
  loading.value = true
  try {
    const response = await registerApi(registerForm)
    if (response.code === 200) {
      successMessage.value = response.message || '注册成功！'
      successDialogVisible.value = true
    } else {
      ElMessage.error(response.message || '注册失败')
    }
  } catch (error) {
    console.error('注册错误:', error)
    ElMessage.error('注册失败，请检查网络连接')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped lang="scss">
.login-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.config-switcher-container {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 1000;
}

.main-content {
  display: flex;
  width: 100%;
  max-width: 1200px;
  height: 600px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  overflow: hidden;
  position: relative;
  z-index: 10;
}

// 响应式设计
@media (max-width: 768px) {
  .main-content {
    flex-direction: column;
    height: auto;
    margin: 20px;
    max-width: calc(100% - 40px);
  }
}

@media (max-width: 480px) {
  .main-content {
    margin: 10px;
    max-width: calc(100% - 20px);
    border-radius: 15px;
  }
}
</style>