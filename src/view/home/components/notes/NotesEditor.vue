<template>
  <section class="view-editor">
    <div v-if="note" class="editor-layout">
       <header class="editor-header">
         <input 
           :value="note.title" 
           @input="updateTitle($event.target.value)"
           class="editor-title" 
           placeholder="无标题笔记" 
         />
         <div class="editor-actions">
           <span class="save-status">{{ saveStatus }}</span>
           <button class="btn-secondary" @click="$emit('config-push')">配置推送</button>
           <button class="btn-primary" @click="handleSave">保存</button>
         </div>
       </header>
       <div class="editor-body" :class="editorThemeClass">
         <div class="editor-gutter" v-if="personalization.showLineNumbers">
           <div v-for="n in lineCount" :key="n">{{ n }}</div>
         </div>
         <textarea 
           :value="note.content"
           class="editor-textarea"
           placeholder="开始您的创作..."
           @input="handleInput($event.target.value)"
           :style="{ fontSize: personalization.fontSize + 'px' }"
         ></textarea>
         <div v-if="personalization.showPreview" class="editor-preview markdown-body">
           <!-- 简易 Markdown 预览占位 -->
           <div v-html="renderMarkdown(note.content)"></div>
         </div>
       </div>
    </div>
    <div v-else class="empty-state">
      <p>请先选择或创建一篇笔记</p>
      <button class="btn-primary" @click="$emit('create')">新建笔记</button>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  note: {
    type: Object,
    default: null
  },
  personalization: {
    type: Object,
    default: () => ({
      theme: 'aurora',
      fontSize: 16,
      showLineNumbers: true,
      showPreview: false
    })
  }
})

const emit = defineEmits(['update:note', 'save', 'config-push', 'create'])

const saveStatus = ref('已保存')

const editorThemeClass = computed(() => `theme-${props.personalization.theme}`)

const lineCount = computed(() => {
  return props.note ? (props.note.content.split('\n').length || 1) : 0
})

function updateTitle(newTitle) {
  const updatedNote = { ...props.note, title: newTitle, updatedAt: new Date() }
  emit('update:note', updatedNote)
  triggerAutoSave()
}

function handleInput(newContent) {
  const updatedNote = { ...props.note, content: newContent, updatedAt: new Date() }
  emit('update:note', updatedNote)
  triggerAutoSave()
}

function triggerAutoSave() {
  saveStatus.value = '保存中...'
  // Simulate debounce or auto-save indication
  setTimeout(() => { saveStatus.value = '已保存' }, 1000)
}

function handleSave() {
  saveStatus.value = '已保存'
  emit('save')
}

function renderMarkdown(text) {
  if (!text) return ''
  // Simple mock renderer
  return text.replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/\*\*(.*)\*\*/gim, '<b>$1</b>')
    .replace(/\n/gim, '<br>')
}
</script>

<style scoped lang="scss">
.view-editor {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

.editor-layout {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.editor-header {
  padding: 16px 32px;
  border-bottom: 1px solid #E5E6EB; /* Global Border */
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
  background: transparent;
}

.editor-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.save-status {
  font-size: 12px;
  color: #86909C;
  margin-right: 8px;
}

.btn-primary {
  background: linear-gradient(135deg, #165DFF 0%, #0E42CC 100%);
  color: white;
  border: none;
  padding: 8px 20px;
  border-radius: 8px; /* Global Radius */
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08); /* Global Default Shadow */
  transition: all 0.2s linear; /* Global Transition */
  
  &:hover { 
    box-shadow: 0 4px 12px rgba(22, 93, 255, 0.2); 
  }
}

.btn-secondary {
  background: white;
  border: 1px solid #E5E6EB;
  color: #1D2129;
  padding: 8px 16px;
  border-radius: 8px; /* Global Radius */
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s linear; /* Global Transition */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  
  &:hover { 
    border-color: #165DFF; 
    color: #165DFF;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  }
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
  background: #F7F8FA;
  border-right: 1px solid #E5E6EB;
  padding: 20px 0;
  text-align: center;
  font-size: 12px;
  color: #86909C;
  user-select: none;
}

.editor-textarea {
  flex: 1;
  border: none;
  resize: none;
  padding: 20px;
  font-size: 16px;
  outline: none;
  line-height: 1.6;
  font-family: monospace;
  background: transparent;
  color: #1D2129;
}

.editor-preview {
  flex: 1;
  border-left: 1px solid #E5E6EB;
  padding: 20px;
  overflow-y: auto;
  background: white;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 16px;
  color: #86909C;
}
</style>

