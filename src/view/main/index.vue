<template>
  <div class="main-page">
    <!-- 背景装饰 -->
    <div class="background-decoration">
      <div class="floating-shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
        <div class="shape shape-4"></div>
      </div>
    </div>
    
    <!-- 左侧用户信息区域 -->
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
          <div class="tag-item" v-for="tag in userTags" :key="tag.id" @click="searchByTag(tag)">
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
    
    <!-- 右侧主内容区域 -->
    <div class="right-panel">
      <!-- 标签栏 -->
      <div class="tab-bar">
        <div class="tab-item" :class="{ active: activeTab === 'friends' }" @click="activeTab = 'friends'">
          <i class="tab-icon">👥</i>
          <span>好友列表</span>
          <div class="tab-count">{{ friends.length }}</div>
        </div>
        <div class="tab-item" :class="{ active: activeTab === 'matching' }" @click="activeTab = 'matching'">
          <i class="tab-icon">💫</i>
          <span>智能匹配</span>
          <div class="tab-count">{{ matchedUsers.length }}</div>
        </div>
        <div class="tab-item" :class="{ active: activeTab === 'search' }" @click="activeTab = 'search'">
          <i class="tab-icon">🔍</i>
          <span>搜索用户</span>
        </div>
      </div>
      
      <!-- 好友列表标签页 -->
      <div class="tab-content" v-if="activeTab === 'friends'">
        <!-- 搜索栏 -->
        <div class="search-section">
          <div class="search-box">
            <div class="search-icon">🔍</div>
            <input 
              type="text" 
              placeholder="搜索好友..." 
              v-model="friendSearchQuery"
              class="search-input"
            >
          </div>
        </div>
        
          <!-- 好友列表 -->
          <div class="friends-list">
            <!-- 粒子效果 -->
            <div class="particles-container">
              <div class="particle" v-for="n in 8" :key="`friend-particle-${n}`"></div>
            </div>
            <!-- 聊天提示 -->
            <transition name="fade-slide" appear>
              <div class="chat-prompt" v-if="filteredFriends.length > 0">
                <div class="prompt-icon">💬</div>
                <div class="prompt-text">
                  <span class="prompt-title">开始一段对话</span>
                  <span class="prompt-subtitle">双击好友头像开始聊天</span>
                </div>
                <div class="prompt-animation">
                  <div class="pulse-ring"></div>
                </div>
              </div>
            </transition>
            
            <transition-group name="scroll-unfold" tag="div" class="friend-list-container">
              <div 
                class="friend-item scroll-item" 
                v-for="(friend, index) in filteredFriends" 
                :key="friend.id"
                :style="{ '--delay': index * 0.1 + 's' }"
                @dblclick="openChat(friend)"
                @contextmenu="showFriendMenu($event, friend)"
              >
            <!-- 好友头像 -->
            <div class="friend-avatar">
              <img :src="friend.avatar" alt="好友头像" class="friend-avatar-img">
              <div class="online-indicator" v-if="friend.isOnline"></div>
              <div class="typing-indicator" v-if="friend.isTyping">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
              </div>
            </div>
            
            <!-- 好友信息 -->
            <div class="friend-info">
              <div class="friend-name">
                {{ friend.name }}
                <span class="friend-status" v-if="friend.status">{{ friend.status }}</span>
              </div>
              <div class="friend-last-message" :class="{ 'unread': friend.unreadCount > 0 }">
                {{ friend.lastMessage }}
              </div>
            </div>
            
            <!-- 消息状态 -->
            <div class="message-status">
              <div class="message-time">{{ friend.lastTime }}</div>
              <div class="unread-count" v-if="friend.unreadCount > 0">
                {{ friend.unreadCount > 99 ? '99+' : friend.unreadCount }}
              </div>
            </div>
              </div>
            </transition-group>
            
            <!-- 空状态 -->
            <transition name="fade" appear>
              <div class="empty-state" v-if="filteredFriends.length === 0">
                <div class="empty-icon">👥</div>
                <div class="empty-text">暂无好友</div>
                <div class="empty-hint">去智能匹配或搜索用户添加好友吧~</div>
              </div>
            </transition>
        </div>
      </div>
      
      <!-- 智能匹配标签页 -->
      <div class="tab-content" v-if="activeTab === 'matching'">
        <!-- 匹配控制 -->
        <div class="matching-controls smooth-height-transition">
          <div class="matching-title">
            <h3>基于标签的智能匹配</h3>
            <p>系统会根据你的兴趣标签为你推荐志同道合的朋友</p>
          </div>
            <div class="matching-actions">
              <transition name="btn-pulse" appear>
                <button class="match-btn" @click="startMatching" :disabled="isMatching">
                  <i class="icon-match">🎯</i>
                  {{ isMatching ? '匹配中...' : '开始匹配' }}
                  <div class="btn-glow" v-if="!isMatching"></div>
                </button>
              </transition>
            <button class="refresh-btn" @click="refreshMatching">
              <i class="icon-refresh">🔄</i>
              刷新推荐
            </button>
          </div>
          
          <!-- 匹配动画 - 与按钮同行显示 -->
          <transition name="slide-down" appear>
            <div class="matching-animation" v-if="isMatching">
              <div class="matching-dots">
                <div class="matching-dot"></div>
                <div class="matching-dot"></div>
                <div class="matching-dot"></div>
              </div>
              <div class="matching-text">正在为你寻找最合适的聊天伙伴...</div>
            </div>
          </transition>
          </div>
          
          
          <!-- 匹配结果 -->
          <div class="matching-results" :class="{ 'smooth-transition': true }">
            <!-- 粒子效果 -->
            <div class="particles-container">
              <div class="particle" v-for="n in 6" :key="`match-particle-${n}`"></div>
            </div>
            <transition-group name="match-list" tag="div" class="match-list-container">
              <div 
                class="match-item scroll-item" 
                v-for="(user, index) in matchedUsers" 
                :key="user.id"
                :style="{ '--delay': index * 0.1 + 's' }"
                @click="showUserProfile(user)"
              >
            <!-- 用户头像 -->
            <div class="match-avatar">
              <img :src="user.avatar" alt="用户头像" class="match-avatar-img">
              <div class="match-score">{{ user.matchScore }}%</div>
            </div>
            
            <!-- 用户信息 -->
            <div class="match-info">
              <div class="match-name">{{ user.name }}</div>
              <div class="match-age">{{ user.age }}岁 · {{ user.location }}</div>
              <div class="match-tags">
                <span class="match-tag" v-for="tag in user.commonTags" :key="tag">
                  {{ tag }}
                </span>
              </div>
              <div class="match-description">{{ user.description }}</div>
            </div>
            
            <!-- 匹配操作 -->
            <div class="match-actions">
              <button class="action-btn like-btn" @click.stop="likeUser(user)">
                <i class="icon-like">❤️</i>
              </button>
              <button class="action-btn chat-btn" @click.stop="startChat(user)">
                <i class="icon-chat">💬</i>
              </button>
            </div>
              </div>
            </transition-group>
            
            <!-- 空状态 -->
            <transition name="fade" appear>
              <div class="empty-state" v-if="matchedUsers.length === 0">
                <div class="empty-icon">💫</div>
                <div class="empty-text">暂无匹配用户</div>
                <div class="empty-hint">点击"开始匹配"寻找志同道合的朋友</div>
              </div>
            </transition>
        </div>
      </div>
      
      <!-- 搜索用户标签页 -->
      <div class="tab-content" v-if="activeTab === 'search'">
        <!-- 搜索栏 -->
        <div class="search-section">
          <div class="search-box">
            <div class="search-icon">🔍</div>
            <input 
              type="text" 
              placeholder="搜索用户名、标签..." 
              v-model="userSearchQuery"
              class="search-input"
              @input="searchUsers"
            >
          </div>
        </div>
        
          <!-- 搜索结果 -->
          <div class="search-results">
            <!-- 粒子效果 -->
            <div class="particles-container">
              <div class="particle" v-for="n in 5" :key="`search-particle-${n}`"></div>
            </div>
            <transition-group name="search-list" tag="div" class="search-list-container">
              <div 
                class="search-item scroll-item" 
                v-for="(user, index) in searchResults" 
                :key="user.id"
                :style="{ '--delay': index * 0.1 + 's' }"
                @click="showUserProfile(user)"
                @mouseenter="handleSearchItemHover($event, user)"
              >
            <!-- 用户头像 -->
            <div class="search-avatar">
              <img :src="user.avatar" alt="用户头像" class="search-avatar-img">
              <div class="search-status" :class="user.isFriend ? 'friend' : 'stranger'">
                {{ user.isFriend ? '好友' : '陌生人' }}
              </div>
            </div>
            
            <!-- 用户信息 -->
            <div class="search-info">
              <div class="search-name">{{ user.name }}</div>
              <div class="search-details">{{ user.age }}岁 · {{ user.location }}</div>
              <div class="search-tags">
                <span class="search-tag" v-for="tag in user.tags" :key="tag">
                  {{ tag }}
                </span>
              </div>
            </div>
            
            <!-- 搜索操作 -->
            <div class="search-actions">
              <button 
                class="action-btn" 
                :class="user.isFriend ? 'chat-btn' : 'add-btn'"
                @click.stop="user.isFriend ? openChat(user) : sendFriendRequest(user)"
              >
                <i class="icon-action">{{ user.isFriend ? '💬' : '➕' }}</i>
                {{ user.isFriend ? '聊天' : '添加' }}
              </button>
            </div>
            </div>
          </transition-group>
          
          <!-- 空状态 -->
          <transition name="fade" appear>
            <div class="empty-state" v-if="searchResults.length === 0 && userSearchQuery">
              <div class="empty-icon">🔍</div>
              <div class="empty-text">未找到相关用户</div>
              <div class="empty-hint">尝试其他关键词或标签</div>
            </div>
          </transition>
        </div>
      </div>
    </div>
    
    <!-- 用户资料弹窗 -->
    <div class="user-profile-modal" v-if="showUserProfileModal" @click="closeUserProfile">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>用户资料</h3>
          <button class="close-btn" @click="closeUserProfile">✕</button>
        </div>
        
        <div class="modal-body">
          <!-- 用户头像 -->
          <div class="profile-avatar">
            <img :src="selectedUser?.avatar" alt="用户头像" class="profile-avatar-img">
            <div class="profile-status" :class="selectedUser?.isOnline ? 'online' : 'offline'">
              {{ selectedUser?.isOnline ? '在线' : '离线' }}
            </div>
          </div>
          
          <!-- 用户基本信息 -->
          <div class="profile-info">
            <h4 class="profile-name">{{ selectedUser?.name }}</h4>
            <div class="profile-details">
              <span class="profile-age">{{ selectedUser?.age }}岁</span>
              <span class="profile-location">{{ selectedUser?.location }}</span>
            </div>
            <div class="profile-description">{{ selectedUser?.description }}</div>
          </div>
          
          <!-- 用户标签 -->
          <div class="profile-tags">
            <h5>兴趣标签</h5>
            <div class="tags-list">
              <span class="profile-tag" v-for="tag in selectedUser?.tags" :key="tag">
                {{ tag }}
              </span>
            </div>
          </div>
          
          <!-- 匹配度 -->
          <div class="profile-match" v-if="selectedUser?.matchScore">
            <h5>匹配度</h5>
            <div class="match-score-bar">
              <div class="match-score-fill" :style="{ width: selectedUser.matchScore + '%' }"></div>
              <span class="match-score-text">{{ selectedUser.matchScore }}%</span>
            </div>
            <div class="match-reason">共同兴趣：{{ selectedUser?.commonTags?.join('、') }}</div>
          </div>
          
          <!-- 操作按钮 -->
          <div class="profile-actions">
            <button 
              class="action-button" 
              :class="selectedUser?.isFriend ? 'chat-button' : 'add-button'"
              @click="selectedUser?.isFriend ? openChat(selectedUser) : sendFriendRequest(selectedUser)"
            >
              <i class="action-icon">{{ selectedUser?.isFriend ? '💬' : '➕' }}</i>
              {{ selectedUser?.isFriend ? '开始聊天' : '发送好友申请' }}
            </button>
            <button class="action-button like-button" @click="likeUser(selectedUser)">
              <i class="action-icon">❤️</i>
              点赞
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 右键菜单 -->
    <div class="context-menu" v-if="showContextMenu" :style="contextMenuStyle">
      <div class="menu-item" @click="viewFriendProfile">
        <i class="icon-profile">👤</i>
        <span>查看资料</span>
      </div>
      <div class="menu-item" @click="muteFriend">
        <i class="icon-mute">🔇</i>
        <span>静音</span>
      </div>
      <div class="menu-item" @click="deleteFriend">
        <i class="icon-delete">🗑️</i>
        <span>删除好友</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 标签页相关
const activeTab = ref('friends')

// 搜索相关
const friendSearchQuery = ref('')
const userSearchQuery = ref('')
const showSearchSuggestions = ref(false)
const searchSuggestions = ref([
  { id: 1, icon: '👤', text: '搜索用户' },
  { id: 2, icon: '👥', text: '搜索群组' },
  { id: 3, icon: '💬', text: '搜索消息' }
])

// 匹配相关
const isMatching = ref(false)
const matchedUsers = ref([])
const searchResults = ref([])

// 用户资料弹窗
const showUserProfileModal = ref(false)
const selectedUser = ref(null)

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

// 好友列表
const friends = ref([
  {
    id: 1,
    name: '张三',
    avatar: '/logo.png',
    isOnline: true,
    isTyping: false,
    status: '忙碌',
    lastMessage: '你好，最近怎么样？',
    lastTime: '10:30',
    unreadCount: 2
  },
  {
    id: 2,
    name: '李四',
    avatar: '/logo.png',
    isOnline: false,
    isTyping: false,
    status: '',
    lastMessage: '明天一起吃饭吧',
    lastTime: '昨天',
    unreadCount: 0
  },
  {
    id: 3,
    name: '王五',
    avatar: '/logo.png',
    isOnline: true,
    isTyping: true,
    status: '在线',
    lastMessage: '这个项目很有意思',
    lastTime: '09:15',
    unreadCount: 5
  },
  {
    id: 4,
    name: '赵六',
    avatar: '/logo.png',
    isOnline: false,
    isTyping: false,
    status: '',
    lastMessage: '谢谢你的帮助',
    lastTime: '前天',
    unreadCount: 0
  },
  {
    id: 5,
    name: '钱七',
    avatar: '/logo.png',
    isOnline: true,
    isTyping: false,
    status: '在线',
    lastMessage: '周末有空吗？',
    lastTime: '08:45',
    unreadCount: 1
  }
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

// 交互状态
const hoveredFriend = ref(null)
const showContextMenu = ref(false)
const contextMenuStyle = ref({})
const selectedFriend = ref(null)

// 过滤后的好友列表
const filteredFriends = computed(() => {
  if (!friendSearchQuery.value) {
    return friends.value
  }
  return friends.value.filter(friend => 
    friend.name.toLowerCase().includes(friendSearchQuery.value.toLowerCase()) ||
    friend.lastMessage.toLowerCase().includes(friendSearchQuery.value.toLowerCase())
  )
})

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

// 打开聊天
const openChat = (friend) => {
  console.log('打开与', friend.name, '的聊天')
  // TODO: 跳转到聊天页面
}

// 查看资料
const viewProfile = () => {
  console.log('查看用户资料')
  showAvatarMenu.value = false
}

// 更换头像
const changeAvatar = () => {
  console.log('更换头像')
  showAvatarMenu.value = false
}

// 按标签搜索
const searchByTag = (tag) => {
  searchQuery.value = tag.name
  console.log('按标签搜索:', tag.name)
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


// 搜索相关
const performSearch = () => {
  console.log('执行搜索:', searchQuery.value)
}

const hideSearchSuggestions = () => {
  setTimeout(() => {
    showSearchSuggestions.value = false
  }, 200)
}

// 匹配功能
const startMatching = async () => {
  isMatching.value = true
  console.log('开始匹配...')
  
  // 模拟匹配过程
  setTimeout(() => {
    matchedUsers.value = [
      {
        id: 101,
        name: '小明',
        avatar: '/logo.png',
        age: 25,
        location: '北京',
        description: '热爱编程和音乐的程序员',
        tags: ['编程', '音乐', '旅行'],
        commonTags: ['编程', '音乐'],
        matchScore: 85,
        isOnline: true,
        isFriend: false
      },
      {
        id: 102,
        name: '小红',
        avatar: '/logo.png',
        age: 23,
        location: '上海',
        description: '喜欢摄影和美食的设计师',
        tags: ['摄影', '美食', '设计'],
        commonTags: ['摄影'],
        matchScore: 72,
        isOnline: false,
        isFriend: false
      },
      {
        id: 103,
        name: '小李',
        avatar: '/logo.png',
        age: 27,
        location: '深圳',
        description: '热爱旅行和阅读的产品经理',
        tags: ['旅行', '阅读', '产品'],
        commonTags: ['旅行'],
        matchScore: 68,
        isOnline: true,
        isFriend: false
      }
    ]
    isMatching.value = false
  }, 2000)
}

const refreshMatching = () => {
  console.log('刷新匹配推荐')
  startMatching()
}

// 搜索用户
const searchUsers = () => {
  if (!userSearchQuery.value) {
    searchResults.value = []
    return
  }
  
  // 模拟搜索结果
  searchResults.value = [
    {
      id: 201,
      name: '搜索用户1',
      avatar: '/logo.png',
      age: 24,
      location: '广州',
      tags: ['编程', '游戏'],
      isFriend: false
    },
    {
      id: 202,
      name: '搜索用户2',
      avatar: '/logo.png',
      age: 26,
      location: '杭州',
      tags: ['音乐', '电影'],
      isFriend: true
    }
  ]
}

// 用户资料相关
const showUserProfile = (user) => {
  selectedUser.value = user
  showUserProfileModal.value = true
}

const closeUserProfile = () => {
  showUserProfileModal.value = false
  selectedUser.value = null
}

const likeUser = (user) => {
  console.log('点赞用户:', user.name)
}

const startChat = (user) => {
  console.log('开始与用户聊天:', user.name)
  closeUserProfile()
}

const sendFriendRequest = (user) => {
  console.log('发送好友申请给:', user.name)
  closeUserProfile()
}

// 搜索项鼠标悬停效果 - 参考文章中的鼠标进入方向切换图片效果
const handleSearchItemHover = (event, user) => {
  const rect = event.currentTarget.getBoundingClientRect()
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2
  const angle = Math.atan2(event.clientY - centerY, event.clientX - centerX)
  const directionIndex = Math.floor((angle + Math.PI) / (Math.PI / 2)) % 4
  const directions = ['top', 'right', 'bottom', 'left']
  const direction = directions[directionIndex]
  
  // 根据方向添加不同的视觉效果
  event.currentTarget.classList.add(`hover-${direction}`)
  
  // 移除其他方向的类
  directions.forEach(dir => {
    if (dir !== direction) {
      event.currentTarget.classList.remove(`hover-${dir}`)
    }
  })
}


// 右键菜单
const showFriendMenu = (event, friend) => {
  event.preventDefault()
  selectedFriend.value = friend
  contextMenuStyle.value = {
    left: event.clientX + 'px',
    top: event.clientY + 'px'
  }
  showContextMenu.value = true
}

const viewFriendProfile = () => {
  console.log('查看好友资料:', selectedFriend.value?.name)
  showContextMenu.value = false
}

const muteFriend = () => {
  console.log('静音好友:', selectedFriend.value?.name)
  showContextMenu.value = false
}

const deleteFriend = () => {
  console.log('删除好友:', selectedFriend.value?.name)
  showContextMenu.value = false
}


// 点击其他地方关闭菜单
const handleClickOutside = () => {
  showAvatarMenu.value = false
  showContextMenu.value = false
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
  
  // 添加点击事件监听
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
.main-page {
  display: flex;
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-family: 'Arial', sans-serif;
  position: relative;
  overflow: hidden;
}

/* 背景装饰 */
.background-decoration {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 0;
}

.floating-shapes {
  position: relative;
  width: 100%;
  height: 100%;
}

.shape {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  animation: float 6s ease-in-out infinite;
}

.shape-1 {
  width: 80px;
  height: 80px;
  top: 20%;
  left: 10%;
  animation-delay: 0s;
}

.shape-2 {
  width: 120px;
  height: 120px;
  top: 60%;
  right: 15%;
  animation-delay: 2s;
}

.shape-3 {
  width: 60px;
  height: 60px;
  top: 80%;
  left: 20%;
  animation-delay: 4s;
}

.shape-4 {
  width: 100px;
  height: 100px;
  top: 30%;
  right: 30%;
  animation-delay: 1s;
}

.left-panel {
  width: 350px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  z-index: 1;
}

.right-panel {
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
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

/* 快捷操作 */
.quick-actions {
  margin-top: 15px;
  min-height: 44px; /* 保持原有按钮区域的高度 */
}

/* 搜索区域 */
.search-section {
  margin-bottom: 20px;
  position: relative;
}

.search-box {
  display: flex;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(248, 250, 252, 0.8));
  border-radius: 15px;
  padding: 5px;
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.search-box::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.2), transparent);
}

.search-box:focus-within {
  box-shadow: 0 8px 30px rgba(102, 126, 234, 0.2);
  transform: translateY(-2px);
}

.search-icon {
  display: flex;
  align-items: center;
  padding: 0 10px;
  color: #9ca3af;
  font-size: 16px;
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  padding: 12px 15px;
  background: transparent;
  font-size: 14px;
  color: #374151;
}

.search-input::placeholder {
  color: #9ca3af;
}

.search-button {
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  border: none;
  border-radius: 10px;
  padding: 12px 15px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.search-button:hover {
  transform: scale(1.05);
}

/* 搜索建议 */
.search-suggestions {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  margin-top: 5px;
  z-index: 10;
  animation: slideDown 0.3s ease;
}

.suggestion-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 15px;
  cursor: pointer;
  transition: background 0.2s ease;
}

.suggestion-item:hover {
  background: #f3f4f6;
}

.suggestion-icon {
  font-size: 16px;
}

.suggestion-text {
  font-size: 14px;
  color: #374151;
}

/* 好友列表头部 */
.friends-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.friends-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  font-weight: 600;
  color: white;
}

.friends-count {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

.friends-actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.action-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.1);
}

/* 好友列表 */
.friends-list {
  flex: 1;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(249, 250, 251, 0.8));
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  overflow-y: auto;
  position: relative;
}

.friends-list::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.3), transparent);
}

.friend-item {
  display: flex;
  align-items: center;
  padding: 15px;
  border-radius: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 10px;
  position: relative;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.6), rgba(249, 250, 251, 0.4));
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  overflow: hidden;
}

.friend-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.2), transparent);
}

.friend-item:hover {
  background: rgba(102, 126, 234, 0.1);
  transform: translateX(5px);
}

.friend-item:hover .friend-actions {
  opacity: 1;
}

.friend-avatar {
  position: relative;
  width: 50px;
  height: 50px;
  margin-right: 15px;
}

.friend-avatar-img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.friend-item:hover .friend-avatar-img {
  transform: scale(1.1);
}

.online-indicator {
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 12px;
  height: 12px;
  background: #4ade80;
  border: 2px solid white;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

.typing-indicator {
  position: absolute;
  bottom: 2px;
  right: 2px;
  display: flex;
  gap: 2px;
}

.typing-dot {
  width: 4px;
  height: 4px;
  background: #667eea;
  border-radius: 50%;
  animation: typingPulse 1.4s infinite;
}

.typing-dot:nth-child(2) {
  animation-delay: 0.2s;
}

.typing-dot:nth-child(3) {
  animation-delay: 0.4s;
}

.friend-info {
  flex: 1;
}

.friend-name {
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.friend-status {
  font-size: 12px;
  color: #6b7280;
  font-weight: 400;
}

.friend-last-message {
  font-size: 14px;
  color: #6b7280;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: color 0.3s ease;
}

.friend-last-message.unread {
  color: #1f2937;
  font-weight: 500;
}

.message-status {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
}

.message-time {
  font-size: 12px;
  color: #9ca3af;
}

.unread-count {
  background: #ef4444;
  color: white;
  font-size: 12px;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 12px;
  min-width: 20px;
  text-align: center;
  animation: pulse 2s infinite;
}


/* 空状态 */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  text-align: center;
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 16px;
  opacity: 0.5;
}

.empty-text {
  font-size: 16px;
  color: #6b7280;
  margin-bottom: 20px;
}

.empty-action {
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.empty-action:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

/* 右键菜单 */
.context-menu {
  position: fixed;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  padding: 8px;
  z-index: 1000;
  animation: slideDown 0.3s ease;
}

.context-menu .menu-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s ease;
  font-size: 14px;
  color: #374151;
}

.context-menu .menu-item:hover {
  background: #f3f4f6;
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

@keyframes typingPulse {
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.3);
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

/* 标签栏 */
.tab-bar {
  display: flex;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 5px;
  margin-bottom: 20px;
  backdrop-filter: blur(10px);
}

.tab-item {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 16px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  font-weight: 500;
}

.tab-item.active {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  transform: translateY(-2px);
}

.tab-item:hover {
  background: rgba(255, 255, 255, 0.15);
  color: white;
}

.tab-icon {
  font-size: 16px;
}

.tab-count {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  padding: 2px 6px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 600;
}

/* 标签页内容 */
.tab-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

/* 匹配控制 */
.matching-controls {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(240, 248, 255, 0.8));
  border-radius: 20px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.matching-controls::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent);
}

.matching-title h3 {
  margin: 0 0 8px 0;
  color: #1f2937;
  font-size: 18px;
  font-weight: 600;
}

.matching-title p {
  margin: 0 0 20px 0;
  color: #6b7280;
  font-size: 14px;
}

.matching-actions {
  display: flex;
  gap: 12px;
}

.match-btn, .refresh-btn {
  padding: 12px 20px;
  border: none;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.match-btn {
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
}

.match-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

.match-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.refresh-btn {
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
}

.refresh-btn:hover {
  background: rgba(102, 126, 234, 0.2);
  transform: translateY(-2px);
}

/* 匹配结果 */
.matching-results {
  flex: 1;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.85), rgba(248, 250, 252, 0.7));
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.25);
  overflow-y: auto;
  position: relative;
}

.matching-results::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.3), transparent);
}

.match-item {
  display: flex;
  align-items: center;
  padding: 15px;
  border-radius: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 15px;
  border: 1px solid rgba(102, 126, 234, 0.1);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.6), rgba(248, 250, 252, 0.4));
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
}

.match-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.2), transparent);
}

.match-item:hover {
  background: rgba(102, 126, 234, 0.05);
  transform: translateX(5px);
  border-color: rgba(102, 126, 234, 0.3);
}

.match-avatar {
  position: relative;
  width: 60px;
  height: 60px;
  margin-right: 15px;
}

.match-avatar-img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.match-score {
  position: absolute;
  top: -5px;
  right: -5px;
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  font-size: 10px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 10px;
}

.match-info {
  flex: 1;
}

.match-name {
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 4px;
}

.match-age {
  font-size: 12px;
  color: #6b7280;
  margin-bottom: 8px;
}

.match-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 8px;
}

.match-tag {
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 500;
}

.match-description {
  font-size: 13px;
  color: #6b7280;
  line-height: 1.4;
}

.match-actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.match-actions .action-btn {
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
}

.like-btn {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}

.like-btn:hover {
  background: #ef4444;
  color: white;
  transform: scale(1.1);
}

.chat-btn {
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
}

.chat-btn:hover {
  background: #667eea;
  color: white;
  transform: scale(1.1);
}

/* 搜索结果 */
.search-results {
  flex: 1;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(245, 247, 250, 0.6));
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 10px 35px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(18px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  overflow-y: auto;
  position: relative;
}

.search-results::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(34, 197, 94, 0.3), transparent);
}

.search-item {
  display: flex;
  align-items: center;
  padding: 15px;
  border-radius: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 15px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.5), rgba(245, 247, 250, 0.3));
  backdrop-filter: blur(8px);
  position: relative;
  overflow: hidden;
}

.search-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(34, 197, 94, 0.2), transparent);
}

.search-item:hover {
  background: rgba(102, 126, 234, 0.05);
  transform: translateX(5px);
}

.search-avatar {
  position: relative;
  width: 50px;
  height: 50px;
  margin-right: 15px;
}

.search-avatar-img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.search-status {
  position: absolute;
  bottom: -2px;
  right: -2px;
  font-size: 10px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 8px;
}

.search-status.friend {
  background: #4ade80;
  color: white;
}

.search-status.stranger {
  background: #f59e0b;
  color: white;
}

.search-info {
  flex: 1;
}

.search-name {
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 4px;
}

.search-details {
  font-size: 12px;
  color: #6b7280;
  margin-bottom: 8px;
}

.search-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.search-tag {
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 500;
}

.search-actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.search-actions .action-btn {
  padding: 8px 16px;
  border: none;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 6px;
}

.add-btn {
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
}

.add-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.chat-btn {
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
}

.chat-btn:hover {
  background: rgba(102, 126, 234, 0.2);
  transform: translateY(-2px);
}

/* 用户资料弹窗 */
.user-profile-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease;
}

.modal-content {
  background: white;
  border-radius: 20px;
  width: 90%;
  max-width: 500px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.3s ease;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 25px;
  border-bottom: 1px solid #e5e7eb;
}

.modal-header h3 {
  margin: 0;
  color: #1f2937;
  font-size: 18px;
  font-weight: 600;
}

.close-btn {
  background: none;
  border: none;
  font-size: 20px;
  color: #6b7280;
  cursor: pointer;
  padding: 5px;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background: #f3f4f6;
  color: #374151;
}

.modal-body {
  padding: 25px;
}

.profile-avatar {
  position: relative;
  width: 80px;
  height: 80px;
  margin: 0 auto 20px;
}

.profile-avatar-img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.profile-status {
  position: absolute;
  bottom: 2px;
  right: 2px;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 10px;
  font-weight: 600;
  color: white;
}

.profile-status.online {
  background: #4ade80;
}

.profile-status.offline {
  background: #6b7280;
}

.profile-info {
  text-align: center;
  margin-bottom: 20px;
}

.profile-name {
  margin: 0 0 8px 0;
  color: #1f2937;
  font-size: 20px;
  font-weight: 600;
}

.profile-details {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 12px;
  font-size: 14px;
  color: #6b7280;
}

.profile-description {
  font-size: 14px;
  color: #374151;
  line-height: 1.5;
}

.profile-tags, .profile-match {
  margin-bottom: 20px;
}

.profile-tags h5, .profile-match h5 {
  margin: 0 0 12px 0;
  color: #1f2937;
  font-size: 14px;
  font-weight: 600;
}

.tags-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.profile-tag {
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 500;
}

.match-score-bar {
  position: relative;
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 8px;
}

.match-score-fill {
  height: 100%;
  background: linear-gradient(45deg, #667eea, #764ba2);
  border-radius: 4px;
  transition: width 0.3s ease;
}

.match-score-text {
  position: absolute;
  top: -20px;
  right: 0;
  font-size: 12px;
  font-weight: 600;
  color: #667eea;
}

.match-reason {
  font-size: 12px;
  color: #6b7280;
}

.profile-actions {
  display: flex;
  gap: 12px;
}

.action-button {
  flex: 1;
  padding: 12px 20px;
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
}

.add-button {
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
}

.add-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

.chat-button {
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
}

.chat-button:hover {
  background: rgba(102, 126, 234, 0.2);
  transform: translateY(-2px);
}

.like-button {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}

.like-button:hover {
  background: #ef4444;
  color: white;
  transform: translateY(-2px);
}

.action-icon {
  font-size: 16px;
}

/* 动画 */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
  }

  /* Vue过渡动画 - 按照文章方法 */
  .fade-enter-active, .fade-leave-active {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
    transform: translateY(-10px);
  }

  /* 按钮律动动画 */
  .btn-pulse-enter-active {
    transition: all 0.8s ease-out;
    animation: btnPulse 2s ease-in-out infinite;
  }
  .btn-pulse-enter {
    opacity: 0;
    transform: scale(0.8);
  }

  .fade-slide-enter-active {
    transition: all 0.6s ease-out;
  }
  .fade-slide-leave-active {
    transition: all 0.3s ease-in;
  }
  .fade-slide-enter {
    opacity: 0;
    transform: translateY(-20px);
  }
  .fade-slide-leave-to {
    opacity: 0;
    transform: translateY(10px);
  }

  /* 书卷展开动画 */
  .scroll-unfold-enter-active {
    transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    transition-delay: var(--delay);
  }
  .scroll-unfold-leave-active {
    transition: all 0.4s cubic-bezier(0.55, 0.06, 0.68, 0.19);
  }
  .scroll-unfold-enter {
    opacity: 0;
    transform: translateX(100%) scaleX(0.1) rotateY(15deg);
    box-shadow: 0 0 0 rgba(0, 0, 0, 0);
  }
  .scroll-unfold-leave-to {
    opacity: 0;
    transform: translateX(-100%) scaleX(0.1) rotateY(-15deg);
    box-shadow: 0 0 0 rgba(0, 0, 0, 0);
  }
  .scroll-unfold-move {
    transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  /* 书卷项目样式 */
  .scroll-item {
    position: relative;
    overflow: hidden;
    transform-origin: right center;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15), 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease;
  }

  .scroll-item:hover {
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2), 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  /* 书卷展开时的阴影效果 */
  .scroll-item::before {
    content: '';
    position: absolute;
    top: 0;
    left: -10px;
    right: -10px;
    bottom: 0;
    background: linear-gradient(90deg, 
      rgba(0, 0, 0, 0.1) 0%, 
      transparent 20%, 
      transparent 80%, 
      rgba(0, 0, 0, 0.1) 100%
    );
    opacity: 0;
    transition: opacity 0.6s ease;
    z-index: -1;
  }

  .scroll-item.scroll-unfold-enter-active::before {
    opacity: 1;
  }

  .friend-list-container {
    display: flex;
    flex-direction: column;
    position: relative;
  }

  /* 好友列表背景投影 */
  .friend-list-container::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, 
      rgba(0, 0, 0, 0.05) 0%, 
      transparent 30%, 
      transparent 70%, 
      rgba(0, 0, 0, 0.05) 100%
    );
    pointer-events: none;
    z-index: -1;
    opacity: 0;
    transition: opacity 0.8s ease;
  }

  .friend-list-container.scroll-unfold-enter-active::after {
    opacity: 1;
  }

  .match-list-enter-active {
    transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    transition-delay: var(--delay);
  }
  .match-list-leave-active {
    transition: all 0.4s cubic-bezier(0.55, 0.06, 0.68, 0.19);
  }
  .match-list-enter {
    opacity: 0;
    transform: translateX(100%) scaleX(0.1) rotateY(15deg);
    box-shadow: 0 0 0 rgba(0, 0, 0, 0);
  }
  .match-list-leave-to {
    opacity: 0;
    transform: translateX(-100%) scaleX(0.1) rotateY(-15deg);
    box-shadow: 0 0 0 rgba(0, 0, 0, 0);
  }
  .match-list-move {
    transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .match-list-container {
    display: flex;
    flex-direction: column;
    position: relative;
  }

  /* 匹配结果背景投影 */
  .match-list-container::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, 
      rgba(0, 0, 0, 0.05) 0%, 
      transparent 30%, 
      transparent 70%, 
      rgba(0, 0, 0, 0.05) 100%
    );
    pointer-events: none;
    z-index: -1;
    opacity: 0;
    transition: opacity 0.8s ease;
  }

  .match-list-container.scroll-unfold-enter-active::after {
    opacity: 1;
  }

  .search-list-enter-active {
    transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    transition-delay: var(--delay);
  }
  .search-list-leave-active {
    transition: all 0.4s cubic-bezier(0.55, 0.06, 0.68, 0.19);
  }
  .search-list-enter {
    opacity: 0;
    transform: translateX(100%) scaleX(0.1) rotateY(15deg);
    box-shadow: 0 0 0 rgba(0, 0, 0, 0);
  }
  .search-list-leave-to {
    opacity: 0;
    transform: translateX(-100%) scaleX(0.1) rotateY(-15deg);
    box-shadow: 0 0 0 rgba(0, 0, 0, 0);
  }
  .search-list-move {
    transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .search-list-container {
    display: flex;
    flex-direction: column;
    position: relative;
  }

  /* 搜索结果背景投影 */
  .search-list-container::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, 
      rgba(0, 0, 0, 0.05) 0%, 
      transparent 30%, 
      transparent 70%, 
      rgba(0, 0, 0, 0.05) 100%
    );
    pointer-events: none;
    z-index: -1;
    opacity: 0;
    transition: opacity 0.8s ease;
  }

  .search-list-container.scroll-unfold-enter-active::after {
    opacity: 1;
  }

  /* 按钮律动动画 - 按照文章方法 */
  @keyframes btnPulse {
    0%, 100% {
      transform: scale(1);
      box-shadow: 0 0 0 0 rgba(102, 126, 234, 0.4);
    }
    50% {
      transform: scale(1.05);
      box-shadow: 0 0 0 10px rgba(102, 126, 234, 0);
    }
  }

  /* 聊天提示 */
  .chat-prompt {
    display: flex;
    align-items: center;
    padding: 15px;
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
    border-radius: 15px;
    margin-bottom: 15px;
    border: 1px solid rgba(102, 126, 234, 0.2);
    position: relative;
    overflow: hidden;
  }

  .prompt-icon {
    font-size: 24px;
    margin-right: 12px;
    animation: bounce 2s infinite;
  }

  .prompt-text {
    flex: 1;
  }

  .prompt-title {
    display: block;
    font-size: 14px;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 2px;
  }

  .prompt-subtitle {
    display: block;
    font-size: 12px;
    color: #6b7280;
  }

  .prompt-animation {
    position: relative;
    width: 20px;
    height: 20px;
  }

  .pulse-ring {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 20px;
    border: 2px solid rgba(102, 126, 234, 0.6);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    animation: pulseRing 2s infinite;
  }

  /* 按钮发光效果 */
  .btn-glow {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, rgba(102, 126, 234, 0.3), rgba(118, 75, 162, 0.3));
    border-radius: 12px;
    animation: glow 2s infinite ease-in-out;
    z-index: -1;
  }

  /* 匹配动画 - 与按钮同行显示 */
  .matching-animation {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 15px 20px;
    margin-top: 15px;
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
    border-radius: 12px;
    border: 1px solid rgba(102, 126, 234, 0.2);
  }

  .matching-dots {
    display: flex;
    gap: 8px;
  }

  .matching-dot {
    width: 8px;
    height: 8px;
    background: linear-gradient(45deg, #667eea, #764ba2);
    border-radius: 50%;
    animation: matchingPulse 1.5s infinite ease-in-out;
  }

  .matching-dot:nth-child(1) {
    animation-delay: 0s;
  }

  .matching-dot:nth-child(2) {
    animation-delay: 0.3s;
  }

  .matching-dot:nth-child(3) {
    animation-delay: 0.6s;
  }

  .matching-text {
    font-size: 14px;
    color: #6b7280;
    animation: fadeInOut 2s infinite ease-in-out;
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

  @keyframes pulseRing {
    0% {
      transform: translate(-50%, -50%) scale(0.8);
      opacity: 1;
    }
    100% {
      transform: translate(-50%, -50%) scale(2);
      opacity: 0;
    }
  }

  @keyframes glow {
    0%, 100% {
      opacity: 0.3;
      transform: scale(1);
    }
    50% {
      opacity: 0.6;
      transform: scale(1.05);
    }
  }

  @keyframes matchingPulse {
    0%, 100% {
      transform: scale(1);
      opacity: 0.5;
    }
    50% {
      transform: scale(1.5);
      opacity: 1;
    }
  }

  @keyframes fadeInOut {
    0%, 100% {
      opacity: 0.6;
    }
    50% {
      opacity: 1;
    }
  }

  /* 搜索项鼠标悬停效果 - 参考文章中的方向切换效果 */
  .search-item.hover-top {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  }

  .search-item.hover-right {
    transform: translateX(5px);
    box-shadow: 10px 0 25px rgba(0, 0, 0, 0.15);
  }

  .search-item.hover-bottom {
    transform: translateY(5px);
    box-shadow: 0 -10px 25px rgba(0, 0, 0, 0.15);
  }

  .search-item.hover-left {
    transform: translateX(-5px);
    box-shadow: -10px 0 25px rgba(0, 0, 0, 0.15);
  }

  .search-item {
    transition: all 0.3s ease;
  }

  /* 匹配控制框高度平滑过渡 */
  .matching-controls.smooth-height-transition {
    transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
    will-change: height, margin, padding;
  }

  /* 强制所有子元素也参与过渡 */
  .matching-controls.smooth-height-transition * {
    transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  /* 匹配结果框平滑移动效果 */
  .matching-results.smooth-transition {
    transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  /* 滑入动画 - 修复初始出现时的平滑效果 */
  .slide-down-enter-active {
    transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    overflow: hidden;
  }
  .slide-down-leave-active {
    transition: all 0.4s cubic-bezier(0.55, 0.06, 0.68, 0.19);
    overflow: hidden;
  }
  .slide-down-enter {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
    max-height: 0;
    margin-top: 0;
    padding-top: 0;
    padding-bottom: 0;
    overflow: hidden;
  }
  .slide-down-leave-to {
    opacity: 0;
    transform: translateY(-10px) scale(0.98);
    max-height: 0;
    margin-top: 0;
    padding-top: 0;
    padding-bottom: 0;
    overflow: hidden;
  }
  .slide-down-enter-to,
  .slide-down-leave {
    opacity: 1;
    transform: translateY(0) scale(1);
    max-height: 100px;
    margin-top: 15px;
    padding-top: 15px;
    padding-bottom: 15px;
    overflow: hidden;
  }

  /* 确保匹配动画容器有初始状态 */
  .matching-animation {
    overflow: hidden;
  }

  /* 粒子效果容器 */
  .particles-container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    z-index: 10;
    overflow: hidden;
  }

  /* 粒子样式 */
  .particle {
    position: absolute;
    width: 12px;
    height: 12px;
    background: radial-gradient(circle, rgba(102, 126, 234, 0.4), rgba(102, 126, 234, 0.2));
    border-radius: 50%;
    animation: floatParticle 8s infinite ease-in-out;
    box-shadow: 0 0 12px rgba(102, 126, 234, 0.3);
  }

  /* 好友列表粒子 - 更分散，大小不一 */
  .friends-list .particle:nth-child(1) {
    top: 10%;
    left: 5%;
    animation-delay: 0s;
    animation-duration: 6s;
    width: 8px;
    height: 8px;
  }
  .friends-list .particle:nth-child(2) {
    top: 20%;
    right: 8%;
    animation-delay: 1s;
    animation-duration: 7s;
    width: 16px;
    height: 16px;
  }
  .friends-list .particle:nth-child(3) {
    top: 35%;
    left: 25%;
    animation-delay: 2s;
    animation-duration: 8s;
    width: 6px;
    height: 6px;
  }
  .friends-list .particle:nth-child(4) {
    top: 50%;
    right: 30%;
    animation-delay: 3s;
    animation-duration: 6.5s;
    width: 14px;
    height: 14px;
  }
  .friends-list .particle:nth-child(5) {
    top: 65%;
    left: 8%;
    animation-delay: 4s;
    animation-duration: 7.5s;
    width: 10px;
    height: 10px;
  }
  .friends-list .particle:nth-child(6) {
    top: 80%;
    right: 15%;
    animation-delay: 5s;
    animation-duration: 6s;
    width: 18px;
    height: 18px;
  }
  .friends-list .particle:nth-child(7) {
    top: 15%;
    left: 35%;
    animation-delay: 6s;
    animation-duration: 8s;
    width: 12px;
    height: 12px;
  }
  .friends-list .particle:nth-child(8) {
    top: 70%;
    right: 5%;
    animation-delay: 7s;
    animation-duration: 7s;
    width: 9px;
    height: 9px;
  }

  /* 匹配结果粒子 - 更分散，大小不一 */
  .matching-results .particle:nth-child(1) {
    top: 15%;
    left: 8%;
    animation-delay: 0.5s;
    animation-duration: 7s;
    background: radial-gradient(circle, rgba(102, 126, 234, 0.4), rgba(102, 126, 234, 0.2));
    box-shadow: 0 0 12px rgba(102, 126, 234, 0.3);
    width: 15px;
    height: 15px;
  }
  .matching-results .particle:nth-child(2) {
    top: 25%;
    right: 12%;
    animation-delay: 1.5s;
    animation-duration: 6s;
    background: radial-gradient(circle, rgba(102, 126, 234, 0.4), rgba(102, 126, 234, 0.2));
    box-shadow: 0 0 12px rgba(102, 126, 234, 0.3);
    width: 7px;
    height: 7px;
  }
  .matching-results .particle:nth-child(3) {
    top: 45%;
    left: 25%;
    animation-delay: 2.5s;
    animation-duration: 8s;
    background: radial-gradient(circle, rgba(102, 126, 234, 0.4), rgba(102, 126, 234, 0.2));
    box-shadow: 0 0 12px rgba(102, 126, 234, 0.3);
    width: 11px;
    height: 11px;
  }
  .matching-results .particle:nth-child(4) {
    top: 65%;
    right: 8%;
    animation-delay: 3.5s;
    animation-duration: 7s;
    background: radial-gradient(circle, rgba(102, 126, 234, 0.4), rgba(102, 126, 234, 0.2));
    box-shadow: 0 0 12px rgba(102, 126, 234, 0.3);
    width: 13px;
    height: 13px;
  }
  .matching-results .particle:nth-child(5) {
    top: 35%;
    left: 5%;
    animation-delay: 4.5s;
    animation-duration: 6.5s;
    background: radial-gradient(circle, rgba(102, 126, 234, 0.4), rgba(102, 126, 234, 0.2));
    box-shadow: 0 0 12px rgba(102, 126, 234, 0.3);
    width: 9px;
    height: 9px;
  }
  .matching-results .particle:nth-child(6) {
    top: 75%;
    right: 30%;
    animation-delay: 5.5s;
    animation-duration: 8s;
    background: radial-gradient(circle, rgba(102, 126, 234, 0.4), rgba(102, 126, 234, 0.2));
    box-shadow: 0 0 12px rgba(102, 126, 234, 0.3);
    width: 17px;
    height: 17px;
  }

  /* 搜索结果粒子 - 更分散，大小不一 */
  .search-results .particle:nth-child(1) {
    top: 20%;
    left: 8%;
    animation-delay: 1s;
    animation-duration: 7s;
    background: radial-gradient(circle, rgba(102, 126, 234, 0.4), rgba(102, 126, 234, 0.2));
    box-shadow: 0 0 12px rgba(102, 126, 234, 0.3);
    width: 12px;
    height: 12px;
  }
  .search-results .particle:nth-child(2) {
    top: 30%;
    right: 12%;
    animation-delay: 2s;
    animation-duration: 6s;
    background: radial-gradient(circle, rgba(102, 126, 234, 0.4), rgba(102, 126, 234, 0.2));
    box-shadow: 0 0 12px rgba(102, 126, 234, 0.3);
    width: 8px;
    height: 8px;
  }
  .search-results .particle:nth-child(3) {
    top: 50%;
    left: 25%;
    animation-delay: 3s;
    animation-duration: 8s;
    background: radial-gradient(circle, rgba(102, 126, 234, 0.4), rgba(102, 126, 234, 0.2));
    box-shadow: 0 0 12px rgba(102, 126, 234, 0.3);
    width: 16px;
    height: 16px;
  }
  .search-results .particle:nth-child(4) {
    top: 70%;
    right: 8%;
    animation-delay: 4s;
    animation-duration: 7s;
    background: radial-gradient(circle, rgba(102, 126, 234, 0.4), rgba(102, 126, 234, 0.2));
    box-shadow: 0 0 12px rgba(102, 126, 234, 0.3);
    width: 10px;
    height: 10px;
  }
  .search-results .particle:nth-child(5) {
    top: 40%;
    left: 5%;
    animation-delay: 5s;
    animation-duration: 6.5s;
    background: radial-gradient(circle, rgba(102, 126, 234, 0.4), rgba(102, 126, 234, 0.2));
    box-shadow: 0 0 12px rgba(102, 126, 234, 0.3);
    width: 14px;
    height: 14px;
  }


  /* 粒子浮动动画 */
  @keyframes floatParticle {
    0%, 100% {
      transform: translateY(0px) translateX(0px) scale(1);
      opacity: 0.6;
    }
    25% {
      transform: translateY(-15px) translateX(10px) scale(1.2);
      opacity: 0.8;
    }
    50% {
      transform: translateY(-25px) translateX(-5px) scale(0.8);
      opacity: 1;
    }
    75% {
      transform: translateY(-10px) translateX(15px) scale(1.1);
      opacity: 0.7;
    }
  }

  
  /* 响应式设计 */
@media (max-width: 768px) {
  .main-page {
    flex-direction: column;
  }
  
  .left-panel {
    width: 100%;
    padding: 15px;
  }
  
  .right-panel {
    padding: 15px;
  }
  
  .modal-content {
    width: 95%;
    margin: 20px;
  }
  
  .profile-actions {
    flex-direction: column;
  }
}
</style>
