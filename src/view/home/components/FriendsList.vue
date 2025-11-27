<template>
  <div class="friends-list-wrapper">
    <!-- 搜索栏 -->
    <div class="search-section">
      <div class="search-box">
        <div class="search-icon">🔍</div>
        <input 
          type="text" 
          placeholder="搜索好友或全网用户..." 
          v-model="searchQuery"
          class="search-input"
          @input="handleSearchInput"
        >
      </div>
    </div>
    
    <!-- 好友列表 -->
    <div class="friends-list">
      <!-- 粒子效果 -->
      <div class="particles-container">
        <div class="particle" v-for="n in 8" :key="`friend-particle-${n}`"></div>
      </div>
      
      <transition-group name="scroll-unfold" tag="div" class="friend-list-container">
        <div 
          class="friend-item scroll-item" 
          v-for="(friend, index) in filteredFriends" 
          :key="friend.id"
          :style="{ '--delay': index * 0.1 + 's' }"
          @click="openChat(friend)"
          @contextmenu="$emit('show-context-menu', $event, friend)"
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

      <!-- 全网搜索结果 -->
      <transition name="fade" appear>
        <div class="global-search-section" v-if="searchQuery && searchResults.length > 0">
          <div class="section-divider">
            <span>全网搜索结果</span>
            <div class="divider-line"></div>
          </div>
          <transition-group name="search-list" tag="div" class="search-list-container">
            <div 
              class="search-item scroll-item" 
              v-for="(user, index) in searchResults" 
              :key="user.id"
              :style="{ '--delay': index * 0.1 + 's' }"
              @click="$emit('show-profile', user)"
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
                  @click.stop="user.isFriend ? openChat(user) : $emit('send-request', user)"
                >
                  <i class="icon-action">{{ user.isFriend ? '💬' : '➕' }}</i>
                  {{ user.isFriend ? '聊天' : '添加' }}
                </button>
              </div>
            </div>
          </transition-group>
        </div>
      </transition>
      
      <!-- 空状态 -->
      <transition name="fade" appear>
        <div class="empty-state" v-if="filteredFriends.length === 0 && (!searchQuery || searchResults.length === 0)">
          <div class="empty-icon">👥</div>
          <div class="empty-text">{{ searchQuery ? '未找到匹配结果' : '暂无好友' }}</div>
          <div class="empty-hint">去智能匹配或搜索用户添加好友吧~</div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const emit = defineEmits(['show-context-menu', 'show-profile', 'start-chat', 'send-request'])

// 搜索相关
const searchQuery = ref('')
const searchResults = ref([])

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

// 过滤后的好友列表
const filteredFriends = computed(() => {
  if (!searchQuery.value) {
    return friends.value
  }
  return friends.value.filter(friend => 
    friend.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    friend.lastMessage.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

// 处理搜索输入
const handleSearchInput = () => {
  if (!searchQuery.value) {
    searchResults.value = []
    return
  }
  
  // 模拟全网搜索结果
  console.log('Searching network for:', searchQuery.value)
  
  // 模拟延迟
  setTimeout(() => {
    searchResults.value = [
      {
        id: 201,
        name: `用户_${searchQuery.value}_A`,
        avatar: '/logo.png',
        age: 24,
        location: '广州',
        tags: ['编程', '游戏'],
        isFriend: false
      },
      {
        id: 202,
        name: `用户_${searchQuery.value}_B`,
        avatar: '/logo.png',
        age: 26,
        location: '杭州',
        tags: ['音乐', '电影'],
        isFriend: true
      }
    ]
  }, 300)
}

// 打开聊天
const openChat = (friend) => {
  emit('start-chat', friend)
}

// 搜索项鼠标悬停效果
const handleSearchItemHover = (event, user) => {
  const rect = event.currentTarget.getBoundingClientRect()
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2
  const angle = Math.atan2(event.clientY - centerY, event.clientX - centerX)
  const directionIndex = Math.floor((angle + Math.PI) / (Math.PI / 2)) % 4
  const directions = ['top', 'right', 'bottom', 'left']
  const direction = directions[directionIndex]
  
  event.currentTarget.classList.add(`hover-${direction}`)
  
  directions.forEach(dir => {
    if (dir !== direction) {
      event.currentTarget.classList.remove(`hover-${dir}`)
    }
  })
}

defineExpose({
  friends
})
</script>

<style lang="scss" scoped>
.friends-list-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
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

.empty-hint {
  color: #9ca3af;
  font-size: 14px;
}

/* 全网搜索分隔线 */
.global-search-section {
  margin-top: 20px;
}

.section-divider {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  padding: 0 10px;
  color: #6b7280;
  font-size: 12px;
  font-weight: 500;
}

.section-divider span {
  margin-right: 10px;
  white-space: nowrap;
}

.divider-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, rgba(107, 114, 128, 0.2), transparent);
}

/* 搜索结果 */
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
  width: auto;
  height: auto;
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

.add-btn {
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
}

.add-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
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

.particle {
  position: absolute;
  width: 12px;
  height: 12px;
  background: radial-gradient(circle, rgba(102, 126, 234, 0.4), rgba(102, 126, 234, 0.2));
  border-radius: 50%;
  animation: floatParticle 8s infinite ease-in-out;
  box-shadow: 0 0 12px rgba(102, 126, 234, 0.3);
}

/* 好友列表粒子 */
.friends-list .particle:nth-child(1) { top: 10%; left: 5%; animation-delay: 0s; width: 8px; height: 8px; }
.friends-list .particle:nth-child(2) { top: 20%; right: 8%; animation-delay: 1s; width: 16px; height: 16px; }
.friends-list .particle:nth-child(3) { top: 35%; left: 25%; animation-delay: 2s; width: 6px; height: 6px; }
.friends-list .particle:nth-child(4) { top: 50%; right: 30%; animation-delay: 3s; width: 14px; height: 14px; }
.friends-list .particle:nth-child(5) { top: 65%; left: 8%; animation-delay: 4s; width: 10px; height: 10px; }
.friends-list .particle:nth-child(6) { top: 80%; right: 15%; animation-delay: 5s; width: 18px; height: 18px; }
.friends-list .particle:nth-child(7) { top: 15%; left: 35%; animation-delay: 6s; width: 12px; height: 12px; }
.friends-list .particle:nth-child(8) { top: 70%; right: 5%; animation-delay: 7s; width: 9px; height: 9px; }

@keyframes floatParticle {
  0%, 100% { transform: translateY(0px) translateX(0px) scale(1); opacity: 0.6; }
  25% { transform: translateY(-15px) translateX(10px) scale(1.2); opacity: 0.8; }
  50% { transform: translateY(-25px) translateX(-5px) scale(0.8); opacity: 1; }
  75% { transform: translateY(-10px) translateX(15px) scale(1.1); opacity: 0.7; }
}

@keyframes typingPulse {
  0%, 100% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.5); opacity: 1; }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* 列表容器 */
.friend-list-container, .search-list-container {
  display: flex;
  flex-direction: column;
  position: relative;
}

/* 书卷展开动画 */
.scroll-unfold-enter-active {
  transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  transition-delay: var(--delay);
}
.scroll-unfold-leave-active {
  transition: all 0.4s cubic-bezier(0.55, 0.06, 0.68, 0.19);
}
.scroll-unfold-enter-from {
  opacity: 0;
  transform: translateX(100%) scaleX(0.1) rotateY(15deg);
}
.scroll-unfold-leave-to {
  opacity: 0;
  transform: translateX(-100%) scaleX(0.1) rotateY(-15deg);
}
.scroll-unfold-move {
  transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

/* 搜索列表动画 */
.search-list-enter-active {
  transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  transition-delay: var(--delay);
}
.search-list-leave-active {
  transition: all 0.4s cubic-bezier(0.55, 0.06, 0.68, 0.19);
}
.search-list-enter-from {
  opacity: 0;
  transform: translateX(100%) scaleX(0.1) rotateY(15deg);
}
.search-list-leave-to {
  opacity: 0;
  transform: translateX(-100%) scaleX(0.1) rotateY(-15deg);
}
.search-list-move {
  transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

/* Vue过渡动画 */
.fade-enter-active, .fade-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* 搜索项鼠标悬停效果 */
.search-item.hover-top { transform: translateY(-5px); box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15); }
.search-item.hover-right { transform: translateX(5px); box-shadow: 10px 0 25px rgba(0, 0, 0, 0.15); }
.search-item.hover-bottom { transform: translateY(5px); box-shadow: 0 -10px 25px rgba(0, 0, 0, 0.15); }
.search-item.hover-left { transform: translateX(-5px); box-shadow: -10px 0 25px rgba(0, 0, 0, 0.15); }
</style>

