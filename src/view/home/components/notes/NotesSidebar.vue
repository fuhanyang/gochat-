<template>
  <nav class="app-sidebar">
    <div class="sidebar-top">
      <button class="new-note-btn" @click="$emit('create')">
        <el-icon class="icon"><Plus /></el-icon>
        <span>新建笔记</span>
      </button>
    </div>

    <div class="nav-menu">
      <div class="menu-group">
        <div 
          class="menu-item" 
          :class="{ active: currentView === 'manage' }"
          @click="$emit('update:currentView', 'manage')"
        >
          <el-icon class="icon"><Document /></el-icon>
          <span>笔记管理</span>
        </div>
        <div 
          class="menu-item" 
          :class="{ active: currentView === 'editor' }"
          @click="$emit('navigate', 'editor')"
        >
          <el-icon class="icon"><EditPen /></el-icon>
          <span>编辑器</span>
        </div>
        <div 
          class="menu-item" 
          :class="{ active: currentView === 'push' }"
          @click="$emit('navigate', 'push')"
        >
          <el-icon class="icon"><Promotion /></el-icon>
          <span>推送配置</span>
        </div>
        <div 
          class="menu-item" 
          :class="{ active: currentView === 'prefs' }"
          @click="$emit('update:currentView', 'prefs')"
        >
          <el-icon class="icon"><Setting /></el-icon>
          <span>个性化设置</span>
        </div>
      </div>

      <div class="menu-group">
        <div class="group-title">笔记分类</div>
        <div class="menu-item small category-item">
          <span class="icon-dot work"></span> 
          <span class="cat-name">工作笔记</span>
          <span class="count">12</span>
        </div>
        <div class="menu-item small category-item">
          <span class="icon-dot study"></span> 
          <span class="cat-name">学习记录</span> 
          <span class="count">8</span>
        </div>
        <div class="menu-item small category-item">
          <span class="icon-dot idea"></span> 
          <span class="cat-name">创意灵感</span> 
          <span class="count">5</span>
        </div>
      </div>
    </div>

    <div class="sidebar-bottom">
      <div class="storage-info">
        <div class="storage-label">
          <span class="label-text">存储空间</span>
          <span class="label-val">68% 已使用</span>
        </div>
        <div class="progress-bar">
          <div class="progress-fill" style="width: 68%"></div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { Plus, Document, EditPen, Promotion, Setting } from '@element-plus/icons-vue'

defineProps({
  currentView: {
    type: String,
    required: true
  }
})

defineEmits(['update:currentView', 'create', 'navigate'])
</script>

<style scoped lang="scss">
.app-sidebar {
  width: 240px;
  background: #FFFFFF;
  border-right: 1px solid #E5E6EB; /* Global Border */
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  padding: 20px 16px;
  height: 100%;
  box-sizing: border-box;
}

.sidebar-top {
  margin-bottom: 16px;
}

.new-note-btn {
  width: 100%;
  height: 44px;
  background: linear-gradient(135deg, #165DFF 0%, #0E42CC 100%);
  color: #FFFFFF;
  border: none;
  border-radius: 8px; /* Global Radius */
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.2s linear; /* Global Transition */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08); /* Global Default Shadow */
  
  .icon { font-size: 18px; }
  
  &:hover { 
    box-shadow: 0 4px 12px rgba(22, 93, 255, 0.2); /* Specific Shadow for Primary Action */
    /* Gradient transition is tricky with linear-gradient, usually opacity or swapping background-image */
  }
  
  &:active { 
    background: linear-gradient(135deg, #0E42CC 0%, #165DFF 100%);
    transform: translateY(1px); 
  }
}

.nav-menu {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.menu-group {
}

.group-title {
  font-size: 12px;
  color: #86909C;
  font-weight: 500;
  padding: 0 12px;
  margin-bottom: 20px;
}

.menu-item {
  height: 38px;
  width: 100%;
  padding-left: 12px;
  border-radius: 8px; /* Global Radius (previously 6px) */
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #1D2129;
  font-size: 14px;
  transition: background-color 0.2s linear, color 0.2s linear; /* Global Transition */
  margin-bottom: 4px;
  box-sizing: border-box;
  
  .icon { 
    font-size: 16px; /* Global Icon Size */
    color: #86909C; /* Inactive Icon */
    transition: color 0.2s linear;
  }

  &:hover { 
    background: #F7F8FA; 
    .icon { color: #165DFF; } /* Hover Icon */
  }
  
  &.active { 
    background: #E8F3FF; 
    color: #165DFF; 
    border-radius: 10px 0 0 10px; /* Specific Requirement maintained */
    .icon { color: #165DFF; }
  }
}

.category-item {
  height: 34px;
  padding-left: 12px;
  gap: 10px;
  
  &:hover {
    color: #165DFF;
    background: transparent;
  }
  
  &.small { font-size: 14px; }
}

.icon-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  &.work { background: #3b82f6; }
  &.study { background: #10b981; }
  &.idea { background: #a855f7; }
}

.cat-name {
  color: #1D2129;
  font-size: 14px;
  transition: color 0.2s linear;
}
.category-item:hover .cat-name {
  color: #165DFF;
}

.count {
  font-size: 12px;
  color: #86909C;
  margin-left: 0; 
  background: none;
  padding: 0;
}

.sidebar-bottom {
  margin-top: auto;
  padding-top: 28px;
  border: none;
}

.storage-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.storage-label {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #86909C;
}

.progress-bar {
  height: 6px;
  background: #F0F2F5;
  border-radius: 3px;
  overflow: hidden;
  width: 100%;
  
  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #165DFF 0%, #4080FF 100%);
  }
}
</style>