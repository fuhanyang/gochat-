<template>
  <section class="view-manage">
    <header class="view-header">
      <div class="header-title">
        <h2>我的笔记</h2>
        <p>管理和组织您的所有笔记文件</p>
      </div>
      <div class="header-controls">
        <div class="view-toggles">
          <button 
            class="icon-btn" 
            :class="{ active: viewMode === 'list' }" 
            title="列表视图"
            @click="viewMode = 'list'"
          >
            <el-icon><Menu /></el-icon>
          </button>
          <button 
            class="icon-btn" 
            :class="{ active: viewMode === 'grid' }" 
            title="网格视图"
            @click="viewMode = 'grid'"
          >
            <el-icon><Grid /></el-icon>
          </button>
        </div>
      </div>
    </header>

    <div class="filter-bar">
      <div class="select-wrapper">
        <select class="filter-select">
          <option>最近更新</option>
          <option>创建时间</option>
        </select>
        <span class="select-arrow">▼</span>
      </div>
      <div class="select-wrapper">
        <select class="filter-select">
          <option>所有格式</option>
          <option>Markdown</option>
          <option>Text</option>
        </select>
        <span class="select-arrow">▼</span>
      </div>
      <button 
        class="text-btn ml-auto batch-btn" 
        :class="{ active: isBatchMode }" 
        @click="toggleBatchMode"
      >
        <span class="icon" v-if="!isBatchMode">⚡ 批量操作</span>
        <span class="icon" v-else>已选 {{ batchSelectedIds.length }} 项</span>
      </button>
    </div>

    <div class="note-list-container" :class="{ 'grid-view': viewMode === 'grid' }">
      <div 
        v-for="note in notes" 
        :key="note.id" 
        class="note-list-card" 
        :class="{ active: selectedNoteId === note.id, 'batch-selected': isBatchSelected(note.id) }" 
        @click="handleNoteClick(note)"
      >
        <!-- Batch Checkbox -->
        <transition name="fade">
            <div v-if="isBatchMode" class="batch-checkbox" :class="{ checked: isBatchSelected(note.id) }">
                <el-icon v-if="isBatchSelected(note.id)" class="check-icon"><Check /></el-icon>
            </div>
        </transition>

        <div class="card-main">
          <!-- Row 1: Title + Format -->
          <div class="card-header">
            <h3 class="note-title" :title="note.title">{{ note.title }}</h3>
            <span class="format-badge">{{ note.format }}</span>
          </div>
          <!-- Row 2: Subtitle -->
          <div class="card-subtitle">
            <span>{{ note.category || '工作笔记' }}</span>
            <span class="separator">·</span>
            <span>{{ formatTime(note.updatedAt) }} 更新</span>
          </div>
          
          <!-- Row 3: AI Summary -->
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

          <!-- Row 4: Tags -->
          <div class="card-tags">
            <span 
                v-for="(tag, index) in getDisplayTags(note.tags)" 
                :key="tag" 
                class="tag-pill" 
                :class="getTagClass(tag)"
            >
                {{ tag }}
            </span>
            <span v-if="note.tags && note.tags.length > 3" class="tag-pill more-tag">+{{ note.tags.length - 3 }}</span>
          </div>
        </div>

        <div class="card-actions">
          <button class="icon-btn" title="分享" @click.stop="handleShare(note)">
            <el-icon><Share /></el-icon>
          </button>
          <button class="icon-btn" title="更多" @click.stop="handleMore(note)">
            <el-icon><MoreFilled /></el-icon>
          </button>
        </div>
      </div>
      
      <div v-if="notes.length === 0" class="empty-state">
        <p>暂无笔记，点击左上角新建</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { Menu, Grid, Check, Cpu, ArrowDown, Share, MoreFilled } from '@element-plus/icons-vue'

const props = defineProps({
  notes: {
    type: Array,
    default: () => []
  },
  selectedNoteId: {
    type: [Number, String, null],
    default: null
  },
  searchKeyword: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:searchKeyword', 'select', 'edit', 'push', 'delete'])

const viewMode = ref('list') // 'list' | 'grid'
const isBatchMode = ref(false)
const batchSelectedIds = ref([])

function formatTime(d) {
  // Simple date format, ideally use a library or consistent formatter
  const date = new Date(d)
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

function getTagClass(tag) {
  const map = { '设计': 'design', '产品': 'product', '前端': 'frontend', 'React': 'react', '工作': 'work', '计划': 'plan' }
  return map[tag] || 'gray'
}

function getDisplayTags(tags) {
    if (!tags) return []
    return tags.slice(0, 3)
}

function toggleAiSummary(note) {
  note.aiSummaryExpanded = !note.aiSummaryExpanded
}

function toggleBatchMode() {
  isBatchMode.value = !isBatchMode.value
  if (!isBatchMode.value) {
    batchSelectedIds.value = []
  }
}

function isBatchSelected(id) {
  return batchSelectedIds.value.includes(id)
}

function handleNoteClick(note) {
  if (isBatchMode.value) {
    const index = batchSelectedIds.value.indexOf(note.id)
    if (index === -1) {
      batchSelectedIds.value.push(note.id)
    } else {
      batchSelectedIds.value.splice(index, 1)
    }
  } else {
    emit('select', note.id)
  }
}

function handleShare(note) {
  console.log('Share note:', note.title)
}

function handleMore(note) {
  emit('edit', note)
}
</script>

<style scoped lang="scss">
.view-manage {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

.view-header {
  padding: 20px 32px;
  border-bottom: 1px solid #E5E6EB; /* Global Border */
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-title h2 { margin: 0; font-size: 20px; font-weight: 600; }
.header-title p { margin: 4px 0 0; font-size: 13px; color: #6b7280; }

.header-controls { display: flex; gap: 16px; }

.view-toggles {
  display: flex;
  background: white;
  border: 1px solid #E5E6EB;
  border-radius: 8px; /* Global Radius */
  padding: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08); /* Global Default Shadow */
  
  .icon-btn {
    padding: 6px 10px;
    background: transparent;
    border: none;
    cursor: pointer;
    border-radius: 6px;
    font-size: 16px;
    line-height: 1;
    color: #86909C; /* Inactive Icon */
    display: flex;
    align-items: center;
    transition: background-color 0.2s linear, color 0.2s linear; /* Global Transition */
    
    &.active { background: #eff6ff; color: #165DFF; }
    &:hover:not(.active) { color: #165DFF; background: #F7F8FA; }
  }
}

.filter-bar {
  padding: 12px 32px;
  display: flex;
  gap: 12px;
  align-items: center;
  border-bottom: 1px solid #E5E6EB;
}

.select-wrapper {
  position: relative;
  display: inline-block;
  
  .select-arrow {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 10px;
    color: #86909C;
    pointer-events: none;
  }
}

.filter-select {
  padding: 6px 28px 6px 12px;
  border: 1px solid #E5E6EB;
  border-radius: 8px; /* Global Radius */
  background: white;
  font-size: 13px;
  color: #4b5563;
  appearance: none;
  cursor: pointer;
  transition: all 0.2s linear;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  
  &:hover { background-color: #f9fafb; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12); }
  &:focus { outline: none; border-color: #165DFF; }
}

.text-btn {
  background: transparent;
  border: none;
  color: #86909C;
  cursor: pointer;
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: color 0.2s linear;
  
  &:hover { color: #165DFF; }
  &.ml-auto { margin-left: auto; }
}

.batch-btn {
  &.active { color: #165DFF; font-weight: 500; }
}

.note-list-container {
  flex: 1;
  overflow-y: auto;
  padding: 20px 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  background: #fafafa;
  
  &.grid-view {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 16px;
    align-items: start;
    
    .note-list-card {
    }
  }
}

/* Responsive Grid Logic */
@media (min-width: 1200px) {
    .note-list-container.grid-view { grid-template-columns: repeat(3, 1fr); }
}
@media (min-width: 800px) and (max-width: 1199px) {
    .note-list-container.grid-view { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 799px) {
    .note-list-container.grid-view { grid-template-columns: 1fr; }
}

.note-list-card {
  background: #FFFFFF;
  border: 1px solid #E5E6EB; /* Global Default Border */
  border-radius: 8px; /* Global Radius */
  padding: 16px;
  cursor: pointer;
  transition: box-shadow 0.2s linear, transform 0.2s linear, border-color 0.2s linear, background-color 0.2s linear; /* Global Transition */
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  position: relative;
  min-height: 100px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08); /* Global Default Shadow */
  
  &:hover { 
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08); /* Specific hover shadow from user request override or global? User asked for 0 4px 12px... but previous prompt said 0 4px 16px. I will use Global 0 4px 12px for consistency unless specific request was stronger. The latest prompt "Global" says 0 4px 12px. I'll stick to Global. */
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
    transform: translateY(-2px);
  }
  
  &.active { 
    border-color: #165DFF; /* Global Selected Border Color */
    border-width: 1.5px; /* Global Selected Border Width */
  }
  
  &.batch-selected {
    background: #F0F7FF;
    border-color: #165DFF;
    border-width: 1.5px;
  }
}

.batch-checkbox {
  position: absolute;
  top: 8px;
  left: 8px;
  width: 20px;
  height: 20px;
  border: 1px solid #E5E6EB;
  border-radius: 50%;
  background: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  transition: all 0.2s linear;
  
  &.checked {
    background: #165DFF;
    border-color: #165DFF;
    .check-icon { color: white; font-size: 12px; }
  }
}

.card-main {
  flex: 1;
  min-width: 0;
  margin-right: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

/* Row 1 */
.card-header {
  display: flex;
  align-items: center;
  gap: 10px;
}

.note-title {
  margin: 0;
  font-size: 15px;
  font-weight: 500;
  color: #1D2129;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 25ch;
}

.format-badge {
  background: #F0F2F5;
  color: #86909C;
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 4px; /* Small radius for badge */
  line-height: 1;
}

/* Row 2 */
.card-subtitle {
  font-size: 13px;
  color: #86909C;
  display: flex;
  align-items: center;
  
  .separator { margin: 0 8px; }
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
    /* Ensure long text breaks and scrolls if needed */
    white-space: normal;
    word-break: break-word;
  }
  
  &.expanded {
    .ai-content {
      padding: 0 12px 12px;
      /* Use max-height for transition instead of height: auto */
      height: auto; 
      max-height: 200px; /* Reasonable limit to prevent overflow out of card */
      overflow-y: auto; /* Scroll if content exceeds max-height */
      opacity: 1;
    }
  }
}

/* Row 4 */
.card-tags {
  display: flex;
  gap: 10px;
  margin-top: 4px;
}

.tag-pill {
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 12px;
  
  &.design { background: linear-gradient(135deg, #E8F3FF 0%, #D1E7FF 100%); color: #165DFF; }
  &.product { background: linear-gradient(135deg, #F0E8FF 0%, #E1CFFF 100%); color: #9B51E0; }
  &.frontend { background: linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%); color: #059669; }
  &.react { background: linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%); color: #4F46E5; }
  &.work { background: linear-gradient(135deg, #FFF7ED 0%, #FFEDD5 100%); color: #EA580C; }
  &.plan { background: linear-gradient(135deg, #FEFCE8 0%, #FEF9C3 100%); color: #CA8A04; }
  &.gray, &.more-tag { background: #F2F3F5; color: #86909C; }
}

.card-actions {
  display: flex;
  flex-direction: row;
  align-items: center;
  align-self: center;
  gap: 12px;
  
  .icon-btn {
    background: transparent;
    border: none;
    cursor: pointer;
    font-size: 18px;
    color: #86909C; /* Inactive Icon */
    padding: 4px;
    display: flex;
    transition: color 0.2s linear; /* Global Transition */
    
    &:hover { color: #165DFF; } /* Hover Icon */
  }
}

.empty-state {
  text-align: center;
  padding: 40px;
  color: #9ca3af;
  font-size: 14px;
}
</style>