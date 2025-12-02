<template>
  <el-dialog
    v-model="visible"
    title="编辑个人资料"
    width="500px"
    :before-close="handleClose"
    class="edit-profile-dialog"
    destroy-on-close
    append-to-body
  >
    <el-form :model="form" label-width="80px" class="edit-form">
      <div class="avatar-upload-container">
        <el-upload
          class="avatar-uploader"
          action="#"
          :show-file-list="false"
          :auto-upload="false"
          :on-change="handleAvatarChange"
        >
          <img v-if="form.avatar" :src="form.avatar" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          <div class="upload-overlay">
            <el-icon><Camera /></el-icon>
          </div>
        </el-upload>
        <div class="avatar-tip">点击更换头像</div>
      </div>

      <el-form-item label="姓名">
        <el-input v-model="form.name" placeholder="请输入姓名" />
      </el-form-item>
      
      <el-form-item label="职位">
        <el-input v-model="form.job" placeholder="请输入职位" />
      </el-form-item>

      <el-form-item label="邮箱">
        <el-input v-model="form.email" placeholder="请输入邮箱" />
      </el-form-item>

      <el-form-item label="地址">
        <el-input v-model="form.location" placeholder="请输入地址" />
      </el-form-item>

      <el-form-item label="个人简介">
        <el-input 
          v-model="form.description" 
          type="textarea" 
          :rows="3" 
          placeholder="请输入个人简介" 
        />
      </el-form-item>
    </el-form>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleSave" :loading="loading">保存</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, watch, reactive } from 'vue'
import { Plus, Camera } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { updateUserInfo } from '@/api/userinfo'

const props = defineProps({
  modelValue: Boolean,
  userData: Object
})

const emit = defineEmits(['update:modelValue', 'save'])

const visible = ref(false)
const loading = ref(false)

const form = reactive({
  avatar: '',
  name: '',
  job: '',
  email: '',
  location: '',
  description: ''
})

watch(() => props.modelValue, (val) => {
  visible.value = val
  if (val && props.userData) {
    // Copy data when opening
    Object.assign(form, props.userData)
  }
})

watch(visible, (val) => {
  emit('update:modelValue', val)
})

const handleClose = () => {
  visible.value = false
}

const handleAvatarChange = (file) => {
  form.avatar = URL.createObjectURL(file.raw)
}

const handleSave = async () => {
  loading.value = true
  try {
    // 调用后端API保存用户信息
    const response = await updateUserInfo(form)
    
    if (response.code === 200 || response.success) {
      ElMessage.success('保存成功')
      emit('save', { ...form })
      handleClose()
    } else {
      ElMessage.error(response.message || '保存失败')
    }
  } catch (error) {
    console.error('保存用户信息失败:', error)
    ElMessage.error('保存失败，请稍后重试')
  } finally {
    loading.value = false
  }
}
</script>

<style lang="scss" scoped>
.avatar-upload-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 24px;
}

.avatar-uploader {
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid #E5E7EB;
  transition: all 0.3s;

  &:hover {
    border-color: #722ED1;
    
    .upload-overlay {
      opacity: 1;
    }
  }
}

.avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
}

.upload-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  opacity: 0;
  transition: opacity 0.3s;
}

.avatar-tip {
  margin-top: 8px;
  font-size: 12px;
  color: #9CA3AF;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

/* Customize Element UI styles to match theme */
:deep(.el-button--primary) {
  background-color: #722ED1;
  border-color: #722ED1;
  
  &:hover {
    background-color: #5C27A0;
    border-color: #5C27A0;
  }
}

:deep(.el-dialog) {
  border-radius: 16px;
  overflow: hidden;
}

:deep(.el-dialog__header) {
  margin-right: 0;
  padding: 20px;
  border-bottom: 1px solid #F3F4F6;
}

:deep(.el-dialog__footer) {
  padding: 20px;
  border-top: 1px solid #F3F4F6;
}
</style>

