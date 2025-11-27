<template>
  <div class="left-panel">
    <!-- 用户信息框 -->
    <UserInfoCard 
      @view-profile="$emit('view-profile')"
      @search-tag="(tag) => $emit('search-tag', tag)"
    />
    
    <!-- 信息展示框 -->
    <InfoDisplayCard />
  </div>
</template>

<script setup>
import UserInfoCard from './UserInfoCard.vue'
import InfoDisplayCard from './InfoDisplayCard.vue'

const emit = defineEmits(['search-tag', 'view-profile'])
</script>

<style lang="scss" scoped>
.left-panel {
  width: 350px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  z-index: 1;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .left-panel {
    width: 100%;
    padding: 15px;
  }
}
</style>
