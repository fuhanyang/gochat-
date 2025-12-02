<template>
  <div class="notes-app-container" :style="appStyleVars">
    <!-- 左侧导航栏 -->
    <nav class="app-sidebar">
      <div class="sidebar-top">
        <div class="brand">
          <span class="brand-icon">📝</span>
          <span class="brand-name">智能笔记中心</span>
        </div>
        <button class="new-note-btn" @click="handleCreateNote">
          <span class="icon">+</span> 新建笔记
        </button>
      </div>

      <div class="nav-menu">
        <div class="menu-group">
          <div 
            class="menu-item" 
            :class="{ active: currentView === 'manage' }"
            @click="currentView = 'manage'"
          >
            <span class="icon">📄</span> 笔记管理
          </div>
          <div 
            class="menu-item" 
            :class="{ active: currentView === 'editor' }"
            @click="navigateToEditor"
          >
            <span class="icon">✍️</span> 编辑器
          </div>
          <div 
            class="menu-item" 
            :class="{ active: currentView === 'push' }"
            @click="navigateToPush"
          >
            <span class="icon">🚀</span> 推送配置
          </div>
          <div 
            class="menu-item" 
            :class="{ active: currentView === 'prefs' }"
            @click="currentView = 'prefs'"
          >
            <span class="icon">⚙️</span> 个性化设置
          </div>
        </div>

        <div class="menu-group">
          <div class="group-title">笔记分类</div>
          <div class="menu-item small"><span class="icon-dot work"></span> 工作笔记 <span class="count">12</span></div>
          <div class="menu-item small"><span class="icon-dot study"></span> 学习记录 <span class="count">8</span></div>
          <div class="menu-item small"><span class="icon-dot idea"></span> 创意灵感 <span class="count">5</span></div>
        </div>
      </div>

      <div class="sidebar-bottom">
        <div class="storage-info">
          <div class="storage-label">
            <span>存储空间</span>
            <span>68% 已使用</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" style="width: 68%"></div>
          </div>
        </div>
      </div>
    </nav>

    <!-- 主内容区域 -->
    <main class="app-main">
      <!-- 1. 笔记管理视图 -->
      <section v-if="currentView === 'manage'" class="view-manage">
        <header class="view-header">
          <div class="header-title">
            <h2>我的笔记</h2>
            <p>管理和组织您的所有笔记文件</p>
          </div>
          <div class="header-controls">
            <div class="search-bar">
              <i class="icon-search">🔍</i>
              <input v-model="searchKeyword" placeholder="搜索笔记..." />
            </div>
            <div class="view-toggles">
              <button class="icon-btn active" title="列表视图">≡</button>
              <button class="icon-btn" title="网格视图">∷</button>
            </div>
          </div>
        </header>

        <div class="filter-bar">
          <select class="filter-select">
            <option>最近更新</option>
            <option>创建时间</option>
          </select>
          <select class="filter-select">
            <option>所有格式</option>
            <option>Markdown</option>
            <option>Text</option>
          </select>
          <button class="text-btn ml-auto">⚡ 批量操作</button>
        </div>

        <div class="note-list-container">
          <div v-for="note in filteredNotes" :key="note.id" class="note-list-card" :class="{ active: selectedNoteId === note.id }" @click="selectNote(note.id)">
            <div class="card-main">
              <div class="card-header">
                <h3 class="note-title">{{ note.title }}</h3>
                <span class="format-badge">{{ note.format }}</span>
              </div>
              <div class="card-meta">
                <span>{{ note.category || '工作笔记' }}</span>
                <span class="separator">•</span>
                <span>{{ formatTime(note.updatedAt) }} 更新</span>
              </div>
              <p class="card-preview">{{ getPreview(note.content) }}</p>
              
              <!-- 标签栏 -->
              <div class="card-tags">
                <span v-for="tag in (note.tags || [])" :key="tag" class="tag-pill" :class="getTagClass(tag)">{{ tag }}</span>
              </div>

              <!-- AI 总结区域 -->
              <div class="ai-summary-section" :class="{ expanded: note.aiSummaryExpanded }">
                <div class="ai-header" @click.stop="toggleAiSummary(note)">
                  <span class="ai-icon">🤖</span>
                  <span class="ai-label">AI 总结</span>
                  <span class="toggle-arrow">{{ note.aiSummaryExpanded ? '收起' : '展开' }}</span>
                </div>
                <div class="ai-content">
                  <p>{{ note.aiSummary || '暂无 AI 总结内容，请尝试完善笔记内容。' }}</p>
                </div>
              </div>
            </div>
            <div class="card-actions">
              <button class="icon-btn" @click.stop="quickEdit(note)">✏️</button>
              <button class="icon-btn" @click.stop="quickPush(note)">🚀</button>
              <button class="icon-btn" @click.stop="deleteNote(note.id)">🗑️</button>
            </div>
          </div>
          
          <div v-if="filteredNotes.length === 0" class="empty-state">
            <p>暂无笔记，点击左上角新建</p>
          </div>
        </div>
      </section>

      <!-- 2. 编辑器视图 -->
      <section v-else-if="currentView === 'editor'" class="view-editor">
        <div v-if="selectedNote" class="editor-layout">
           <header class="editor-header">
             <input v-model="selectedNote.title" class="editor-title" placeholder="无标题笔记" />
             <div class="editor-actions">
               <span class="save-status">{{ saveStatus }}</span>
               <button class="btn-secondary" @click="currentView = 'push'">配置推送</button>
               <button class="btn-primary" @click="saveNote">保存</button>
             </div>
           </header>
           <div class="editor-body" :class="editorThemeClass">
             <div class="editor-gutter" v-if="personalization.showLineNumbers">
               <div v-for="n in lineCount" :key="n">{{ n }}</div>
             </div>
             <textarea 
               v-model="selectedNote.content" 
               class="editor-textarea"
               placeholder="开始您的创作..."
               @input="handleInput"
             ></textarea>
             <div v-if="personalization.showPreview" class="editor-preview markdown-body">
               <!-- 简易 Markdown 预览占位 -->
               <div v-html="renderMarkdown(selectedNote.content)"></div>
             </div>
           </div>
        </div>
        <div v-else class="empty-state">
          <p>请先选择或创建一篇笔记</p>
          <button class="btn-primary" @click="handleCreateNote">新建笔记</button>
        </div>
      </section>

      <!-- 3. 推送配置视图 -->
      <section v-else-if="currentView === 'push'" class="view-push">
        <div v-if="selectedNote" class="push-layout">
          <header class="view-header">
            <div class="header-title">
              <h2>推送配置</h2>
              <p>设置笔记内容推送到工作流或组件的规则</p>
            </div>
            <button class="btn-primary" @click="handlePushSave">保存配置</button>
          </header>

          <div class="push-stepper">
            <div class="step active">
              <div class="step-num">1</div>
              <span>选择推送目标</span>
            </div>
            <div class="step" :class="{ active: pushStep >= 2 }">
              <div class="step-num">2</div>
              <span>设置推送规则</span>
            </div>
            <div class="step" :class="{ active: pushStep >= 3 }">
              <div class="step-num">3</div>
              <span>确认与测试</span>
            </div>
          </div>

          <div class="push-content-scroll">
            <div class="push-tabs">
              <button class="push-tab active">工作流</button>
              <button class="push-tab">组件</button>
            </div>

            <div class="workflow-list">
              <div 
                v-for="wf in workflowOptions" 
                :key="wf.value" 
                class="workflow-item"
                :class="{ selected: selectedNote.pushTarget.workflowId === wf.value }"
                @click="selectedNote.pushTarget.workflowId = wf.value"
              >
                <div class="wf-info">
                  <h4>{{ wf.label }}</h4>
                  <p>{{ wf.desc || '暂无描述' }}</p>
                </div>
                <div class="wf-select">
                  <div class="radio-circle"></div>
                </div>
              </div>
            </div>

            <div class="push-history">
              <h3>推送历史</h3>
              <div class="history-list">
                <div class="history-item">
                  <span class="status-icon success">✓</span>
                  <span class="history-text">{{ selectedNote.title }} → {{ getWorkflowName(selectedNote.pushTarget.workflowId) }}</span>
                  <span class="history-time">今天 14:32</span>
                </div>
                <!-- 模拟失败项 -->
                <div class="history-item">
                   <span class="status-icon fail">✕</span>
                   <span class="history-text">{{ selectedNote.title }} → 内容发布审核流程</span>
                   <span class="history-time error-text">昨天 09:15 推送失败: 权限不足</span>
                </div>
              </div>
              <div class="history-footer">
                <button class="text-btn">查看全部</button>
              </div>
            </div>
          </div>

          <div class="push-footer">
             <button class="btn-secondary" @click="currentView = 'manage'">取消</button>
             <button class="btn-primary" @click="handlePushNext">下一步</button>
          </div>
        </div>
         <div v-else class="empty-state">
          <p>请先选择一篇笔记进行配置</p>
        </div>
      </section>

      <!-- 4. 个性化设置视图 -->
      <section v-else-if="currentView === 'prefs'" class="view-prefs">
        <header class="view-header">
           <h2>个性化设置</h2>
        </header>
        <div class="prefs-container">
          <div class="pref-card">
            <h3>主题设置</h3>
            <div class="theme-grid">
              <div 
                v-for="theme in themeOptions" 
                :key="theme.value"
                class="theme-preview-btn"
                :class="{ active: personalization.theme === theme.value }"
                @click="personalization.theme = theme.value"
              >
                {{ theme.label }}
              </div>
            </div>
          </div>
          <div class="pref-card">
            <h3>编辑器设置</h3>
            <div class="form-row">
               <label>字体大小</label>
               <input type="range" v-model="personalization.fontSize" min="12" max="24">
               <span>{{ personalization.fontSize }}px</span>
            </div>
            <div class="form-row">
               <label>显示行号</label>
               <input type="checkbox" v-model="personalization.showLineNumbers">
            </div>
            <div class="form-row">
               <label>开启预览</label>
               <input type="checkbox" v-model="personalization.showPreview">
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'

// --- Mock Data & Options ---
const workflowOptions = [
  { label: '产品需求评审流程', value: 'wf_pr', desc: '包含5个审批节点 · 每周自动执行。用于新功能需求的收集与评审。' },
  { label: '内容发布审核流程', value: 'wf_content', desc: '包含3个审批节点 · 手动触发。用于市场内容、博客文章的审核。' },
  { label: 'Bug跟踪与修复流程', value: 'wf_bug', desc: '包含4个处理节点 · 实时触发。用于产品Bug的提交与分配。' }
]

const themeOptions = [
  { label: '极光 (Aurora)', value: 'aurora' },
  { label: '暗夜 (Dark)', value: 'dark' },
  { label: '纸张 (Paper)', value: 'paper' }
]

const defaultPersonalization = {
  theme: 'aurora',
  fontSize: 16,
  showLineNumbers: true,
  showPreview: false,
  accentColor: '#3b82f6'
}

// --- State ---
const currentView = ref('manage') // manage, editor, push, prefs
const notes = ref([])
const selectedNoteId = ref(null)
const selectedNote = ref(null)
const searchKeyword = ref('')
const pushStep = ref(1)
const saveStatus = ref('已保存')

const personalization = reactive({ ...defaultPersonalization })

// --- Computed ---
const filteredNotes = computed(() => {
  if (!searchKeyword.value) return notes.value
  const kw = searchKeyword.value.toLowerCase()
  return notes.value.filter(n => n.title.toLowerCase().includes(kw) || n.content.toLowerCase().includes(kw))
})

const appStyleVars = computed(() => ({
  '--accent-color': personalization.accentColor,
  '--editor-font-size': personalization.fontSize + 'px'
}))

const editorThemeClass = computed(() => `theme-${personalization.theme}`)

const lineCount = computed(() => {
  return selectedNote.value ? (selectedNote.value.content.split('\n').length || 1) : 0
})

// --- Methods ---
function handleCreateNote() {
  const newNote = {
    id: Date.now(),
    title: '未命名笔记 ' + (notes.value.length + 1),
    content: '# 新笔记\n',
    format: 'Markdown',
    tags: ['未分类'],
    updatedAt: new Date(),
    category: '工作笔记',
    aiSummary: '这是AI自动生成的笔记摘要预览，记录了主要内容点...',
    aiSummaryExpanded: false,
    pushTarget: { type: 'workflow', workflowId: '' }
  }
  notes.value.unshift(newNote)
  selectNote(newNote.id)
  currentView.value = 'editor'
}

function selectNote(id) {
  selectedNoteId.value = id
  selectedNote.value = notes.value.find(n => n.id === id)
}

function navigateToEditor() {
  if (!selectedNote.value && notes.value.length > 0) {
    selectNote(notes.value[0].id)
  }
  currentView.value = 'editor'
}

function navigateToPush() {
  if (!selectedNote.value && notes.value.length > 0) {
     selectNote(notes.value[0].id)
  }
  currentView.value = 'push'
}

function quickEdit(note) {
  selectNote(note.id)
  currentView.value = 'editor'
}

function quickPush(note) {
  selectNote(note.id)
  currentView.value = 'push'
}

function deleteNote(id) {
  notes.value = notes.value.filter(n => n.id !== id)
  if (selectedNoteId.value === id) {
    selectedNote.value = null
    selectedNoteId.value = null
  }
}

function handleInput() {
  saveStatus.value = '保存中...'
  setTimeout(() => { saveStatus.value = '已保存' }, 1000)
  if (selectedNote.value) selectedNote.value.updatedAt = new Date()
}

function saveNote() {
  saveStatus.value = '已保存'
  // Logic to sync to backend
}

function toggleAiSummary(note) {
  note.aiSummaryExpanded = !note.aiSummaryExpanded
}

function handlePushNext() {
  if (pushStep.value < 3) pushStep.value++
  else {
    alert('推送配置完成')
    currentView.value = 'manage'
    pushStep.value = 1
  }
}

function handlePushSave() {
  alert('配置已保存')
}

function getWorkflowName(id) {
  const wf = workflowOptions.find(w => w.value === id)
  return wf ? wf.label : '未选择工作流'
}

function formatTime(d) {
  return new Date(d).toLocaleDateString()
}

function getPreview(content) {
  return content.slice(0, 60).replace(/[\n#]/g, ' ') + '...'
}

function renderMarkdown(text) {
  // Simple mock renderer
  return text.replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/\*\*(.*)\*\*/gim, '<b>$1</b>')
    .replace(/\n/gim, '<br>')
}

function getTagClass(tag) {
  const map = { '设计': 'blue', '产品': 'purple', '前端': 'green', 'React': 'indigo', '工作': 'orange', '计划': 'yellow' }
  return map[tag] || 'gray'
}

// Init
onMounted(() => {
  // Mock Initial Data
  if (notes.value.length === 0) {
    notes.value = [
      {
        id: 1, title: '产品设计思路.md', format: 'Markdown', category: '工作笔记',
        updatedAt: new Date('2023-11-28'),
        content: '# 产品设计思路\n记录了新功能模块的设计思路...',
        tags: ['设计', '产品'],
        aiSummary: '本文档分析了新功能模块的用户流程与界面设计，提出了3个核心交互方案，并包含线框图与功能优先级建议。关键结论：采用方案B可提升用户操作效率30%。',
        aiSummaryExpanded: true,
        pushTarget: { workflowId: 'wf_pr' }
      },
      {
        id: 2, title: 'React Hooks 学习笔记.md', format: 'Markdown', category: '学习记录',
        updatedAt: new Date('2023-11-25'),
        content: '# React Hooks\n整理了useState, useEffect的使用方法...',
        tags: ['前端', 'React'],
        aiSummary: '整理了React Hooks的使用方法和常见问题，包含useState、useEffect、useContext等钩子函数的示例代码，以及如何通过自定义Hook抽象复用逻辑...',
        aiSummaryExpanded: false,
        pushTarget: { workflowId: 'wf_content' }
      },
      {
        id: 3, title: '每周计划清单.txt', format: 'Text', category: '工作笔记',
        updatedAt: new Date('2023-11-27'),
        content: '1. 周一：需求评审\n2. 周二：开发',
        tags: ['工作', '计划'],
        aiSummary: '记录本周需要完成的主要任务和优先级安排，包含项目进度跟踪和会议记录，以及每日工作重点和时间分配计划...',
        aiSummaryExpanded: false,
        pushTarget: { workflowId: '' }
      }
    ]
    selectNote(1)
  }
})
</script>

<style scoped lang="scss">
/* Layout */
.notes-app-container {
  display: flex;
  height: 100%;
  background: #f3f4f6;
  color: #1f2937;
  font-family: 'Inter', sans-serif;
  overflow: hidden;
}

.app-sidebar {
  width: 240px;
  background: #ffffff;
  border-right: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}

.app-main {
  flex: 1;
  overflow: hidden;
  background: #ffffff;
  display: flex;
  flex-direction: column;
}

/* Sidebar Components */
.sidebar-top {
  padding: 20px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  font-weight: 600;
  font-size: 16px;
}

.new-note-btn {
  width: 100%;
  background: #2563eb;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition: background 0.2s;
  
  &:hover { background: #1d4ed8; }
}

.nav-menu {
  flex: 1;
  overflow-y: auto;
  padding: 0 10px;
}

.menu-group {
  margin-bottom: 24px;
}

.group-title {
  font-size: 12px;
  color: #9ca3af;
  padding: 8px 10px;
}

.menu-item {
  padding: 10px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #4b5563;
  font-size: 14px;
  
  &:hover { background: #f3f4f6; }
  &.active { background: #eff6ff; color: #2563eb; font-weight: 500; }
  
  &.small { font-size: 13px; }
}

.icon-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  &.work { background: #3b82f6; }
  &.study { background: #10b981; }
  &.idea { background: #a855f7; }
}

.count {
  margin-left: auto;
  background: #f3f4f6;
  padding: 2px 6px;
  border-radius: 99px;
  font-size: 11px;
  color: #6b7280;
}

.sidebar-bottom {
  padding: 20px;
  border-top: 1px solid #e5e7eb;
}

.storage-label {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #6b7280;
  margin-bottom: 6px;
}

.progress-bar {
  height: 6px;
  background: #e5e7eb;
  border-radius: 3px;
  overflow: hidden;
  
  .progress-fill {
    height: 100%;
    background: #3b82f6;
  }
}

/* Views Common */
.view-manage, .view-editor, .view-push, .view-prefs {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

.view-header {
  padding: 20px 32px;
  border-bottom: 1px solid #f3f4f6;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-title h2 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
}
.header-title p {
  margin: 4px 0 0;
  font-size: 13px;
  color: #6b7280;
}

/* Manage View */
.header-controls {
  display: flex;
  gap: 16px;
}

.search-bar {
  position: relative;
  input {
    padding: 8px 12px 8px 32px;
    border-radius: 6px;
    border: 1px solid #e5e7eb;
    background: #f9fafb;
    font-size: 13px;
    width: 240px;
    &:focus { outline: none; border-color: #3b82f6; background: white; }
  }
  i {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: #9ca3af;
    font-style: normal;
  }
}

.view-toggles {
  display: flex;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  padding: 2px;
  
  .icon-btn {
    padding: 4px 8px;
    background: transparent;
    border: none;
    cursor: pointer;
    border-radius: 4px;
    &.active { background: #eff6ff; color: #2563eb; }
  }
}

.filter-bar {
  padding: 12px 32px;
  display: flex;
  gap: 12px;
  align-items: center;
  border-bottom: 1px solid #f3f4f6;
}

.filter-select {
  padding: 6px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background: white;
  font-size: 13px;
  color: #4b5563;
}

.text-btn {
  background: transparent;
  border: none;
  color: #6b7280;
  cursor: pointer;
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 4px;
  &:hover { color: #374151; }
  &.ml-auto { margin-left: auto; }
}

.note-list-container {
  flex: 1;
  overflow-y: auto;
  padding: 20px 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  background: #fafafa;
}

.note-list-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  
  &:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.05); border-color: #d1d5db; }
  &.active { border-color: #3b82f6; box-shadow: 0 0 0 2px rgba(59,130,246,0.1); }
}

.card-main {
  flex: 1;
  min-width: 0;
  margin-right: 20px;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 6px;
}

.note-title {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #111827;
}

.format-badge {
  background: #f3f4f6;
  color: #6b7280;
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 4px;
}

.card-meta {
  font-size: 12px;
  color: #6b7280;
  margin-bottom: 8px;
  
  .separator { margin: 0 6px; color: #d1d5db; }
}

.card-preview {
  font-size: 13px;
  color: #4b5563;
  margin-bottom: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-tags {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

.tag-pill {
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  
  &.blue { background: #eff6ff; color: #2563eb; }
  &.purple { background: #f5f3ff; color: #7c3aed; }
  &.green { background: #ecfdf5; color: #059669; }
  &.indigo { background: #eef2ff; color: #4f46e5; }
  &.orange { background: #fff7ed; color: #ea580c; }
  &.yellow { background: #fefce8; color: #ca8a04; }
  &.gray { background: #f3f4f6; color: #6b7280; }
}

/* AI Summary Section */
.ai-summary-section {
  border: 1px solid #e0e7ff;
  background: #eef2ff;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
  
  .ai-header {
    padding: 8px 12px;
    display: flex;
    align-items: center;
    gap: 6px;
    cursor: pointer;
    
    .ai-icon { font-size: 14px; }
    .ai-label { font-size: 12px; font-weight: 600; color: #4338ca; }
    .toggle-arrow { margin-left: auto; font-size: 11px; color: #6366f1; }
  }
  
  .ai-content {
    padding: 0 12px;
    height: 0;
    opacity: 0;
    overflow: hidden;
    transition: all 0.3s ease;
    font-size: 12px;
    color: #4338ca;
    line-height: 1.5;
  }
  
  &.expanded {
    .ai-content {
      padding: 0 12px 12px;
      height: auto;
      opacity: 1;
    }
  }
}

.card-actions {
  display: flex;
  gap: 4px;
  
  .icon-btn {
    background: transparent;
    border: none;
    cursor: pointer;
    opacity: 0.6;
    &:hover { opacity: 1; background: #f3f4f6; border-radius: 4px; }
  }
}

/* Editor View */
.editor-layout {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.editor-header {
  padding: 16px 32px;
  border-bottom: 1px solid #f3f4f6;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.editor-title {
  font-size: 20px;
  font-weight: 600;
  border: none;
  outline: none;
  width: 50%;
  color: #111827;
}

.editor-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.save-status {
  font-size: 12px;
  color: #9ca3af;
  margin-right: 8px;
}

.btn-primary {
  background: #2563eb;
  color: white;
  border: none;
  padding: 8px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  &:hover { background: #1d4ed8; }
}

.btn-secondary {
  background: white;
  border: 1px solid #d1d5db;
  color: #374151;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  &:hover { border-color: #9ca3af; }
}

.editor-body {
  flex: 1;
  display: flex;
  overflow: hidden;
  
  &.theme-dark { background: #1f2937; .editor-textarea { color: #e5e7eb; } }
  &.theme-paper { background: #fefaf0; }
}

.editor-gutter {
  width: 40px;
  background: #f9fafb;
  border-right: 1px solid #f3f4f6;
  padding: 20px 0;
  text-align: center;
  font-size: 12px;
  color: #d1d5db;
  user-select: none;
}

.editor-textarea {
  flex: 1;
  border: none;
  resize: none;
  padding: 20px;
  font-size: var(--editor-font-size, 16px);
  outline: none;
  line-height: 1.6;
  font-family: monospace;
  background: transparent;
  color: #1f2937;
}

.editor-preview {
  flex: 1;
  border-left: 1px solid #f3f4f6;
  padding: 20px;
  overflow-y: auto;
  background: white;
}

/* Push View */
.push-layout {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.push-stepper {
  padding: 20px 32px;
  display: flex;
  gap: 40px;
  border-bottom: 1px solid #f3f4f6;
  
  .step {
    display: flex;
    align-items: center;
    gap: 10px;
    color: #9ca3af;
    
    .step-num {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: #f3f4f6;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
    }
    
    &.active {
      color: #2563eb;
      font-weight: 500;
      .step-num { background: #2563eb; color: white; }
    }
  }
}

.push-content-scroll {
  flex: 1;
  overflow-y: auto;
  padding: 32px;
}

.push-tabs {
  display: flex;
  gap: 20px;
  margin-bottom: 24px;
  border-bottom: 1px solid #e5e7eb;
  
  .push-tab {
    background: transparent;
    border: none;
    padding-bottom: 10px;
    font-size: 14px;
    cursor: pointer;
    color: #6b7280;
    border-bottom: 2px solid transparent;
    
    &.active {
      color: #2563eb;
      border-bottom-color: #2563eb;
      font-weight: 500;
    }
  }
}

.workflow-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 40px;
}

.workflow-item {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover { border-color: #9ca3af; }
  &.selected { border-color: #2563eb; background: #eff6ff; }
}

.wf-info h4 { margin: 0 0 4px; font-size: 15px; }
.wf-info p { margin: 0; font-size: 12px; color: #6b7280; }

.radio-circle {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid #d1d5db;
  position: relative;
}
.workflow-item.selected .radio-circle {
  border-color: #2563eb;
  &::after {
    content: '';
    position: absolute;
    top: 3px; left: 3px;
    width: 8px; height: 8px;
    background: #2563eb;
    border-radius: 50%;
  }
}

.push-history h3 { margin: 0 0 16px; font-size: 16px; }

.history-list {
  background: #fafafa;
  border-radius: 8px;
  padding: 16px;
}

.history-item {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
  font-size: 13px;
  
  &:last-child { margin-bottom: 0; }
}

.status-icon {
  width: 16px; height: 16px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center; font-size: 10px; color: white;
  &.success { background: #10b981; }
  &.fail { background: #ef4444; }
}

.history-time { margin-left: auto; color: #9ca3af; font-size: 12px; }
.error-text { color: #ef4444; }

.push-footer {
  padding: 20px 32px;
  border-top: 1px solid #f3f4f6;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

/* Prefs View */
.prefs-container {
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.pref-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 20px;
  
  h3 { margin: 0 0 20px; font-size: 16px; }
}

.theme-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.theme-preview-btn {
  border: 2px solid #e5e7eb;
  padding: 20px;
  text-align: center;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  
  &:hover { border-color: #9ca3af; }
  &.active { border-color: #2563eb; color: #2563eb; background: #eff6ff; }
}

.form-row {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
  
  label { width: 100px; font-size: 14px; color: #374151; }
}
</style>
