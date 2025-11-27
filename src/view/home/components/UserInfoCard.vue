<template>
  <div class="user-info-card">
    <!-- 用户头像 -->
    <div class="user-avatar" @click="showAvatarMenu = !showAvatarMenu">
      <img src="/logo.png" alt="用户头像" class="avatar-img">
      <div class="avatar-border"></div>
      <div class="avatar-overlay">
        <i class="icon-camera">📷</i>
      </div>
    </div>
    
    <!-- 头像菜单 -->
    <div class="avatar-menu" v-if="showAvatarMenu">
      <div class="menu-item" @click="changeAvatar">
        <i class="icon-upload">📤</i>
        <span>更换头像</span>
      </div>
      <div class="menu-item" @click="viewProfile">
        <i class="icon-profile">👤</i>
        <span>查看资料</span>
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
    
    <!-- 用户详细资料按钮 -->
    <div class="user-profile-btn">
      <button class="profile-button" @click="viewProfile">
        <i class="icon-user">👤</i>
        查看详细资料
        <div class="button-shine"></div>
      </button>
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

const emit = defineEmits(['search-tag', 'view-profile'])

// 用户信息
const userName = ref('GoChat用户')
const userLevel = ref(15)
const levelProgress = ref(68)
const userStatus = ref('在线')
const statusClass = ref('online')
const showAvatarMenu = ref(false)

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

// 查看资料
const viewProfile = () => {
  console.log('查看用户资料')
  showAvatarMenu.value = false
  emit('view-profile')
}

// 更换头像
const changeAvatar = () => {
  console.log('更换头像')
  showAvatarMenu.value = false
}

// 显示所有标签
const showAllTags = () => {
  console.log('显示所有标签')
}

// 点击其他地方关闭菜单
const handleClickOutside = (e) => {
  const avatar = document.querySelector('.user-avatar')
  const menu = document.querySelector('.avatar-menu')
  if (avatar && !avatar.contains(e.target) && menu && !menu.contains(e.target)) {
    showAvatarMenu.value = false
  }
}

onMounted(() => {
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
  overflow: hidden;
}

.user-info-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.user-info-card:hover::before {
  left: 100%;
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
.user-profile-btn {
  margin-bottom: 20px;
}

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

