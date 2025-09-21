<template>
  <div class="login-container">
    <!-- 动态背景效果 -->
    <div class="animated-background">
      <!-- 星星效果 -->
      <div class="stars">
        <div class="star" v-for="n in 80" :key="n" :style="getStarStyle(n)"></div>
      </div>
      
      <!-- 波浪效果 -->
      <div class="waves">
        <div class="wave wave-1"></div>
        <div class="wave wave-2"></div>
        <div class="wave wave-3"></div>
      </div>
      
      <!-- 浮动粒子 -->
      <div class="particles">
        <div class="particle" v-for="n in 20" :key="n" :style="getParticleStyle(n)"></div>
      </div>
      
      <!-- 流星效果 -->
        <div class="meteors">
          <div class="meteor" v-for="n in 18" :key="n" :style="getMeteorStyle(n)" :class="getMeteorClass(n)"></div>
        </div>
    </div>
    
    <div class="main-content">
      <!-- 左侧项目介绍 -->
      <div class="project-info">
        <!-- 装饰线条 -->
        <div class="decorative-lines">
          <div class="line line-1"></div>
          <div class="line line-2"></div>
          <div class="line line-3"></div>
          <div class="floating-shapes">
            <div class="shape shape-1"></div>
            <div class="shape shape-2"></div>
            <div class="shape shape-3"></div>
            <div class="shape shape-4"></div>
          </div>
        </div>
        
        <div class="info-content">
          <div class="logo-section">
            <div class="logo">
              <img src="/logo.png" alt="GoChat Logo" />
            </div>
            <h1 class="project-title">GoChat</h1>
            <p class="project-subtitle">现代化聊天应用</p>
          </div>
          
          <div class="features">
            <h3>功能特色</h3>
            <ul>
              <li class="feature-item">
                <span class="feature-icon">🔐</span>
                <span class="feature-text">安全用户认证</span>
              </li>
              <li class="feature-item">
                <span class="feature-icon">💬</span>
                <span class="feature-text">实时消息通信</span>
              </li>
              <li class="feature-item">
                <span class="feature-icon">👥</span>
                <span class="feature-text">好友管理系统</span>
              </li>
              <li class="feature-item">
                <span class="feature-icon">📁</span>
                <span class="feature-text">文件上传分享</span>
              </li>
              <li class="feature-item">
                <span class="feature-icon">🔔</span>
                <span class="feature-text">智能通知提醒</span>
              </li>
              <li class="feature-item">
                <span class="feature-icon">🏷️</span>
                <span class="feature-text">标签分类管理</span>
              </li>
            </ul>
          </div>
          
          <div class="tech-stack">
            <h3>技术栈</h3>
            <div class="tech-tags">
              <span class="tech-tag tech-tag-1">Vue 3</span>
              <span class="tech-tag tech-tag-2">Vite</span>
              <span class="tech-tag tech-tag-3">Element Plus</span>
              <span class="tech-tag tech-tag-4">Pinia</span>
              <span class="tech-tag tech-tag-5">WebSocket</span>
              <span class="tech-tag tech-tag-6">JWT</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 右侧登录注册框 -->
      <div class="auth-section">
        <!-- 3D星空装饰 -->
        <div class="starfield-container">
          <div class="starfield">
            <!-- 随机分布的星星节点 -->
            <div class="star star-1"></div>
            <div class="star star-2"></div>
            <div class="star star-3"></div>
            <div class="star star-4"></div>
            <div class="star star-5"></div>
            <div class="star star-6"></div>
            <div class="star star-7"></div>
            <div class="star star-8"></div>
            <div class="star star-9"></div>
            <div class="star star-10"></div>
            <div class="star star-11"></div>
            <div class="star star-12"></div>
            <div class="star star-13"></div>
            <div class="star star-14"></div>
            <div class="star star-15"></div>
            <div class="star star-16"></div>
            <div class="star star-17"></div>
            <div class="star star-18"></div>
            <div class="star star-19"></div>
            <div class="star star-20"></div>
            
            <!-- 连接线 -->
            <div class="connection-line line-1"></div>
            <div class="connection-line line-2"></div>
            <div class="connection-line line-3"></div>
            <div class="connection-line line-4"></div>
            <div class="connection-line line-5"></div>
            <div class="connection-line line-6"></div>
            <div class="connection-line line-7"></div>
            <div class="connection-line line-8"></div>
          </div>
        </div>
        
        <!-- 网络节点容器 -->
        <div class="network-container">
          <!-- 星星节点 -->
          <div class="star-node node-1">
            <div class="node-core"></div>
            <div class="node-glow"></div>
          </div>
          <div class="star-node node-2">
            <div class="node-core"></div>
            <div class="node-glow"></div>
          </div>
          <div class="star-node node-3">
            <div class="node-core"></div>
            <div class="node-glow"></div>
          </div>
          <div class="star-node node-4">
            <div class="node-core"></div>
            <div class="node-glow"></div>
          </div>
          <div class="star-node node-5">
            <div class="node-core"></div>
            <div class="node-glow"></div>
          </div>
          
          <!-- 星星之间的连接线 -->
          <div class="star-connection line-star1-2"></div>
          <div class="star-connection line-star1-3"></div>
          <div class="star-connection line-star2-4"></div>
          <div class="star-connection line-star3-5"></div>
          <div class="star-connection line-star4-5"></div>
          <div class="star-connection line-star2-3"></div>
          
          <!-- 随机散布的星星 -->
          <div class="random-star star-1"></div>
          <div class="random-star star-2"></div>
          <div class="random-star star-3"></div>
          <div class="random-star star-4"></div>
          <div class="random-star star-5"></div>
          <div class="random-star star-6"></div>
          <div class="random-star star-7"></div>
          <div class="random-star star-8"></div>
          <div class="random-star star-9"></div>
          <div class="random-star star-10"></div>
          <div class="random-star star-11"></div>
          <div class="random-star star-12"></div>
          <div class="random-star star-13"></div>
          <div class="random-star star-14"></div>
          <div class="random-star star-15"></div>
          <div class="random-star star-16"></div>
          <div class="random-star star-17"></div>
          <div class="random-star star-18"></div>
          <div class="random-star star-19"></div>
          <div class="random-star star-20"></div>
          
          <!-- 兴趣标签 - 更多种类 -->
          <div class="interest-tag tag-1">
            <div class="tag-icon">🎵</div>
            <div class="tag-text">音乐</div>
          </div>
          <div class="interest-tag tag-2">
            <div class="tag-icon">🎨</div>
            <div class="tag-text">绘画</div>
          </div>
          <div class="interest-tag tag-3">
            <div class="tag-icon">💻</div>
            <div class="tag-text">编程</div>
          </div>
          <div class="interest-tag tag-4">
            <div class="tag-icon">📚</div>
            <div class="tag-text">阅读</div>
          </div>
          <div class="interest-tag tag-5">
            <div class="tag-icon">📸</div>
            <div class="tag-text">摄影</div>
          </div>
          <div class="interest-tag tag-6">
            <div class="tag-icon">🏃</div>
            <div class="tag-text">运动</div>
          </div>
          <div class="interest-tag tag-7">
            <div class="tag-icon">✈️</div>
            <div class="tag-text">旅行</div>
          </div>
          <div class="interest-tag tag-8">
            <div class="tag-icon">🍳</div>
            <div class="tag-text">烹饪</div>
          </div>
          <div class="interest-tag tag-9">
            <div class="tag-icon">🎮</div>
            <div class="tag-text">游戏</div>
          </div>
          <div class="interest-tag tag-10">
            <div class="tag-icon">🎬</div>
            <div class="tag-text">电影</div>
          </div>
          <div class="interest-tag tag-11">
            <div class="tag-icon">🎯</div>
            <div class="tag-text">健身</div>
          </div>
          <div class="interest-tag tag-12">
            <div class="tag-icon">📱</div>
            <div class="tag-text">科技</div>
          </div>
        </div>
        
        <div class="login-box">
          <!-- 标题 -->
          <div class="login-title">
            <div class="title-main">
              <h1>GoChat</h1>
            </div>
            <div class="title-subtitle">
              <span class="subtitle-text">连接世界，分享兴趣</span>
              <span class="title-icon">💬</span>
              <div class="subtitle-decoration"></div>
            </div>
          </div>
      
      <!-- 登录表单 -->
      <div v-if="!showRegister" class="form-container">
        <el-form 
          ref="loginFormRef" 
          :model="loginForm" 
          :rules="loginRules" 
          class="login-form"
          @submit.prevent="handleLogin"
        >
          <el-form-item prop="accountNum">
            <div class="input-wrapper">
              <div class="input-icon">
                <i class="el-icon-user"></i>
              </div>
              <el-input
                v-model="loginForm.accountNum"
                placeholder="请输入账号"
                size="large"
                class="enhanced-input"
                clearable
              />
              <div class="input-decoration"></div>
            </div>
          </el-form-item>
          
          <el-form-item prop="password">
            <div class="input-wrapper">
              <div class="input-icon">
                <i class="el-icon-lock"></i>
              </div>
              <el-input
                v-model="loginForm.password"
                type="password"
                placeholder="请输入密码"
                size="large"
                class="enhanced-input"
                show-password
                clearable
              />
              <div class="input-decoration"></div>
            </div>
          </el-form-item>
          
          <el-form-item>
            <el-button 
              type="primary" 
              size="large" 
              class="login-btn"
              :loading="loading"
              @click="handleLogin"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
        
        <div class="form-footer">
          <span class="register-link" @click="showRegister = true">
            还没有账号？立即注册
          </span>
        </div>
      </div>
      
      <!-- 注册表单 -->
      <div v-if="showRegister" class="form-container">
        <el-form 
          ref="registerFormRef" 
          :model="registerForm" 
          :rules="registerRules" 
          class="register-form"
          @submit.prevent="handleRegister"
        >
          <el-form-item prop="username">
            <div class="input-wrapper">
              <div class="input-icon">
                <i class="el-icon-user"></i>
              </div>
              <el-input
                v-model="registerForm.username"
                placeholder="请输入用户名"
                size="large"
                class="enhanced-input"
                clearable
              />
              <div class="input-decoration"></div>
            </div>
          </el-form-item>
          
          <el-form-item prop="password">
            <div class="input-wrapper">
              <div class="input-icon">
                <i class="el-icon-lock"></i>
              </div>
              <el-input
                v-model="registerForm.password"
                type="password"
                placeholder="请输入密码"
                size="large"
                class="enhanced-input"
                show-password
                clearable
              />
              <div class="input-decoration"></div>
            </div>
          </el-form-item>
          
          <el-form-item prop="passwordConfirm">
            <div class="input-wrapper">
              <div class="input-icon">
                <i class="el-icon-lock"></i>
              </div>
              <el-input
                v-model="registerForm.passwordConfirm"
                type="password"
                placeholder="请确认密码"
                size="large"
                class="enhanced-input"
                show-password
                clearable
              />
              <div class="input-decoration"></div>
            </div>
          </el-form-item>
          
          <el-form-item>
            <el-button 
              type="primary" 
              size="large" 
              class="register-btn"
              :loading="loading"
              @click="handleRegister"
            >
              注册
            </el-button>
          </el-form-item>
        </el-form>
        
        <div class="form-footer">
          <span class="login-link" @click="showRegister = false">
            已有账号？立即登录
          </span>
        </div>
      </div>
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
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { register as registerApi, login as loginApi } from '@/api/login'
import { useLoginStore } from '@/pinia/modules/login'
import { saveUserLoginInfo } from '@/utils/login'

const router = useRouter()
const loginStore = useLoginStore()

// 响应式数据
const showRegister = ref(false)
const loading = ref(false)
const successDialogVisible = ref(false)
const successMessage = ref('')

// 动态背景效果方法
const getStarStyle = (index) => {
  // 创建更丰富的星星大小分布
  let size
  if (index <= 20) {
    // 大星星 (2-4px)
    size = Math.random() * 2 + 2
  } else if (index <= 50) {
    // 中等星星 (1-2px)
    size = Math.random() * 1 + 1
  } else {
    // 小星星 (0.5-1px)
    size = Math.random() * 0.5 + 0.5
  }
  
  // 更均匀的分布
  const left = Math.random() * 100
  const top = Math.random() * 100
  const delay = Math.random() * 3
  const duration = Math.random() * 2 + 2.5
  
  return {
    left: `${left}%`,
    top: `${top}%`,
    width: `${size}px`,
    height: `${size}px`,
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`
  }
}

const getParticleStyle = (index) => {
  const size = Math.random() * 4 + 2
  const left = Math.random() * 100
  const top = Math.random() * 100
  const delay = Math.random() * 5
  const duration = Math.random() * 8 + 6
  
  return {
    left: `${left}%`,
    top: `${top}%`,
    width: `${size}px`,
    height: `${size}px`,
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`
  }
}

const getMeteorStyle = (index) => {
  // 流星从左上角开始，向右下角移动
  let startPos
  
  if (index === 0) {
    // 第一个流星从真正的左上角开始
    startPos = {
      x: 0, // 屏幕左上角 x=0
      y: 0  // 屏幕左上角 y=0
    }
  } else if (index === 1) {
    // 第二个流星从左上角附近开始
    startPos = {
      x: Math.random() * 10, // 0-10%范围内
      y: Math.random() * 10  // 0-10%范围内
    }
  } else if (index === 2) {
    // 第三个流星从左上角附近开始
    startPos = {
      x: Math.random() * 15, // 0-15%范围内
      y: Math.random() * 15  // 0-15%范围内
    }
  } else {
    // 其他流星从左边框和上边框的任意位置开始
    const isFromLeft = Math.random() < 0.5
    
    if (isFromLeft) {
      // 从左边框任意位置开始
      startPos = {
        x: -30,
        y: Math.random() * 100 // 0-100%范围内
      }
    } else {
      // 从上边框任意位置开始
      startPos = {
        x: Math.random() * 100, // 0-100%范围内
        y: -30
      }
    }
  }
  
  // 分散延迟时间，避免集中出现
  const baseDelay = index * 0.5
  const randomDelay = Math.random() * 1.0
  const delay = baseDelay + randomDelay
  
  const duration = 5
  
  return {
    left: `${startPos.x}%`,
    top: `${startPos.y}%`,
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`
  }
}

const getMeteorClass = (index) => {
  // 流星层次：近、中、远三层
  const layers = ['near', 'mid', 'far']
  const layer = layers[index % 3]
  return `meteor-${layer}`
}

// 表单引用
const loginFormRef = ref()
const registerFormRef = ref()

// 登录表单数据
const loginForm = reactive({
  accountNum: '',
  password: ''
})

// 注册表单数据
const registerForm = reactive({
  username: '',
  password: '',
  passwordConfirm: ''
})

// 登录表单验证规则
const loginRules = {
  accountNum: [
    { required: true, message: '请输入账号', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能少于6位', trigger: 'blur' }
  ]
}

// 注册表单验证规则
const registerRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 2, message: '用户名长度不能少于2位', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能少于6位', trigger: 'blur' }
  ],
  passwordConfirm: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== registerForm.password) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}

// 处理登录
const handleLogin = async () => {
  if (!loginFormRef.value) return
  
  await loginFormRef.value.validate(async (valid) => {
    if (valid) {
      loading.value = true
      try {
        const response = await loginApi(loginForm)
        
        if (response.code === 200) {
          // 获取JWT Token（从响应头或响应数据中）
          const jwt = response.headers?.authorization || response.data?.token
          
          if (jwt) {
            // 保存登录信息
            saveUserLoginInfo(loginForm.accountNum, jwt)
            
            // 更新Pinia状态
            loginStore.setLoginStatus(true)
            loginStore.setCurrentUser(loginForm.accountNum)
            loginStore.setUserToken(loginForm.accountNum, { jwt })
            
            ElMessage.success('登录成功！')
            
            // 跳转到主页面
            router.push('/main')
          } else {
            ElMessage.error('登录失败：未获取到有效Token')
          }
        } else {
          ElMessage.error(response.msg || '登录失败')
        }
      } catch (error) {
        console.error('登录失败:', error)
        ElMessage.error('登录失败：' + (error.message || '网络错误'))
      } finally {
        loading.value = false
      }
    }
  })
}

// 处理注册
const handleRegister = async () => {
  if (!registerFormRef.value) return
  
  await registerFormRef.value.validate(async (valid) => {
    if (valid) {
      loading.value = true
      try {
        const response = await registerApi(registerForm)
        
        if (response.code === 200) {
          successMessage.value = response.data || '注册成功！'
          successDialogVisible.value = true
          
          // 清空注册表单
          Object.assign(registerForm, {
            username: '',
            password: '',
            passwordConfirm: ''
          })
        } else {
          ElMessage.error(response.msg || '注册失败')
        }
      } catch (error) {
        console.error('注册失败:', error)
        ElMessage.error('注册失败：' + (error.message || '网络错误'))
      } finally {
        loading.value = false
      }
    }
  })
}
</script>

<style scoped lang="scss">
.login-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Microsoft YaHei', Arial, sans-serif;
  padding: 20px;
  position: relative;
  overflow: hidden;
}

.animated-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

// 星星效果
.stars {
  position: absolute;
  width: 100%;
  height: 100%;
}

.star {
  position: absolute;
  background: white;
  border-radius: 50%;
  animation: twinkle 3s infinite ease-in-out;
}

@keyframes twinkle {
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
}

// 波浪效果
.waves {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100px;
  overflow: hidden;
}

.wave {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 200%;
  height: 100px;
  background: linear-gradient(45deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
  border-radius: 50% 50% 0 0;
  animation: wave-motion 8s infinite linear;
}

.wave-1 {
  animation-delay: 0s;
  opacity: 0.8;
}

.wave-2 {
  animation-delay: 2s;
  opacity: 0.6;
  height: 80px;
}

.wave-3 {
  animation-delay: 4s;
  opacity: 0.4;
  height: 60px;
}

@keyframes wave-motion {
  0% {
    transform: translateX(-50%) rotate(0deg);
  }
  100% {
    transform: translateX(-50%) rotate(360deg);
  }
}

// 浮动粒子效果
.particles {
  position: absolute;
  width: 100%;
  height: 100%;
}

.particle {
  position: absolute;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%);
  border-radius: 50%;
  animation: float 8s infinite ease-in-out;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
    opacity: 0.3;
  }
  25% {
    transform: translateY(-20px) rotate(90deg);
    opacity: 0.8;
  }
  50% {
    transform: translateY(-10px) rotate(180deg);
    opacity: 0.6;
  }
  75% {
    transform: translateY(-30px) rotate(270deg);
    opacity: 0.9;
  }
}

// 流星效果
.meteors {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 100; // 提高层级，确保流星可见
}

.meteor {
  position: absolute;
  background: #ffffff;
  border-radius: 50%;
  animation: meteorMove 2s linear infinite;
  opacity: 0;
  z-index: 101;
  
  // 近层流星 - 最大最亮
  &.meteor-near {
    width: 8px;
    height: 8px;
    box-shadow: 
      0 0 20px #ffffff, 
      0 0 40px #ffffff, 
      0 0 60px #ffffff,
      0 0 80px rgba(255, 255, 255, 0.9);
  }
  
  // 中层流星 - 中等
  &.meteor-mid {
    width: 5px;
    height: 5px;
    box-shadow: 
      0 0 12px #ffffff, 
      0 0 24px #ffffff, 
      0 0 36px #ffffff,
      0 0 48px rgba(255, 255, 255, 0.8);
  }
  
  // 远层流星 - 最小最暗
  &.meteor-far {
    width: 3px;
    height: 3px;
    box-shadow: 
      0 0 8px #ffffff, 
      0 0 16px #ffffff, 
      0 0 24px #ffffff,
      0 0 32px rgba(255, 255, 255, 0.6);
  }
}

.meteor::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100px; // 默认尾迹长度
  height: 1px;
  background: linear-gradient(90deg, 
    rgba(255, 255, 255, 0.9) 0%, 
    rgba(255, 255, 255, 0.6) 30%, 
    rgba(255, 255, 255, 0.3) 60%, 
    transparent 100%
  );
  transform-origin: left center;
  transform: translateY(-50%) rotate(-135deg); // -135度，指向星星运动的反方向
  animation: meteorTrail 2s linear infinite;
  box-shadow: 0 0 3px rgba(255, 255, 255, 0.5);
}

// 为不同层次的流星设置不同的尾迹长度
.meteor-near::before {
  width: 150px;
  height: 2px;
  box-shadow: 0 0 8px rgba(255, 255, 255, 0.8);
}

.meteor-mid::before {
  width: 100px;
  height: 1.5px;
  box-shadow: 0 0 6px rgba(255, 255, 255, 0.6);
}

.meteor-far::before {
  width: 70px;
  height: 1px;
  box-shadow: 0 0 4px rgba(255, 255, 255, 0.4);
}

@keyframes meteorMove {
  0% {
    opacity: 0;
    transform: translateX(0) translateY(0) scale(0.3);
  }
  15% {
    opacity: 0.8;
    transform: translateX(40px) translateY(40px) scale(0.8);
  }
  30% {
    opacity: 1;
    transform: translateX(100px) translateY(100px) scale(1);
  }
  70% {
    opacity: 1;
    transform: translateX(500px) translateY(500px) scale(1);
  }
  85% {
    opacity: 0.6;
    transform: translateX(650px) translateY(650px) scale(0.8);
  }
  100% {
    opacity: 0;
    transform: translateX(750px) translateY(750px) scale(0.3);
  }
}

@keyframes meteorTrail {
  0% {
    opacity: 0;
    transform: translateY(-50%) rotate(-135deg) scaleX(0);
  }
  10% {
    opacity: 1;
    transform: translateY(-50%) rotate(-135deg) scaleX(1);
  }
  80% {
    opacity: 1;
    transform: translateY(-50%) rotate(-135deg) scaleX(1);
  }
  100% {
    opacity: 0;
    transform: translateY(-50%) rotate(-135deg) scaleX(0);
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.3;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.6;
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(20px) scale(0.8);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0) scale(1);
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateY(-50%) translateX(-20px) scale(0.8);
  }
  to {
    opacity: 1;
    transform: translateY(-50%) translateX(0) scale(1);
  }
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(-20px) scale(0.8);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0) scale(1);
  }
}

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateY(-50%) translateX(20px) scale(0.8);
  }
  to {
    opacity: 1;
    transform: translateY(-50%) translateX(0) scale(1);
  }
}

@keyframes rotate3D {
  0% {
    transform: translate(-50%, -50%) rotateX(0deg) rotateY(0deg) rotateZ(0deg);
  }
  25% {
    transform: translate(-50%, -50%) rotateX(15deg) rotateY(90deg) rotateZ(5deg);
  }
  50% {
    transform: translate(-50%, -50%) rotateX(0deg) rotateY(180deg) rotateZ(0deg);
  }
  75% {
    transform: translate(-50%, -50%) rotateX(-15deg) rotateY(270deg) rotateZ(-5deg);
  }
  100% {
    transform: translate(-50%, -50%) rotateX(0deg) rotateY(360deg) rotateZ(0deg);
  }
}

@keyframes twinkle {
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
}

@keyframes fadeIn3D {
  from {
    opacity: 0.3;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes orbit1 {
  0% { 
    transform: translate(-80px, -60px) scale(0.7);
    opacity: 0.3;
  }
  25% { 
    transform: translate(-60px, -80px) scale(0.9);
    opacity: 0.6;
  }
  50% { 
    transform: translate(-40px, -60px) scale(0.8);
    opacity: 0.4;
  }
  75% { 
    transform: translate(-60px, -40px) scale(0.9);
    opacity: 0.6;
  }
  100% { 
    transform: translate(-80px, -60px) scale(0.7);
    opacity: 0.3;
  }
}

@keyframes orbit2 {
  0% { 
    transform: translate(60px, -40px) scale(0.8);
    opacity: 0.4;
  }
  25% { 
    transform: translate(80px, -20px) scale(0.9);
    opacity: 0.6;
  }
  50% { 
    transform: translate(60px, 0px) scale(0.7);
    opacity: 0.3;
  }
  75% { 
    transform: translate(40px, -20px) scale(0.9);
    opacity: 0.6;
  }
  100% { 
    transform: translate(60px, -40px) scale(0.8);
    opacity: 0.4;
  }
}

@keyframes orbit3 {
  0% { 
    transform: translate(-40px, 60px) scale(0.7);
    opacity: 0.3;
  }
  25% { 
    transform: translate(-20px, 80px) scale(0.9);
    opacity: 0.6;
  }
  50% { 
    transform: translate(0px, 60px) scale(0.8);
    opacity: 0.4;
  }
  75% { 
    transform: translate(-20px, 40px) scale(0.9);
    opacity: 0.6;
  }
  100% { 
    transform: translate(-40px, 60px) scale(0.7);
    opacity: 0.3;
  }
}

@keyframes orbit4 {
  0% { 
    transform: translate(60px, 20px) scale(0.8);
    opacity: 0.4;
  }
  25% { 
    transform: translate(80px, 40px) scale(0.9);
    opacity: 0.6;
  }
  50% { 
    transform: translate(60px, 60px) scale(0.7);
    opacity: 0.3;
  }
  75% { 
    transform: translate(40px, 40px) scale(0.9);
    opacity: 0.6;
  }
  100% { 
    transform: translate(60px, 20px) scale(0.8);
    opacity: 0.4;
  }
}

@keyframes orbit5 {
  0% { 
    transform: translate(-20px, -60px) scale(0.7);
    opacity: 0.3;
  }
  25% { 
    transform: translate(0px, -80px) scale(0.9);
    opacity: 0.6;
  }
  50% { 
    transform: translate(20px, -60px) scale(0.8);
    opacity: 0.4;
  }
  75% { 
    transform: translate(0px, -40px) scale(0.9);
    opacity: 0.6;
  }
  100% { 
    transform: translate(-20px, -60px) scale(0.7);
    opacity: 0.3;
  }
}

@keyframes orbit6 {
  0% { 
    transform: translate(40px, 40px) scale(0.8);
    opacity: 0.4;
  }
  25% { 
    transform: translate(60px, 60px) scale(0.9);
    opacity: 0.6;
  }
  50% { 
    transform: translate(40px, 80px) scale(0.7);
    opacity: 0.3;
  }
  75% { 
    transform: translate(20px, 60px) scale(0.9);
    opacity: 0.6;
  }
  100% { 
    transform: translate(40px, 40px) scale(0.8);
    opacity: 0.4;
  }
}

// 脉冲线条动画
@keyframes pulseLine {
  0% { 
    opacity: 0;
    transform: scaleX(0);
  }
  50% { 
    opacity: 1;
    transform: scaleX(1);
  }
  100% { 
    opacity: 0;
    transform: scaleX(0);
  }
}

// 随机星星闪烁动画
@keyframes twinkle {
  0%, 100% { 
    opacity: 0.3; 
    transform: scale(1); 
  }
  50% { 
    opacity: 1; 
    transform: scale(1.2); 
  }
}



@keyframes orbit7 {
  0% { 
    transform: translate(0px, 0px) scale(0.7);
    opacity: 0.3;
  }
  25% { 
    transform: translate(10px, -10px) scale(0.9);
    opacity: 0.6;
  }
  50% { 
    transform: translate(0px, -5px) scale(0.8);
    opacity: 0.4;
  }
  75% { 
    transform: translate(-5px, -10px) scale(0.9);
    opacity: 0.6;
  }
  100% { 
    transform: translate(0px, 0px) scale(0.7);
    opacity: 0.3;
  }
}

@keyframes orbit8 {
  0% { 
    transform: translate(0px, 0px) scale(0.8);
    opacity: 0.4;
  }
  25% { 
    transform: translate(-10px, 5px) scale(0.9);
    opacity: 0.6;
  }
  50% { 
    transform: translate(-5px, 0px) scale(0.7);
    opacity: 0.3;
  }
  75% { 
    transform: translate(5px, 5px) scale(0.9);
    opacity: 0.6;
  }
  100% { 
    transform: translate(0px, 0px) scale(0.8);
    opacity: 0.4;
  }
}

@keyframes orbit9 {
  0% { 
    transform: translate(0px, 0px) scale(0.7);
    opacity: 0.3;
  }
  25% { 
    transform: translate(5px, 10px) scale(0.9);
    opacity: 0.6;
  }
  50% { 
    transform: translate(0px, 5px) scale(0.8);
    opacity: 0.4;
  }
  75% { 
    transform: translate(-5px, 10px) scale(0.9);
    opacity: 0.6;
  }
  100% { 
    transform: translate(0px, 0px) scale(0.7);
    opacity: 0.3;
  }
}

@keyframes orbit10 {
  0% { 
    transform: translate(0px, 0px) scale(0.8);
    opacity: 0.4;
  }
  25% { 
    transform: translate(10px, -5px) scale(0.9);
    opacity: 0.6;
  }
  50% { 
    transform: translate(5px, 0px) scale(0.7);
    opacity: 0.3;
  }
  75% { 
    transform: translate(-10px, -5px) scale(0.9);
    opacity: 0.6;
  }
  100% { 
    transform: translate(0px, 0px) scale(0.8);
    opacity: 0.4;
  }
}

@keyframes orbit11 {
  0% { 
    transform: translate(0px, 0px) scale(0.7);
    opacity: 0.3;
  }
  25% { 
    transform: translate(-8px, 6px) scale(0.9);
    opacity: 0.6;
  }
  50% { 
    transform: translate(-4px, 3px) scale(0.8);
    opacity: 0.4;
  }
  75% { 
    transform: translate(6px, -4px) scale(0.9);
    opacity: 0.6;
  }
  100% { 
    transform: translate(0px, 0px) scale(0.7);
    opacity: 0.3;
  }
}

@keyframes orbit12 {
  0% { 
    transform: translate(0px, 0px) scale(0.8);
    opacity: 0.4;
  }
  25% { 
    transform: translate(7px, 8px) scale(0.9);
    opacity: 0.6;
  }
  50% { 
    transform: translate(3px, 4px) scale(0.7);
    opacity: 0.3;
  }
  75% { 
    transform: translate(-5px, 6px) scale(0.9);
    opacity: 0.6;
  }
  100% { 
    transform: translate(0px, 0px) scale(0.8);
    opacity: 0.4;
  }
}

@keyframes orbit13 {
  0% { 
    transform: translate(0px, 0px) scale(0.7);
    opacity: 0.3;
  }
  25% { 
    transform: translate(9px, -7px) scale(0.9);
    opacity: 0.6;
  }
  50% { 
    transform: translate(4px, -3px) scale(0.8);
    opacity: 0.4;
  }
  75% { 
    transform: translate(-6px, -5px) scale(0.9);
    opacity: 0.6;
  }
  100% { 
    transform: translate(0px, 0px) scale(0.7);
    opacity: 0.3;
  }
}

@keyframes orbit14 {
  0% { 
    transform: translate(0px, 0px) scale(0.8);
    opacity: 0.4;
  }
  25% { 
    transform: translate(-6px, 9px) scale(0.9);
    opacity: 0.6;
  }
  50% { 
    transform: translate(-3px, 4px) scale(0.7);
    opacity: 0.3;
  }
  75% { 
    transform: translate(8px, 7px) scale(0.9);
    opacity: 0.6;
  }
  100% { 
    transform: translate(0px, 0px) scale(0.8);
    opacity: 0.4;
  }
}

@keyframes orbit15 {
  0% { 
    transform: translate(0px, 0px) scale(0.7);
    opacity: 0.3;
  }
  25% { 
    transform: translate(8px, 5px) scale(0.9);
    opacity: 0.6;
  }
  50% { 
    transform: translate(4px, 2px) scale(0.8);
    opacity: 0.4;
  }
  75% { 
    transform: translate(-7px, 8px) scale(0.9);
    opacity: 0.6;
  }
  100% { 
    transform: translate(0px, 0px) scale(0.7);
    opacity: 0.3;
  }
}

@keyframes orbit16 {
  0% { 
    transform: translate(0px, 0px) scale(0.8);
    opacity: 0.4;
  }
  25% { 
    transform: translate(-9px, -6px) scale(0.9);
    opacity: 0.6;
  }
  50% { 
    transform: translate(-4px, -3px) scale(0.7);
    opacity: 0.3;
  }
  75% { 
    transform: translate(5px, -8px) scale(0.9);
    opacity: 0.6;
  }
  100% { 
    transform: translate(0px, 0px) scale(0.8);
    opacity: 0.4;
  }
}

@keyframes orbit17 {
  0% { 
    transform: translate(0px, 0px) scale(0.7);
    opacity: 0.3;
  }
  25% { 
    transform: translate(6px, -8px) scale(0.9);
    opacity: 0.6;
  }
  50% { 
    transform: translate(3px, -4px) scale(0.8);
    opacity: 0.4;
  }
  75% { 
    transform: translate(-8px, -5px) scale(0.9);
    opacity: 0.6;
  }
  100% { 
    transform: translate(0px, 0px) scale(0.7);
    opacity: 0.3;
  }
}

@keyframes orbit18 {
  0% { 
    transform: translate(0px, 0px) scale(0.8);
    opacity: 0.4;
  }
  25% { 
    transform: translate(-5px, 7px) scale(0.9);
    opacity: 0.6;
  }
  50% { 
    transform: translate(-2px, 3px) scale(0.7);
    opacity: 0.3;
  }
  75% { 
    transform: translate(9px, 6px) scale(0.9);
    opacity: 0.6;
  }
  100% { 
    transform: translate(0px, 0px) scale(0.8);
    opacity: 0.4;
  }
}

@keyframes orbit19 {
  0% { 
    transform: translate(0px, 0px) scale(0.7);
    opacity: 0.3;
  }
  25% { 
    transform: translate(7px, 9px) scale(0.9);
    opacity: 0.6;
  }
  50% { 
    transform: translate(3px, 4px) scale(0.8);
    opacity: 0.4;
  }
  75% { 
    transform: translate(-6px, 7px) scale(0.9);
    opacity: 0.6;
  }
  100% { 
    transform: translate(0px, 0px) scale(0.7);
    opacity: 0.3;
  }
}

@keyframes orbit20 {
  0% { 
    transform: translate(0px, 0px) scale(0.8);
    opacity: 0.4;
  }
  25% { 
    transform: translate(-8px, -7px) scale(0.9);
    opacity: 0.6;
  }
  50% { 
    transform: translate(-4px, -3px) scale(0.7);
    opacity: 0.3;
  }
  75% { 
    transform: translate(5px, -9px) scale(0.9);
    opacity: 0.6;
  }
  100% { 
    transform: translate(0px, 0px) scale(0.8);
    opacity: 0.4;
  }
}

.main-content {
  display: flex;
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  overflow: visible;
  max-width: 1200px;
  width: 100%;
  min-height: 600px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  z-index: 1;
  
  // 边框过渡效果
  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, 
      rgba(102, 126, 234, 0.3) 0%, 
      rgba(118, 75, 162, 0.3) 25%, 
      rgba(102, 126, 234, 0.3) 50%, 
      rgba(118, 75, 162, 0.3) 75%, 
      rgba(102, 126, 234, 0.3) 100%
    );
    border-radius: 22px;
    z-index: -1;
    animation: borderGlow 4s ease-in-out infinite;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: -1px;
    left: -1px;
    right: -1px;
    bottom: -1px;
    background: linear-gradient(135deg, 
      rgba(102, 126, 234, 0.1) 0%, 
      rgba(118, 75, 162, 0.1) 50%, 
      rgba(102, 126, 234, 0.1) 100%
    );
    border-radius: 21px;
    z-index: -1;
    animation: borderShimmer 3s ease-in-out infinite;
  }
}


.project-info {
  flex: 1;
  background: linear-gradient(135deg, #f8f9ff 0%, #e8ecff 50%, #d6e0ff 100%);
  color: #2c3e50;
  padding: 60px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  border-radius: 20px 0 0 20px;
  overflow: hidden;
  border: 2px solid transparent;
  background-clip: padding-box;
  background-image: 
    linear-gradient(135deg, #f8f9ff 0%, #e8ecff 50%, #d6e0ff 100%),
    linear-gradient(135deg, rgba(102, 126, 234, 0.3) 0%, rgba(118, 75, 162, 0.3) 50%, rgba(102, 126, 234, 0.3) 100%);
  background-origin: border-box;
  background-clip: padding-box, border-box;
  
  // 装饰性几何图案
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -20%;
    width: 200px;
    height: 200px;
    background: linear-gradient(45deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
    border-radius: 50%;
    pointer-events: none;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -30%;
    left: -10%;
    width: 150px;
    height: 150px;
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.08), rgba(118, 75, 162, 0.08));
    border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
    pointer-events: none;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  
  // 装饰线条
  .decorative-lines {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    z-index: 0;
    
    .line {
      position: absolute;
      background: linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.4), transparent);
      box-shadow: 0 0 8px rgba(102, 126, 234, 0.3);
      
      &.line-1 {
        top: 20%;
        left: 0;
        width: 100%;
        height: 2px;
        transform: rotate(-5deg);
        animation: lineMove1 6s ease-in-out infinite;
      }
      
      &.line-2 {
        top: 60%;
        left: 0;
        width: 80%;
        height: 2px;
        transform: rotate(3deg);
        animation: lineMove2 7s ease-in-out infinite;
      }
      
      &.line-3 {
        top: 80%;
        left: 20%;
        width: 60%;
        height: 2px;
        transform: rotate(-2deg);
        animation: lineMove3 8s ease-in-out infinite;
      }
    }
    
    // 浮动装饰形状
    .floating-shapes {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      
      .shape {
        position: absolute;
        border-radius: 50%;
        background: linear-gradient(135deg, rgba(102, 126, 234, 0.3) 0%, rgba(118, 75, 162, 0.3) 100%);
        box-shadow: 0 0 15px rgba(102, 126, 234, 0.4);
        
        &.shape-1 {
          width: 25px;
          height: 25px;
          top: 20%;
          left: 15%;
          animation: floatShape1 8s ease-in-out infinite;
        }
        
        &.shape-2 {
          width: 20px;
          height: 20px;
          top: 60%;
          right: 20%;
          animation: floatShape2 9s ease-in-out infinite;
        }
        
        &.shape-3 {
          width: 30px;
          height: 30px;
          bottom: 25%;
          left: 25%;
          animation: floatShape3 10s ease-in-out infinite;
        }
        
        &.shape-4 {
          width: 22px;
          height: 22px;
          top: 40%;
          right: 10%;
          animation: floatShape4 7s ease-in-out infinite;
        }
      }
    }
  }
  
  > * {
    position: relative;
    z-index: 1;
  }
  
  &:hover {
    transform: scale(1.03);
    box-shadow: 0 25px 50px rgba(102, 126, 234, 0.2);
    z-index: 10;
    background-image: 
      linear-gradient(135deg, #f8f9ff 0%, #e8ecff 50%, #d6e0ff 100%),
      linear-gradient(135deg, rgba(102, 126, 234, 0.5) 0%, rgba(118, 75, 162, 0.5) 50%, rgba(102, 126, 234, 0.5) 100%);
    
    &::before {
      transform: scale(1.2) rotate(45deg);
      background: linear-gradient(45deg, rgba(102, 126, 234, 0.15), rgba(118, 75, 162, 0.15));
    }
    
    &::after {
      transform: scale(1.1) rotate(-30deg);
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.12), rgba(118, 75, 162, 0.12));
    }
  }
}

.info-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.logo-section {
  text-align: center;
  margin-bottom: 40px;
}

.logo {
  width: 80px;
  height: 80px;
  margin: 0 auto 20px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
  
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
}

.project-title {
  font-size: 2.5em;
  font-weight: 700;
  margin: 0 0 10px 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;
  z-index: 16;
}

.project-subtitle {
  font-size: 1.2em;
  color: #5a6c7d;
  margin: 0;
  font-weight: 500;
  position: relative;
  z-index: 17;
}

.features {
  margin-bottom: 30px;
  position: relative;
  z-index: 18;
  
  h3 {
    font-size: 1.3em;
    margin-bottom: 15px;
    color: #2c3e50;
    font-weight: 600;
  }
  
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    
    .feature-item {
      padding: 12px 0;
      font-size: 1em;
      color: #5a6c7d;
      transition: all 0.4s ease;
      display: flex;
      align-items: center;
      gap: 12px;
      opacity: 0;
      transform: translateX(-30px);
      animation: slideInLeft 0.8s ease-out forwards;
      
      &:nth-child(1) { animation-delay: 0.2s; }
      &:nth-child(2) { animation-delay: 0.4s; }
      &:nth-child(3) { animation-delay: 0.6s; }
      &:nth-child(4) { animation-delay: 0.8s; }
      &:nth-child(5) { animation-delay: 1.0s; }
      &:nth-child(6) { animation-delay: 1.2s; }
      
      .feature-icon {
        font-size: 1.3em;
        transition: all 0.4s ease;
        animation: iconPulse 2s ease-in-out infinite;
      }
      
      .feature-text {
        transition: all 0.4s ease;
      }
      
      &:hover {
        color: #667eea;
        transform: translateX(15px) scale(1.05);
        
        .feature-icon {
          transform: scale(1.4);
        }
        
        .feature-text {
          font-weight: 600;
          color: #667eea;
        }
      }
    }
  }
}

.tech-stack {
  h3 {
    font-size: 1.3em;
    margin-bottom: 15px;
    color: #2c3e50;
    font-weight: 600;
  }
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tech-tag {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.15) 100%);
  color: #667eea;
  padding: 8px 16px;
  border-radius: 25px;
  font-size: 0.9em;
  border: 2px solid rgba(102, 126, 234, 0.3);
  transition: all 0.4s ease;
  font-weight: 500;
  opacity: 0;
  transform: translateY(30px) scale(0.8);
  animation: slideInUp 0.8s ease-out forwards;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.2);
  
  &.tech-tag-1 { animation-delay: 0.3s; }
  &.tech-tag-2 { animation-delay: 0.5s; }
  &.tech-tag-3 { animation-delay: 0.7s; }
  &.tech-tag-4 { animation-delay: 0.9s; }
  &.tech-tag-5 { animation-delay: 1.1s; }
  &.tech-tag-6 { animation-delay: 1.3s; }
  
  &:hover {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    transform: translateY(-5px) scale(1.1);
    box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
    border-color: #667eea;
  }
}

.auth-section {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  border-radius: 0 20px 20px 0;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%);
  border: 2px solid transparent;
  background-clip: padding-box;
  background-image: 
    linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%),
    linear-gradient(135deg, rgba(118, 75, 162, 0.3) 0%, rgba(102, 126, 234, 0.3) 50%, rgba(118, 75, 162, 0.3) 100%);
  background-origin: border-box;
  background-clip: padding-box, border-box;
  
  // 装饰性几何图案
  &::before {
    content: '';
    position: absolute;
    top: -40%;
    left: -20%;
    width: 250px;
    height: 250px;
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.15), rgba(118, 75, 162, 0.15));
    border-radius: 50%;
    pointer-events: none;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 0 30px rgba(102, 126, 234, 0.1);
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -50%;
    right: -25%;
    width: 180px;
    height: 180px;
    background: linear-gradient(45deg, rgba(102, 126, 234, 0.12), rgba(118, 75, 162, 0.12));
    border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
    pointer-events: none;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 0 25px rgba(118, 75, 162, 0.08);
  }
  
  
  // 网络节点容器
  .network-container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    z-index: 1;
    
    // 星星节点
    .star-node {
      position: absolute;
      width: 12px;
      height: 12px;
      
      .node-core {
        width: 100%;
        height: 100%;
        background: radial-gradient(circle, rgba(102, 126, 234, 0.8) 0%, rgba(102, 126, 234, 0.4) 50%, transparent 100%);
        border-radius: 50%;
        position: relative;
        z-index: 2;
      }
      
      .node-glow {
        position: absolute;
        top: -3px;
        left: -3px;
        width: 18px;
        height: 18px;
        background: radial-gradient(circle, rgba(102, 126, 234, 0.3) 0%, transparent 70%);
        border-radius: 50%;
        z-index: 1;
        animation: pulse 3s infinite ease-in-out;
      }
      
      &.node-1 { top: 20%; left: 30%; }
      &.node-2 { top: 40%; right: 25%; }
      &.node-3 { bottom: 30%; left: 20%; }
      &.node-4 { top: 60%; right: 40%; }
      &.node-5 { bottom: 20%; right: 20%; }
    }
    
    // 星星之间的连接线 - 简化设计，只保留主要连接
    .star-connection {
      position: absolute;
      background: linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.4), transparent);
      height: 2px;
      opacity: 0.2;
      transition: all 0.3s ease;
      border-radius: 1px;
      
      &.line-star1-2 {
        top: 30%;
        left: 30%;
        width: 25%;
        transform: rotate(15deg);
      }
      
      &.line-star2-4 {
        top: 50%;
        right: 32%;
        width: 15%;
        transform: rotate(45deg);
      }
      
      &.line-star3-5 {
        bottom: 25%;
        left: 20%;
        width: 30%;
        transform: rotate(60deg);
      }
    }
    
    // 随机散布的星星
    .random-star {
      position: absolute;
      width: 3px;
      height: 3px;
      background: radial-gradient(circle, rgba(102, 126, 234, 0.8) 0%, rgba(102, 126, 234, 0.4) 50%, transparent 100%);
      border-radius: 50%;
      box-shadow: 0 0 6px rgba(102, 126, 234, 0.6);
      animation: twinkle 3s infinite ease-in-out;
      
      // 随机位置分布
      &.star-1 { top: 15%; left: 25%; animation-delay: 0s; }
      &.star-2 { top: 35%; left: 15%; animation-delay: 0.3s; }
      &.star-3 { top: 55%; left: 35%; animation-delay: 0.6s; }
      &.star-4 { top: 25%; left: 55%; animation-delay: 0.9s; }
      &.star-5 { top: 45%; left: 65%; animation-delay: 1.2s; }
      &.star-6 { top: 65%; left: 25%; animation-delay: 1.5s; }
      &.star-7 { top: 75%; left: 45%; animation-delay: 1.8s; }
      &.star-8 { top: 85%; left: 65%; animation-delay: 2.1s; }
      &.star-9 { top: 5%; left: 45%; animation-delay: 2.4s; }
      &.star-10 { top: 15%; left: 75%; animation-delay: 2.7s; }
      &.star-11 { top: 25%; left: 85%; animation-delay: 0.2s; }
      &.star-12 { top: 45%; left: 5%; animation-delay: 0.5s; }
      &.star-13 { top: 65%; left: 55%; animation-delay: 0.8s; }
      &.star-14 { top: 85%; left: 15%; animation-delay: 1.1s; }
      &.star-15 { top: 5%; left: 65%; animation-delay: 1.4s; }
      &.star-16 { top: 35%; left: 85%; animation-delay: 1.7s; }
      &.star-17 { top: 55%; left: 5%; animation-delay: 2.0s; }
      &.star-18 { top: 75%; left: 75%; animation-delay: 2.3s; }
      &.star-19 { top: 95%; left: 35%; animation-delay: 2.6s; }
      &.star-20 { top: 5%; left: 15%; animation-delay: 2.9s; }
    }
    
    // 兴趣标签
    .interest-tag {
      position: absolute;
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.9) 0%, rgba(118, 75, 162, 0.8) 100%);
      color: white;
      padding: 8px 12px;
      border-radius: 20px;
      font-size: 11px;
      font-weight: 700;
      border: 2px solid rgba(255, 255, 255, 0.3);
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4), 0 0 20px rgba(102, 126, 234, 0.2);
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      display: flex;
      align-items: center;
      gap: 6px;
      opacity: 0.4;
      backdrop-filter: blur(10px);
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
      
      .tag-icon {
        font-size: 14px;
        line-height: 1;
        filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3));
      }
      
      .tag-text {
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 0.5px;
        text-transform: uppercase;
      }
      
      // 分散的标签位置和颜色主题 - 12个核心兴趣，充分利用页面空间
      // 前景标签（正常大小）- 分布在四个角落和中心区域
      &.tag-1 { 
        top: 8%; 
        left: 8%; 
        animation: orbit1 8s ease-in-out infinite;
        background: linear-gradient(135deg, rgba(102, 126, 234, 0.9) 0%, rgba(118, 75, 162, 0.8) 100%);
      }
      &.tag-2 { 
        top: 8%; 
        right: 8%; 
        animation: orbit2 7s ease-in-out infinite;
        background: linear-gradient(135deg, rgba(236, 72, 153, 0.9) 0%, rgba(219, 39, 119, 0.8) 100%);
      }
      &.tag-3 { 
        top: 50%; 
        left: 5%; 
        animation: orbit3 9s ease-in-out infinite;
        background: linear-gradient(135deg, rgba(34, 197, 94, 0.9) 0%, rgba(16, 185, 129, 0.8) 100%);
      }
      &.tag-4 { 
        top: 50%; 
        right: 5%; 
        animation: orbit4 6.5s ease-in-out infinite;
        background: linear-gradient(135deg, rgba(59, 130, 246, 0.9) 0%, rgba(37, 99, 235, 0.8) 100%);
      }
      &.tag-5 { 
        bottom: 8%; 
        left: 8%; 
        animation: orbit5 8.5s ease-in-out infinite;
        background: linear-gradient(135deg, rgba(245, 158, 11, 0.9) 0%, rgba(217, 119, 6, 0.8) 100%);
      }
      &.tag-6 { 
        bottom: 8%; 
        right: 8%; 
        animation: orbit6 7.5s ease-in-out infinite;
        background: linear-gradient(135deg, rgba(16, 185, 129, 0.9) 0%, rgba(5, 150, 105, 0.8) 100%);
      }
      
      // 中景标签（稍小一些）- 分布在中间区域，充分利用空间
      &.tag-7 { 
        top: 25%; 
        left: 20%; 
        animation: orbit7 8s ease-in-out infinite;
        background: linear-gradient(135deg, rgba(239, 68, 68, 0.9) 0%, rgba(220, 38, 38, 0.8) 100%);
        transform: scale(0.8);
        opacity: 0.6;
      }
      &.tag-8 { 
        top: 25%; 
        right: 20%; 
        animation: orbit8 7s ease-in-out infinite;
        background: linear-gradient(135deg, rgba(251, 146, 60, 0.9) 0%, rgba(249, 115, 22, 0.8) 100%);
        transform: scale(0.8);
        opacity: 0.6;
      }
      &.tag-9 { 
        top: 75%; 
        left: 20%; 
        animation: orbit9 9s ease-in-out infinite;
        background: linear-gradient(135deg, rgba(168, 85, 247, 0.9) 0%, rgba(147, 51, 234, 0.8) 100%);
        transform: scale(0.8);
        opacity: 0.6;
      }
      &.tag-10 { 
        top: 75%; 
        right: 20%; 
        animation: orbit10 6.5s ease-in-out infinite;
        background: linear-gradient(135deg, rgba(139, 69, 19, 0.9) 0%, rgba(120, 53, 15, 0.8) 100%);
        transform: scale(0.8);
        opacity: 0.6;
      }
      
      // 远景标签（更小，更远）- 填充中心区域
      &.tag-11 { 
        top: 15%; 
        left: 50%; 
        animation: orbit11 7.2s ease-in-out infinite;
        background: linear-gradient(135deg, rgba(34, 197, 94, 0.9) 0%, rgba(22, 163, 74, 0.8) 100%);
        transform: scale(0.6);
        opacity: 0.4;
      }
      &.tag-12 { 
        top: 85%; 
        left: 50%; 
        animation: orbit12 8.8s ease-in-out infinite;
        background: linear-gradient(135deg, rgba(168, 85, 247, 0.9) 0%, rgba(124, 58, 237, 0.8) 100%);
        transform: scale(0.6);
        opacity: 0.4;
      }
    }
  }
  
  // 3D星空装饰
  .starfield-container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    z-index: 0;
    perspective: 1000px;
    perspective-origin: center center;
  }
  
  .starfield {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 300px;
    height: 300px;
    transform: translate(-50%, -50%);
    transform-style: preserve-3d;
    animation: rotate3D 20s linear infinite;
    opacity: 0.3;
    transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    
    // 星星节点
    .star {
      position: absolute;
      width: 4px;
      height: 4px;
      background: radial-gradient(circle, rgba(102, 126, 234, 0.8) 0%, rgba(102, 126, 234, 0.4) 50%, transparent 100%);
      border-radius: 50%;
      box-shadow: 0 0 6px rgba(102, 126, 234, 0.6);
      animation: twinkle 3s infinite ease-in-out;
      
      // 随机分布在3D空间中
      &.star-1 { transform: translate3d(-80px, -60px, 50px); animation-delay: 0s; }
      &.star-2 { transform: translate3d(60px, -40px, 80px); animation-delay: 0.3s; }
      &.star-3 { transform: translate3d(-40px, 70px, 30px); animation-delay: 0.6s; }
      &.star-4 { transform: translate3d(90px, 20px, -20px); animation-delay: 0.9s; }
      &.star-5 { transform: translate3d(-20px, -90px, 60px); animation-delay: 1.2s; }
      &.star-6 { transform: translate3d(40px, 50px, 100px); animation-delay: 1.5s; }
      &.star-7 { transform: translate3d(-70px, 10px, -40px); animation-delay: 1.8s; }
      &.star-8 { transform: translate3d(20px, -70px, 20px); animation-delay: 2.1s; }
      &.star-9 { transform: translate3d(-50px, -20px, 90px); animation-delay: 2.4s; }
      &.star-10 { transform: translate3d(70px, -80px, -10px); animation-delay: 2.7s; }
      &.star-11 { transform: translate3d(-30px, 40px, 70px); animation-delay: 3s; }
      &.star-12 { transform: translate3d(50px, 80px, 40px); animation-delay: 3.3s; }
      &.star-13 { transform: translate3d(-90px, -30px, -30px); animation-delay: 3.6s; }
      &.star-14 { transform: translate3d(10px, -50px, 80px); animation-delay: 3.9s; }
      &.star-15 { transform: translate3d(-60px, 90px, 10px); animation-delay: 4.2s; }
      &.star-16 { transform: translate3d(80px, -10px, -50px); animation-delay: 4.5s; }
      &.star-17 { transform: translate3d(-10px, -80px, 30px); animation-delay: 4.8s; }
      &.star-18 { transform: translate3d(30px, 30px, 90px); animation-delay: 5.1s; }
      &.star-19 { transform: translate3d(-80px, 60px, -20px); animation-delay: 5.4s; }
      &.star-20 { transform: translate3d(60px, -60px, 50px); animation-delay: 5.7s; }
    }
    
    // 连接线
    .connection-line {
      position: absolute;
      background: linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.2), transparent);
      height: 1px;
      opacity: 0.3;
      transition: all 0.4s ease;
      
      &.line-1 {
        top: 50%;
        left: 50%;
        width: 80px;
        transform: translate(-50%, -50%) rotate(-30deg);
        transform-origin: center;
      }
      
      &.line-2 {
        top: 50%;
        left: 50%;
        width: 70px;
        transform: translate(-50%, -50%) rotate(30deg);
        transform-origin: center;
      }
      
      &.line-3 {
        top: 50%;
        left: 50%;
        width: 60px;
        transform: translate(-50%, -50%) rotate(-60deg);
        transform-origin: center;
      }
      
      &.line-4 {
        top: 50%;
        left: 50%;
        width: 75px;
        transform: translate(-50%, -50%) rotate(60deg);
        transform-origin: center;
      }
      
      &.line-5 {
        top: 50%;
        left: 50%;
        width: 65px;
        transform: translate(-50%, -50%) rotate(-90deg);
        transform-origin: center;
      }
      
      &.line-6 {
        top: 50%;
        left: 50%;
        width: 55px;
        transform: translate(-50%, -50%) rotate(90deg);
        transform-origin: center;
      }
      
      &.line-7 {
        top: 50%;
        left: 50%;
        width: 70px;
        transform: translate(-50%, -50%) rotate(-120deg);
        transform-origin: center;
      }
      
      &.line-8 {
        top: 50%;
        left: 50%;
        width: 60px;
        transform: translate(-50%, -50%) rotate(120deg);
        transform-origin: center;
      }
    }
  }
  
  
  &:hover {
    transform: scale(1.03);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
    z-index: 10;
    background-image: 
      linear-gradient(135deg, #ffffff 0%, #e8f0ff 100%),
      linear-gradient(135deg, rgba(118, 75, 162, 0.5) 0%, rgba(102, 126, 234, 0.5) 50%, rgba(118, 75, 162, 0.5) 100%);
    
    &::before {
      transform: scale(1.4) rotate(60deg);
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.25), rgba(118, 75, 162, 0.25));
      box-shadow: 0 0 40px rgba(102, 126, 234, 0.2);
    }
    
    &::after {
      transform: scale(1.3) rotate(-45deg);
      background: linear-gradient(45deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2));
      box-shadow: 0 0 35px rgba(118, 75, 162, 0.15);
    }
    
    .starfield {
      opacity: 0.8;
      transform: translate(-50%, -50%) scale(1.3);
      animation: rotate3D 8s linear infinite;
      
      .star {
        background: radial-gradient(circle, rgba(102, 126, 234, 1) 0%, rgba(102, 126, 234, 0.6) 50%, transparent 100%);
        box-shadow: 0 0 10px rgba(102, 126, 234, 0.8);
        animation: twinkle 2s infinite ease-in-out;
        width: 6px;
        height: 6px;
      }
      
      .connection-line {
        opacity: 0.6;
        background: linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.4), transparent);
        height: 2px;
        box-shadow: 0 0 4px rgba(102, 126, 234, 0.3);
      }
      
      .network-container {
        .star-node {
          .node-core {
            background: radial-gradient(circle, rgba(102, 126, 234, 1) 0%, rgba(102, 126, 234, 0.6) 50%, transparent 100%);
            box-shadow: 0 0 8px rgba(102, 126, 234, 0.8);
          }
          
          .node-glow {
            background: radial-gradient(circle, rgba(102, 126, 234, 0.5) 0%, transparent 70%);
            animation: pulse 1.5s infinite ease-in-out;
          }
        }
        
        .star-connection {
          opacity: 0.8;
          background: linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.6), transparent);
          box-shadow: 0 0 6px rgba(102, 126, 234, 0.5);
          height: 3px;
        }
        
        .tag-connection {
          opacity: 1;
          background: linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.8), transparent);
          box-shadow: 0 0 8px rgba(102, 126, 234, 0.6);
          height: 3px;
        }
        
        .random-star {
          opacity: 0.8;
          transform: scale(1.5);
          box-shadow: 0 0 12px rgba(102, 126, 234, 0.8);
          animation: twinkle 1.5s infinite ease-in-out;
        }
        
        .interest-tag {
          opacity: 1;
          color: white;
          border: 2px solid rgba(255, 255, 255, 0.5);
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.6), 0 0 30px rgba(102, 126, 234, 0.4);
          backdrop-filter: blur(15px);
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
          animation: none;
          
          // 前景标签悬停效果（正常放大）
          &.tag-1 { 
            transform: scale(1.2);
            opacity: 1;
            transition-delay: 0.1s;
            background: linear-gradient(135deg, rgba(102, 126, 234, 1) 0%, rgba(118, 75, 162, 0.95) 100%);
          }
          &.tag-2 { 
            transform: scale(1.2);
            opacity: 1;
            transition-delay: 0.2s;
            background: linear-gradient(135deg, rgba(236, 72, 153, 1) 0%, rgba(219, 39, 119, 0.95) 100%);
          }
          &.tag-3 { 
            transform: scale(1.2);
            opacity: 1;
            transition-delay: 0.3s;
            background: linear-gradient(135deg, rgba(34, 197, 94, 1) 0%, rgba(16, 185, 129, 0.95) 100%);
          }
          &.tag-4 { 
            transform: scale(1.2);
            opacity: 1;
            transition-delay: 0.4s;
            background: linear-gradient(135deg, rgba(59, 130, 246, 1) 0%, rgba(37, 99, 235, 0.95) 100%);
          }
          &.tag-5 { 
            transform: scale(1.2);
            opacity: 1;
            transition-delay: 0.5s;
            background: linear-gradient(135deg, rgba(245, 158, 11, 1) 0%, rgba(217, 119, 6, 0.95) 100%);
          }
          
          // 中景标签悬停效果（从0.8放大到1.0）
          &.tag-6 { 
            transform: scale(1.0);
            opacity: 1;
            transition-delay: 0.6s;
            background: linear-gradient(135deg, rgba(16, 185, 129, 1) 0%, rgba(5, 150, 105, 0.95) 100%);
          }
          &.tag-7 { 
            transform: scale(1.0);
            opacity: 1;
            transition-delay: 0.7s;
            background: linear-gradient(135deg, rgba(239, 68, 68, 1) 0%, rgba(220, 38, 38, 0.95) 100%);
          }
          &.tag-8 { 
            transform: scale(1.0);
            opacity: 1;
            transition-delay: 0.8s;
            background: linear-gradient(135deg, rgba(251, 146, 60, 1) 0%, rgba(249, 115, 22, 0.95) 100%);
          }
          &.tag-9 { 
            transform: scale(1.0);
            opacity: 1;
            transition-delay: 0.9s;
            background: linear-gradient(135deg, rgba(168, 85, 247, 1) 0%, rgba(147, 51, 234, 0.95) 100%);
          }
          &.tag-10 { 
            transform: scale(1.0);
            opacity: 1;
            transition-delay: 1.0s;
            background: linear-gradient(135deg, rgba(139, 69, 19, 1) 0%, rgba(120, 53, 15, 0.95) 100%);
          }
          
          // 远景标签悬停效果（从0.6放大到0.8）
          &.tag-11 { 
            transform: scale(0.8);
            opacity: 1;
            transition-delay: 1.1s;
            background: linear-gradient(135deg, rgba(34, 197, 94, 1) 0%, rgba(22, 163, 74, 0.95) 100%);
          }
          &.tag-12 { 
            transform: scale(0.8);
            opacity: 1;
            transition-delay: 1.2s;
            background: linear-gradient(135deg, rgba(168, 85, 247, 1) 0%, rgba(124, 58, 237, 0.95) 100%);
          }
        }
      }
    }
  }
}

.login-box {
  width: 100%;
  max-width: 400px;
  position: relative;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 10;
}

.login-title {
  text-align: center;
  margin-bottom: 30px;
  z-index: 11;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  .title-main {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
    margin-bottom: 15px;
    width: 100%;
    
    .title-icon {
      font-size: 2.2em;
      animation: bounce 2s ease-in-out infinite;
    }
    
    h1 {
      font-size: 2.8em;
      color: #333;
      font-weight: 700;
      margin: 0;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      letter-spacing: 2px;
    }
  }
  
  .title-subtitle {
    position: relative;
    text-align: center;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    
    .subtitle-text {
      font-size: 1.2em;
      color: #555;
      font-weight: 500;
      letter-spacing: 1px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    .title-icon {
      font-size: 1.4em;
      animation: bounce 2s ease-in-out infinite;
    }
    
    .subtitle-decoration {
      position: absolute;
      bottom: -8px;
      left: 50%;
      transform: translateX(-50%);
      width: 80px;
      height: 3px;
      background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
      border-radius: 2px;
      animation: pulse 2s ease-in-out infinite;
    }
  }
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.6;
    transform: translateX(-50%) scaleX(1);
  }
  50% {
    opacity: 1;
    transform: translateX(-50%) scaleX(1.2);
  }
}

// 左侧动态效果动画 - 增强版
@keyframes lineMove1 {
  0%, 100% { 
    transform: rotate(-5deg) translateX(0) scaleX(1);
    opacity: 0.3;
  }
  50% { 
    transform: rotate(-5deg) translateX(30px) scaleX(1.2);
    opacity: 0.8;
  }
}

@keyframes lineMove2 {
  0%, 100% { 
    transform: rotate(3deg) translateX(0) scaleX(1);
    opacity: 0.3;
  }
  50% { 
    transform: rotate(3deg) translateX(-25px) scaleX(1.1);
    opacity: 0.8;
  }
}

@keyframes lineMove3 {
  0%, 100% { 
    transform: rotate(-2deg) translateX(0) scaleX(1);
    opacity: 0.3;
  }
  50% { 
    transform: rotate(-2deg) translateX(20px) scaleX(1.3);
    opacity: 0.8;
  }
}

@keyframes floatShape1 {
  0%, 100% { 
    transform: translateY(0) rotate(0deg) scale(1);
    opacity: 0.4;
  }
  50% { 
    transform: translateY(-25px) rotate(360deg) scale(1.3);
    opacity: 0.9;
  }
}

@keyframes floatShape2 {
  0%, 100% { 
    transform: translateY(0) rotate(0deg) scale(1);
    opacity: 0.4;
  }
  50% { 
    transform: translateY(20px) rotate(-360deg) scale(1.2);
    opacity: 0.9;
  }
}

@keyframes floatShape3 {
  0%, 100% { 
    transform: translateY(0) rotate(0deg) scale(1);
    opacity: 0.4;
  }
  50% { 
    transform: translateY(-30px) rotate(360deg) scale(1.4);
    opacity: 0.9;
  }
}

@keyframes floatShape4 {
  0%, 100% { 
    transform: translateY(0) rotate(0deg) scale(1);
    opacity: 0.4;
  }
  50% { 
    transform: translateY(15px) rotate(-360deg) scale(1.1);
    opacity: 0.9;
  }
}

@keyframes slideInLeft {
  0% {
    opacity: 0;
    transform: translateX(-20px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInUp {
  0% {
    opacity: 0;
    transform: translateY(30px) scale(0.8);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes iconPulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

@keyframes borderGlow {
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.02);
  }
}

@keyframes borderShimmer {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}




.form-container {
  width: 100%;
  position: relative;
  z-index: 12;
}

.login-form,
.register-form {
  width: 100%;
}

:deep(.el-form-item) {
  margin-bottom: 20px;
}

// 输入框增强样式
.input-wrapper {
  position: relative;
  width: 100%;
  margin-bottom: 20px;
  
  .input-icon {
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 15;
    color: #667eea;
    font-size: 18px;
    transition: all 0.3s ease;
  }
  
  .enhanced-input {
    width: 100%;
    
    :deep(.el-input__wrapper) {
      width: 100%;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
      transition: all 0.3s ease;
      position: relative;
      z-index: 13;
      border: 2px solid transparent;
      background: linear-gradient(white, white) padding-box,
                  linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%) border-box;
      
      &:hover {
        box-shadow: 0 6px 20px rgba(102, 126, 234, 0.25);
        border-color: rgba(102, 126, 234, 0.3);
        transform: translateY(-2px);
      }
      
      &.is-focus {
        box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
        border-color: #667eea;
        transform: translateY(-3px);
      }
    }
    
    :deep(.el-input__inner) {
      padding-left: 50px;
      padding-right: 20px;
      font-size: 16px;
      color: #333;
      width: 100%;
      
      &::placeholder {
        color: #999;
        font-weight: 400;
      }
    }
  }
  
  .input-decoration {
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
    border-radius: 1px;
    transition: width 0.3s ease;
  }
  
  &:hover .input-decoration {
    width: 100%;
  }
  
  &:focus-within .input-decoration {
    width: 100%;
    animation: glow 1.5s ease-in-out infinite;
  }
}

@keyframes glow {
  0%, 100% {
    opacity: 0.6;
    box-shadow: 0 0 5px rgba(102, 126, 234, 0.5);
  }
  50% {
    opacity: 1;
    box-shadow: 0 0 15px rgba(102, 126, 234, 0.8);
  }
}

:deep(.el-input__wrapper) {
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
  z-index: 13;
  
  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
  
  &.is-focus {
    box-shadow: 0 4px 12px rgba(24, 144, 255, 0.3);
  }
}

.login-btn,
.register-btn {
  width: 100%;
  height: 50px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  z-index: 14;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s ease;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
    
    &::before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(0);
  }
}

.form-footer {
  text-align: center;
  margin-top: 20px;
  position: relative;
  z-index: 15;
}

.register-link,
.login-link {
  color: #007BFF;
  cursor: pointer;
  font-size: 14px;
  transition: color 0.3s ease;
  
  &:hover {
    color: #0056b3;
    text-decoration: underline;
  }
}

// 响应式设计
@media (max-width: 768px) {
  .stars .star {
    animation-duration: 4s;
  }
  
  .particles .particle {
    animation-duration: 10s;
  }
  
  .meteors .meteor {
    animation-duration: 3s;
  }
  
  .waves {
    height: 60px;
  }
  
  .wave {
    height: 60px;
  }
  
  .wave-2 {
    height: 50px;
  }
  
  .wave-3 {
    height: 40px;
  }
  
  .main-content {
    flex-direction: column;
    max-width: 100%;
    margin: 10px;
  }
  
  .project-info {
    padding: 40px 30px;
    min-height: 300px;
    border-radius: 20px 20px 0 0;
    
    &::before {
      border-radius: 20px 20px 0 0;
      width: 150px;
      height: 150px;
    }
    
    &::after {
      width: 120px;
      height: 120px;
    }
    
    &:hover {
      transform: scale(1.02);
    }
  }
  
  .auth-section {
    padding: 30px 20px;
    border-radius: 0 0 20px 20px;
    
    &::before {
      width: 140px;
      height: 140px;
    }
    
    &::after {
      width: 100px;
      height: 100px;
    }
    
    &:hover {
      transform: scale(1.02);
    }
  }
  
  .project-title {
    font-size: 2em;
  }
  
  .login-title {
    font-size: 2em;
  }
}

@media (max-width: 480px) {
  .stars .star {
    animation-duration: 5s;
  }
  
  .particles .particle {
    animation-duration: 12s;
  }
  
  .meteors .meteor {
    animation-duration: 4s;
  }
  
  .waves {
    height: 40px;
  }
  
  .wave {
    height: 40px;
  }
  
  .wave-2 {
    height: 35px;
  }
  
  .wave-3 {
    height: 30px;
  }
  
  .login-container {
    padding: 10px;
  }
  
  .main-content {
    margin: 5px;
    border-radius: 15px;
  }
  
  .project-info {
    padding: 30px 20px;
    border-radius: 15px 15px 0 0;
    
    &::before {
      border-radius: 15px 15px 0 0;
      width: 120px;
      height: 120px;
    }
    
    &::after {
      width: 100px;
      height: 100px;
    }
    
    &:hover {
      transform: scale(1.01);
    }
  }
  
  .auth-section {
    padding: 20px 15px;
    border-radius: 0 0 15px 15px;
    
    &::before {
      width: 100px;
      height: 100px;
    }
    
    &::after {
      width: 80px;
      height: 80px;
    }
    
    &:hover {
      transform: scale(1.01);
    }
  }
  
  .project-title {
    font-size: 1.8em;
  }
  
  .login-title {
    font-size: 1.8em;
  }
  
  .features ul li {
    font-size: 0.9em;
  }
  
  .tech-tag {
    font-size: 0.8em;
    padding: 4px 8px;
  }
}
</style>
