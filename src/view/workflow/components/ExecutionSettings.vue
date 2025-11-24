<template>
  <div class="execution-settings card-effect">
    <h3 class="section-title">运行配置</h3>

    <div class="config-form">
      <div class="header-row">
        <h4 class="sub-title">参数配置</h4>
        <el-button type="primary" link @click="addCustomParam">
          <el-icon class="mr-1"><Plus /></el-icon> 添加参数
        </el-button>
      </div>
      
      <div class="form-description">
        请配置工作流执行所需的 Key-Value 参数。带 * 号的为必填项。
      </div>

      <!-- KV 参数列表 -->
      <div class="kv-list">
        <template v-if="loading">
           <el-skeleton :rows="3" animated />
        </template>
        
        <template v-else>
          <!-- 标题行 -->
          <div class="kv-header" v-if="parameters.length > 0">
            <div class="col-key">参数名 (Key)</div>
            <div class="col-value">参数值 (Value)</div>
            <div class="col-action"></div>
          </div>

          <!-- 参数行 -->
          <div 
            v-for="(item, index) in parameters" 
            :key="index" 
            class="kv-item"
          >
            <!-- Key 列 -->
            <div class="col-key">
              <div v-if="item.isCustom" class="key-input-wrapper">
                <el-input 
                  v-model="item.key" 
                  placeholder="输入参数名" 
                  size="default"
                />
              </div>
              <div v-else class="key-display">
                <span class="key-text" :class="{ required: item.required }">{{ item.label || item.key }}</span>
                <el-tooltip v-if="item.description" :content="item.description" placement="top">
                   <el-icon class="info-icon"><InfoFilled /></el-icon>
                </el-tooltip>
                <div class="key-real-name" v-if="item.label && item.label !== item.key">{{ item.key }}</div>
              </div>
            </div>

            <!-- Value 列 -->
            <div class="col-value">
               <el-input 
                 v-model="item.value" 
                 :placeholder="item.placeholder || '请输入参数值'"
                 :status-icon="item.required && !item.value"
                 clearable
               />
            </div>

            <!-- Action 列 -->
            <div class="col-action">
              <el-button 
                v-if="item.isCustom" 
                type="danger" 
                link 
                :icon="Delete"
                @click="removeParam(index)" 
              />
            </div>
          </div>

          <el-empty v-if="parameters.length === 0" description="暂无参数" :image-size="60" />
        </template>
      </div>

      <div class="form-actions">
        <el-button type="primary" @click="saveConfig" :loading="saving">保存并应用配置</el-button>
        <el-button @click="resetParams">重置</el-button>
      </div>

      <el-divider />

      <h4 class="sub-title">系统运行参数</h4>
      <el-form label-width="120px" label-position="left">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="日志级别">
              <el-select v-model="systemForm.logLevel">
                <el-option label="DEBUG" value="debug" />
                <el-option label="INFO" value="info" />
                <el-option label="WARN" value="warn" />
                <el-option label="ERROR" value="error" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="超时时间">
              <el-input-number v-model="systemForm.timeout" :min="60" :max="3600" controls-position="right" />
              <span class="unit-text">秒</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <el-divider />

    <div class="danger-zone">
      <h4 class="danger-title">危险操作</h4>
      <div class="danger-item">
        <div class="danger-info">
          <div class="danger-label">终止执行</div>
          <div class="danger-desc">强制停止当前正在运行的所有任务。</div>
        </div>
        <el-button type="danger" plain @click="$emit('terminate')">终止任务</el-button>
      </div>
      
      <div class="danger-item">
        <div class="danger-info">
          <div class="danger-label">删除执行记录</div>
          <div class="danger-desc">永久删除本次执行的所有日志和结果数据。</div>
        </div>
        <el-button type="danger" @click="deleteRecord">删除记录</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { InfoFilled, Plus, Delete } from '@element-plus/icons-vue'
import { saveWorkflowConfig } from '@/api/workflow'

defineEmits(['terminate'])

const loading = ref(false)
const saving = ref(false)

// 参数列表 [{ key, value, label, required, description, isCustom }]
const parameters = ref([])

// 系统参数
const systemForm = reactive({
  logLevel: 'info',
  timeout: 600
})

// 模拟从后端获取参数定义 Schema
const fetchParamSchema = async () => {
  loading.value = true
  await new Promise(resolve => setTimeout(resolve, 500))
  
  // 后端返回的定义列表
  const schema = [
    { key: 'backup_location', label: '备份位置', required: false, description: '备份文件存储位置' },
    { key: 'target_date', label: '目标日期', required: true, description: '格式: YYYY-MM-DD' },
    { key: 'compress_level', label: '压缩等级', required: false, default: '5', description: '1-9，数字越大压缩越高' },
    { key: 'notify_list', label: '通知列表', required: true, default: 'admin@example.com', description: '多个邮箱用逗号分隔' }
  ]

  // 转换为 KV 列表格式
  parameters.value = schema.map(item => ({
    key: item.key,
    value: item.default || '',
    label: item.label || item.key,
    required: item.required,
    description: item.description,
    isCustom: false
  }))
  
  loading.value = false
}

const addCustomParam = () => {
  parameters.value.push({
    key: '',
    value: '',
    isCustom: true,
    required: false
  })
}

const removeParam = (index) => {
  parameters.value.splice(index, 1)
}

const resetParams = () => {
  fetchParamSchema()
  ElMessage.info('已重置参数')
}

const saveConfig = async () => {
  // 数据校验
  const missingParams = parameters.value.filter(p => p.required && !p.value)
  if (missingParams.length > 0) {
    const names = missingParams.map(p => p.label || p.key).join(', ')
    ElMessage.error(`请填写必填参数: ${names}`)
    return
  }

  saving.value = true
  
  try {
    // 构造请求数据
    const submitData = {
      parameters: {},
      systemConfig: { ...systemForm }
    }
    
    parameters.value.forEach(p => {
      if (p.key) submitData.parameters[p.key] = p.value
    })

    // 使用项目已有的API服务层调用
    // 注意：这里需要executionId，可以根据实际业务场景获取
    const executionId = 'current' // 或者从props/route中获取
    
    const response = await saveWorkflowConfig(executionId, submitData)
    
    // 根据项目统一的响应格式处理结果
    if (response.code === 200) {
      ElMessage.success('配置保存成功')
      
      // 保存成功后可以触发其他操作
      // this.$emit('config-saved', submitData)
    } else {
      throw new Error(response.msg || '保存失败')
    }
    
  } catch (error) {
    console.error('保存配置失败:', error)
    ElMessage.error(`保存失败: ${error.message}`)
  } finally {
    saving.value = false
  }
}

const deleteRecord = () => {
  ElMessageBox.confirm(
    '确定要删除这条执行记录吗？此操作无法撤销。',
    '警告',
    {
      confirmButtonText: '确定删除',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      ElMessage.success('记录已删除')
    })
    .catch(() => {})
}

onMounted(() => {
  fetchParamSchema()
})
</script>

<style scoped lang="scss">
.card-effect {
  background: #FFFFFF;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.section-title {
  font-size: 18px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 24px;
  padding-left: 12px;
  border-left: 4px solid #722ED1;
}

.header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.sub-title {
  font-size: 15px;
  font-weight: 600;
  color: #374151;
  margin: 0;
}

.form-description {
  font-size: 13px;
  color: #6B7280;
  background: #F9FAFB;
  padding: 8px 12px;
  border-radius: 6px;
  margin-bottom: 20px;
}

.kv-list {
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 24px;
}

.kv-header {
  display: flex;
  background: #F3F4F6;
  padding: 10px 16px;
  font-size: 13px;
  font-weight: 600;
  color: #4B5563;
  border-bottom: 1px solid #E5E7EB;
}

.kv-item {
  display: flex;
  padding: 12px 16px;
  align-items: center;
  border-bottom: 1px solid #F3F4F6;
  transition: background 0.2s;
}

.kv-item:last-child {
  border-bottom: none;
}

.kv-item:hover {
  background: #F9FAFB;
}

.col-key {
  width: 40%;
  padding-right: 16px;
}

.col-value {
  flex: 1;
}

.col-action {
  width: 40px;
  text-align: right;
  display: flex;
  justify-content: flex-end;
}

.key-display {
  display: flex;
  flex-direction: column;
}

.key-text {
  font-size: 14px;
  color: #374151;
  display: flex;
  align-items: center;
  gap: 6px;
}

.key-text.required::after {
  content: '*';
  color: #EF4444;
  margin-left: 2px;
}

.info-icon {
  font-size: 14px;
  color: #9CA3AF;
  cursor: help;
}

.key-real-name {
  font-size: 12px;
  color: #9CA3AF;
  margin-top: 2px;
  font-family: monospace;
}

.form-actions {
  margin-bottom: 32px;
}

.unit-text {
  margin-left: 8px;
  color: #6B7280;
  font-size: 13px;
}

.danger-zone {
  margin-top: 32px;
}

.danger-title {
  font-size: 16px;
  font-weight: 600;
  color: #EF4444;
  margin-bottom: 16px;
}

.danger-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border: 1px solid #FECACA;
  background: #FEF2F2;
  border-radius: 8px;
  margin-bottom: 16px;
}

.danger-label {
  font-weight: 600;
  color: #991B1B;
  margin-bottom: 4px;
}

.danger-desc {
  font-size: 13px;
  color: #B91C1C;
}

.mr-1 {
  margin-right: 4px;
}
</style>
