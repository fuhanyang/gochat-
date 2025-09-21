
<template>
    <div class="relative isolate h-screen overflow-hidden box-border">
      <div class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
        <div class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"></div>
      </div>
      <div class="h-full flex flex-col items-center justify-center -mt-16">
        <div class="text-center w-32 h-32 mb-8"><img class="w-full h-full" src="/public/logo.png"> </div>
        <div class="hidden sm:mb-8 sm:flex sm:justify-center">
          <div class="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
            更加深入了解Gin-Vue-Admin. <a href="https://space.bilibili.com/322210472" class="font-semibold text-indigo-600" target="_blank"> 前往视频站 <span aria-hidden="true">&rarr;</span></a>
          </div>
        </div>
        <div class="text-center">
          <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">GoChat 项目</h1>
          <p class="mt-6 text-lg leading-8 text-gray-600">基于Vue3 + Vite的现代化聊天应用前端框架</p>
          
          <!-- 功能模块导航 -->
          <div class="mt-10">
            <h2 class="text-xl font-semibold text-gray-800 mb-6">功能模块测试</h2>
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl">
                     <router-link to="/login" class="module-card">
                       <div class="text-2xl mb-2">🔐</div>
                       <div class="font-medium">用户登录</div>
                     </router-link>
              <router-link to="/userinfo" class="module-card">
                <div class="text-2xl mb-2">👤</div>
                <div class="font-medium">用户信息</div>
              </router-link>
              <router-link to="/message" class="module-card">
                <div class="text-2xl mb-2">💬</div>
                <div class="font-medium">消息显示</div>
              </router-link>
              <router-link to="/websocket" class="module-card">
                <div class="text-2xl mb-2">🔌</div>
                <div class="font-medium">WebSocket</div>
              </router-link>
              <router-link to="/upload" class="module-card">
                <div class="text-2xl mb-2">📁</div>
                <div class="font-medium">文件上传</div>
              </router-link>
              <router-link to="/notification" class="module-card">
                <div class="text-2xl mb-2">🔔</div>
                <div class="font-medium">通知模块</div>
              </router-link>
              <router-link to="/tag" class="module-card">
                <div class="text-2xl mb-2">🏷️</div>
                <div class="font-medium">标签模块</div>
              </router-link>
              <router-link to="/match" class="module-card">
                <div class="text-2xl mb-2">🎯</div>
                <div class="font-medium">匹配模块</div>
              </router-link>
              <router-link to="/error" class="module-card">
                <div class="text-2xl mb-2">⚠️</div>
                <div class="font-medium">错误处理</div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script setup>
import { ElTag,ElButton } from "element-plus";
</script>


<style scoped lang="scss">
.module-card {
  @apply bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200 hover:border-indigo-300 text-center no-underline text-gray-700 hover:text-indigo-600;
  
  &:hover {
    transform: translateY(-2px);
  }
}
</style>
