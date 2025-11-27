<template>
  <header class="topnav">
    <div class="topnav__left">
      <div class="brand" @click="goDashboard">
        <img class="brand__logo" src="/logo.png" alt="FlowMaster" />
        <span class="brand__name">FlowMaster</span>
      </div>
    </div>
    <nav class="topnav__center">
      <div class="tab" :class="{ active: activeTab === 'workflow' }" @click="go('/workflow')">工作流</div>
      <div class="tab" :class="{ active: activeTab === 'history' }" @click="go('/workflow/history')">历史记录</div>
      <div class="tab" :class="{ active: activeTab === 'favorites' }" @click="go('/workflow/favorites')">我的收藏</div>
      <div class="tab" :class="{ active: activeTab === 'settings' }" @click="go('/settings')">设置</div>
    </nav>
    <div class="topnav__right">
      <el-badge is-dot class="topnav__icon-badge">
        <el-button text circle :icon="Bell" class="topnav__icon-btn" />
      </el-badge>
      <el-button text circle :icon="QuestionFilled" class="topnav__icon-btn" />
      <el-avatar class="topnav__avatar" size="small" src="/logo.png" />
    </div>
  </header>
  </template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Bell, QuestionFilled } from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()

const activeTab = computed(() => {
  const p = route.path || ''
  const q = route.query.tab || ''
  
  if (p.startsWith('/workflow/invoke')) return 'workflow'
  
  if (p === '/workflow') {
    if (q === 'history') return 'history'
    if (q === 'favorites') return 'favorites'
    if (q === 'settings') return 'settings'
    return 'workflow'
  }
  
  return 'workflow'
})

function go(path) {
  if (path === '/workflow') {
    router.push({ path: '/workflow' })
  } else if (path === '/workflow/history') {
    router.push({ path: '/workflow', query: { tab: 'history' } })
  } else if (path === '/workflow/favorites') {
    router.push({ path: '/workflow', query: { tab: 'favorites' } })
  } else if (path === '/settings') {
    router.push({ path: '/workflow', query: { tab: 'settings' } })
  } else {
    router.push(path)
  }
}

function goDashboard() {
  router.push('/home')
}
</script>

<style scoped lang="scss">
.topnav {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: 12px 16px;
  position: sticky;
  top: 0;
  z-index: 10;
  background: linear-gradient(180deg, var(--brand-light) 0%, #ffffff 70%);
  border-bottom: 1px solid #E5E7EB;
}
.topnav__left {
  display: flex;
  align-items: center;
}
.brand {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}
.brand__logo {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  border: 1px solid var(--border-color);
}
.brand__name {
  font-weight: 700;
  font-size: 16px;
  letter-spacing: 0.2px;
  color: #111827;
}
.topnav__center {
  display: flex;
  align-items: center;
  gap: 18px;
  justify-content: center;
}
.tab {
  position: relative;
  padding: 8px 2px;
  color: #6B7280;
  cursor: pointer;
  transition: color .2s ease;
}
.tab:hover {
  color: #374151;
}
.tab.active {
  color: #111827;
  font-weight: 700;
}
.tab.active::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -2px;
  height: 2px;
  border-radius: 2px;
  background: var(--brand-primary);
  transform: scaleX(1);
  transform-origin: left;
  transition: transform .2s ease-in-out;
}
.tab::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -2px;
  height: 2px;
  border-radius: 2px;
  background: var(--brand-primary);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform .2s ease-in-out;
}
.tab:hover::after {
  transform: scaleX(1);
}
.topnav__right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
}
.topnav__icon-btn {
  :deep(.el-icon) {
    color: #6B7280;
    transition: color .2s ease;
  }
}
.topnav__icon-btn:hover {
  :deep(.el-icon) {
    color: var(--brand-primary);
  }
}
.topnav__avatar {
  border: 1px solid var(--border-color);
}
:deep(.el-badge__content.is-dot) {
  background-color: #F43F5E !important;
}
</style>


