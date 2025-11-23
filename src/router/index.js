import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(""),
  routes: [
    {
      path: '/',
      name: 'home',
      component:()=> import("@/view/home/index.vue")
    },
    // 功能模块测试页面路由
    {
      path: '/error',
      name: 'error',
      component: () => import("@/view/error/index.vue")
    },
    {
      path: '/upload',
      name: 'upload',
      component: () => import("@/view/upload/index.vue")
    },
    {
      path: '/notification',
      name: 'notification',
      component: () => import("@/view/notification/index.vue")
    },
    {
      path: '/login',
      name: 'login',
      component: () => import("@/view/login/index.vue")
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import("@/view/dashboard/index.vue")
    },
    {
      path: '/userinfo',
      name: 'userinfo',
      component: () => import("@/view/userinfo/index.vue")
    },
    {
      path: '/message',
      name: 'message',
      component: () => import("@/view/message/index.vue")
    },
    {
      path: '/websocket',
      name: 'websocket',
      component: () => import("@/view/websocket/index.vue")
    },
    {
      path: '/tag',
      name: 'tag',
      component: () => import("@/view/tag/index.vue")
    },
    {
      path: '/match',
      name: 'match',
      component: () => import("@/view/match/index.vue")
    },
    // 工作流平台
    {
      path: '/workflow',
      name: 'workflow',
      component: () => import("@/view/workflow/index.vue")
    },
    {
      path: '/workflow/invoke',
      name: 'workflowInvoke',
      component: () => import("@/view/workflow/Invoke.vue")
    },
    {
      path: '/workflow/execution/:id',
      name: 'workflowExecution',
      component: () => import("@/view/workflow/Execution.vue")
    }
  ]
})

export default router
