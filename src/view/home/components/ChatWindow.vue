<template>
  <div class="chat-window">
    <!-- 头部 -->
    <div class="chat-header">
      <div class="back-btn" @click="$emit('close')">
        <i class="icon-back">←</i>
      </div>
      <div class="user-info">
        <div class="avatar-wrapper">
          <img :src="user.avatar" alt="Avatar" class="avatar">
          <div class="status-dot" :class="{ online: user.isOnline }"></div>
        </div>
        <div class="user-details">
          <div class="user-name">{{ user.name }}</div>
          <div class="user-status">{{ user.isOnline ? '在线' : '离线' }}</div>
        </div>
      </div>
      <div class="header-actions">
        <button class="action-btn"><i class="icon-call">📞</i></button>
        <button class="action-btn"><i class="icon-video">📹</i></button>
        <button class="action-btn"><i class="icon-more">⋮</i></button>
      </div>
    </div>

    <!-- 消息区域 -->
    <div class="messages-container" ref="messagesContainer">
      <div v-for="msg in messages" :key="msg.id" class="message-wrapper" :class="{ 'message-self': msg.isSelf }">
        <img :src="msg.isSelf ? myAvatar : user.avatar" class="message-avatar" alt="avatar">
        <div class="message-content">
          <div class="message-info" v-if="!msg.isSelf">
            <span class="message-name">{{ user.name }}</span>
          </div>
          <div class="message-bubble">
            {{ msg.content }}
          </div>
          <div class="message-time">{{ formatTime(msg.timestamp) }}</div>
        </div>
      </div>
    </div>

    <!-- 输入区域 -->
    <div class="input-area">
      <div class="input-tools">
        <button class="tool-btn">😊</button>
        <button class="tool-btn">📎</button>
        <button class="tool-btn">🖼️</button>
      </div>
      <div class="input-wrapper">
        <textarea 
          v-model="inputText" 
          placeholder="输入消息..." 
          @keydown.enter.prevent="sendMessage"
          rows="1"
        ></textarea>
        <button class="send-btn" @click="sendMessage" :disabled="!inputText.trim()">
          <i class="icon-send">➤</i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, watch } from 'vue'

const props = defineProps({
  user: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close'])

const myAvatar = '/logo.png' // 当前用户头像 placeholder
const messagesContainer = ref(null)
const inputText = ref('')
const messages = ref([
  { id: 1, content: '你好！最近怎么样？', isSelf: false, timestamp: Date.now() - 3600000 },
  { id: 2, content: '挺好的，你呢？', isSelf: true, timestamp: Date.now() - 3500000 },
  { id: 3, content: '我在做新的项目，很有趣！', isSelf: false, timestamp: Date.now() - 3400000 },
])

const formatTime = (timestamp) => {
  const date = new Date(timestamp)
  return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
}

const scrollToBottom = async () => {
  await nextTick()
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

const sendMessage = () => {
  if (!inputText.value.trim()) return
  
  messages.value.push({
    id: Date.now(),
    content: inputText.value,
    isSelf: true,
    timestamp: Date.now()
  })
  
  inputText.value = ''
  scrollToBottom()
  
  // 模拟回复
  setTimeout(() => {
    messages.value.push({
      id: Date.now(),
      content: '这是一条自动回复的消息。',
      isSelf: false,
      timestamp: Date.now()
    })
    scrollToBottom()
  }, 1000)
}

onMounted(() => {
  scrollToBottom()
})
</script>

<style scoped lang="scss">
.chat-window {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%); /* 更丰富的背景色 */
  backdrop-filter: blur(20px);
  border-radius: 20px;
  overflow: hidden;
  animation: slideIn 0.2s ease-out;
  box-shadow: 0 10px 30px rgba(0,0,0,0.05); /* 增加阴影 */
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.chat-header {
  display: flex;
  align-items: center;
  padding: 15px 20px;
  background: rgba(255, 255, 255, 0.8);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  
  .back-btn {
    cursor: pointer;
    padding: 8px;
    border-radius: 50%;
    margin-right: 10px;
    transition: background 0.3s;
    
    &:hover {
      background: rgba(0, 0, 0, 0.05);
    }
  }
  
  .user-info {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 12px;
    
    .avatar-wrapper {
      position: relative;
      
      .avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        object-fit: cover;
      }
      
      .status-dot {
        position: absolute;
        bottom: 2px;
        right: 2px;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: #ccc;
        border: 2px solid white;
        
        &.online {
          background: #4ade80;
        }
      }
    }
    
    .user-details {
      .user-name {
        font-weight: 600;
        color: #333;
        font-size: 16px;
      }
      
      .user-status {
        font-size: 12px;
        color: #666;
      }
    }
  }
  
  .header-actions {
    display: flex;
    gap: 10px;
    
    .action-btn {
      background: none;
      border: none;
      font-size: 18px;
      cursor: pointer;
      padding: 8px;
      border-radius: 50%;
      color: #666;
      transition: all 0.3s;
      
      &:hover {
        background: rgba(102, 126, 234, 0.1);
        color: #667eea;
      }
    }
  }
}

.messages-container {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  
  .message-wrapper {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 10px;
    
    &.message-self {
      flex-direction: row-reverse;
      
      .message-bubble {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border-radius: 18px 18px 4px 18px;
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
      }
      
      .message-time {
        text-align: right;
      }
    }

    .message-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      object-fit: cover;
      flex-shrink: 0;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
      background-color: #fff; /* 防止透明背景导致颜色耦合 */
      padding: 2px; /* 可选：增加一点内边距 */
    }
    
    .message-content {
      max-width: 70%;
      display: flex;
      flex-direction: column;
    }

    .message-info {
      font-size: 12px;
      color: #666;
      margin-bottom: 4px;
      margin-left: 4px;
    }
    
    .message-bubble {
      padding: 12px 16px;
      background: white;
      border-radius: 18px 18px 18px 4px;
      color: #333;
      line-height: 1.5;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
      word-wrap: break-word;
    }
    
    .message-time {
      font-size: 11px;
      color: #999;
      margin-top: 4px;
      margin-left: 4px;
    }
  }
}

.input-area {
  padding: 15px 20px;
  background: rgba(255, 255, 255, 0.8);
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  
  .input-tools {
    display: flex;
    gap: 15px;
    margin-bottom: 10px;
    
    .tool-btn {
      background: none;
      border: none;
      font-size: 20px;
      cursor: pointer;
      color: #666;
      transition: transform 0.2s;
      padding: 0;
      
      &:hover {
        transform: scale(1.1);
      }
    }
  }
  
  .input-wrapper {
    display: flex;
    align-items: flex-end;
    gap: 10px;
    background: white;
    padding: 8px 12px;
    border-radius: 24px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    border: 1px solid rgba(0, 0, 0, 0.05);
    
    textarea {
      flex: 1;
      border: none;
      resize: none;
      padding: 8px;
      outline: none;
      font-family: inherit;
      max-height: 100px;
      background: transparent;
    }
    
    .send-btn {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s;
      
      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      
      &:not(:disabled):hover {
        transform: scale(1.05);
        box-shadow: 0 2px 10px rgba(102, 126, 234, 0.4);
      }
      
      .icon-send {
        font-size: 14px;
        margin-left: 2px;
      }
    }
  }
}
</style>

