<template>
  <section class="wf-hero">
    <div class="wf-hero__inner">
      <h1 class="wf-title brand-title">工作流调用中心</h1>
      <p class="wf-subtitle">快速调用预设工作流或上传自定义流程，让自动化为你的工作效率加速</p>
      <div class="wf-searchbar">
        <el-input
          v-model="localKeyword"
          placeholder="搜索：工作流名称、描述或标签"
          :prefix-icon="Search"
          clearable
          @keyup.enter="onSearch"
          @clear="onSearch"
        />
      </div>
      <div class="wf-filters">
        <el-check-tag
          v-for="item in categoryChips"
          :key="item.value"
          :checked="modelCategory === item.value"
          @change="() => updateCategory(item.value)"
        >
          {{ item.label }}<span v-if="item.count !== undefined">（{{ item.count }}）</span>
        </el-check-tag>
      </div>
      <div class="wf-hero__ops">
        <el-dropdown @command="onSort">
          <el-button :icon="Filter">筛选</el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="recommend">推荐</el-dropdown-item>
              <el-dropdown-item command="popular">热门</el-dropdown-item>
              <el-dropdown-item command="latest">最新</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, watch } from 'vue'
import { Search, Filter } from '@element-plus/icons-vue'

const props = defineProps({
  keyword: String,
  category: {
    type: String,
    default: 'all'
  },
  sortBy: {
    type: String,
    default: 'recommend'
  },
  categoryChips: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['update:keyword', 'update:category', 'update:sortBy', 'search'])

const localKeyword = ref(props.keyword || '')
watch(() => props.keyword, (v) => localKeyword.value = v || '')

const modelCategory = ref(props.category)
watch(() => props.category, (v) => modelCategory.value = v)

function onSearch() {
  emit('update:keyword', localKeyword.value)
  emit('search')
}

function updateCategory(val) {
  emit('update:category', val)
  emit('search')
}

function onSort(cmd) {
  emit('update:sortBy', cmd)
  emit('search')
}
</script>

<style scoped lang="scss">
.wf-hero {
  margin-bottom: 16px;
  position: relative;
  z-index: 1;
}
.wf-hero__inner {
  padding: 20px;
  border-radius: 8px;
  background: linear-gradient(180deg, var(--brand-light) 0%, #FFFFFF 100%);
  border: 1px solid var(--brand-muted);
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
}
.wf-title {
  font-size: 28px;
  font-weight: 800;
  letter-spacing: 0.2px;
}
.wf-subtitle {
  margin-top: 8px;
  color: #6B7280;
}
.wf-searchbar {
  margin-top: 16px;
  :deep(.el-input__wrapper) {
    background: #fff;
    border: 1px solid #D1D5DB;
    border-radius: 4px;
    box-shadow: none;
    transition: all .2s ease-in-out;
  }
  :deep(.el-input__wrapper.is-focus) {
    border-color: var(--brand-primary);
    box-shadow: 0 0 0 2px rgba(114, 46, 209, 0.20);
  }
  :deep(.el-input__inner::placeholder) {
    color: #9CA3AF;
  }
  :deep(.el-input__inner) {
    color: #374151;
  }
  :deep(.el-input__prefix .el-icon) {
    color: #9CA3AF;
  }
}
.wf-hero__ops {
  margin-top: 16px;
  :deep(.el-button) {
    background: #fff;
    border: 1px solid var(--brand-primary);
    border-radius: 4px;
    color: var(--brand-primary);
    transition: all .2s ease-in-out;
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }
  :deep(.el-button .el-icon) {
    color: var(--brand-primary);
  }
  :deep(.el-button:hover) {
    background: var(--brand-light);
  }
}
.wf-filters {
  margin-top: 16px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  :deep(.el-check-tag) {
    background: #F3F4F6;
    border: 1px solid #E5E7EB;
    color: #374151;
    border-radius: 8px;
    padding: 6px 12px;
    font-size: 12px;
    line-height: 1;
    transition: transform .2s ease;
  }
  :deep(.el-check-tag.is-checked) {
    background: var(--brand-primary);
    color: #fff;
    border-color: var(--brand-primary);
  }
  :deep(.el-check-tag:hover) { transform: scale(1.03); }
}
</style>


