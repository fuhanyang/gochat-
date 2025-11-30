<template>
  <div class="project-info">
    <!-- 装饰线条 -->
    <div class="decorative-lines">
      <div class="line line-1"></div>
      <div class="line line-2"></div>
      <div class="line line-3"></div>
      <div class="floating-shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
        <div class="shape shape-4"></div>
      </div>
    </div>
    
    <div class="info-content">
      <div class="logo-section">
        <div class="logo">
          <img src="/logo.png" alt="CYGlowFlow Logo" />
        </div>
        <h1 class="project-title">CYGlowFlow</h1>
        <p class="project-subtitle">个人工作流项目</p>
      </div>
      
      <div class="features">
        <h3>功能特色</h3>
        <ul>
          <li class="feature-item">
            <span class="feature-icon">🔐</span>
            <span class="feature-text">安全用户认证</span>
          </li>
          <li class="feature-item">
            <span class="feature-icon">💬</span>
            <span class="feature-text">实时消息通信</span>
          </li>
          <li class="feature-item">
            <span class="feature-icon">👥</span>
            <span class="feature-text">好友管理系统</span>
          </li>
          <li class="feature-item">
            <span class="feature-icon">📁</span>
            <span class="feature-text">文件上传分享</span>
          </li>
          <li class="feature-item">
            <span class="feature-icon">🔔</span>
            <span class="feature-text">智能通知提醒</span>
          </li>
          <li class="feature-item">
            <span class="feature-icon">🏷️</span>
            <span class="feature-text">标签分类管理</span>
          </li>
        </ul>
      </div>
      
      <div class="tech-stack">
        <h3>技术栈</h3>
        <div class="tech-tags">
          <span class="tech-tag tech-tag-1">Vue 3</span>
          <span class="tech-tag tech-tag-2">Vite</span>
          <span class="tech-tag tech-tag-3">Element Plus</span>
          <span class="tech-tag tech-tag-4">Pinia</span>
          <span class="tech-tag tech-tag-5">WebSocket</span>
          <span class="tech-tag tech-tag-6">JWT</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 组件逻辑（如果需要的话）
</script>

<style scoped lang="scss">
.project-info {
  flex: 1;
  background: linear-gradient(135deg, #f8f9ff 0%, #e8ecff 50%, #d6e0ff 100%);
  color: #2c3e50;
  padding: 60px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  border-radius: 20px 0 0 20px;
  overflow: hidden;
  border: 2px solid transparent;
  background-clip: padding-box;
  background-image: 
    linear-gradient(135deg, #f8f9ff 0%, #e8ecff 50%, #d6e0ff 100%),
    linear-gradient(135deg, rgba(102, 126, 234, 0.3) 0%, rgba(118, 75, 162, 0.3) 50%, rgba(102, 126, 234, 0.3) 100%);
  background-origin: border-box;
  background-clip: padding-box, border-box;
  
  // 装饰性几何图案
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -20%;
    width: 200px;
    height: 200px;
    background: linear-gradient(45deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
    border-radius: 50%;
    pointer-events: none;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -30%;
    left: -10%;
    width: 150px;
    height: 150px;
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.08), rgba(118, 75, 162, 0.08));
    border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
    pointer-events: none;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  // 装饰线条
  .decorative-lines {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    z-index: 0;
    
    .line {
      position: absolute;
      background: linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.4), transparent);
      box-shadow: 0 0 8px rgba(102, 126, 234, 0.3);
      
      &.line-1 {
        top: 20%;
        left: 0;
        width: 100%;
        height: 2px;
        transform: rotate(-5deg);
        animation: lineMove1 6s ease-in-out infinite;
      }
      
      &.line-2 {
        top: 60%;
        left: 0;
        width: 80%;
        height: 2px;
        transform: rotate(3deg);
        animation: lineMove2 7s ease-in-out infinite;
      }
      
      &.line-3 {
        top: 80%;
        left: 20%;
        width: 60%;
        height: 2px;
        transform: rotate(-2deg);
        animation: lineMove3 8s ease-in-out infinite;
      }
    }
    
    // 浮动装饰形状
    .floating-shapes {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      
      .shape {
        position: absolute;
        border-radius: 50%;
        background: linear-gradient(135deg, rgba(102, 126, 234, 0.3) 0%, rgba(118, 75, 162, 0.3) 100%);
        box-shadow: 0 0 15px rgba(102, 126, 234, 0.4);
        
        &.shape-1 {
          width: 25px;
          height: 25px;
          top: 20%;
          left: 15%;
          animation: floatShape1 8s ease-in-out infinite;
        }
        
        &.shape-2 {
          width: 20px;
          height: 20px;
          top: 60%;
          right: 20%;
          animation: floatShape2 9s ease-in-out infinite;
        }
        
        &.shape-3 {
          width: 30px;
          height: 30px;
          bottom: 25%;
          left: 25%;
          animation: floatShape3 10s ease-in-out infinite;
        }
        
        &.shape-4 {
          width: 22px;
          height: 22px;
          top: 40%;
          right: 10%;
          animation: floatShape4 7s ease-in-out infinite;
        }
      }
    }
  }
  
  > * {
    position: relative;
    z-index: 1;
  }
  
  &:hover {
    transform: scale(1.03);
    box-shadow: 0 25px 50px rgba(102, 126, 234, 0.2);
    z-index: 10;
    background-image: 
      linear-gradient(135deg, #f8f9ff 0%, #e8ecff 50%, #d6e0ff 100%),
      linear-gradient(135deg, rgba(102, 126, 234, 0.5) 0%, rgba(118, 75, 162, 0.5) 50%, rgba(102, 126, 234, 0.5) 100%);
    
    &::before {
      transform: scale(1.2) rotate(45deg);
      background: linear-gradient(45deg, rgba(102, 126, 234, 0.15), rgba(118, 75, 162, 0.15));
    }
    
    &::after {
      transform: scale(1.1) rotate(-30deg);
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.12), rgba(118, 75, 162, 0.12));
    }
  }
}

.info-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.logo-section {
  text-align: center;
  margin-bottom: 40px;
}

.logo {
  width: 80px;
  height: 80px;
  margin: 0 auto 20px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
  
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
}

.project-title {
  font-size: 2.5em;
  font-weight: 700;
  margin: 0 0 10px 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;
  z-index: 16;
}

.project-subtitle {
  font-size: 1.2em;
  color: #5a6c7d;
  margin: 0;
  font-weight: 500;
  position: relative;
  z-index: 17;
}

.features {
  margin-bottom: 30px;
  position: relative;
  z-index: 18;
  
  h3 {
    font-size: 1.3em;
    margin-bottom: 15px;
    color: #2c3e50;
    font-weight: 600;
  }
  
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    
    .feature-item {
      padding: 12px 0;
      font-size: 1em;
      color: #5a6c7d;
      transition: all 0.4s ease;
      display: flex;
      align-items: center;
      gap: 12px;
      opacity: 0;
      transform: translateX(-30px);
      animation: slideInLeft 0.8s ease-out forwards;
      
      &:nth-child(1) { animation-delay: 0.2s; }
      &:nth-child(2) { animation-delay: 0.4s; }
      &:nth-child(3) { animation-delay: 0.6s; }
      &:nth-child(4) { animation-delay: 0.8s; }
      &:nth-child(5) { animation-delay: 1.0s; }
      &:nth-child(6) { animation-delay: 1.2s; }
      
      .feature-icon {
        font-size: 1.3em;
        transition: all 0.4s ease;
        animation: iconPulse 2s ease-in-out infinite;
      }
      
      .feature-text {
        transition: all 0.4s ease;
      }
      
      &:hover {
        color: #667eea;
        transform: translateX(15px) scale(1.05);
        
        .feature-icon {
          transform: scale(1.4);
        }
        
        .feature-text {
          font-weight: 600;
          color: #667eea;
        }
      }
    }
  }
}

.tech-stack {
  h3 {
    font-size: 1.3em;
    margin-bottom: 15px;
    color: #2c3e50;
    font-weight: 600;
  }
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tech-tag {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.15) 100%);
  color: #667eea;
  padding: 8px 16px;
  border-radius: 25px;
  font-size: 0.9em;
  border: 2px solid rgba(102, 126, 234, 0.3);
  transition: all 0.4s ease;
  font-weight: 500;
  opacity: 0;
  transform: translateY(30px) scale(0.8);
  animation: slideInUp 0.8s ease-out forwards;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.2);
  
  &.tech-tag-1 { animation-delay: 0.3s; }
  &.tech-tag-2 { animation-delay: 0.5s; }
  &.tech-tag-3 { animation-delay: 0.7s; }
  &.tech-tag-4 { animation-delay: 0.9s; }
  &.tech-tag-5 { animation-delay: 1.1s; }
  &.tech-tag-6 { animation-delay: 1.3s; }
  
  &:hover {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    transform: translateY(-5px) scale(1.1);
    box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
    border-color: #667eea;
  }
}

// 动画定义
@keyframes lineMove1 {
  0%, 100% { 
    transform: rotate(-5deg) translateX(0) scaleX(1);
    opacity: 0.3;
  }
  50% { 
    transform: rotate(-5deg) translateX(30px) scaleX(1.2);
    opacity: 0.8;
  }
}

@keyframes lineMove2 {
  0%, 100% { 
    transform: rotate(3deg) translateX(0) scaleX(1);
    opacity: 0.3;
  }
  50% { 
    transform: rotate(3deg) translateX(-25px) scaleX(1.1);
    opacity: 0.8;
  }
}

@keyframes lineMove3 {
  0%, 100% { 
    transform: rotate(-2deg) translateX(0) scaleX(1);
    opacity: 0.3;
  }
  50% { 
    transform: rotate(-2deg) translateX(20px) scaleX(1.3);
    opacity: 0.8;
  }
}

@keyframes floatShape1 {
  0%, 100% { 
    transform: translateY(0) rotate(0deg) scale(1);
    opacity: 0.4;
  }
  50% { 
    transform: translateY(-25px) rotate(360deg) scale(1.3);
    opacity: 0.9;
  }
}

@keyframes floatShape2 {
  0%, 100% { 
    transform: translateY(0) rotate(0deg) scale(1);
    opacity: 0.4;
  }
  50% { 
    transform: translateY(20px) rotate(-360deg) scale(1.2);
    opacity: 0.9;
  }
}

@keyframes floatShape3 {
  0%, 100% { 
    transform: translateY(0) rotate(0deg) scale(1);
    opacity: 0.4;
  }
  50% { 
    transform: translateY(-30px) rotate(360deg) scale(1.4);
    opacity: 0.9;
  }
}

@keyframes floatShape4 {
  0%, 100% { 
    transform: translateY(0) rotate(0deg) scale(1);
    opacity: 0.4;
  }
  50% { 
    transform: translateY(15px) rotate(-360deg) scale(1.1);
    opacity: 0.9;
  }
}

@keyframes slideInLeft {
  0% {
    opacity: 0;
    transform: translateX(-20px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInUp {
  0% {
    opacity: 0;
    transform: translateY(30px) scale(0.8);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes iconPulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

// 响应式设计
@media (max-width: 768px) {
  .project-info {
    padding: 40px 30px;
    min-height: 300px;
    border-radius: 20px 20px 0 0;
    
    &::before {
      border-radius: 20px 20px 0 0;
      width: 150px;
      height: 150px;
    }
    
    &::after {
      width: 120px;
      height: 120px;
    }
    
    &:hover {
      transform: scale(1.02);
    }
  }
  
  .project-title {
    font-size: 2em;
  }
}

@media (max-width: 480px) {
  .project-info {
    padding: 30px 20px;
    border-radius: 15px 15px 0 0;
    
    &::before {
      border-radius: 15px 15px 0 0;
      width: 120px;
      height: 120px;
    }
    
    &::after {
      width: 100px;
      height: 100px;
    }
    
    &:hover {
      transform: scale(1.01);
    }
  }
  
  .project-title {
    font-size: 1.8em;
  }
  
  .features ul li {
    font-size: 0.9em;
  }
  
  .tech-tag {
    font-size: 0.8em;
    padding: 4px 8px;
  }
}
</style>
