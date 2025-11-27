<template>
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
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

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

// 显示公告
const showAnnouncement = () => {
  console.log('显示公告详情')
  hasNewAnnouncement.value = false
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
})

onUnmounted(() => {
  if (timeInterval) {
    clearInterval(timeInterval)
  }
})
</script>

<style lang="scss" scoped>
/* 信息展示卡片 */
.info-display-card {
  flex: 1; /* 自动填充剩余高度，与右侧对齐 */
  display: flex;
  flex-direction: column;
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

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
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
</style>

