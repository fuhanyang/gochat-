<template>
  <div class="message-page">
    <div class="chat-header">
      <div class="back-btn" @click="goBack">
        <i>←</i>
      </div>
      <div class="chat-info">
        <h2 class="chat-title">{{ chatTargetName }}</h2>
        <span class="chat-status">在线</span>
      </div>
      <div class="chat-actions">
        <button class="action-btn">⋮</button>
      </div>
    </div>

    <div class="chat-content">
      <div class="empty-chat" v-if="messages.length === 0">
        <p>开始与 {{ chatTargetName }} 聊天吧</p>
      </div>
      <div class="message-list" v-else>
        <!-- 消息列表占位 -->
        <div v-for="msg in messages" :key="msg.id" class="message-item" :class="{ 'self': msg.isSelf }">
          <div class="message-bubble">{{ msg.content }}</div>
        </div>
      </div>
    </div>

    <div class="chat-input-area">
      <input type="text" placeholder="输入消息..." v-model="inputText" @keyup.enter="sendMessage">
      <button class="send-btn" @click="sendMessage">发送</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const chatTargetName = ref('')
const chatTargetId = ref('')
const inputText = ref('')
const messages = ref([])

onMounted(() => {
  // 从路由参数获取聊天对象信息
  chatTargetName.value = route.query.name || '未知用户'
  chatTargetId.value = route.query.id || ''
  
  // 模拟一条欢迎消息
  if (chatTargetName.value) {
    messages.value.push({
      id: Date.now(),
      content: `你好，我是${chatTargetName.value}，很高兴见到你！`,
      isSelf: false
    })
  }
})

const goBack = () => {
  router.back()
}

const sendMessage = () => {
  if (!inputText.value.trim()) return
  
  messages.value.push({
    id: Date.now(),
    content: inputText.value,
    isSelf: true
  })
  
  inputText.value = ''
  
  // 模拟回复
  setTimeout(() => {
    messages.value.push({
      id: Date.now() + 1,
      content: '自动回复：我收到了你的消息',
      isSelf: false
    })
  }, 1000)
}
</script>

<style scoped lang="scss">
.message-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f5f7fa;
}

.chat-header {
  display: flex;
  align-items: center;
  padding: 15px 20px;
  background: white;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  z-index: 10;

  .back-btn {
    cursor: pointer;
    font-size: 20px;
    margin-right: 15px;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: background 0.3s;

    &:hover {
      background: #f0f0f0;
    }
  }

  .chat-info {
    flex: 1;

    .chat-title {
      margin: 0;
      font-size: 16px;
      font-weight: 600;
    }

    .chat-status {
      font-size: 12px;
      color: #4ade80;
    }
  }

  .action-btn {
    border: none;
    background: none;
    font-size: 20px;
    cursor: pointer;
    color: #666;
  }
}

.chat-content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  
  .empty-chat {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #999;
  }

  .message-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .message-item {
    display: flex;
    justify-content: flex-start;
    
    &.self {
      justify-content: flex-end;
      
      .message-bubble {
        background: #667eea;
        color: white;
        border-radius: 15px 15px 0 15px;
      }
    }

    .message-bubble {
      max-width: 70%;
      padding: 10px 15px;
      background: white;
      border-radius: 15px 15px 15px 0;
      box-shadow: 0 2px 5px rgba(0,0,0,0.05);
      line-height: 1.5;
    }
  }
}

.chat-input-area {
  padding: 15px;
  background: white;
  display: flex;
  gap: 10px;
  border-top: 1px solid #eee;

  input {
    flex: 1;
    padding: 10px 15px;
    border: 1px solid #ddd;
    border-radius: 20px;
    outline: none;
    transition: border-color 0.3s;

    &:focus {
      border-color: #667eea;
    }
  }

  .send-btn {
    padding: 0 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    font-weight: 500;

    &:hover {
      opacity: 0.9;
    }
  }
}
</style>
