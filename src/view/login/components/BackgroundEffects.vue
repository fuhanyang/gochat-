<template>
  <div class="animated-background">
    <!-- 星星效果 -->
    <div class="stars">
      <div class="star" v-for="n in 80" :key="n" :style="getStarStyle(n)"></div>
    </div>
    
    <!-- 波浪效果 -->
    <div class="waves">
      <div class="wave wave-1"></div>
      <div class="wave wave-2"></div>
      <div class="wave wave-3"></div>
    </div>
    
    <!-- 浮动粒子 -->
    <div class="particles">
      <div class="particle" v-for="n in 20" :key="n" :style="getParticleStyle(n)"></div>
    </div>
    
    <!-- 流星效果 -->
    <div class="meteors">
      <div class="meteor" v-for="n in 18" :key="n" :style="getMeteorStyle(n)" :class="getMeteorClass(n)"></div>
    </div>
  </div>
</template>

<script setup>
// 动态背景效果方法
const getStarStyle = (index) => {
  // 创建更丰富的星星大小分布
  let size
  if (index <= 20) {
    // 大星星 (2-4px)
    size = Math.random() * 2 + 2
  } else if (index <= 50) {
    // 中等星星 (1-2px)
    size = Math.random() * 1 + 1
  } else {
    // 小星星 (0.5-1px)
    size = Math.random() * 0.5 + 0.5
  }
  
  // 更均匀的分布
  const left = Math.random() * 100
  const top = Math.random() * 100
  const delay = Math.random() * 3
  const duration = Math.random() * 2 + 2.5
  
  return {
    left: `${left}%`,
    top: `${top}%`,
    width: `${size}px`,
    height: `${size}px`,
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`
  }
}

const getParticleStyle = (index) => {
  const size = Math.random() * 4 + 2
  const left = Math.random() * 100
  const top = Math.random() * 100
  const delay = Math.random() * 5
  const duration = Math.random() * 8 + 6
  
  return {
    left: `${left}%`,
    top: `${top}%`,
    width: `${size}px`,
    height: `${size}px`,
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`
  }
}

const getMeteorStyle = (index) => {
  // 流星从左上角开始，向右下角移动
  let startPos
  
  if (index === 0) {
    // 第一个流星从真正的左上角开始
    startPos = {
      x: 0, // 屏幕左上角 x=0
      y: 0  // 屏幕左上角 y=0
    }
  } else if (index === 1) {
    // 第二个流星从左上角附近开始
    startPos = {
      x: Math.random() * 10, // 0-10%范围内
      y: Math.random() * 10  // 0-10%范围内
    }
  } else if (index === 2) {
    // 第三个流星从左上角附近开始
    startPos = {
      x: Math.random() * 15, // 0-15%范围内
      y: Math.random() * 15  // 0-15%范围内
    }
  } else {
    // 其他流星从左边框和上边框的任意位置开始
    const isFromLeft = Math.random() < 0.5
    
    if (isFromLeft) {
      // 从左边框任意位置开始
      startPos = {
        x: -30,
        y: Math.random() * 100 // 0-100%范围内
      }
    } else {
      // 从上边框任意位置开始
      startPos = {
        x: Math.random() * 100, // 0-100%范围内
        y: -30
      }
    }
  }
  
  // 分散延迟时间，避免集中出现
  const baseDelay = index * 0.5
  const randomDelay = Math.random() * 1.0
  const delay = baseDelay + randomDelay
  
  const duration = 5
  
  return {
    left: `${startPos.x}%`,
    top: `${startPos.y}%`,
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`
  }
}

const getMeteorClass = (index) => {
  // 流星层次：近、中、远三层
  const layers = ['near', 'mid', 'far']
  const layer = layers[index % 3]
  return `meteor-${layer}`
}
</script>

<style scoped lang="scss">
.animated-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

// 星星效果
.stars {
  position: absolute;
  width: 100%;
  height: 100%;
}

.star {
  position: absolute;
  background: white;
  border-radius: 50%;
  animation: twinkle 3s infinite ease-in-out;
}

@keyframes twinkle {
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
}

// 波浪效果
.waves {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100px;
  overflow: hidden;
}

.wave {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 200%;
  height: 100px;
  background: linear-gradient(45deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
  border-radius: 50% 50% 0 0;
  animation: wave-motion 8s infinite linear;
}

.wave-1 {
  animation-delay: 0s;
  opacity: 0.8;
}

.wave-2 {
  animation-delay: 2s;
  opacity: 0.6;
  height: 80px;
}

.wave-3 {
  animation-delay: 4s;
  opacity: 0.4;
  height: 60px;
}

@keyframes wave-motion {
  0% {
    transform: translateX(-50%) rotate(0deg);
  }
  100% {
    transform: translateX(-50%) rotate(360deg);
  }
}

// 浮动粒子效果
.particles {
  position: absolute;
  width: 100%;
  height: 100%;
}

.particle {
  position: absolute;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%);
  border-radius: 50%;
  animation: float 8s infinite ease-in-out;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
    opacity: 0.3;
  }
  25% {
    transform: translateY(-20px) rotate(90deg);
    opacity: 0.8;
  }
  50% {
    transform: translateY(-10px) rotate(180deg);
    opacity: 0.6;
  }
  75% {
    transform: translateY(-30px) rotate(270deg);
    opacity: 0.9;
  }
}

// 流星效果
.meteors {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 100; // 提高层级，确保流星可见
}

.meteor {
  position: absolute;
  background: #ffffff;
  border-radius: 50%;
  animation: meteorMove 2s linear infinite;
  opacity: 0;
  z-index: 101;
  
  // 近层流星 - 最大最亮
  &.meteor-near {
    width: 8px;
    height: 8px;
    box-shadow: 
      0 0 20px #ffffff, 
      0 0 40px #ffffff, 
      0 0 60px #ffffff,
      0 0 80px rgba(255, 255, 255, 0.9);
  }
  
  // 中层流星 - 中等
  &.meteor-mid {
    width: 5px;
    height: 5px;
    box-shadow: 
      0 0 12px #ffffff, 
      0 0 24px #ffffff, 
      0 0 36px #ffffff,
      0 0 48px rgba(255, 255, 255, 0.8);
  }
  
  // 远层流星 - 最小最暗
  &.meteor-far {
    width: 3px;
    height: 3px;
    box-shadow: 
      0 0 8px #ffffff, 
      0 0 16px #ffffff, 
      0 0 24px #ffffff,
      0 0 32px rgba(255, 255, 255, 0.6);
  }
}

.meteor::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100px; // 默认尾迹长度
  height: 1px;
  background: linear-gradient(90deg, 
    rgba(255, 255, 255, 0.9) 0%, 
    rgba(255, 255, 255, 0.6) 30%, 
    rgba(255, 255, 255, 0.3) 60%, 
    transparent 100%
  );
  transform-origin: left center;
  transform: translateY(-50%) rotate(-135deg); // -135度，指向星星运动的反方向
  animation: meteorTrail 2s linear infinite;
  box-shadow: 0 0 3px rgba(255, 255, 255, 0.5);
}

// 为不同层次的流星设置不同的尾迹长度
.meteor-near::before {
  width: 150px;
  height: 2px;
  box-shadow: 0 0 8px rgba(255, 255, 255, 0.8);
}

.meteor-mid::before {
  width: 100px;
  height: 1.5px;
  box-shadow: 0 0 6px rgba(255, 255, 255, 0.6);
}

.meteor-far::before {
  width: 70px;
  height: 1px;
  box-shadow: 0 0 4px rgba(255, 255, 255, 0.4);
}

@keyframes meteorMove {
  0% {
    opacity: 0;
    transform: translateX(0) translateY(0) scale(0.3);
  }
  15% {
    opacity: 0.8;
    transform: translateX(40px) translateY(40px) scale(0.8);
  }
  30% {
    opacity: 1;
    transform: translateX(100px) translateY(100px) scale(1);
  }
  70% {
    opacity: 1;
    transform: translateX(500px) translateY(500px) scale(1);
  }
  85% {
    opacity: 0.6;
    transform: translateX(650px) translateY(650px) scale(0.8);
  }
  100% {
    opacity: 0;
    transform: translateX(750px) translateY(750px) scale(0.3);
  }
}

@keyframes meteorTrail {
  0% {
    opacity: 0;
    transform: translateY(-50%) rotate(-135deg) scaleX(0);
  }
  10% {
    opacity: 1;
    transform: translateY(-50%) rotate(-135deg) scaleX(1);
  }
  80% {
    opacity: 1;
    transform: translateY(-50%) rotate(-135deg) scaleX(1);
  }
  100% {
    opacity: 0;
    transform: translateY(-50%) rotate(-135deg) scaleX(0);
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.3;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.6;
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(20px) scale(0.8);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0) scale(1);
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateY(-50%) translateX(-20px) scale(0.8);
  }
  to {
    opacity: 1;
    transform: translateY(-50%) translateX(0) scale(1);
  }
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(-20px) scale(0.8);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0) scale(1);
  }
}

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateY(-50%) translateX(20px) scale(0.8);
  }
  to {
    opacity: 1;
    transform: translateY(-50%) translateX(0) scale(1);
  }
}

@keyframes rotate3D {
  0% {
    transform: translate(-50%, -50%) rotateX(0deg) rotateY(0deg) rotateZ(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotateX(360deg) rotateY(360deg) rotateZ(360deg);
  }
}

@keyframes twinkle {
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
}

@keyframes fadeIn3D {
  from {
    opacity: 0;
    transform: translate3d(0, 0, -100px) rotateX(45deg);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0) rotateX(0deg);
  }
}

@keyframes orbit1 {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(10px, -5px) rotate(90deg); }
  50% { transform: translate(5px, 10px) rotate(180deg); }
  75% { transform: translate(-5px, 5px) rotate(270deg); }
}

@keyframes orbit2 {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(-8px, 6px) rotate(-90deg); }
  50% { transform: translate(-6px, -8px) rotate(-180deg); }
  75% { transform: translate(8px, -4px) rotate(-270deg); }
}

@keyframes orbit3 {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(12px, 4px) rotate(90deg); }
  50% { transform: translate(-4px, 12px) rotate(180deg); }
  75% { transform: translate(-8px, -6px) rotate(270deg); }
}

@keyframes orbit4 {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(-10px, -8px) rotate(-90deg); }
  50% { transform: translate(8px, -10px) rotate(-180deg); }
  75% { transform: translate(6px, 8px) rotate(-270deg); }
}

@keyframes orbit5 {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(6px, -12px) rotate(90deg); }
  50% { transform: translate(-12px, -6px) rotate(180deg); }
  75% { transform: translate(-6px, 12px) rotate(270deg); }
}

@keyframes orbit6 {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(-8px, 10px) rotate(-90deg); }
  50% { transform: translate(10px, 8px) rotate(-180deg); }
  75% { transform: translate(8px, -10px) rotate(-270deg); }
}

@keyframes pulseLine {
  0%, 100% {
    opacity: 0.2;
    transform: scaleX(1);
  }
  50% {
    opacity: 0.6;
    transform: scaleX(1.2);
  }
}

@keyframes twinkle {
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
}

@keyframes orbit7 {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(14px, -6px) rotate(90deg); }
  50% { transform: translate(-6px, 14px) rotate(180deg); }
  75% { transform: translate(-14px, 6px) rotate(270deg); }
}

@keyframes orbit8 {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(-12px, -10px) rotate(-90deg); }
  50% { transform: translate(10px, -12px) rotate(-180deg); }
  75% { transform: translate(12px, 10px) rotate(-270deg); }
}

@keyframes orbit9 {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(8px, -14px) rotate(90deg); }
  50% { transform: translate(-14px, -8px) rotate(180deg); }
  75% { transform: translate(-8px, 14px) rotate(270deg); }
}

@keyframes orbit10 {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(-10px, 12px) rotate(-90deg); }
  50% { transform: translate(12px, 10px) rotate(-180deg); }
  75% { transform: translate(10px, -12px) rotate(-270deg); }
}

@keyframes orbit11 {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(16px, -8px) rotate(90deg); }
  50% { transform: translate(-8px, 16px) rotate(180deg); }
  75% { transform: translate(-16px, 8px) rotate(270deg); }
}

@keyframes orbit12 {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(-14px, -12px) rotate(-90deg); }
  50% { transform: translate(12px, -14px) rotate(-180deg); }
  75% { transform: translate(14px, 12px) rotate(-270deg); }
}

@keyframes orbit13 {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(18px, -10px) rotate(90deg); }
  50% { transform: translate(-10px, 18px) rotate(180deg); }
  75% { transform: translate(-18px, 10px) rotate(270deg); }
}

@keyframes orbit14 {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(-16px, -14px) rotate(-90deg); }
  50% { transform: translate(14px, -16px) rotate(-180deg); }
  75% { transform: translate(16px, 14px) rotate(-270deg); }
}

@keyframes orbit15 {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(20px, -12px) rotate(90deg); }
  50% { transform: translate(-12px, 20px) rotate(180deg); }
  75% { transform: translate(-20px, 12px) rotate(270deg); }
}

@keyframes orbit16 {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(-18px, -16px) rotate(-90deg); }
  50% { transform: translate(16px, -18px) rotate(-180deg); }
  75% { transform: translate(18px, 16px) rotate(-270deg); }
}

@keyframes orbit17 {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(22px, -14px) rotate(90deg); }
  50% { transform: translate(-14px, 22px) rotate(180deg); }
  75% { transform: translate(-22px, 14px) rotate(270deg); }
}

@keyframes orbit18 {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(-20px, -18px) rotate(-90deg); }
  50% { transform: translate(18px, -20px) rotate(-180deg); }
  75% { transform: translate(20px, 18px) rotate(-270deg); }
}

@keyframes orbit19 {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(24px, -16px) rotate(90deg); }
  50% { transform: translate(-16px, 24px) rotate(180deg); }
  75% { transform: translate(-24px, 16px) rotate(270deg); }
}

@keyframes orbit20 {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(-22px, -20px) rotate(-90deg); }
  50% { transform: translate(20px, -22px) rotate(-180deg); }
  75% { transform: translate(22px, 20px) rotate(-270deg); }
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.6;
    transform: translateX(-50%) scaleX(1);
  }
  50% {
    opacity: 1;
    transform: translateX(-50%) scaleX(1.2);
  }
}

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

@keyframes borderGlow {
  0%, 100% {
    opacity: 0.6;
    box-shadow: 0 0 5px rgba(102, 126, 234, 0.5);
  }
  50% {
    opacity: 1;
    box-shadow: 0 0 15px rgba(102, 126, 234, 0.8);
  }
}

@keyframes borderShimmer {
  0%, 100% {
    opacity: 0.3;
    transform: scaleX(1);
  }
  50% {
    opacity: 0.8;
    transform: scaleX(1.2);
  }
}

@keyframes glow {
  0%, 100% {
    opacity: 0.6;
    box-shadow: 0 0 5px rgba(102, 126, 234, 0.5);
  }
  50% {
    opacity: 1;
    box-shadow: 0 0 15px rgba(102, 126, 234, 0.8);
  }
}

// 响应式设计
@media (max-width: 768px) {
  .stars .star {
    animation-duration: 4s;
  }
  
  .particles .particle {
    animation-duration: 10s;
  }
  
  .meteors .meteor {
    animation-duration: 3s;
  }
  
  .waves {
    height: 60px;
  }
  
  .wave {
    height: 60px;
  }
  
  .wave-2 {
    height: 50px;
  }
  
  .wave-3 {
    height: 40px;
  }
}

@media (max-width: 480px) {
  .stars .star {
    animation-duration: 5s;
  }
  
  .particles .particle {
    animation-duration: 12s;
  }
  
  .meteors .meteor {
    animation-duration: 4s;
  }
  
  .waves {
    height: 40px;
  }
  
  .wave {
    height: 40px;
  }
  
  .wave-2 {
    height: 35px;
  }
  
  .wave-3 {
    height: 30px;
  }
}
</style>
