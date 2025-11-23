<template>
  <section class="wf-section">
    <h2 class="wf-section__title">快速上手指南</h2>
    <div class="wf-steps">
      <el-card class="wf-step surface-card">
        <div class="wf-step__num">1</div>
        <div class="wf-step__title">浏览工作流</div>
        <div class="wf-step__desc">在列表中查找需要的工作流，查看详情与使用说明。</div>
      </el-card>
      <el-card class="wf-step surface-card">
        <div class="wf-step__num">2</div>
        <div class="wf-step__title">配置参数</div>
        <div class="wf-step__desc">填写表单或导入 JSON，根据需要配置变量和触发器。</div>
      </el-card>
      <el-card class="wf-step surface-card">
        <div class="wf-step__num">3</div>
        <div class="wf-step__title">执行监控</div>
        <div class="wf-step__desc">在执行中心查看运行进度、日志流与状态切换。</div>
      </el-card>
      <el-card class="wf-step surface-card">
        <div class="wf-step__num">4</div>
        <div class="wf-step__title">保存结果</div>
        <div class="wf-step__desc">完成后查看、下载、分享结果，保存常用配置。</div>
      </el-card>
    </div>
  </section>
</template>

<script setup>
</script>

<style scoped>
.wf-section__title {
  margin-bottom: 12px;
  color: #111827;
}
.wf-steps {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}
.wf-step {
  background: #F9FAFB;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  transition: all .2s ease-in-out;
}
.wf-step:hover {
  background: #fff;
  border-left: 2px solid var(--brand-primary);
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}
.wf-step__num {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--brand-primary);
  color: #fff;
  font-weight: 700;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
}
.wf-step__title {
  font-weight: 700;
  margin-bottom: 4px;
  color: #111827;
}
.wf-step__desc {
  color: #6B7280;
}
@media (max-width: 1200px) {
  .wf-steps {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>


