<template>
  <div class="wf-invoke">
    <MainBackgroundDecoration />
    <h2 class="wf-invoke__title">执行工作流</h2>
    <InvokeForm
      :workflows="workflows"
      :prefill-id="prefillId"
      :executing="executing"
      @execute="onExecute"
    />
    <LastRunCard :last-run="lastRun" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { fetchWorkflowList, executeWorkflow } from '@/api/workflow'
import MainBackgroundDecoration from '@/components/common/MainBackgroundDecoration.vue'
import InvokeForm from './components/InvokeForm.vue'
import LastRunCard from './components/LastRunCard.vue'

const route = useRoute()
const workflows = ref([])
const executing = ref(false)
const lastRun = ref(null)
const prefillId = route.query.id || ''

async function loadWorkflows() {
  try {
    const res = await fetchWorkflowList({ page: 1, pageSize: 100 })
    workflows.value = res?.data?.list || []
  } catch (e) {}
}

async function onExecute({ workflowId, params }) {
  executing.value = true
  try {
    const res = await executeWorkflow(workflowId, { params })
    const runId = res?.data?.runId
    lastRun.value = { runId, status: 'running' }
    ElMessage.success('已发起执行')
  } catch (e) {
  } finally {
    executing.value = false
  }
}

onMounted(() => {
  loadWorkflows()
})
</script>

<style scoped lang="scss">
.wf-invoke {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  padding: 24px;
  overflow: hidden;
}
.wf-invoke__title {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 16px;
  color: #fff;
}
</style>


