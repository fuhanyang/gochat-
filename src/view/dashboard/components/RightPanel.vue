<template>
  <div class="right-panel">
    <!-- 标签栏 -->
    <div class="tab-bar">
      <div class="tab-item" :class="{ active: activeTab === 'friends' }" @click="activeTab = 'friends'">
        <i class="tab-icon">👥</i>
        <span>好友列表</span>
        <div class="tab-count">{{ friends.length }}</div>
      </div>
      <div class="tab-item" :class="{ active: activeTab === 'hotspot' }" @click="activeTab = 'hotspot'">
        <i class="tab-icon">🔥</i>
        <span>今日热点</span>
        <div class="tab-count">{{ hotNewsList.length }}</div>
      </div>
      <div class="tab-item" :class="{ active: activeTab === 'workflow' }" @click="activeTab = 'workflow'">
        <i class="tab-icon">📊</i>
        <span>工作流统计</span>
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
            @dblclick="$emit('open-chat', friend)"
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
                    @click.stop="user.isFriend ? $emit('open-chat', user) : $emit('send-request', user)"
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
    
    <!-- 今日热点标签页 (原智能匹配) -->
    <div class="tab-content" v-if="activeTab === 'hotspot'">
      <!-- 匹配控制 -->
      <div class="matching-controls smooth-height-transition">
        <div class="matching-title">
          <h3>基于领域的今日热点</h3>
          <p>系统会根据你的关注领域为你推荐最新的行业动态</p>
        </div>
        
        <!-- 标签选择区域 -->
        <div class="hotspot-tags">
          <span 
            v-for="tag in newsTags" 
            :key="tag" 
            class="hotspot-tag"
            :class="{ active: selectedTag === tag }"
            @click="selectTag(tag)"
          >
            {{ tag }}
          </span>
        </div>

        <div class="matching-actions">
          <transition name="btn-pulse" appear>
            <button class="match-btn" @click="fetchHotNews" :disabled="isLoadingNews">
              <i class="icon-match">📰</i>
              {{ isLoadingNews ? '聚合中...' : '获取热点' }}
              <div class="btn-glow" v-if="!isLoadingNews"></div>
            </button>
          </transition>
          <button class="refresh-btn" @click="refreshHotNews">
            <i class="icon-refresh">🔄</i>
            刷新
          </button>
        </div>
        
        <!-- 加载动画 -->
        <transition name="slide-down" appear>
          <div class="matching-animation" v-if="isLoadingNews">
            <div class="matching-dots">
              <div class="matching-dot"></div>
              <div class="matching-dot"></div>
              <div class="matching-dot"></div>
            </div>
            <div class="matching-text">正在调用工作流聚合全网{{ selectedTag !== '推荐' ? selectedTag + '领域' : '' }}数据...</div>
          </div>
        </transition>
      </div>
      
      <!-- 热点新闻列表 -->
      <div class="matching-results" :class="{ 'smooth-transition': true }">
        <!-- 粒子效果 -->
        <div class="particles-container">
          <div class="particle" v-for="n in 6" :key="`news-particle-${n}`"></div>
        </div>
        <transition-group name="match-list" tag="div" class="match-list-container">
          <div 
            class="news-item scroll-item" 
            v-for="(news, index) in hotNewsList" 
            :key="news.id"
            :style="{ '--delay': index * 0.1 + 's' }"
            @click="openNewsDetail(news)"
          >
            <!-- 新闻图片 -->
            <div class="news-image">
              <img :src="news.image" alt="新闻封面" class="news-cover-img">
              <div class="news-tag">{{ news.category }}</div>
            </div>
            
            <!-- 新闻信息 -->
            <div class="news-info">
              <div class="news-title">{{ news.title }}</div>
              <div class="news-summary">{{ news.summary }}</div>
              <div class="news-meta">
                <span class="news-source">
                  <i class="icon-source">📢</i> {{ news.source }}
                </span>
                <span class="news-time">{{ news.time }}</span>
              </div>
            </div>
            
            <!-- 操作 -->
            <div class="news-actions">
              <button class="action-btn share-btn" @click.stop="shareNews(news)">
                <i class="icon-share">📤</i>
              </button>
            </div>
          </div>
        </transition-group>
        
        <!-- 空状态 -->
        <transition name="fade" appear>
          <div class="empty-state" v-if="hotNewsList.length === 0">
            <div class="empty-icon">🔥</div>
            <div class="empty-text">暂无{{ selectedTag !== '推荐' ? selectedTag : '' }}热点推荐</div>
            <div class="empty-hint">点击"获取热点"查看最新行业动态</div>
          </div>
        </transition>
      </div>
    </div>
    
    <!-- 工作流统计标签页 -->
    <div class="tab-content" v-if="activeTab === 'workflow'">
      <div class="workflow-stats-container">
        <!-- 快捷入口 -->
        <div class="workflow-action-section">
          <button class="workflow-center-btn" @click="goToWorkflow">
            <div class="btn-content">
              <i class="icon-workflow">🚀</i>
              <div class="btn-text">
                <span class="btn-title">进入工作流中心</span>
                <span class="btn-desc">设计和管理您的自动化工作流</span>
              </div>
            </div>
            <div class="btn-arrow">→</div>
            <div class="btn-decoration"></div>
          </button>
        </div>

        <!-- 统计卡片 -->
        <div class="stats-grid">
          <div class="stat-card primary">
            <div class="stat-icon">⚡</div>
            <div class="stat-content">
              <div class="stat-value">{{ workflowStats.totalExecutions }}</div>
              <div class="stat-label">总执行次数</div>
            </div>
          </div>
          <div class="stat-card success">
            <div class="stat-icon">✅</div>
            <div class="stat-content">
              <div class="stat-value">{{ workflowStats.successRate }}%</div>
              <div class="stat-label">成功率</div>
            </div>
          </div>
          <div class="stat-card info">
            <div class="stat-icon">⏱️</div>
            <div class="stat-content">
              <div class="stat-value">{{ workflowStats.savedTime }}h</div>
              <div class="stat-label">节省时间</div>
            </div>
          </div>
        </div>

        <!-- 最近执行记录 -->
        <div class="recent-executions">
          <div class="section-header">
            <h3>最近执行记录</h3>
            <button class="view-all-btn">查看全部</button>
          </div>
          <div class="execution-list">
            <div 
              class="execution-item" 
              v-for="record in workflowStats.recentRecords" 
              :key="record.id"
              @click="viewExecutionDetail(record)"
            >
              <div class="exec-status-indicator" :class="record.status"></div>
              <div class="exec-main">
                <div class="exec-name">{{ record.name }}</div>
                <div class="exec-time">{{ record.time }}</div>
              </div>
              <div class="exec-meta">
                <div class="exec-duration">⏱️ {{ record.duration }}</div>
                <div class="exec-status-text" :class="record.status">{{ record.statusText }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 简易图表 (使用CSS绘制) -->
        <div class="stats-chart-section">
          <div class="section-header">
            <h3>本周活跃度</h3>
          </div>
          <div class="simple-bar-chart">
            <div class="chart-bar" v-for="(val, index) in [40, 70, 30, 85, 60, 90, 50]" :key="index" :style="{ height: val + '%' }">
              <div class="bar-tooltip">周{{ ['一','二','三','四','五','六','日'][index] }}: {{ val }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const emit = defineEmits(['open-chat', 'show-context-menu', 'show-profile', 'like-user', 'start-chat', 'send-request'])

// 标签页相关
const activeTab = ref('friends')

// 搜索相关
const searchQuery = ref('')
const searchResults = ref([])

// 工作流统计数据
const workflowStats = ref({
  totalExecutions: 1258,
  successRate: 98.5,
  savedTime: 420,
  recentRecords: [
    { id: 1, name: '日报自动生成', time: '10分钟前', duration: '2s', status: 'success', statusText: '成功' },
    { id: 2, name: '客户数据同步', time: '2小时前', duration: '45s', status: 'success', statusText: '成功' },
    { id: 3, name: '周报邮件分发', time: '5小时前', duration: '1.2s', status: 'failed', statusText: '失败' },
    { id: 4, name: '服务器资源监控', time: '昨天', duration: '5s', status: 'success', statusText: '成功' },
    { id: 5, name: '舆情分析报告', time: '昨天', duration: '120s', status: 'success', statusText: '成功' },
  ]
})

// 热点新闻相关
const isLoadingNews = ref(false)
const hotNewsList = ref([])
const newsTags = ['推荐', 'AI科技', '云计算', '新能源', 'Web3', '医疗健康']
const selectedTag = ref('推荐')

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
  // 在实际应用中，这里应该是一个防抖的API请求
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

// 跳转到工作流中心
const goToWorkflow = () => {
  router.push('/workflow')
}

// 跳转到执行详情
const viewExecutionDetail = (record) => {
  // 使用 params 传递 ID，或者直接拼接到路径中
  // 假设路由名为 'workflowExecution'，参数为 id
  router.push({
    name: 'workflowExecution',
    params: { id: record.id }
  })
}

// 选择标签
const selectTag = (tag) => {
  selectedTag.value = tag
  // 切换标签后自动获取数据
  fetchHotNews()
}

// 获取热点新闻
const fetchHotNews = async () => {
  isLoadingNews.value = true
  hotNewsList.value = [] // 清空列表以显示加载状态
  console.log(`开始调用工作流获取${selectedTag.value}热点...`)
  
  // 模拟后端工作流返回数据
  setTimeout(() => {
    const allNews = [
      {
        id: 101,
        title: '人工智能在医疗领域的最新突破',
        summary: '最新的AI模型在早期癌症筛查中表现出超过人类专家的准确率，这一突破将彻底改变未来的医疗诊断流程。',
        source: '科技前沿',
        time: '10分钟前',
        category: 'AI科技',
        image: '/logo.png',
        url: '#'
      },
      {
        id: 102,
        title: '2025年全球云计算趋势报告发布',
        summary: '报告显示，边缘计算和无服务器架构将在未来一年迎来爆发式增长，企业上云率将突破90%。',
        source: '云观察',
        time: '1小时前',
        category: '云计算',
        image: '/logo.png',
        url: '#'
      },
      {
        id: 103,
        title: '新能源汽车电池技术获重大进展',
        summary: '某实验室研发出新型固态电池，续航里程提升50%，充电时间缩短至15分钟，量产在即。',
        source: '能源周刊',
        time: '3小时前',
        category: '新能源',
        image: '/logo.png',
        url: '#'
      },
      {
        id: 104,
        title: 'Web3.0 生态系统开发者大会召开',
        summary: '全球数千名开发者齐聚一堂，探讨去中心化应用的未来，多个重磅项目宣布主网上线。',
        source: '区块链日报',
        time: '5小时前',
        category: 'Web3',
        image: '/logo.png',
        url: '#'
      },
      {
        id: 105,
        title: '远程医疗：未来的医院没有围墙',
        summary: '随着5G和IoT技术的发展，远程医疗正在成为现实，患者足不出户即可享受专家级诊疗服务。',
        source: '健康时报',
        time: '2小时前',
        category: '医疗健康',
        image: '/logo.png',
        url: '#'
      },
      {
        id: 106,
        title: '生成式AI如何重塑内容创作产业',
        summary: '从文本到图像，再到视频，生成式AI正在以惊人的速度改变内容创作的方式和效率。',
        source: '数字观察',
        time: '30分钟前',
        category: 'AI科技',
        image: '/logo.png',
        url: '#'
      }
    ]

    // 根据选中的标签筛选数据
    if (selectedTag.value === '推荐') {
      hotNewsList.value = allNews
    } else {
      hotNewsList.value = allNews.filter(news => news.category === selectedTag.value)
    }
    
    isLoadingNews.value = false
  }, 1500)
}

const refreshHotNews = () => {
  console.log('刷新热点数据')
  fetchHotNews()
}

const openNewsDetail = (news) => {
  console.log('打开新闻详情:', news.title)
  // 这里可以做跳转或弹窗
}

const shareNews = (news) => {
  console.log('分享新闻:', news.title)
}

// 搜索用户
const searchUsers = () => {
  // Deprecated, merged into handleSearchInput
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
</script>

<style lang="scss" scoped>
.right-panel {
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  z-index: 1;
  overflow: hidden;
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

/* 标签选择区 */
.hotspot-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
}

.hotspot-tag {
  padding: 6px 12px;
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(102, 126, 234, 0.2);
  border-radius: 20px;
  font-size: 13px;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.3s ease;
}

.hotspot-tag:hover {
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
}

.hotspot-tag.active {
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  border-color: transparent;
  box-shadow: 0 4px 10px rgba(102, 126, 234, 0.3);
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

/* 新闻卡片样式 */
.news-item {
  display: flex;
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
  gap: 15px;
}

.news-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.2), transparent);
}

.news-item:hover {
  background: rgba(102, 126, 234, 0.05);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.05);
  border-color: rgba(102, 126, 234, 0.3);
}

.news-image {
  position: relative;
  width: 100px;
  height: 80px;
  border-radius: 10px;
  overflow: hidden;
  flex-shrink: 0;
}

.news-cover-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.news-item:hover .news-cover-img {
  transform: scale(1.1);
}

.news-tag {
  position: absolute;
  top: 6px;
  left: 6px;
  background: rgba(102, 126, 234, 0.9);
  color: white;
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 600;
}

.news-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.news-title {
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 6px;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.news-summary {
  font-size: 12px;
  color: #6b7280;
  margin-bottom: 8px;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.news-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: #9ca3af;
}

.news-source {
  display: flex;
  align-items: center;
  gap: 4px;
}

.icon-source {
  font-style: normal;
  font-size: 12px;
}

.news-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 5px;
}

.share-btn {
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
  width: 36px;
  height: 36px;
}

.share-btn:hover {
  background: #667eea;
  color: white;
  transform: scale(1.1);
}

.action-btn {
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
  width: auto;
  height: auto;
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

/* 搜索项鼠标悬停效果 */
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

/* Vue过渡动画 */
.fade-enter-active, .fade-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.btn-pulse-enter-active {
  transition: all 0.8s ease-out;
  animation: btnPulse 2s ease-in-out infinite;
}
.btn-pulse-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

.fade-slide-enter-active {
  transition: all 0.6s ease-out;
}
.fade-slide-leave-active {
  transition: all 0.3s ease-in;
}
.fade-slide-enter-from {
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
.scroll-unfold-enter-from {
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

/* 列表容器 */
.friend-list-container, .match-list-container, .search-list-container {
  display: flex;
  flex-direction: column;
  position: relative;
}

/* 匹配列表动画 */
.match-list-enter-active {
  transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  transition-delay: var(--delay);
}
.match-list-leave-active {
  transition: all 0.4s cubic-bezier(0.55, 0.06, 0.68, 0.19);
}
.match-list-enter-from {
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

/* 滑入动画 */
.slide-down-enter-active {
  transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  overflow: hidden;
}
.slide-down-leave-active {
  transition: all 0.4s cubic-bezier(0.55, 0.06, 0.68, 0.19);
  overflow: hidden;
}
.slide-down-enter-from {
  opacity: 0;
  transform: translateY(-20px) scale(0.95);
  max-height: 0;
  margin-top: 0;
  padding-top: 0;
  padding-bottom: 0;
}
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.98);
  max-height: 0;
  margin-top: 0;
  padding-top: 0;
  padding-bottom: 0;
}

@media (max-width: 768px) {
  .right-panel {
    padding: 15px;
  }
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

/* 工作流统计样式 */
.workflow-stats-container {
  flex: 1;
  overflow-y: auto;
  padding-right: 5px;
}

.workflow-action-section {
  margin-bottom: 20px;
}

.workflow-center-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 16px;
  cursor: pointer;
  color: white;
  position: relative;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
  transition: all 0.3s ease;
}

.workflow-center-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 30px rgba(102, 126, 234, 0.5);
}

.btn-content {
  display: flex;
  align-items: center;
  gap: 15px;
  z-index: 1;
}

.icon-workflow {
  font-size: 24px;
  background: rgba(255, 255, 255, 0.2);
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
}

.btn-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.btn-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 2px;
}

.btn-desc {
  font-size: 12px;
  opacity: 0.8;
}

.btn-arrow {
  font-size: 20px;
  font-weight: 300;
  opacity: 0.8;
  transition: transform 0.3s ease;
  z-index: 1;
}

.workflow-center-btn:hover .btn-arrow {
  transform: translateX(5px);
  opacity: 1;
}

.btn-decoration {
  position: absolute;
  right: -20px;
  top: -20px;
  width: 100px;
  height: 100px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  z-index: 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  margin-bottom: 25px;
}

.stat-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.4));
  border-radius: 16px;
  padding: 15px;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  border: 1px solid rgba(255, 255, 255, 0.6);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
}

.stat-card.primary { border-bottom: 3px solid #667eea; }
.stat-card.success { border-bottom: 3px solid #4ade80; }
.stat-card.info { border-bottom: 3px solid #f59e0b; }

.stat-icon {
  font-size: 24px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.stat-content {
  flex: 1;
}

.stat-value {
  font-size: 20px;
  font-weight: 700;
  color: #1f2937;
  line-height: 1.2;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 12px;
  color: #6b7280;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.section-header h3 {
  margin: 0;
  font-size: 16px;
  color: #374151;
  font-weight: 600;
}

.view-all-btn {
  font-size: 12px;
  color: #667eea;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 6px;
  transition: background 0.2s;
}

.view-all-btn:hover {
  background: rgba(102, 126, 234, 0.1);
}

.recent-executions {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.7), rgba(248, 250, 252, 0.5));
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 20px;
  margin-bottom: 25px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 8px 30px rgba(0,0,0,0.04);
}

.execution-item {
  display: flex;
  align-items: center;
  padding: 12px;
  border-bottom: 1px solid rgba(0,0,0,0.03);
  transition: background 0.2s;
  border-radius: 10px;
  margin-bottom: 4px;
  cursor: pointer;
}

.execution-item:last-child {
  border-bottom: none;
  margin-bottom: 0;
}

.execution-item:hover {
  background: rgba(255, 255, 255, 0.6);
}

.exec-status-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 12px;
  position: relative;
}

.exec-status-indicator::after {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  border-radius: 50%;
  border: 1px solid currentColor;
  opacity: 0.3;
  animation: pulse 2s infinite;
}

.exec-status-indicator.success { background-color: #4ade80; color: #4ade80; }
.exec-status-indicator.failed { background-color: #ef4444; color: #ef4444; }
.exec-status-indicator.running { background-color: #667eea; color: #667eea; }

.exec-main {
  flex: 1;
}

.exec-name {
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 2px;
}

.exec-time {
  font-size: 12px;
  color: #9ca3af;
}

.exec-meta {
  text-align: right;
}

.exec-duration {
  font-size: 12px;
  color: #6b7280;
  margin-bottom: 2px;
  font-family: monospace;
}

.exec-status-text {
  font-size: 11px;
  font-weight: 500;
}

.exec-status-text.success { color: #10b981; }
.exec-status-text.failed { color: #ef4444; }

.stats-chart-section {
  padding: 20px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.simple-bar-chart {
  height: 120px;
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  gap: 8px;
  padding-top: 20px;
}

.chart-bar {
  flex: 1;
  background: linear-gradient(180deg, #818cf8, #c4b5fd);
  border-radius: 6px 6px 2px 2px;
  position: relative;
  transition: all 0.3s ease;
  min-height: 4px;
}

.chart-bar:hover {
  background: linear-gradient(180deg, #6366f1, #a78bfa);
  transform: scaleY(1.05);
}

.bar-tooltip {
  position: absolute;
  top: -25px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.8);
  color: white;
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 4px;
  opacity: 0;
  transition: opacity 0.2s;
  white-space: nowrap;
  pointer-events: none;
}

.chart-bar:hover .bar-tooltip {
  opacity: 1;
}
</style>
