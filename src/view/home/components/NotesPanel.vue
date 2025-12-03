<template>
  <div class="notes-app-container" :style="appStyleVars">
    <!-- 1. Global Top Bar -->
    <header class="notes-top-bar">
      <div class="top-bar-left">
        <el-icon class="brand-icon"><EditPen /></el-icon>
        <span class="brand-text">智能笔记中心</span>
      </div>
      <div class="top-bar-right">
        <div class="search-box" :class="{ focused: searchFocused }">
          <el-icon class="search-icon"><Search /></el-icon>
          <input 
            type="text" 
            placeholder="搜索笔记..." 
            v-model="searchKeyword"
            @focus="searchFocused = true"
            @blur="searchFocused = false"
          />
        </div>
        <div class="user-profile">
          <div class="user-avatar-circle">JD</div>
        </div>
      </div>
    </header>

    <div class="notes-body">
      <!-- 左侧导航栏 -->
      <NotesSidebar
        :current-view="currentView"
        @update:currentView="currentView = $event"
        @navigate="handleNavigate"
        @create="handleCreateNote"
      />

      <!-- 主内容区域 -->
      <main class="app-main">
        <!-- 1. 笔记管理视图 -->
        <NotesList
          v-if="currentView === 'manage'"
          :notes="filteredNotes"
          :selected-note-id="selectedNoteId"
          :search-keyword="searchKeyword"
          @update:searchKeyword="searchKeyword = $event"
          @select="selectNote"
          @edit="quickEdit"
          @push="quickPush"
          @delete="deleteNote"
        />

        <!-- 2. 编辑器视图 -->
        <NotesEditor
          v-else-if="currentView === 'editor'"
          :note="selectedNote"
          :personalization="personalization"
          @update:note="updateSelectedNote"
          @save="saveNote"
          @config-push="currentView = 'push'"
          @create="handleCreateNote"
        />

        <!-- 3. 推送配置视图 -->
        <NotesPush
          v-else-if="currentView === 'push'"
          :note="selectedNote"
          :step="pushStep"
          :workflow-options="workflowOptions"
          @update:note="updateSelectedNote"
          @save="handlePushSave"
          @next="handlePushNext"
          @cancel="currentView = 'manage'"
        />

        <!-- 4. 个性化设置视图 -->
        <NotesSettings
          v-else-if="currentView === 'prefs'"
          :personalization="personalization"
          :theme-options="themeOptions"
          @update:personalization="updatePersonalization"
        />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { Search, EditPen } from '@element-plus/icons-vue'
import NotesSidebar from './notes/NotesSidebar.vue'
import NotesList from './notes/NotesList.vue'
import NotesEditor from './notes/NotesEditor.vue'
import NotesPush from './notes/NotesPush.vue'
import NotesSettings from './notes/NotesSettings.vue'

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
const searchFocused = ref(false)
const pushStep = ref(1)

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

function handleNavigate(view) {
  if (view === 'editor' || view === 'push') {
    if (!selectedNote.value && notes.value.length > 0) {
      selectNote(notes.value[0].id)
    }
  }
  currentView.value = view
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

function updateSelectedNote(updatedNote) {
  // Update the note in the list as well
  const index = notes.value.findIndex(n => n.id === updatedNote.id)
  if (index !== -1) {
    notes.value[index] = updatedNote
    selectedNote.value = updatedNote
  }
}

function saveNote() {
  // Logic to sync to backend
  console.log('Note saved:', selectedNote.value)
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

function updatePersonalization(newSettings) {
  Object.assign(personalization, newSettings)
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
  flex-direction: column;
  height: 100%;
  background: #f3f4f6;
  color: #1f2937;
  font-family: 'Inter', sans-serif;
  overflow: hidden;
}

.notes-top-bar {
  height: 56px;
  background: #FFFFFF;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08); /* Global Shadow */
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  flex-shrink: 0;
  z-index: 10;
  border-bottom: 1px solid #E5E6EB; /* Global Border */
}

.top-bar-left {
  display: flex;
  align-items: center;
  gap: 10px;
  
  .brand-icon { 
    font-size: 18px; 
    color: #165DFF; 
    /* Icon alignment adjustment if needed, usually flex handles it */
  }
  .brand-text { font-size: 16px; font-weight: 600; color: #1D2129; }
}

.top-bar-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.search-box {
  display: flex;
  align-items: center;
  background: #F7F8FA;
  border: 1px solid transparent; 
  border-radius: 8px; /* Global Radius */
  height: 36px;
  width: 200px;
  padding: 0 12px;
  transition: background-color 0.2s linear, border-color 0.2s linear, box-shadow 0.2s linear; /* Global Transition */
  
  &.focused {
    background: #FFFFFF;
    border-color: #165DFF;
    box-shadow: 0 0 0 2px rgba(22, 93, 255, 0.15); /* Keep specific focus ring, unrelated to hover shadow */
  }
  
  .search-icon { 
    color: #86909C; /* Global Inactive Icon */
    margin-right: 12px; 
    font-size: 16px; /* Global Icon Size */
  }
  
  input {
    border: none;
    background: transparent;
    font-size: 14px;
    width: 100%;
    color: #1D2129;
    
    &:focus { outline: none; }
    &::placeholder { color: #86909C; }
  }
}

.user-profile {
  cursor: pointer;
  
  .user-avatar-circle {
    width: 28px;
    height: 28px;
    background: #E8F3FF;
    color: #165DFF;
    border: 1px solid #F0F7FF;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 14px;
    transition: transform 0.2s linear; /* Global Transition */
    
    &:hover { transform: scale(1.05); }
  }
}

.notes-body {
  flex: 1;
  display: flex;
  overflow: hidden;
}

.app-main {
  flex: 1;
  overflow: hidden;
  background: #ffffff;
  display: flex;
  flex-direction: column;
}
</style>
