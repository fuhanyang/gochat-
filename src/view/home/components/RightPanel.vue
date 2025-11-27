<template>
  <div class="right-panel">
    <!-- 聊天窗口模式 -->
    <transition name="fade-slide" mode="out-in">
      <ChatWindow 
        v-if="currentChatFriend" 
        :user="currentChatFriend" 
        @close="currentChatFriend = null" 
      />
      
      <!-- 默认标签页模式 -->
      <div v-else class="tab-view">
        <!-- 标签栏 -->
        <div class="tab-bar">
          <div class="tab-item" :class="{ active: activeTab === 'friends' }" @click="activeTab = 'friends'">
            <i class="tab-icon">👥</i>
            <span>好友列表</span>
            <div class="tab-count">{{ friendsCount }}</div>
          </div>
          <div class="tab-item" :class="{ active: activeTab === 'hotspot' }" @click="activeTab = 'hotspot'">
            <i class="tab-icon">🔥</i>
            <span>今日热点</span>
            <div class="tab-count">{{ hotNewsCount }}</div>
          </div>
          <div class="tab-item" :class="{ active: activeTab === 'workflow' }" @click="activeTab = 'workflow'">
            <i class="tab-icon">📊</i>
            <span>工作流统计</span>
          </div>
        </div>
        
        <!-- 好友列表标签页 -->
        <div class="tab-content" v-if="activeTab === 'friends'">
          <FriendsList 
            ref="friendsListRef"
            @show-context-menu="(event, friend) => $emit('show-context-menu', event, friend)"
            @show-profile="(user) => $emit('show-profile', user)"
            @start-chat="openChat"
            @send-request="(user) => $emit('send-request', user)"
          />
        </div>
        
        <!-- 今日热点标签页 -->
        <div class="tab-content" v-if="activeTab === 'hotspot'">
          <HotNewsList ref="hotNewsListRef" />
        </div>
        
        <!-- 工作流统计标签页 -->
        <div class="tab-content" v-if="activeTab === 'workflow'">
          <WorkflowStats />
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import ChatWindow from './ChatWindow.vue'
import FriendsList from './FriendsList.vue'
import HotNewsList from './HotNewsList.vue'
import WorkflowStats from './WorkflowStats.vue'

const emit = defineEmits(['show-context-menu', 'show-profile', 'like-user', 'start-chat', 'send-request'])

// 标签页相关
const activeTab = ref('friends')

// 聊天相关
const currentChatFriend = ref(null)

// 子组件引用
const friendsListRef = ref(null)
const hotNewsListRef = ref(null)

// 统计数据 (从子组件获取或使用默认值)
// 注意：由于是 ref，初始可能为 null，需要处理
const friendsCount = computed(() => {
  return friendsListRef.value?.friends?.length || 5 // 默认值或从 store 获取更佳
})

const hotNewsCount = ref(6) // 暂时硬编码，实际可以从 HotNewsList 获取或 store

// 打开聊天
const openChat = (friend) => {
  console.log('Opening chat with:', friend.name)
  currentChatFriend.value = friend
}

// 暴露方法给父组件调用
defineExpose({
  openChat
})
</script>

<style lang="scss" scoped>
.right-panel {
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  z-index: 1;
  overflow: hidden;
}

.tab-view {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* 标签栏 */
.tab-bar {
  display: flex;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 5px;
  margin-bottom: 20px;
  backdrop-filter: blur(10px);
}

.tab-item {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 16px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  font-weight: 500;
}

.tab-item.active {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  transform: translateY(-2px);
}

.tab-item:hover {
  background: rgba(255, 255, 255, 0.15);
  color: white;
}

.tab-icon {
  font-size: 16px;
}

.tab-count {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  padding: 2px 6px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 600;
}

/* 标签页内容 */
.tab-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* Vue过渡动画 */
.fade-slide-enter-active {
  transition: all 0.3s ease-out;
}
.fade-slide-leave-active {
  transition: all 0.2s ease-in;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

@media (max-width: 768px) {
  .right-panel {
    padding: 15px;
  }
}
</style>
