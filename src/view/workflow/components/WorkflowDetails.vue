<template>
  <div class="workflow-details card-effect">
    <h3 class="section-title">流程定义</h3>
    
    <div class="flowchart-container">
      <!-- 模拟简单的流程图 -->
      <div class="flow-step" v-for="(step, index) in definitionSteps" :key="step.id">
        <div class="step-box">
          <div class="step-icon">
            <el-icon><component :is="step.icon" /></el-icon>
          </div>
          <div class="step-info">
            <div class="step-title">{{ step.title }}</div>
            <div class="step-type">{{ step.type }}</div>
          </div>
        </div>
        <div class="flow-arrow" v-if="index < definitionSteps.length - 1">
          <el-icon><ArrowRight /></el-icon>
        </div>
      </div>
    </div>

    <div class="details-section">
      <h4 class="sub-title">基本信息</h4>
      <el-descriptions :column="2" border>
        <el-descriptions-item label="工作流ID">WF-20231123-8721</el-descriptions-item>
        <el-descriptions-item label="创建者">Admin</el-descriptions-item>
        <el-descriptions-item label="版本">v1.2.0</el-descriptions-item>
        <el-descriptions-item label="上次更新">2023-11-20 14:30</el-descriptions-item>
        <el-descriptions-item label="描述" :span="2">
          自动化执行全量数据备份，并进行初步的数据清洗与关键指标分析报告生成。包含异常重试机制与邮件通知功能。
        </el-descriptions-item>
      </el-descriptions>
    </div>

    <div class="details-section">
      <h4 class="sub-title">输入参数定义</h4>
      <el-table :data="inputParams" style="width: 100%" border>
        <el-table-column prop="name" label="参数名" width="180" />
        <el-table-column prop="type" label="类型" width="120" />
        <el-table-column prop="required" label="必填" width="100">
          <template #default="scope">
            <el-tag :type="scope.row.required ? 'danger' : 'info'">{{ scope.row.required ? '是' : '否' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="desc" label="描述" />
      </el-table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ArrowRight, Upload, Filter, Document, Message } from '@element-plus/icons-vue'

const definitionSteps = [
  { id: 'n1', title: '读取数据库', type: 'Source: MySQL', icon: Upload },
  { id: 'n2', title: '清洗数据', type: 'Transform: Clean', icon: Filter },
  { id: 'n3', title: '生成报表', type: 'Action: Generate PDF', icon: Document },
  { id: 'n4', title: '发送邮件', type: 'Notify: Email', icon: Message },
]

const inputParams = [
  { name: 'target_date', type: 'Date', required: true, desc: '备份数据的目标日期' },
  { name: 'compress_level', type: 'Number', required: false, desc: '压缩等级 (1-9)' },
  { name: 'notify_list', type: 'Array', required: true, desc: '接收通知的邮箱列表' },
]
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

.sub-title {
  font-size: 16px;
  font-weight: 600;
  color: #374151;
  margin: 24px 0 16px;
}

.flowchart-container {
  display: flex;
  align-items: center;
  padding: 40px;
  background: #F9FAFB;
  border-radius: 8px;
  border: 1px dashed #E5E7EB;
  overflow-x: auto;
  margin-bottom: 32px;
}

.flow-step {
  display: flex;
  align-items: center;
}

.step-box {
  display: flex;
  align-items: center;
  gap: 12px;
  background: white;
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid #E5E7EB;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  min-width: 180px;
}

.step-icon {
  width: 36px;
  height: 36px;
  background: #F3F4F6;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #722ED1;
  font-size: 20px;
}

.step-info {
  display: flex;
  flex-direction: column;
}

.step-title {
  font-size: 14px;
  font-weight: 600;
  color: #111827;
}

.step-type {
  font-size: 12px;
  color: #6B7280;
}

.flow-arrow {
  margin: 0 16px;
  color: #9CA3AF;
  font-size: 20px;
}
</style>

