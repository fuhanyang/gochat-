<template>
  <div class="main-page">
    
    <!-- 背景装饰 -->
    <div class="background-decoration">
      <div class="floating-shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
        <div class="shape shape-4"></div>
      </div>
    </div>
    
    <!-- 左侧用户信息区域 -->
    <LeftPanel 
      @view-profile="viewProfile"
      @search-tag="searchByTag"
    />
    
    <!-- 右侧主内容区域 -->
    <RightPanel 
      @open-chat="openChat"
      @show-context-menu="showFriendMenu"
      @show-profile="showUserProfile"
      @like-user="likeUser"
      @start-chat="startChat"
      @send-request="sendFriendRequest"
    />
    
    <!-- 用户资料弹窗 -->
    <UserProfileModal 
      :visible="showUserProfileModal"
      :user="selectedUser"
      @close="closeUserProfile"
      @open-chat="openChat"
      @like-user="likeUser"
      @send-request="sendFriendRequest"
    />
    
    <!-- 右键菜单 -->
    <div class="context-menu" v-if="showContextMenu" :style="contextMenuStyle">
      <div class="menu-item" @click="viewFriendProfile">
        <i class="icon-profile">👤</i>
        <span>查看资料</span>
      </div>
      <div class="menu-item" @click="muteFriend">
        <i class="icon-mute">🔇</i>
        <span>静音</span>
      </div>
      <div class="menu-item" @click="deleteFriend">
        <i class="icon-delete">🗑️</i>
        <span>删除好友</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import LeftPanel from './components/LeftPanel.vue'

const router = useRouter()

import RightPanel from './components/RightPanel.vue'
import UserProfileModal from './components/UserProfileModal.vue'

// 用户资料弹窗
const showUserProfileModal = ref(false)
const selectedUser = ref(null)

// 交互状态
const showContextMenu = ref(false)
const contextMenuStyle = ref({})
const selectedFriend = ref(null)

// 打开聊天
const openChat = (friend) => {
  console.log('打开与', friend.name, '的聊天')
  // TODO: 跳转到聊天页面
}

// 查看资料
const viewProfile = () => {
  console.log('查看用户资料')
  router.push({ name: 'userinfo' })
}

// 按标签搜索
const searchByTag = (tag) => {
  console.log('按标签搜索:', tag.name)
  // 可以通过 ref 调用 RightPanel 的方法或者共享状态来实现跨组件搜索
}

// 用户资料相关
const showUserProfile = (user) => {
  selectedUser.value = user
  showUserProfileModal.value = true
}

const closeUserProfile = () => {
  showUserProfileModal.value = false
  selectedUser.value = null
}

const likeUser = (user) => {
  console.log('点赞用户:', user?.name)
}

const startChat = (user) => {
  console.log('开始与用户聊天:', user?.name)
  closeUserProfile()
}

const sendFriendRequest = (user) => {
  console.log('发送好友申请给:', user?.name)
  closeUserProfile()
}

// 右键菜单
const showFriendMenu = (event, friend) => {
  event.preventDefault()
  selectedFriend.value = friend
  contextMenuStyle.value = {
    left: event.clientX + 'px',
    top: event.clientY + 'px'
  }
  showContextMenu.value = true
}

const viewFriendProfile = () => {
  console.log('查看好友资料:', selectedFriend.value?.name)
  showContextMenu.value = false
  if (selectedFriend.value) {
    showUserProfile(selectedFriend.value)
  }
}

const muteFriend = () => {
  console.log('静音好友:', selectedFriend.value?.name)
  showContextMenu.value = false
}

const deleteFriend = () => {
  console.log('删除好友:', selectedFriend.value?.name)
  showContextMenu.value = false
}

// 点击其他地方关闭菜单
const handleClickOutside = () => {
  showContextMenu.value = false
}

onMounted(() => {
  // 添加点击事件监听
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style lang="scss" scoped>
.main-page {
  display: flex;
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-family: 'Arial', sans-serif;
  position: relative;
  overflow: hidden;
}

/* 背景装饰 */
.background-decoration {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 0;
}

.floating-shapes {
  position: relative;
  width: 100%;
  height: 100%;
}

.shape {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  animation: float 6s ease-in-out infinite;
}

.shape-1 {
  width: 80px;
  height: 80px;
  top: 20%;
  left: 10%;
  animation-delay: 0s;
}

.shape-2 {
  width: 120px;
  height: 120px;
  top: 60%;
  right: 15%;
  animation-delay: 2s;
}

.shape-3 {
  width: 60px;
  height: 60px;
  top: 80%;
  left: 20%;
  animation-delay: 4s;
}

.shape-4 {
  width: 100px;
  height: 100px;
  top: 30%;
  right: 30%;
  animation-delay: 1s;
}

/* 右键菜单 */
.context-menu {
  position: fixed;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  padding: 8px;
  z-index: 1000;
  animation: slideDown 0.3s ease;
}

.context-menu .menu-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s ease;
  font-size: 14px;
  color: #374151;
}

.context-menu .menu-item:hover {
  background: #f3f4f6;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .main-page {
    flex-direction: column;
  }
}
</style>
