<template>
  <div class="wf-panel surface">
    <el-form :model="form" label-width="100px" class="wf-invoke__form">
      <el-form-item label="选择工作流">
        <el-select v-model="form.workflowId" filterable placeholder="选择或搜索工作流" style="width: 420px">
          <el-option v-for="w in workflows" :key="w.id" :label="w.name" :value="w.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="参数(JSON)">
        <el-input
          v-model="form.paramsJson"
          type="textarea"
          :rows="12"
          placeholder='例如：{ "projectId": "abc", "limit": 10 }'
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="executing" @click="submit">执行</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { ElMessage } from 'element-plus'

const props = defineProps({
  workflows: {
    type: Array,
    default: () => []
  },
  prefillId: String,
  executing: Boolean
})

const emit = defineEmits(['execute'])

const form = ref({
  workflowId: props.prefillId || '',
  paramsJson: ''
})

watch(() => props.prefillId, (v) => {
  if (v) form.value.workflowId = v
})

function submit() {
  if (!form.value.workflowId) {
    ElMessage.warning('请选择工作流')
    return
  }
  let payload = {}
  if (form.value.paramsJson?.trim()) {
    try {
      payload = JSON.parse(form.value.paramsJson)
    } catch {
      ElMessage.error('参数 JSON 格式不正确')
      return
    }
  }
  emit('execute', { workflowId: form.value.workflowId, params: payload })
}

function onReset() {
  form.value.paramsJson = ''
}
</script>

<style scoped lang="scss">
.wf-invoke__form {
  max-width: 720px;
  :deep(.el-input__wrapper) {
    background: rgba(255, 255, 255, 0.15);
    border: 1px solid rgba(255, 255, 255, 0.35);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  }
}
.wf-panel {
  padding: 16px;
  margin-bottom: 12px;
}
</style>


