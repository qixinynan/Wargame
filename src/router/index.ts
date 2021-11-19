import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/', //路由路径
    name: 'Home', //名称
    component: () => import('../views/Home.vue') //加载vue文件
  },
  {
    path: '/game',
    name: 'About',
    component: () => import('../views/Game.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(), //使用历史模式
  routes
})

export default router