<template>
  <!-- 用户资料弹窗 -->
  <div class="user-profile-modal" v-if="visible" @click="$emit('close')">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h3>用户资料</h3>
        <button class="close-btn" @click="$emit('close')">✕</button>
      </div>
      
      <div class="modal-body">
        <!-- 用户头像 -->
        <div class="profile-avatar">
          <img :src="user?.avatar" alt="用户头像" class="profile-avatar-img">
          <div class="profile-status" :class="user?.isOnline ? 'online' : 'offline'">
            {{ user?.isOnline ? '在线' : '离线' }}
          </div>
        </div>
        
        <!-- 用户基本信息 -->
        <div class="profile-info">
          <h4 class="profile-name">{{ user?.name }}</h4>
          <div class="profile-details">
            <span class="profile-age">{{ user?.age }}岁</span>
            <span class="profile-location">{{ user?.location }}</span>
          </div>
          <div class="profile-description">{{ user?.description }}</div>
        </div>
        
        <!-- 用户标签 -->
        <div class="profile-tags">
          <h5>兴趣标签</h5>
          <div class="tags-list">
            <span class="profile-tag" v-for="tag in user?.tags" :key="tag">
              {{ tag }}
            </span>
          </div>
        </div>
        
        <!-- 匹配度 -->
        <div class="profile-match" v-if="user?.matchScore">
          <h5>匹配度</h5>
          <div class="match-score-bar">
            <div class="match-score-fill" :style="{ width: user.matchScore + '%' }"></div>
            <span class="match-score-text">{{ user.matchScore }}%</span>
          </div>
          <div class="match-reason">共同兴趣：{{ user?.commonTags?.join('、') }}</div>
        </div>
        
        <!-- 操作按钮 -->
        <div class="profile-actions">
          <button 
            class="action-button" 
            :class="user?.isFriend ? 'chat-button' : 'add-button'"
            @click="user?.isFriend ? $emit('open-chat', user) : $emit('send-request', user)"
          >
            <i class="action-icon">{{ user?.isFriend ? '💬' : '➕' }}</i>
            {{ user?.isFriend ? '开始聊天' : '发送好友申请' }}
          </button>
          <button class="action-button like-button" @click="$emit('like-user', user)">
            <i class="action-icon">❤️</i>
            点赞
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  user: {
    type: Object,
    default: null
  }
})

defineEmits(['close', 'open-chat', 'send-request', 'like-user'])
</script>

<style lang="scss" scoped>
/* 用户资料弹窗 */
.user-profile-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease;
}

.modal-content {
  background: white;
  border-radius: 20px;
  width: 90%;
  max-width: 500px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.3s ease;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 25px;
  border-bottom: 1px solid #e5e7eb;
}

.modal-header h3 {
  margin: 0;
  color: #1f2937;
  font-size: 18px;
  font-weight: 600;
}

.close-btn {
  background: none;
  border: none;
  font-size: 20px;
  color: #6b7280;
  cursor: pointer;
  padding: 5px;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background: #f3f4f6;
  color: #374151;
}

.modal-body {
  padding: 25px;
}

.profile-avatar {
  position: relative;
  width: 80px;
  height: 80px;
  margin: 0 auto 20px;
}

.profile-avatar-img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.profile-status {
  position: absolute;
  bottom: 2px;
  right: 2px;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 10px;
  font-weight: 600;
  color: white;
}

.profile-status.online {
  background: #4ade80;
}

.profile-status.offline {
  background: #6b7280;
}

.profile-info {
  text-align: center;
  margin-bottom: 20px;
}

.profile-name {
  margin: 0 0 8px 0;
  color: #1f2937;
  font-size: 20px;
  font-weight: 600;
}

.profile-details {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 12px;
  font-size: 14px;
  color: #6b7280;
}

.profile-description {
  font-size: 14px;
  color: #374151;
  line-height: 1.5;
}

.profile-tags, .profile-match {
  margin-bottom: 20px;
}

.profile-tags h5, .profile-match h5 {
  margin: 0 0 12px 0;
  color: #1f2937;
  font-size: 14px;
  font-weight: 600;
}

.tags-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.profile-tag {
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 500;
}

.match-score-bar {
  position: relative;
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 8px;
}

.match-score-fill {
  height: 100%;
  background: linear-gradient(45deg, #667eea, #764ba2);
  border-radius: 4px;
  transition: width 0.3s ease;
}

.match-score-text {
  position: absolute;
  top: -20px;
  right: 0;
  font-size: 12px;
  font-weight: 600;
  color: #667eea;
}

.match-reason {
  font-size: 12px;
  color: #6b7280;
}

.profile-actions {
  display: flex;
  gap: 12px;
}

.action-button {
  flex: 1;
  padding: 12px 20px;
  border: none;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.add-button {
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
}

.add-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

.chat-button {
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
}

.chat-button:hover {
  background: rgba(102, 126, 234, 0.2);
  transform: translateY(-2px);
}

.like-button {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}

.like-button:hover {
  background: #ef4444;
  color: white;
  transform: translateY(-2px);
}

.action-icon {
  font-size: 16px;
}

/* 动画 */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .modal-content {
    width: 95%;
    margin: 20px;
  }
  
  .profile-actions {
    flex-direction: column;
  }
}
</style>

