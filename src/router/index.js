import { createRouter, createWebHashHistory } from 'vue-router'

// 路由规则：
const routes = []

// 版本之间对比创建 路由实例
// vue2.0 new VueRouter({})
// vue3.0 createRouter({})
const router = createRouter({
  // 现在使用的是 hash 路由模式
  history: createWebHashHistory(),
  routes
})

export default router
