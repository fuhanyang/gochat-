<template>
  <section class="view-push">
    <div v-if="note" class="push-layout">
      <!-- 1. Header Area -->
      <header class="view-header">
        <div class="header-title">
          <h2>推送配置</h2>
          <p>设置笔记内容推送到工作流或组件的规则</p>
        </div>
        <button 
          class="btn-primary save-btn" 
          @click="handleSave"
        >
          保存配置
        </button>
      </header>
      
      <!-- Save Success Toast -->
      <transition name="toast-fade">
        <div v-if="showSuccessToast" class="success-toast">
          保存成功
        </div>
      </transition>

      <!-- 2. Step Navigation -->
      <div class="push-stepper">
        <div class="step" :class="{ active: step === 1, completed: step > 1 }">
          <div class="step-circle">
            <el-icon v-if="step > 1"><Check /></el-icon>
            <span v-else>1</span>
          </div>
          <span>选择推送目标</span>
        </div>
        <div class="step-line" :class="{ active: step > 1 }"></div>
        <div class="step" :class="{ active: step === 2, completed: step > 2 }">
          <div class="step-circle">
            <el-icon v-if="step > 2"><Check /></el-icon>
            <span v-else>2</span>
          </div>
          <span>设置推送规则</span>
        </div>
        <div class="step-line" :class="{ active: step > 2 }"></div>
        <div class="step" :class="{ active: step === 3, completed: step > 3 }">
          <div class="step-circle">
            <el-icon v-if="step > 3"><Check /></el-icon>
            <span v-else>3</span>
          </div>
          <span>确认与测试</span>
        </div>
      </div>

      <div class="push-content-scroll">
        <!-- 3. Tabs -->
        <div class="push-tabs">
          <button 
            class="push-tab" 
            :class="{ active: activeTab === 'workflow' }"
            @click="activeTab = 'workflow'"
          >
            工作流
          </button>
          <button 
            class="push-tab" 
            :class="{ active: activeTab === 'component' }"
            @click="activeTab = 'component'"
          >
            组件
          </button>
        </div>

        <!-- 4. Workflow Cards -->
        <div v-if="activeTab === 'workflow'" class="workflow-list">
          <div 
            v-for="wf in workflowOptions" 
            :key="wf.value" 
            class="workflow-item"
            :class="{ selected: note.pushTarget?.workflowId === wf.value }"
            @click="selectWorkflow(wf.value)"
          >
            <div class="wf-info">
              <h4>{{ wf.label }}</h4>
              <p class="wf-desc-1">{{ wf.desc ? wf.desc.split('·')[0] : '' }}</p>
              <p class="wf-desc-2">{{ wf.desc ? wf.desc.split('·')[1] : '暂无描述' }}</p>
            </div>
            <div class="wf-select">
              <div class="radio-circle">
                <el-icon v-if="note.pushTarget?.workflowId === wf.value" class="check-icon"><Check /></el-icon>
              </div>
            </div>
          </div>
        </div>
        
        <div v-else class="empty-state">
          <p>暂无可用组件</p>
        </div>

        <!-- 5. Push History -->
        <div class="push-history">
          <div class="history-header">
            <h3>推送历史</h3>
            <span class="view-all" @click="viewAllHistory">查看全部</span>
          </div>
          <div class="history-list">
            <div class="history-item success">
              <span class="status-icon"><Check /></span>
              <span class="history-text">{{ note.title }} → {{ getWorkflowName(note.pushTarget?.workflowId) }}</span>
              <span class="history-status">推送成功</span>
              <span class="history-time">今天 14:32</span>
            </div>
            <!-- Mock Fail Item -->
            <div class="history-item fail">
               <span class="status-icon"><Close /></span>
               <span class="history-text">{{ note.title }} → 内容发布审核流程</span>
               <span class="history-status">推送失败</span>
               <span class="history-time">昨天 09:15</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 6. Bottom Buttons -->
      <div class="push-footer">
         <button class="btn-secondary cancel-btn" @click="$emit('cancel')">取消</button>
         <button class="btn-primary next-btn" @click="$emit('next')">下一步</button>
      </div>
    </div>
     <div v-else class="empty-state">
      <p>请先选择一篇笔记进行配置</p>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { Check, Close } from '@element-plus/icons-vue'

const props = defineProps({
  note: {
    type: Object,
    default: null
  },
  step: {
    type: Number,
    default: 1
  },
  workflowOptions: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['update:note', 'save', 'cancel', 'next'])

const activeTab = ref('workflow')
const showSuccessToast = ref(false)

function selectWorkflow(id) {
  const updatedNote = { ...props.note }
  if (!updatedNote.pushTarget) updatedNote.pushTarget = {}
  updatedNote.pushTarget.workflowId = id
  emit('update:note', updatedNote)
}

function getWorkflowName(id) {
  const wf = props.workflowOptions.find(w => w.value === id)
  return wf ? wf.label : '未选择工作流'
}

function handleSave() {
  emit('save')
  showSuccessToast.value = true
  setTimeout(() => {
    showSuccessToast.value = false
  }, 2000)
}

function viewAllHistory() {
  console.log('View all history')
}
</script>

<style scoped lang="scss">
.view-push {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  position: relative;
}

.push-layout {
  display: flex;
  flex-direction: column;
  height: 100%;
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
  font-size: 18px;
  font-weight: 600;
  color: #1D2129;
}
.header-title p {
  margin: 12px 0 0;
  font-size: 13px;
  color: #86909C;
}

.save-btn {
  width: 110px;
  height: 38px;
  background: linear-gradient(135deg, #165DFF 0%, #0E42CC 100%);
  color: #FFFFFF;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s;
  
  &:hover { opacity: 0.9; }
  &:active { transform: scale(0.98); }
}

.success-toast {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: #F0F7FF;
  color: #165DFF;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  box-shadow: 0 4px 12px rgba(22, 93, 255, 0.15);
  z-index: 100;
}
.toast-fade-enter-active, .toast-fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}
.toast-fade-enter-from, .toast-fade-leave-to {
  opacity: 0;
  transform: translate(-50%, -10px);
}

.push-stepper {
  padding: 20px 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #f3f4f6;
  width: 60%;
  margin: 0 auto;
  
  .step {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    color: #86909C;
    position: relative;
    z-index: 1;
    
    .step-circle {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: #FFFFFF;
      border: 2px solid #E5E6EB;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      font-weight: 600;
      transition: all 0.3s;
      color: #86909C;
    }
    
    span { font-size: 14px; }
    
    &.active, &.completed {
      color: #165DFF;
      .step-circle { 
        background: linear-gradient(135deg, #165DFF 0%, #4080FF 100%); 
        border-color: #165DFF; 
        color: #FFFFFF; 
      }
    }

    &.completed .step-circle {
        /* Icon inside handled by v-if in template */
    }
  }
  
  .step-line {
    flex: 1;
    height: 2px;
    background: #E5E6EB;
    margin: 0 10px 20px; /* Align with circle center roughly, margin top adjustment */
    margin-bottom: 26px; /* Adjust to align with circle center */
    transition: background-color 0.3s;
    
    &.active { background: #165DFF; }
  }
}

.push-content-scroll {
  flex: 1;
  overflow-y: auto;
  padding: 32px;
}

.push-tabs {
  display: flex;
  gap: 30px;
  margin-bottom: 24px;
  border-bottom: 1px solid #e5e7eb;
  width: 200px;
  
  .push-tab {
    background: transparent;
    border: none;
    padding-bottom: 6px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    color: #86909C;
    border-bottom: 2px solid transparent;
    transition: all 0.2s;
    flex: 1;
    
    &:hover { color: #165DFF; }
    
    &.active {
      color: #165DFF;
      border-bottom-color: #165DFF;
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
  height: 88px;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #E5E6EB;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  background: #FFFFFF;
  transition: all 0.2s;
  
  &:hover { background: #F7F8FA; }
  &.selected { 
    background: #F0F7FF; 
    border: 1.5px solid #165DFF; 
    box-shadow: 0 4px 12px rgba(22, 93, 255, 0.1); 
  }
}

.wf-info {
  h4 { margin: 0 0 6px; font-size: 15px; font-weight: 500; color: #1D2129; }
  .wf-desc-1 { margin: 0 0 6px; font-size: 13px; color: #86909C; }
  .wf-desc-2 { margin: 0; font-size: 13px; color: #6B7280; }
}

.wf-select {
  margin-left: 16px;
}

.radio-circle {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: 1px solid #E5E6EB;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  background: #FFFFFF;
}

.workflow-item.selected .radio-circle {
  border-color: #165DFF;
  background: #165DFF;
  .check-icon { color: #FFFFFF; font-size: 14px; }
}

.push-history {
  margin-top: 20px;
  
  .history-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    
    h3 { margin: 0; font-size: 15px; font-weight: 500; color: #1D2129; }
    .view-all { 
      font-size: 13px; 
      color: #165DFF; 
      cursor: pointer; 
      &:hover { color: #0E42CC; text-decoration: underline; }
    }
  }
}

.history-list {
  background: transparent; 
  padding: 0;
}

.history-item {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
  height: 44px;
  padding: 0 8px;
  border-radius: 6px;
  transition: background 0.2s;
  
  &:last-child { margin-bottom: 0; }
  &:hover { background: #F7F8FA; }
  
  &.success {
    .status-icon { color: #00B42A; }
    .history-status { color: #00B42A; }
  }
  &.fail {
    .status-icon { color: #F53F3F; }
    .history-status { color: #F53F3F; }
  }
}

.status-icon {
  width: 18px; 
  height: 18px; 
  display: flex; 
  align-items: center; 
  justify-content: center; 
  font-size: 18px; 
}

.history-text { 
  flex: 1; 
  font-size: 14px; 
  color: #1D2129; 
}
.history-status { 
  margin-right: 12px; 
  font-size: 13px; 
}
.history-time { 
  color: #86909C; 
  font-size: 12px; 
}

.push-footer {
  padding: 20px 32px;
  border-top: 1px solid #f3f4f6;
  display: flex;
  justify-content: flex-end;
  gap: 20px;
}

.cancel-btn {
  width: 68px;
  height: 36px;
  background: #FFFFFF;
  border: 1px solid #E5E6EB;
  border-radius: 8px;
  color: #86909C;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s;
  
  &:hover { background: #F7F8FA; }
}

.next-btn {
  width: 88px;
  height: 36px;
  background: linear-gradient(135deg, #165DFF 0%, #0E42CC 100%);
  color: #FFFFFF;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover { box-shadow: 0 4px 8px rgba(22, 93, 255, 0.15); }
}

.empty-state {
  text-align: center;
  padding: 40px;
  color: #9ca3af;
}
</style>

