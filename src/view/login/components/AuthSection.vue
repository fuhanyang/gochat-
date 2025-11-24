<template>
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
      
      <!-- 兴趣标签 - 12个核心兴趣标签 -->
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
    
    <!-- 主要内容区域 -->
    <div class="main-auth-content">
      <!-- 表单标题 -->
      <div class="form-header">
        <div class="title-section">
        <div class="title-subtitle">
          <span class="subtitle-text">{{ showRegister ? '开启您的聊天新世界' : '连接世界，分享兴趣' }}</span>
          <div class="subtitle-decoration"></div>
        </div>
        
        <!-- 动态提示文字 -->
        <div class="dynamic-tips">
          <div class="tip-item" v-if="!showRegister">
            <span class="tip-text">快速登录，开启精彩聊天</span>
          </div>
          <div class="tip-item" v-if="showRegister">
            <span class="tip-text">加入我们，发现更多可能</span>
          </div>
        </div>
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
          <span class="register-link" @click="$emit('toggle-register')">
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
          <span class="login-link" @click="$emit('toggle-register')">
            已有账号？立即登录
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

// 定义props
const props = defineProps({
  showRegister: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  }
})

// 定义emits
const emit = defineEmits(['toggle-register', 'login', 'register'])

// 表单数据
const loginForm = reactive({
  accountNum: '',
  password: ''
})

const registerForm = reactive({
  username: '',
  password: '',
  passwordConfirm: ''
})

// 表单验证规则
const loginRules = {
  accountNum: [
    { required: true, message: '请输入账号', trigger: 'blur' },
    { min: 3, max: 20, message: '账号长度在 3 到 20 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度在 6 到 20 个字符', trigger: 'blur' }
  ]
}

const registerRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '用户名长度在 3 到 20 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度在 6 到 20 个字符', trigger: 'blur' }
  ],
  passwordConfirm: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== registerForm.password) {
          callback(new Error('两次输入密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}

// 表单引用
const loginFormRef = ref(null)
const registerFormRef = ref(null)

// 处理登录
const handleLogin = () => {
  if (loginFormRef.value) {
    loginFormRef.value.validate((valid) => {
      if (valid) {
        emit('login', loginForm)
      }
    })
  }
}

// 处理注册
const handleRegister = () => {
  if (registerFormRef.value) {
    registerFormRef.value.validate((valid) => {
      if (valid) {
        emit('register', registerForm)
      }
    })
  }
}
</script>

<style scoped lang="scss">
.auth-section {
  flex: 1;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  border-radius: 0 20px 20px 0;
  overflow: hidden;
  min-height: 600px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  
  &:hover {
    transform: scale(1.02);
    box-shadow: 0 25px 50px rgba(102, 126, 234, 0.3);
    z-index: 10;
  }
  
  // 主要内容区域 - 向上调整
  .main-auth-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    max-width: 500px;
    position: relative;
    z-index: 10;
    margin-top: -20px;
  }
  
  // 3D星空装饰
  .starfield-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
    perspective: 1000px;
    perspective-origin: center center;
    
    .starfield {
      position: relative;
      width: 100%;
      height: 100%;
      transform-style: preserve-3d;
      
      .star {
        position: absolute;
        background: rgba(255, 255, 255, 0.8);
        border-radius: 50%;
        box-shadow: 0 0 10px rgba(255, 255, 255, 0.6);
        animation: twinkle 3s infinite ease-in-out;
        
        &.star-1 { top: 10%; left: 15%; width: 3px; height: 3px; animation-delay: 0s; }
        &.star-2 { top: 20%; left: 80%; width: 2px; height: 2px; animation-delay: 0.5s; }
        &.star-3 { top: 30%; left: 25%; width: 4px; height: 4px; animation-delay: 1s; }
        &.star-4 { top: 40%; left: 70%; width: 2px; height: 2px; animation-delay: 1.5s; }
        &.star-5 { top: 50%; left: 20%; width: 3px; height: 3px; animation-delay: 2s; }
        &.star-6 { top: 60%; left: 85%; width: 2px; height: 2px; animation-delay: 2.5s; }
        &.star-7 { top: 70%; left: 30%; width: 4px; height: 4px; animation-delay: 3s; }
        &.star-8 { top: 80%; left: 75%; width: 2px; height: 2px; animation-delay: 3.5s; }
        &.star-9 { top: 15%; left: 50%; width: 3px; height: 3px; animation-delay: 4s; }
        &.star-10 { top: 25%; left: 10%; width: 2px; height: 2px; animation-delay: 4.5s; }
        &.star-11 { top: 35%; left: 90%; width: 4px; height: 4px; animation-delay: 5s; }
        &.star-12 { top: 45%; left: 40%; width: 2px; height: 2px; animation-delay: 5.5s; }
        &.star-13 { top: 55%; left: 60%; width: 3px; height: 3px; animation-delay: 6s; }
        &.star-14 { top: 65%; left: 5%; width: 2px; height: 2px; animation-delay: 6.5s; }
        &.star-15 { top: 75%; left: 45%; width: 4px; height: 4px; animation-delay: 7s; }
        &.star-16 { top: 85%; left: 15%; width: 2px; height: 2px; animation-delay: 7.5s; }
        &.star-17 { top: 5%; left: 35%; width: 3px; height: 3px; animation-delay: 8s; }
        &.star-18 { top: 90%; left: 55%; width: 2px; height: 2px; animation-delay: 8.5s; }
        &.star-19 { top: 12%; left: 65%; width: 4px; height: 4px; animation-delay: 9s; }
        &.star-20 { top: 88%; left: 35%; width: 2px; height: 2px; animation-delay: 9.5s; }
      }
      
      .connection-line {
        position: absolute;
        height: 1px;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent);
        animation: pulseLine 4s infinite ease-in-out;
        
        &.line-1 { top: 15%; left: 10%; width: 20%; animation-delay: 0s; }
        &.line-2 { top: 25%; left: 70%; width: 15%; animation-delay: 1s; }
        &.line-3 { top: 35%; left: 20%; width: 25%; animation-delay: 2s; }
        &.line-4 { top: 45%; left: 60%; width: 18%; animation-delay: 3s; }
        &.line-5 { top: 55%; left: 15%; width: 22%; animation-delay: 4s; }
        &.line-6 { top: 65%; left: 75%; width: 16%; animation-delay: 5s; }
        &.line-7 { top: 75%; left: 30%; width: 20%; animation-delay: 6s; }
        &.line-8 { top: 85%; left: 80%; width: 14%; animation-delay: 7s; }
      }
    }
  }
  
  // 网络节点容器
  .network-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 2;
    
    // 星星节点
    .star-node {
      position: absolute;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.3) 100%);
      box-shadow: 0 0 20px rgba(255, 255, 255, 0.8);
      animation: twinkle 2s infinite ease-in-out;
      
      .node-core {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 6px;
        height: 6px;
        background: rgba(255, 255, 255, 1);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        box-shadow: 0 0 10px rgba(255, 255, 255, 1);
      }
      
      .node-glow {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        animation: pulse 2s infinite ease-in-out;
      }
      
      &.node-1 { top: 20%; left: 20%; animation-delay: 0s; }
      &.node-2 { top: 30%; left: 70%; animation-delay: 0.5s; }
      &.node-3 { top: 50%; left: 30%; animation-delay: 1s; }
      &.node-4 { top: 70%; left: 80%; animation-delay: 1.5s; }
      &.node-5 { top: 80%; left: 40%; animation-delay: 2s; }
    }
    
    // 星星之间的连接线
    .star-connection {
      position: absolute;
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent);
      box-shadow: 0 0 5px rgba(255, 255, 255, 0.6);
      animation: pulseLine 3s infinite ease-in-out;
      
      &.line-star1-2 { top: 25%; left: 20%; width: 50%; transform: rotate(15deg); animation-delay: 0s; }
      &.line-star1-3 { top: 35%; left: 20%; width: 10%; transform: rotate(90deg); animation-delay: 0.5s; }
      &.line-star2-4 { top: 50%; left: 70%; width: 20%; transform: rotate(90deg); animation-delay: 1s; }
      &.line-star3-5 { top: 65%; left: 30%; width: 15%; transform: rotate(90deg); animation-delay: 1.5s; }
      &.line-star4-5 { top: 75%; left: 60%; width: 20%; transform: rotate(-15deg); animation-delay: 2s; }
      &.line-star2-3 { top: 40%; left: 50%; width: 20%; transform: rotate(-30deg); animation-delay: 2.5s; }
    }
    
    // 随机散布的星星
    .random-star {
      position: absolute;
      background: rgba(255, 255, 255, 0.6);
      border-radius: 50%;
      box-shadow: 0 0 8px rgba(255, 255, 255, 0.4);
      animation: twinkle 4s infinite ease-in-out;
      
      &.star-1 { top: 10%; left: 10%; width: 2px; height: 2px; animation-delay: 0s; }
      &.star-2 { top: 15%; left: 85%; width: 3px; height: 3px; animation-delay: 0.5s; }
      &.star-3 { top: 25%; left: 45%; width: 2px; height: 2px; animation-delay: 1s; }
      &.star-4 { top: 35%; left: 15%; width: 3px; height: 3px; animation-delay: 1.5s; }
      &.star-5 { top: 40%; left: 75%; width: 2px; height: 2px; animation-delay: 2s; }
      &.star-6 { top: 55%; left: 25%; width: 3px; height: 3px; animation-delay: 2.5s; }
      &.star-7 { top: 60%; left: 90%; width: 2px; height: 2px; animation-delay: 3s; }
      &.star-8 { top: 75%; left: 50%; width: 3px; height: 3px; animation-delay: 3.5s; }
      &.star-9 { top: 85%; left: 20%; width: 2px; height: 2px; animation-delay: 4s; }
      &.star-10 { top: 90%; left: 70%; width: 3px; height: 3px; animation-delay: 4.5s; }
      &.star-11 { top: 5%; left: 30%; width: 2px; height: 2px; animation-delay: 5s; }
      &.star-12 { top: 12%; left: 60%; width: 3px; height: 3px; animation-delay: 5.5s; }
      &.star-13 { top: 18%; left: 35%; width: 2px; height: 2px; animation-delay: 6s; }
      &.star-14 { top: 22%; left: 80%; width: 3px; height: 3px; animation-delay: 6.5s; }
      &.star-15 { top: 28%; left: 55%; width: 2px; height: 2px; animation-delay: 7s; }
      &.star-16 { top: 32%; left: 25%; width: 3px; height: 3px; animation-delay: 7.5s; }
      &.star-17 { top: 38%; left: 65%; width: 2px; height: 2px; animation-delay: 8s; }
      &.star-18 { top: 42%; left: 40%; width: 3px; height: 3px; animation-delay: 8.5s; }
      &.star-19 { top: 48%; left: 85%; width: 2px; height: 2px; animation-delay: 9s; }
      &.star-20 { top: 52%; left: 15%; width: 3px; height: 3px; animation-delay: 9.5s; }
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
      cursor: pointer;
      
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
      
      // 远景标签（最小）- 分布在边缘区域，增加层次感
      &.tag-11 { 
        top: 15%; 
        left: 50%; 
        animation: orbit11 8.5s ease-in-out infinite;
        background: linear-gradient(135deg, rgba(6, 182, 212, 0.9) 0%, rgba(8, 145, 178, 0.8) 100%);
        transform: scale(0.6);
        opacity: 0.5;
      }
      &.tag-12 { 
        bottom: 15%; 
        left: 50%; 
        animation: orbit12 7.5s ease-in-out infinite;
        background: linear-gradient(135deg, rgba(156, 163, 175, 0.9) 0%, rgba(107, 114, 128, 0.8) 100%);
        transform: scale(0.6);
        opacity: 0.5;
      }
      
      // 悬停效果
      &:hover {
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
        &.tag-6 { 
          transform: scale(1.2);
          opacity: 1;
          transition-delay: 0.6s;
          background: linear-gradient(135deg, rgba(16, 185, 129, 1) 0%, rgba(5, 150, 105, 0.95) 100%);
        }
        
        // 中景标签悬停效果（放大到正常大小）
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
        
        // 远景标签悬停效果（放大到正常大小）
        &.tag-11 { 
          transform: scale(0.8);
          opacity: 1;
          transition-delay: 1.1s;
          background: linear-gradient(135deg, rgba(6, 182, 212, 1) 0%, rgba(8, 145, 178, 0.95) 100%);
        }
        &.tag-12 { 
          transform: scale(0.8);
          opacity: 1;
          transition-delay: 1.2s;
          background: linear-gradient(135deg, rgba(156, 163, 175, 1) 0%, rgba(107, 114, 128, 0.95) 100%);
        }
      }
    }
  }
  
  // 表单标题
  .form-header {
    position: relative;
    z-index: 10;
    text-align: center;
    margin-bottom: 30px;
    width: 100%;
    
    .title-section {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      
      .title-subtitle {
        position: relative;
        text-align: center;
        width: 100%;
        margin-bottom: 20px;
        
        .subtitle-text {
          font-size: 1.4em;
          color: rgba(255, 255, 255, 1);
          font-weight: 700;
          letter-spacing: 1.5px;
          text-shadow: 0 2px 6px rgba(0, 0, 0, 0.6), 0 0 10px rgba(255, 255, 255, 0.3);
          animation: fadeInUp 1s ease-out;
          display: block;
          line-height: 1.4;
        }
        
        .subtitle-decoration {
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 100px;
          height: 3px;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent);
          border-radius: 2px;
          animation: pulseLine 3s ease-in-out infinite;
        }
      }
      
      // 动态提示文字
      .dynamic-tips {
        margin-top: 10px;
        
        .tip-item {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 12px 24px;
          background: rgba(255, 255, 255, 0.12);
          border-radius: 25px;
          border: 1px solid rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(15px);
          animation: fadeInUp 1.2s ease-out;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          
          .tip-text {
            font-size: 1em;
            color: rgba(255, 255, 255, 0.9);
            font-weight: 500;
            letter-spacing: 0.8px;
            text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
          }
        }
      }
    }
  }
  
  // 表单容器
  .form-container {
    position: relative;
    z-index: 10;
    width: 100%;
    max-width: 400px;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(20px);
    border-radius: 20px;
    padding: 25px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    animation: fadeInUp 0.8s ease-out;
    margin-top: 5px;
  }
  
  .login-form,
  .register-form {
    .el-form-item {
      margin-bottom: 25px;
      
      .input-wrapper {
        position: relative;
        
        .input-icon {
          position: absolute;
          left: 15px;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(255, 255, 255, 0.7);
          z-index: 2;
          font-size: 16px;
        }
        
        .enhanced-input {
          :deep(.el-input__wrapper) {
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.3);
            border-radius: 12px;
            padding-left: 45px;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            
            &:hover {
              border-color: rgba(255, 255, 255, 0.5);
              background: rgba(255, 255, 255, 0.15);
            }
            
            &.is-focus {
              border-color: rgba(255, 255, 255, 0.8);
              background: rgba(255, 255, 255, 0.2);
              box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
            }
          }
          
          :deep(.el-input__inner) {
            color: white;
            
            &::placeholder {
              color: rgba(255, 255, 255, 0.6);
            }
          }
        }
        
        .input-decoration {
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #667eea, #764ba2);
          transition: width 0.3s ease;
        }
        
        &:hover .input-decoration {
          width: 100%;
        }
      }
    }
    
    .login-btn,
    .register-btn {
      width: 100%;
      height: 50px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border: none;
      border-radius: 12px;
      font-size: 16px;
      font-weight: 600;
      color: white;
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
      
      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(102, 126, 234, 0.6);
      }
      
      &:active {
        transform: translateY(0);
      }
    }
  }
  
  .form-footer {
    text-align: center;
    margin-top: 20px;
    
    .register-link,
    .login-link {
      color: rgba(255, 255, 255, 0.8);
      cursor: pointer;
      transition: all 0.3s ease;
      font-size: 14px;
      
      &:hover {
        color: white;
        text-decoration: underline;
      }
    }
  }
}

// 动画定义
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

@keyframes pulseLine {
  0%, 100% {
    opacity: 0.2;
    transform: scaleX(1);
  }
  50% {
    opacity: 0.6;
    transform: scaleX(1.2);
  }
}

@keyframes fadeIn3D {
  from {
    opacity: 0;
    transform: translate3d(0, 0, -100px) rotateX(45deg);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0) rotateX(0deg);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes glow {
  0%, 100% {
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }
  50% {
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3), 0 0 20px rgba(255, 255, 255, 0.3);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) scale(1);
    opacity: 0.3;
  }
  50% {
    transform: translateY(-10px) scale(1.1);
    opacity: 0.6;
  }
}

// Orbit动画定义 - 让标签像星图一样运动（保持文字可读性）
@keyframes orbit1 {
  0%, 100% { transform: translate(0, 0); }
  25% { transform: translate(10px, -5px); }
  50% { transform: translate(5px, 10px); }
  75% { transform: translate(-5px, 5px); }
}

@keyframes orbit2 {
  0%, 100% { transform: translate(0, 0); }
  25% { transform: translate(-8px, 6px); }
  50% { transform: translate(-6px, -8px); }
  75% { transform: translate(8px, -4px); }
}

@keyframes orbit3 {
  0%, 100% { transform: translate(0, 0); }
  25% { transform: translate(12px, 4px); }
  50% { transform: translate(-4px, 12px); }
  75% { transform: translate(-8px, -6px); }
}

@keyframes orbit4 {
  0%, 100% { transform: translate(0, 0); }
  25% { transform: translate(-10px, -8px); }
  50% { transform: translate(8px, -10px); }
  75% { transform: translate(6px, 8px); }
}

@keyframes orbit5 {
  0%, 100% { transform: translate(0, 0); }
  25% { transform: translate(6px, -12px); }
  50% { transform: translate(-12px, -6px); }
  75% { transform: translate(-6px, 12px); }
}

@keyframes orbit6 {
  0%, 100% { transform: translate(0, 0); }
  25% { transform: translate(-8px, 10px); }
  50% { transform: translate(10px, 8px); }
  75% { transform: translate(8px, -10px); }
}

@keyframes orbit7 {
  0%, 100% { transform: translate(0, 0); }
  25% { transform: translate(14px, -6px); }
  50% { transform: translate(-6px, 14px); }
  75% { transform: translate(-14px, 6px); }
}

@keyframes orbit8 {
  0%, 100% { transform: translate(0, 0); }
  25% { transform: translate(-12px, -10px); }
  50% { transform: translate(10px, -12px); }
  75% { transform: translate(12px, 10px); }
}

@keyframes orbit9 {
  0%, 100% { transform: translate(0, 0); }
  25% { transform: translate(8px, -14px); }
  50% { transform: translate(-14px, -8px); }
  75% { transform: translate(-8px, 14px); }
}

@keyframes orbit10 {
  0%, 100% { transform: translate(0, 0); }
  25% { transform: translate(-10px, 12px); }
  50% { transform: translate(12px, 10px); }
  75% { transform: translate(10px, -12px); }
}

@keyframes orbit11 {
  0%, 100% { transform: translate(0, 0); }
  25% { transform: translate(16px, -8px); }
  50% { transform: translate(-8px, 16px); }
  75% { transform: translate(-16px, 8px); }
}

@keyframes orbit12 {
  0%, 100% { transform: translate(0, 0); }
  25% { transform: translate(-14px, -12px); }
  50% { transform: translate(12px, -14px); }
  75% { transform: translate(14px, 12px); }
}

// 响应式设计
@media (max-width: 768px) {
  .auth-section {
    padding: 30px 20px;
    border-radius: 0 0 20px 20px;
    min-height: 500px;
    
    &:hover {
      transform: scale(1.01);
    }
    
    .form-container {
      padding: 30px 20px;
      max-width: 100%;
    }
    
    .network-container .interest-tag {
      font-size: 0.7em;
      padding: 6px 10px;
    }
    
  }
}

@media (max-width: 480px) {
  .auth-section {
    padding: 20px 15px;
    min-height: 400px;
    
    .form-container {
      padding: 20px 15px;
    }
    
    .network-container .interest-tag {
      font-size: 0.6em;
      padding: 4px 8px;
    }
  }
}
</style>
