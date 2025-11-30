<template>
  <div class="user-info-card">
    <!-- 左上角菜单按钮 -->
    <div class="menu-trigger" @click.stop="toggleMenu">
      <div class="hamburger-icon">
        <span></span>
        <span></span>
        <span></span>
      </div>
      
      <!-- 下拉菜单 -->
      <transition name="fade-scale">
        <div v-if="showMenu" class="dropdown-menu" @click.stop>
          <div class="menu-header">
            <span class="menu-greeting">你好, {{ userName }}</span>
          </div>
          <div class="menu-divider"></div>
          <div class="menu-item" @click="viewProfile">
            <i class="icon-profile">👤</i>
            <span>个人资料</span>
          </div>
          <div class="menu-item" @click="changeAvatar">
            <i class="icon-upload">📷</i>
            <span>更换头像</span>
          </div>
          <div class="menu-item">
            <i class="icon-settings">⚙️</i>
            <span>设置</span>
          </div>
          <div class="menu-divider"></div>
          <div class="menu-item danger" @click="handleLogout">
            <i class="icon-logout">🚪</i>
            <span>退出登录</span>
          </div>
        </div>
      </transition>
    </div>

    <!-- 用户头像 -->
    <div class="user-avatar" @click="viewProfile">
      <img src="/logo.png" alt="用户头像" class="avatar-img">
      <div class="avatar-border"></div>
      <div class="avatar-overlay">
        <i class="icon-camera">📷</i>
      </div>
    </div>
    
    <!-- 用户活跃度 -->
    <div class="user-activity">
      <div class="activity-indicator">
        <div class="activity-pulse"></div>
        <div class="activity-ring"></div>
        <div class="activity-dots">
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
        </div>
      </div>
      <span class="activity-text">{{ userStatus }}</span>
      <div class="status-indicator" :class="statusClass"></div>
    </div>
    
    <!-- 用户名 -->
    <div class="user-name">
      <h3>{{ userName }}</h3>
      <div class="user-level">
        <span class="level-badge">Lv.{{ userLevel }}</span>
        <div class="level-progress">
          <div class="progress-bar" :style="{ width: levelProgress + '%' }"></div>
        </div>
      </div>
    </div>
    
    <!-- 用户统计 -->
    <div class="user-stats">
      <div class="stat-item">
        <div class="stat-number">{{ userStats.friends }}</div>
        <div class="stat-label">好友</div>
      </div>
      <div class="stat-item">
        <div class="stat-number">{{ userStats.messages }}</div>
        <div class="stat-label">消息</div>
      </div>
      <div class="stat-item">
        <div class="stat-number">{{ userStats.days }}</div>
        <div class="stat-label">活跃天数</div>
      </div>
    </div>
    
    <!-- 用户标签简略展示 -->
    <div class="user-tags">
      <div class="tag-item" v-for="tag in userTags" :key="tag.id" @click="$emit('search-tag', tag)">
        <span class="tag-text">{{ tag.name }}</span>
        <div class="tag-hover-effect"></div>
      </div>
      <div class="tag-more" v-if="userTags.length > 3" @click="showAllTags">
        <span>+{{ userTags.length - 3 }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessageBox, ElMessage } from 'element-plus'
import { useLoginStore } from '@/pinia/modules/login'
import { logout } from '@/api/login'
import { clearUserLoginInfo } from '@/utils/login'

const router = useRouter()
const loginStore = useLoginStore()

const emit = defineEmits(['search-tag', 'view-profile'])

// 用户信息
const userName = ref('GoChat用户')
const userLevel = ref(15)
const levelProgress = ref(68)
const userStatus = ref('在线')
const statusClass = ref('online')
const showAvatarMenu = ref(false)
const showMenu = ref(false)

// 用户统计
const userStats = ref({
  friends: 128,
  messages: 2567,
  days: 45
})

// 用户标签
const userTags = ref([
  { id: 1, name: '编程' },
  { id: 2, name: '音乐' },
  { id: 3, name: '旅行' },
  { id: 4, name: '摄影' },
  { id: 5, name: '美食' }
])

// 菜单切换
const toggleMenu = () => {
  showMenu.value = !showMenu.value
}

// 查看资料
const viewProfile = () => {
  console.log('查看用户资料')
  showMenu.value = false
  emit('view-profile')
}

// 更换头像
const changeAvatar = () => {
  console.log('更换头像')
  showMenu.value = false
}

// 显示所有标签
const showAllTags = () => {
  console.log('显示所有标签')
}

// 退出登录
const handleLogout = () => {
  showMenu.value = false
  ElMessageBox.confirm(
    '确定要退出登录吗？',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(async () => {
      try {
        // 尝试调用注销接口
        const accountNum = loginStore.currentUser || sessionStorage.getItem('currentUser')
        if (accountNum) {
          try {
            await logout({ accountNum, password: '' })
          } catch (e) {
            console.warn('注销接口调用失败，继续执行本地清除', e)
          }
        }
        
        // 清理本地存储和状态
        clearUserLoginInfo()
        loginStore.clearUserData()
        
        ElMessage({
          type: 'success',
          message: '已退出登录',
        })
        router.push('/login')
      } catch (error) {
        console.error('退出登录出错:', error)
        // 强制退出
        clearUserLoginInfo()
        router.push('/login')
      }
    })
    .catch(() => {
      // 取消退出
    })
}

// 点击其他地方关闭菜单
const handleClickOutside = (e) => {
  // 检查点击的目标是否在 menuTrigger 或其子元素中
  const menuTrigger = document.querySelector('.menu-trigger')
  // 如果点击的不是触发器且不是触发器内部元素，则关闭菜单
  if (showMenu.value && menuTrigger && !menuTrigger.contains(e.target)) {
    showMenu.value = false
  }
}

onMounted(() => {
  // 使用 capture 阶段或者绑定到 window 上以确保能捕获到点击
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style lang="scss" scoped>
/* 用户信息卡片 */
.user-info-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(248, 250, 252, 0.9));
  border-radius: 20px;
  padding: 25px;
  box-shadow: 0 15px 45px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(25px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  transition: all 0.3s ease;
  position: relative;
  
  /* 全局禁止选择，防止出现光标 */
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* 菜单触发器 & 下拉菜单 */
.menu-trigger {
  position: absolute;
  top: 20px;
  left: 20px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 100;
  border-radius: 50%;
  background: linear-gradient(45deg, #667eea, #764ba2);
  box-shadow: 0 4px 10px rgba(102, 126, 234, 0.3);
  transition: all 0.3s ease;
  overflow: visible;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(102, 126, 234, 0.4);
  }
}

.hamburger-icon {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 14px;
  width: 18px;
  
  span {
    display: block;
    height: 2px;
    width: 100%;
    background-color: white;
    border-radius: 2px;
    transition: all 0.3s ease;
  }
}

.menu-trigger:hover .hamburger-icon span:nth-child(1) {
  width: 70%;
}

.menu-trigger:hover .hamburger-icon span:nth-child(3) {
  width: 70%;
  align-self: flex-end;
}

.dropdown-menu {
  position: absolute;
  top: 120%;
  left: 0;
  width: 220px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.5);
  padding: 10px;
  transform-origin: top left;
  z-index: 1000;
  animation: slideIn 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  
  /* 禁止整个菜单的文本选择 */
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  .menu-header {
    padding: 12px 16px;
    
    .menu-greeting {
      font-size: 15px;
      font-weight: 600;
      color: #1f2937;
      letter-spacing: 0.3px;
    }
  }

  .menu-divider {
    height: 1px;
    background: linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,0.1), rgba(0,0,0,0));
    margin: 6px 0;
  }

  .menu-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 16px;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.2s ease;
    color: #4b5563;
    font-size: 14px;
    font-weight: 500;
    
    /* 确保子元素也不可选择 */
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    &:hover {
      background: linear-gradient(90deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
      color: #667eea;
      transform: translateX(4px);
    }
    
    &.danger {
      color: #ef4444;
      &:hover {
        background: rgba(239, 68, 68, 0.1);
        color: #dc2626;
      }
    }
    
    i {
      font-style: normal;
      font-size: 16px;
      width: 20px;
      text-align: center;
    }
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* 动画 */
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.2s ease;
}

.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

/* .user-info-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transition: left 0.5s;
}

.user-info-card:hover::before {
  left: 100%;
} */

.user-info-card:hover {
  transform: scale(1.02);
}

.user-avatar {
  position: relative;
  width: 80px;
  height: 80px;
  margin: 0 auto 20px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.user-avatar:hover {
  transform: scale(1.05);
}

.avatar-img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  transition: all 0.3s ease;
}

.avatar-border {
  position: absolute;
  top: -3px;
  left: -3px;
  right: -3px;
  bottom: -3px;
  border-radius: 50%;
  background: linear-gradient(45deg, #667eea, #764ba2);
  z-index: -1;
  animation: rotate 3s linear infinite;
}

.avatar-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.user-avatar:hover .avatar-overlay {
  opacity: 1;
}

.avatar-menu {
  position: absolute;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  padding: 8px;
  z-index: 10;
  animation: slideDown 0.3s ease;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s ease;
  font-size: 14px;
}

.menu-item:hover {
  background: #f3f4f6;
}

/* 用户活跃度 */
.user-activity {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 15px;
}

.activity-indicator {
  position: relative;
  width: 16px;
  height: 16px;
}

.activity-pulse {
  width: 100%;
  height: 100%;
  background: #4ade80;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

.activity-ring {
  position: absolute;
  top: -4px;
  left: -4px;
  right: -4px;
  bottom: -4px;
  border: 2px solid #4ade80;
  border-radius: 50%;
  opacity: 0.3;
  animation: ring 2s infinite;
}

.activity-dots {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  gap: 2px;
}

.dot {
  width: 2px;
  height: 2px;
  background: #4ade80;
  border-radius: 50%;
  animation: dotPulse 1.5s infinite;
}

.dot:nth-child(2) {
  animation-delay: 0.2s;
}

.dot:nth-child(3) {
  animation-delay: 0.4s;
}

.activity-text {
  color: #4ade80;
  font-size: 14px;
  font-weight: 500;
}

.status-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-left: 4px;
}

.status-indicator.online {
  background: #4ade80;
}

.status-indicator.busy {
  background: #f59e0b;
}

.status-indicator.away {
  background: #6b7280;
}

/* 用户名 */
.user-name {
  text-align: center;
  margin-bottom: 20px;
}

.user-name h3 {
  margin: 0 0 8px 0;
  color: #1f2937;
  font-size: 20px;
  font-weight: 600;
}

.user-level {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.level-badge {
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}

.level-progress {
  width: 60px;
  height: 4px;
  background: #e5e7eb;
  border-radius: 2px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(45deg, #667eea, #764ba2);
  border-radius: 2px;
  transition: width 0.3s ease;
}

/* 用户统计 */
.user-stats {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
  padding: 15px 0;
  border-top: 1px solid #e5e7eb;
  border-bottom: 1px solid #e5e7eb;
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 18px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 12px;
  color: #6b7280;
}

/* 用户资料按钮 */
/* .user-profile-btn {
  margin-bottom: 20px;
} */

.profile-button {
  width: 100%;
  padding: 12px;
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  position: relative;
  overflow: hidden;
}

/* .profile-button.icon-only {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  padding: 0;
  margin: 0 auto;
}

.hamburger-icon {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 14px;
  width: 20px;
}

.hamburger-icon span {
  display: block;
  height: 2px;
  width: 100%;
  background-color: white;
  border-radius: 2px;
  transition: all 0.3s ease;
}

.profile-button:hover .hamburger-icon span:nth-child(1) {
  width: 70%;
}

.profile-button:hover .hamburger-icon span:nth-child(3) {
  width: 70%;
  align-self: flex-end;
} */

.profile-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

.button-shine {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.profile-button:hover .button-shine {
  left: 100%;
}

/* 用户标签 */
.user-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
}

.tag-item {
  background: linear-gradient(45deg, #f3f4f6, #e5e7eb);
  color: #374151;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.tag-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.tag-hover-effect {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.3s;
}

.tag-item:hover .tag-hover-effect {
  left: 100%;
}

.tag-more {
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.tag-more:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

@keyframes ring {
  0% {
    transform: scale(1);
    opacity: 0.3;
  }
  100% {
    transform: scale(1.4);
    opacity: 0;
  }
}

@keyframes dotPulse {
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

