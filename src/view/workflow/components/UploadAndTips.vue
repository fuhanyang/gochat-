<template>
  <div class="surface wf-upload-panel">
    <el-upload
      class="wf-upload"
      drag
      :auto-upload="false"
      :limit="1"
      accept=".json,.yaml,.yml,.flow"
      :on-change="onFileChange"
      :http-request="doUpload"
      ref="uploadRef"
    >
      <el-icon class="wf-upload__icon"><UploadFilled /></el-icon>
      <div class="el-upload__text">拖放工作流文件到此或点击上传</div>
      <template #tip>
        <div class="el-upload__tip">支持 .json, .yaml, .yml, .flow 格式，单个文件不超过 10MB</div>
      </template>
    </el-upload>
    <p class="wf-upload__desc">上传的工作流将保存在“我的工作流”中，可随时编辑和调用，支持版本管理和团队共享</p>
    <div class="wf-upload__btns">
      <el-button type="primary" @click="triggerChoose">选择文件</el-button>
      <el-button @click="doUpload">上传</el-button>
    </div>
    <div class="wf-upload__ops">
      <el-card class="wf-mini-card glass-mini">
        <div class="wf-mini-card__title">工作流格式</div>
        <div class="wf-mini-card__desc">使用 JSON 或 YAML 格式定义工作流步骤与参数。</div>
      </el-card>
      <el-card class="wf-mini-card glass-mini">
        <div class="wf-mini-card__title">安全检查</div>
        <div class="wf-mini-card__desc">上传的工作流将经过安全校验，防止越权调用和数据泄露风险。</div>
      </el-card>
      <el-card class="wf-mini-card glass-mini">
        <div class="wf-mini-card__title">分享与协作</div>
        <div class="wf-mini-card__desc">支持将自定义工作流分享给同事团队，设置成员权限策略。</div>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { UploadFilled } from '@element-plus/icons-vue'
import { uploadWorkflowFile } from '@/api/files'

let pendingFile = null
const uploadRef = ref(null)

function onFileChange(file) {
  pendingFile = file.raw
}

function triggerChoose() {
  const el = uploadRef?.value?.$el?.querySelector('input[type=\"file\"]')
  if (el) el.click()
}

async function doUpload() {
  if (!pendingFile) return
  if (pendingFile.size > 10 * 1024 * 1024) {
    ElMessage.error('文件不能超过 10MB')
    return
  }
  const formData = new FormData()
  formData.append('file', pendingFile)
  try {
    await uploadWorkflowFile(formData)
    ElMessage.success('上传成功，已保存到“我的工作流”')
  } catch (e) {
    // handled by request interceptor
  } finally {
    pendingFile = null
  }
}
</script>

<style scoped lang="scss">
.wf-upload-panel {
  padding: 16px;
}
.wf-upload {
  width: 100%;
}
.wf-upload :deep(.el-upload-dragger) {
  background: #fff;
  border: 2px dashed #E5E7EB;
  transition: all .3s ease;
  border-radius: 6px;
}
.wf-upload :deep(.el-upload-dragger.is-dragover) {
  background: #F9F6FC;
  border-color: var(--brand-primary);
}
.wf-upload__icon {
  font-size: 40px;
  color: var(--brand-primary);
}
.wf-upload__desc {
  margin-top: 12px;
  color: #6B7280;
}
.wf-upload__btns {
  margin-top: 12px;
  display: flex;
  gap: 8px;
}
.wf-upload__btns :deep(.el-button--primary) {
  background: var(--brand-primary);
  border-color: var(--brand-primary);
  border-radius: 4px;
  transition: all .2s ease-in-out;
}
.wf-upload__btns :deep(.el-button--primary:hover) {
  background: var(--brand-accent);
  border-color: var(--brand-accent);
}
.wf-upload__btns :deep(.el-button--primary:active) {
  transform: scale(0.95);
}
.wf-upload__ops {
  margin-top: 12px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}
.wf-mini-card__title {
  font-weight: 700;
  margin-bottom: 4px;
}
.wf-mini-card__desc {
  color: #6B7280;
}
:deep(.el-card.wf-mini-card) {
  background: #fff;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  transition: all .2s ease-in-out;
  overflow: hidden;
}
:deep(.el-card.wf-mini-card:hover) {
  background: #fff;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  border-left: 2px solid var(--brand-primary);
}

@media (max-width: 1200px) {
  .wf-upload__ops {
    grid-template-columns: 1fr;
  }
}
</style>


