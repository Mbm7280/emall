import { createRouter, createWebHashHistory } from 'vue-router'

const Layout = () => import('@/views/member/Layout')
const Home = () => import('@/views/home')


// 路由规则：
const routes = [
  // 一级路由布局容器
  { 
    path: '/', 
    component: Layout,
    children: [
      {path: '/', component: Home}
    ]
  }
]

// 版本之间对比 创建路由实例
// vue2.0 new VueRouter({})
// vue3.0 createRouter({})
const router = createRouter({
  // 现在使用的是 hash 路由模式
  history: createWebHashHistory(),
  routes
})

export default router
