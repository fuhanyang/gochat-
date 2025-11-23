<template>
  <el-card shadow="hover" class="wf-card">
    <div class="wf-card__cover">
      <img :src="workflow.coverUrl || defaultCover" alt="" />
      <el-button class="wf-card__fav" :class="{ 'is-fav': isFav }" circle @click.stop="toggleFav">
        <span class="fav-icon">❤</span>
      </el-button>
    </div>
    <div class="wf-card__body">
      <div class="wf-card__title" :title="workflow.name">{{ workflow.name }}</div>
      <div class="wf-card__desc" :title="workflow.description">{{ workflow.description }}</div>
      <div class="wf-card__tags">
        <el-tag v-for="(tag, i) in (workflow.tags || [])" :key="i" size="small" effect="plain">{{ tag }}</el-tag>
      </div>
      <div class="wf-card__footer">
        <div class="wf-card__stats">{{ (workflow.usageCount || 0).toLocaleString() }} 次调用</div>
        <el-button type="primary" size="small" :icon="CaretRight" @click="onInvoke">调用</el-button>
      </div>
    </div>
  </el-card>
  </template>

<script setup>
import { ref, computed } from 'vue'
import { CaretRight } from '@element-plus/icons-vue'

const props = defineProps({
  workflow: {
    type: Object,
    required: true
  },
  modelValue: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['invoke', 'update:modelValue'])
const defaultCover = '/logo.png'
const isFav = computed(() => props.modelValue)

function onInvoke() {
  emit('invoke', props.workflow)
}

function toggleFav() {
  emit('update:modelValue', !props.modelValue)
}
</script>

<style scoped lang="scss">
.wf-card {
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
  border: 4px solid var(--brand-muted);
  transition: transform .2s ease, box-shadow .2s ease, border-color .2s ease;
  box-shadow: 0 4px 6px rgba(0,0,0,0.03);
}
.wf-card:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 8px 12px rgba(0,0,0,0.08);
  border-color: var(--brand-primary);
}
.wf-card__cover {
  position: relative;
  width: 100%;
  height: 140px;
  overflow: hidden;
  border-radius: 4px;
}
.wf-card__cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.wf-card__cover::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 60%;
  background: linear-gradient(180deg, rgba(114,46,209,0.35) 0%, rgba(114,46,209,0) 100%);
}
.wf-card__fav {
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid #E5E7EB;
  width: 32px;
  height: 32px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform .2s ease;
}
.wf-card__fav:hover {
  transform: scale(1.05);
}
.fav-icon {
  font-size: 16px;
  line-height: 1;
  color: #9CA3AF;
}
.wf-card__fav.is-fav .fav-icon {
  color: #F43F5E;
}
.wf-card__fav:hover .fav-icon { color: var(--brand-primary); }
.wf-card__body {
  padding-top: 12px;
}
.wf-card__title {
  font-size: 16px;
  font-weight: 700;
  color: #111827;
  line-height: 1.4;
}
.wf-card__desc {
  margin-top: 6px;
  font-size: 14px;
  color: #6B7280;
  height: 36px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.wf-card__tags {
  margin-top: 8px;
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  :deep(.el-tag) {
    background: #F0E6FA;
    border-color: transparent;
    color: #6B7280;
    border-radius: 999px;
    font-size: 12px;
  }
}
.wf-card__footer {
  margin-top: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.wf-card__stats {
  font-size: 12px;
  color: #6B7280;
}
:deep(.el-button--primary) {
  background: linear-gradient(90deg, #722ED1, #A06CD5);
  border-color: transparent;
  border-radius: 4px;
  transition: all .2s ease-in-out;
}
:deep(.el-button--primary:hover) {
  background: linear-gradient(270deg, #722ED1, #A06CD5);
  border-color: transparent;
}
:deep(.el-button--primary:active) {
  transform: scale(0.95);
}
</style>

