<template>
  <div class="left-panel">
    <!-- 用户信息框 -->
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
    
    <!-- 信息展示框 -->
    <div class="info-display-card">
      <!-- 日期天气 -->
      <div class="date-weather">
        <div class="date-info">
          <span class="date-text">{{ currentDate }}</span>
          <span class="weekday">{{ currentWeekday }}</span>
          <div class="time-info">{{ currentTime }}</div>
        </div>
        <div class="weather-info">
          <div class="weather-icon" :class="weatherClass">{{ weatherIcon }}</div>
          <span class="weather-text">{{ weatherText }}</span>
          <div class="weather-details">
            <span class="humidity">湿度 {{ weatherHumidity }}%</span>
            <span class="wind">风速 {{ weatherWind }}km/h</span>
          </div>
        </div>
      </div>
      
      <!-- 公告信息 -->
      <div class="announcement" @click="showAnnouncement">
        <div class="announcement-icon">📢</div>
        <span class="announcement-text">{{ announcementText }}</span>
        <div class="announcement-indicator" v-if="hasNewAnnouncement"></div>
      </div>
      
      <!-- 每日祝福 -->
      <div class="daily-blessing">
        <div class="blessing-icon">{{ blessingIcon }}</div>
        <span class="blessing-text">{{ blessingText }}</span>
      </div>
      
      <!-- 快捷操作 -->
      <div class="quick-actions">
        <!-- 保持原有空间，内容已移除 -->
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

// 时间相关
const currentDate = ref('')
const currentWeekday = ref('')
const currentTime = ref('')
let timeInterval = null

// 天气相关
const weatherIcon = ref('☀️')
const weatherText = ref('晴朗 22°C')
const weatherClass = ref('sunny')
const weatherHumidity = ref(65)
const weatherWind = ref(12)

// 公告相关
const announcementText = ref('欢迎使用GoChat！')
const hasNewAnnouncement = ref(true)

// 祝福相关
const blessingIcon = ref('🌟')
const blessingText = ref('今天也要开心聊天哦~')

// 获取当前时间
const getCurrentTime = () => {
  const now = new Date()
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  currentTime.value = `${hours}:${minutes}`
}

// 获取当前日期
const getCurrentDate = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  
  currentDate.value = `${year}-${month}-${day}`
  
  const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
  currentWeekday.value = weekdays[now.getDay()]
}

// 更新天气
const updateWeather = () => {
  const weathers = [
    { icon: '☀️', text: '晴朗 22°C', class: 'sunny', humidity: 65, wind: 12 },
    { icon: '⛅', text: '多云 18°C', class: 'cloudy', humidity: 70, wind: 8 },
    { icon: '🌧️', text: '小雨 15°C', class: 'rainy', humidity: 85, wind: 15 },
    { icon: '❄️', text: '雪天 -2°C', class: 'snowy', humidity: 90, wind: 20 }
  ]
  
  const randomWeather = weathers[Math.floor(Math.random() * weathers.length)]
  weatherIcon.value = randomWeather.icon
  weatherText.value = randomWeather.text
  weatherClass.value = randomWeather.class
  weatherHumidity.value = randomWeather.humidity
  weatherWind.value = randomWeather.wind
}

// 更新祝福语
const updateBlessing = () => {
  const blessings = [
    { icon: '🌟', text: '今天也要开心聊天哦~' },
    { icon: '💫', text: '愿你的每一天都充满阳光' },
    { icon: '✨', text: '新的一天，新的开始' },
    { icon: '🎉', text: '祝你今天好运连连' }
  ]
  
  const randomBlessing = blessings[Math.floor(Math.random() * blessings.length)]
  blessingIcon.value = randomBlessing.icon
  blessingText.value = randomBlessing.text
}

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

// 显示公告
const showAnnouncement = () => {
  console.log('显示公告详情')
  hasNewAnnouncement.value = false
}

// 点击其他地方关闭菜单
const handleClickOutside = (e) => {
  // 简单的点击外部关闭逻辑
  const avatar = document.querySelector('.user-avatar')
  const menu = document.querySelector('.avatar-menu')
  if (avatar && !avatar.contains(e.target) && menu && !menu.contains(e.target)) {
    showAvatarMenu.value = false
  }
}

onMounted(() => {
  getCurrentDate()
  getCurrentTime()
  updateWeather()
  updateBlessing()
  
  // 每秒更新时间
  timeInterval = setInterval(() => {
    getCurrentTime()
  }, 1000)
  
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  if (timeInterval) {
    clearInterval(timeInterval)
  }
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style lang="scss" scoped>
.left-panel {
  width: 350px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  z-index: 1;
}

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

/* 信息展示卡片 */
.info-display-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(250, 251, 252, 0.8));
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.info-display-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(168, 85, 247, 0.3), transparent);
}

.info-display-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

.date-weather {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #e5e7eb;
}

.date-info {
  display: flex;
  flex-direction: column;
}

.date-text {
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
}

.weekday {
  font-size: 12px;
  color: #6b7280;
}

.time-info {
  font-size: 14px;
  color: #667eea;
  font-weight: 500;
  margin-top: 4px;
}

.weather-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.weather-icon {
  font-size: 24px;
  transition: transform 0.3s ease;
}

.weather-icon.sunny {
  animation: rotate 4s linear infinite;
}

.weather-icon.cloudy {
  animation: float 3s ease-in-out infinite;
}

.weather-icon.rainy {
  animation: shake 0.5s ease-in-out infinite;
}

.weather-icon.snowy {
  animation: float 2s ease-in-out infinite;
}

.weather-text {
  font-size: 14px;
  color: #374151;
  font-weight: 500;
}

.weather-details {
  display: flex;
  gap: 8px;
  font-size: 10px;
  color: #6b7280;
}

.humidity, .wind {
  padding: 2px 6px;
  background: #f3f4f6;
  border-radius: 8px;
}

.announcement, .daily-blessing {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  padding: 8px;
  border-radius: 12px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.announcement:hover, .daily-blessing:hover {
  background: rgba(102, 126, 234, 0.1);
  transform: translateX(5px);
}

.announcement-icon, .blessing-icon {
  font-size: 16px;
}

.announcement-text, .blessing-text {
  font-size: 14px;
  color: #374151;
}

.announcement-indicator {
  width: 8px;
  height: 8px;
  background: #ef4444;
  border-radius: 50%;
  margin-left: auto;
  animation: pulse 2s infinite;
}

/* 动画 */
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

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes shake {
  0%, 100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-2px);
  }
  75% {
    transform: translateX(2px);
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

/* 响应式设计 */
@media (max-width: 768px) {
  .left-panel {
    width: 100%;
    padding: 15px;
  }
}
</style>

