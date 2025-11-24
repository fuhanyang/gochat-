import request from '@/utils/request'

export function uploadWorkflowFile(formData) {
  return request({
    url: '/api/v1/files/uploads',
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    // 上传过程通常需要较长时间，不显示全局 loading 避免遮挡
    showLoading: false
  })
}


