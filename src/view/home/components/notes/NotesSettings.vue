<template>
  <section class="view-prefs">
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
            @click="updateField('theme', theme.value)"
          >
            {{ theme.label }}
          </div>
        </div>
      </div>
      <div class="pref-card">
        <h3>编辑器设置</h3>
        <div class="form-row">
           <label>字体大小</label>
           <input 
             type="range" 
             :value="personalization.fontSize"
             @input="updateField('fontSize', $event.target.value)" 
             min="12" 
             max="24"
           >
           <span>{{ personalization.fontSize }}px</span>
        </div>
        <div class="form-row">
           <label>显示行号</label>
           <input 
             type="checkbox" 
             :checked="personalization.showLineNumbers"
             @change="updateField('showLineNumbers', $event.target.checked)"
           >
        </div>
        <div class="form-row">
           <label>开启预览</label>
           <input 
             type="checkbox" 
             :checked="personalization.showPreview"
             @change="updateField('showPreview', $event.target.checked)"
           >
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  personalization: {
    type: Object,
    required: true
  },
  themeOptions: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['update:personalization'])

function updateField(key, value) {
  // Emit a new object to be clean
  emit('update:personalization', {
    ...props.personalization,
    [key]: value
  })
}
</script>

<style scoped lang="scss">
.view-prefs {
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

.header-title h2 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #1D2129;
}

.prefs-container {
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.pref-card {
  background: white;
  border: 1px solid #E5E6EB; /* Global Border */
  border-radius: 8px; /* Global Radius */
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08); /* Global Default Shadow */
  transition: box-shadow 0.2s linear; /* Global Transition */
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12); /* Global Hover Shadow */
  }
  
  h3 { margin: 0 0 20px; font-size: 16px; color: #1D2129; font-weight: 500; }
}

.theme-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.theme-preview-btn {
  border: 1px solid #E5E6EB; /* Default Border */
  padding: 20px;
  text-align: center;
  border-radius: 8px; /* Global Radius */
  cursor: pointer;
  font-size: 14px;
  color: #4b5563;
  transition: all 0.2s linear; /* Global Transition */
  
  &:hover { 
    border-color: #165DFF; 
    color: #165DFF;
    background: #F7F8FA;
  }
  
  &.active { 
    border-color: #165DFF; 
    border-width: 1.5px;
    color: #165DFF; 
    background: #E8F3FF; 
  }
}

.form-row {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
  
  label { width: 100px; font-size: 14px; color: #1D2129; }
}
</style>

