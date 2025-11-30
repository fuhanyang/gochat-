<template>
  <div class="hot-news-list">
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
          v-for="(news, index) in paginatedNews" 
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
      
      <!-- 分页控件 -->
      <div class="pagination-controls" v-if="totalPages > 1">
        <button 
          class="page-btn" 
          :disabled="currentPage === 1"
          @click="changePage(currentPage - 1)"
        >
          &lt;
        </button>
        <div class="page-numbers">
          <span 
            v-for="page in displayedPages" 
            :key="page"
            class="page-number"
            :class="{ active: currentPage === page, dots: page === '...' }"
            @click="page !== '...' && changePage(page)"
          >
            {{ page }}
          </span>
        </div>
        <button 
          class="page-btn" 
          :disabled="currentPage === totalPages"
          @click="changePage(currentPage + 1)"
        >
          &gt;
        </button>
      </div>

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
</template>

<script setup>
import { ref, computed } from 'vue'

// 热点新闻相关
const isLoadingNews = ref(false)
const hotNewsList = ref([])
const newsTags = ['推荐', 'AI科技', '云计算', '新能源', 'Web3', '医疗健康']
const selectedTag = ref('推荐')

// 分页相关
const currentPage = ref(1)
const pageSize = 5

// 分页计算
const totalPages = computed(() => Math.ceil(hotNewsList.value.length / pageSize))

const paginatedNews = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return hotNewsList.value.slice(start, start + pageSize)
})

// 显示的页码
const displayedPages = computed(() => {
  const total = totalPages.value
  const current = currentPage.value
  const delta = 2
  const range = []

  for (let i = Math.max(2, current - delta); i <= Math.min(total - 1, current + delta); i++) {
    range.push(i)
  }

  if (current - delta > 2) {
    range.unshift('...')
  }
  if (current + delta < total - 1) {
    range.push('...')
  }

  range.unshift(1)
  if (total > 1) {
    range.push(total)
  }

  return range
})

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
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
  currentPage.value = 1 // 重置页码
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
</script>

<style lang="scss" scoped>
.hot-news-list {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* 匹配控制 */
.matching-controls {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(240, 248, 255, 0.8));
  border-radius: 20px;
  padding: 15px;
  margin-bottom: 15px;
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
  margin: 0 0 10px 0;
  color: #6b7280;
  font-size: 14px;
}

/* 标签选择区 */
.hotspot-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 15px;
}

.hotspot-tag {
  padding: 4px 10px;
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(102, 126, 234, 0.2);
  border-radius: 20px;
  font-size: 12px;
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
  padding: 15px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.25);
  overflow: hidden; /* 防止出现双重滚动条 */
  position: relative;
  display: flex;
  flex-direction: column;
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
  padding: 10px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 10px;
  border: 1px solid rgba(102, 126, 234, 0.1);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.6), rgba(248, 250, 252, 0.4));
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
  gap: 10px;
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
  width: 80px;
  height: 60px;
  border-radius: 8px;
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
  top: 4px;
  left: 4px;
  background: rgba(102, 126, 234, 0.9);
  color: white;
  font-size: 9px;
  padding: 2px 4px;
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
  font-size: 14px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 4px;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.news-summary {
  font-size: 12px;
  color: #6b7280;
  margin-bottom: 4px;
  line-height: 1.4;
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
  width: 28px;
  height: 28px;
}

.share-btn:hover {
  background: #667eea;
  color: white;
  transform: scale(1.1);
}

.action-btn {
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
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

.matching-dot:nth-child(1) { animation-delay: 0s; }
.matching-dot:nth-child(2) { animation-delay: 0.3s; }
.matching-dot:nth-child(3) { animation-delay: 0.6s; }

.matching-text {
  font-size: 14px;
  color: #6b7280;
  animation: fadeInOut 2s infinite ease-in-out;
}

@keyframes glow {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.05); }
}

@keyframes matchingPulse {
  0%, 100% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.5); opacity: 1; }
}

@keyframes fadeInOut {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}

.btn-pulse-enter-active {
  transition: all 0.8s ease-out;
  animation: btnPulse 2s ease-in-out infinite;
}
.btn-pulse-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

/* 列表容器 */
.match-list-container {
  display: flex;
  flex-direction: column;
  position: relative;
  flex: 1;
  /* 隐藏滚动条但保留滚动功能 */
  overflow-y: auto;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE/Edge */
}

/* 隐藏 Webkit 浏览器滚动条 */
.match-list-container::-webkit-scrollbar {
  display: none;
}

/* 匹配列表动画 */
.match-list-enter-active {
  transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  transition-delay: var(--delay);
}
.match-list-leave-active {
  transition: all 0.4s cubic-bezier(0.55, 0.06, 0.68, 0.19);
  position: absolute;
  width: 100%;
}
.match-list-enter-from {
  opacity: 0;
  transform: translateX(100%) scaleX(0.1) rotateY(15deg);
}
.match-list-leave-to {
  opacity: 0;
  transform: translateX(-100%) scaleX(0.1) rotateY(-15deg);
}
.match-list-move {
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

/* Vue过渡动画 */
.fade-enter-active, .fade-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
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

/* 粒子效果 */
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

.matching-results .particle:nth-child(1) { top: 15%; left: 8%; animation-delay: 0.5s; width: 15px; height: 15px; }
.matching-results .particle:nth-child(2) { top: 25%; right: 12%; animation-delay: 1.5s; width: 7px; height: 7px; }
.matching-results .particle:nth-child(3) { top: 45%; left: 25%; animation-delay: 2.5s; width: 11px; height: 11px; }
.matching-results .particle:nth-child(4) { top: 65%; right: 8%; animation-delay: 3.5s; width: 13px; height: 13px; }
.matching-results .particle:nth-child(5) { top: 35%; left: 5%; animation-delay: 4.5s; width: 9px; height: 9px; }
.matching-results .particle:nth-child(6) { top: 75%; right: 30%; animation-delay: 5.5s; width: 17px; height: 17px; }

@keyframes floatParticle {
  0%, 100% { transform: translateY(0px) translateX(0px) scale(1); opacity: 0.6; }
  25% { transform: translateY(-15px) translateX(10px) scale(1.2); opacity: 0.8; }
  50% { transform: translateY(-25px) translateX(-5px) scale(0.8); opacity: 1; }
  75% { transform: translateY(-10px) translateX(15px) scale(1.1); opacity: 0.7; }
}

/* 分页控件 */
.pagination-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: auto; /* 推到底部 */
  padding-top: 10px;
  padding-bottom: 2px;
  z-index: 20;
  position: relative;
  border-top: 1px solid rgba(102, 126, 234, 0.1);
}

.page-btn {
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(102, 126, 234, 0.2);
  border-radius: 8px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #667eea;
  transition: all 0.3s ease;
}

.page-btn:hover:not(:disabled) {
  background: #667eea;
  color: white;
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-numbers {
  display: flex;
  align-items: center;
  gap: 5px;
}

.page-number {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  cursor: pointer;
  font-size: 13px;
  color: #6b7280;
  transition: all 0.3s ease;
  border: 1px solid transparent;
}

.page-number:hover:not(.dots) {
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
}

.page-number.active {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  font-weight: 600;
  box-shadow: 0 4px 10px rgba(102, 126, 234, 0.3);
}

.page-number.dots {
  cursor: default;
  color: #9ca3af;
}
</style>

