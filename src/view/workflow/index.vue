<template>
  <div class="wf-hub">
    <MainBackgroundDecoration />
    <TopNav />

    <!-- 市场内容 -->
    <div v-show="activeTab === 'market'" class="tab-animate">
      <HeroBar
        v-model:keyword="keyword"
        v-model:category="category"
        v-model:sortBy="sortBy"
        :category-chips="categoryChips"
        @search="onSearch"
      />

      <section class="wf-section wf-section--featured">
        <div class="wf-section__header">
          <h2>常用工作流</h2>
          <div class="wf-sort">
            <span class="wf-sort__label">排序：</span>
            <el-select v-model="sortBy" size="small" style="width: 140px" @change="onSearch">
            <el-option label="推荐" value="recommend" />
            <el-option label="热门" value="popular" />
            <el-option label="最新" value="latest" />
          </el-select>
          </div>
        </div>

        <WorkflowList
          :workflows="workflows"
          :fav-map="favMap"
          :loading-more="loadingMore"
          :disabled-more="workflows.length >= total"
          @invoke="onInvoke"
          @loadMore="loadMore"
        />
      </section>

      <section class="wf-section wf-section--block">
        <h2 class="wf-section__title">上传自定义工作流</h2>
        <UploadAndTips />
      </section>

      <QuickStart />
    </div>

    <!-- 历史记录内容 -->
    <div v-if="activeTab === 'history'" class="tab-animate wf-tab-content">
      <div class="section-header">
        <h2>个人工作流执行记录</h2>
        <span class="sub-text">同步自个人中心数据</span>
      </div>
      
      <div class="history-list">
        <div 
          class="history-item" 
          v-for="record in executionHistory" 
          :key="record.id"
          @click="viewExecutionDetail(record)"
        >
          <div class="history-status" :class="record.status">
            <i class="status-icon">{{ getStatusIcon(record.status) }}</i>
          </div>
          <div class="history-main">
            <div class="history-name">{{ record.name }}</div>
            <div class="history-time">{{ record.time }}</div>
          </div>
          <div class="history-meta">
            <div class="history-duration">耗时: {{ record.duration }}</div>
            <div class="history-status-text" :class="record.status">{{ record.statusText }}</div>
          </div>
          <div class="history-action">
            <el-button text size="small">查看详情</el-button>
          </div>
        </div>
      </div>
    </div>

    <!-- 我的收藏内容 -->
    <div v-if="activeTab === 'favorites'" class="tab-animate wf-tab-content">
      <div class="section-header">
        <h2>我的收藏</h2>
      </div>
      <div v-if="favoriteWorkflows.length > 0">
        <WorkflowList
          :workflows="favoriteWorkflows"
          :fav-map="favMap"
          :loading-more="false"
          :disabled-more="true"
          @invoke="onInvoke"
        />
      </div>
      <div v-else class="empty-state">
        <div class="empty-icon">⭐</div>
        <div class="empty-text">暂无收藏的工作流</div>
        <el-button type="primary" plain @click="activeTab = 'market'">去市场看看</el-button>
      </div>
    </div>

    <!-- 设置内容 -->
    <div v-if="activeTab === 'settings'" class="tab-animate wf-tab-content">
      <div class="section-header">
        <h2>工作流设置</h2>
      </div>
      
      <div class="settings-card">
        <div class="setting-group">
          <h3>常规设置</h3>
          <div class="setting-item">
            <div class="setting-info">
              <div class="setting-label">执行完成后通知</div>
              <div class="setting-desc">当工作流执行完成时发送系统通知</div>
            </div>
            <el-switch v-model="settings.notifications" />
          </div>
          <div class="setting-item">
            <div class="setting-info">
              <div class="setting-label">自动保存执行日志</div>
              <div class="setting-desc">保留最近 30 天的详细执行日志</div>
            </div>
            <el-switch v-model="settings.autoSaveLogs" />
          </div>
        </div>

        <div class="setting-group">
          <h3>开发者选项</h3>
          <div class="setting-item">
            <div class="setting-info">
              <div class="setting-label">显示调试信息</div>
              <div class="setting-desc">在执行过程中显示详细的调试输出</div>
            </div>
            <el-switch v-model="settings.debugMode" />
          </div>
          <div class="setting-item">
            <div class="setting-info">
              <div class="setting-label">允许并发执行</div>
              <div class="setting-desc">允许同一个工作流同时运行多个实例</div>
            </div>
            <el-switch v-model="settings.concurrentExecution" />
          </div>
        </div>
      </div>
    </div>

    <footer class="wf-footer">
      <div class="wf-footer__brand">FlowMaster</div>
      <div class="wf-footer__links">
        <a href="javascript:void(0)">帮助中心</a>
        <a href="javascript:void(0)">隐私政策</a>
        <a href="javascript:void(0)">服务条款</a>
        <a href="javascript:void(0)">意见反馈</a>
      </div>
      <div class="wf-footer__copyright">© 2023 FlowMaster. 保留所有权利</div>
    </footer>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import MainBackgroundDecoration from '@/components/common/MainBackgroundDecoration.vue'
import TopNav from '@/components/common/TopNav.vue'
import HeroBar from './components/HeroBar.vue'
import WorkflowList from './components/WorkflowList.vue'
import UploadAndTips from './components/UploadAndTips.vue'
import QuickStart from './components/QuickStart.vue'
import { fetchWorkflowList } from '@/api/workflow'

const router = useRouter()
const route = useRoute()

// 当前激活的 Tab，默认为 market
const activeTab = ref('market')

// 监听路由参数变化来切换 Tab
watch(() => route.query.tab, (newTab) => {
  if (newTab) {
    activeTab.value = newTab
  } else {
    activeTab.value = 'market'
  }
}, { immediate: true })

const loading = ref(false)
const loadingMore = ref(false)
const page = ref(1)
const pageSize = ref(12)
const total = ref(0)
const workflows = ref([])
const favMap = reactive({})
const keyword = ref('')
const category = ref('all')
const sortBy = ref('recommend')

// 历史记录数据 (模拟 Dashboard 数据)
const executionHistory = ref([
  { id: 1, name: '日报自动生成', time: '10分钟前', duration: '2s', status: 'success', statusText: '成功' },
  { id: 2, name: '客户数据同步', time: '2小时前', duration: '45s', status: 'success', statusText: '成功' },
  { id: 3, name: '周报邮件分发', time: '5小时前', duration: '1.2s', status: 'failed', statusText: '失败' },
  { id: 4, name: '服务器资源监控', time: '昨天', duration: '5s', status: 'success', statusText: '成功' },
  { id: 5, name: '舆情分析报告', time: '昨天', duration: '120s', status: 'success', statusText: '成功' },
])

// 设置数据
const settings = reactive({
  notifications: true,
  autoSaveLogs: true,
  debugMode: false,
  concurrentExecution: false
})

// 计算属性：收藏的工作流
const favoriteWorkflows = computed(() => {
  return workflows.value.filter(item => favMap[item.id])
})

const categoryChips = [
  { label: '全部', value: 'all', count: 24 },
  { label: '效率工具', value: 'productivity', count: 8 },
  { label: '内容创作', value: 'content', count: 6 },
  { label: '数据处理', value: 'data', count: 5 },
  { label: '自动化', value: 'automation', count: 5 }
]

async function loadList(append = false) {
  loading.value = !append
  loadingMore.value = append
  try {
    const params = {
      page: page.value,
      pageSize: pageSize.value,
      keyword: keyword.value || undefined,
      category: category.value !== 'all' ? category.value : undefined,
      sort: sortBy.value
    }
    const res = await fetchWorkflowList(params)
    const list = res?.data?.list || []
    total.value = res?.data?.total || list.length
    if (append) {
      workflows.value = workflows.value.concat(list)
    } else {
      workflows.value = list
    }
  } catch (e) {
    // handled by request interceptor
  } finally {
    loading.value = false
    loadingMore.value = false
  }
}

function onSearch() {
  page.value = 1
  loadList(false)
}

function onCategory(val) {
  if (category.value === val) return
  category.value = val
  page.value = 1
  loadList(false)
}

function onSort(cmd) {
  sortBy.value = cmd
  page.value = 1
  loadList(false)
}

function loadMore() {
  if (workflows.value.length >= total.value) return
  page.value += 1
  loadList(true)
}

function onInvoke(item) {
  router.push({ path: '/workflow/invoke', query: { id: item.id } })
}

function viewExecutionDetail(record) {
  // 跳转到执行详情，假设路由为 /workflow/execution/:id
  router.push({
    name: 'workflowExecution',
    params: { id: record.id }
  })
}

function getStatusIcon(status) {
  switch(status) {
    case 'success': return '✅'
    case 'failed': return '❌'
    default: return '⏱️'
  }
}

onMounted(() => {
  loadList()
})
</script>

<style scoped lang="scss">
.wf-hub {
  min-height: 100vh;
  background: linear-gradient(180deg, var(--brand-light) 0%, #ffffff 240px, #ffffff 100%);
  position: relative;
  padding: 16px;
  overflow: hidden;
}
.wf-section {
  margin-top: 16px;
  position: relative;
  z-index: 1;
}
.wf-section__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  color: var(--text-primary);
}
.wf-sort {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.wf-sort__label {
  color: var(--text-secondary);
  font-size: 13px;
}
.wf-section__title {
  margin-bottom: 12px;
  color: var(--text-primary);
}

/* 动画 */
.tab-animate {
  animation: fadeIn 0.4s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* 历史记录样式 */
.wf-tab-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
}

.section-header {
  margin-bottom: 24px;
  display: flex;
  align-items: baseline;
  gap: 12px;
}

.section-header h2 {
  margin: 0;
  font-size: 24px;
  color: var(--text-primary);
}

.sub-text {
  color: #9CA3AF;
  font-size: 14px;
}

.history-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.history-item {
  display: flex;
  align-items: center;
  padding: 20px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid rgba(0,0,0,0.05);
}

.history-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.15);
  border-color: rgba(102, 126, 234, 0.3);
}

.history-status {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  margin-right: 20px;
  background: #F3F4F6;
}

.history-status.success { background: #DEF7EC; color: #03543F; }
.history-status.failed { background: #FDE8E8; color: #9B1C1C; }

.history-main {
  flex: 1;
}

.history-name {
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 4px;
}

.history-time {
  font-size: 14px;
  color: #6B7280;
}

.history-meta {
  text-align: right;
  margin-right: 24px;
}

.history-duration {
  font-family: monospace;
  color: #6B7280;
  font-size: 14px;
  margin-bottom: 4px;
}

.history-status-text {
  font-size: 14px;
  font-weight: 500;
}

.history-status-text.success { color: #10B981; }
.history-status-text.failed { color: #EF4444; }

/* 设置样式 */
.settings-card {
  background: white;
  border-radius: 20px;
  padding: 32px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

.setting-group {
  margin-bottom: 32px;
}

.setting-group:last-child {
  margin-bottom: 0;
}

.setting-group h3 {
  font-size: 18px;
  color: #374151;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid #E5E7EB;
}

.setting-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
}

.setting-info {
  flex: 1;
}

.setting-label {
  font-size: 16px;
  font-weight: 500;
  color: #1F2937;
  margin-bottom: 4px;
}

.setting-desc {
  font-size: 14px;
  color: #6B7280;
}

/* 空状态 */
.empty-state {
  text-align: center;
  padding: 60px 0;
  background: rgba(255,255,255,0.5);
  border-radius: 20px;
}

.empty-icon {
  font-size: 64px;
  margin-bottom: 24px;
  opacity: 0.5;
}

.empty-text {
  font-size: 18px;
  color: #6B7280;
  margin-bottom: 24px;
}

/* 交互优化：禁用非输入区域文字选中与文本光标 */
.wf-hub {
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}
.wf-hub :is(input, textarea, [contenteditable="true"]) {
  -webkit-user-select: text;
  -moz-user-select: text;
  user-select: text;
}
.wf-hub :deep(.el-input__inner),
.wf-hub :deep(.el-input__wrapper) {
  -webkit-user-select: text;
  -moz-user-select: text;
  user-select: text;
  cursor: text;
}
/* 保持点击控件的指针样式，且不允许选中 */
.wf-hub :deep(.el-button),
.wf-hub :deep(.el-tag),
.wf-hub :deep(.el-check-tag),
.wf-hub :deep(.el-select),
.wf-hub :deep(.el-select__selected-item),
.wf-hub a,
.tab,
.wf-card__fav {
  user-select: none;
  cursor: pointer;
}
/* 分层模块背景 */
.wf-section--block {
  background: #F3F4F6;
  border-radius: 8px;
  padding: 16px;
}
/* 常用工作流区域背景点缀 */
.wf-section--featured {
  position: relative;
  overflow: hidden;
}
.wf-section--featured::before {
  content: '';
  position: absolute;
  top: -20px;
  right: -40px;
  width: 220px;
  height: 220px;
  background: radial-gradient(circle at center, rgba(114,46,209,0.10) 0%, rgba(114,46,209,0) 70%);
  pointer-events: none;
}
.wf-section--featured::after {
  content: '';
  position: absolute;
  bottom: -30px;
  left: -30px;
  width: 280px;
  height: 280px;
  background: radial-gradient(circle at center, rgba(160,108,213,0.10) 0%, rgba(160,108,213,0) 70%);
  pointer-events: none;
}
/* 页脚 */
.wf-footer {
  margin-top: 24px;
  padding: 16px;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  color: #E5E7EB;
  font-size: 13px;
  background: #5C27A0;
  border-radius: 12px;
}
.wf-footer__brand {
  font-weight: 700;
  color: #E5E7EB;
}
.wf-footer__links {
  display: flex;
  gap: 16px;
  justify-content: center;
}
.wf-footer__links a {
  color: #E5E7EB;
  transition: color .2s ease;
}
.wf-footer__links a:hover { color: #ffffff; }
.wf-footer__copyright {
  display: flex;
  justify-content: flex-end;
}
</style>


