import request from '@/utils/request'

// Workflow definitions (list and detail)
export function fetchWorkflowList(params = {}) {
  return request({
    url: '/api/v1/workflows',
    method: 'get',
    params,
    showLoading: false
  })
}

export function fetchWorkflowDetail(workflowId) {
  return request({
    url: `/api/v1/workflows/${workflowId}`,
    method: 'get'
  })
}

// Execute workflow
export function executeWorkflow(workflowId, payload = {}) {
  return request({
    url: `/api/v1/workflows/${workflowId}/execute`,
    method: 'post',
    data: payload
  })
}

// Executions (runs)
export function fetchExecutionList(params = {}) {
  return request({
    url: '/api/v1/executions',
    method: 'get',
    params
  })
}

export function fetchExecutionDetail(runId) {
  return request({
    url: `/api/v1/executions/${runId}`,
    method: 'get'
  })
}

export function retryExecution(runId) {
  return request({
    url: `/api/v1/executions/${runId}/retry`,
    method: 'post'
  })
}

export function cancelExecution(runId) {
  return request({
    url: `/api/v1/executions/${runId}/cancel`,
    method: 'post'
  })
}

// Workflow configuration
export function saveWorkflowConfig(executionId, configData) {
  return request({
    url: `/api/v1/executions/${executionId}/config`,
    method: 'post',
    data: configData
  })
}

export function fetchWorkflowConfig(executionId) {
  return request({
    url: `/api/v1/executions/${executionId}/config`,
    method: 'get'
  })
}


