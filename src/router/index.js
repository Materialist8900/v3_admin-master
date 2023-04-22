import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'

const routes = [
  {
    path: '/',
    redirect: '/homepage',
  },
  // 主页
  {
    path: '/',
    name: 'Home',
    component: Home,
    // 主页子路由
    children: [
      {
        path: '/homepage',
        name: 'homepage',
        component: () => import('@/views/Homepage.vue'),
      },
      {
        path: '/students',
        name: 'students',
        component: () => import('@/views/Students.vue'),
      },
      {
        path: '/club',
        name: 'club',
        component: () => import('@/views/Club.vue'),
      },
    ],
  },
  // 登录页
  {
    path: '/Login',
    // 懒加载登录页
    component: () => import('@/views/Login.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// 全局路由守卫
router.beforeEach((to, from, next) => {
  // 判断用户是否有登录凭证（比如 token）
  const hasToken = localStorage.getItem('token')
  // 如果用户没有登录凭证且访问的不是登录页，跳转到登录页
  if (to.name !== 'login' && !hasToken) {
    next('login')
    // ------------------------------tips------------------------
    // 获取需要的 store 实例
    // const store = to.meta.store
    // 解码token
    // const decoded = jwt.decode(localStorage.getItem('token'))
    // 这部分需要配合后端jwt认证，没用node.js写接口，所以算了
    // 解码token后如果usn=admin，却认为管理员身份
    // else if (decoded && decoded.payload && decoded.payload.usn === 'admin') {
    //   store.state.isAdmin = true // 修改store中isAdmin的值
    //   // 并且放行
    //   next()
    // }
    // ----------------------------------------------------------
  } else {
    // 否则放行
    next()
  }
})

export default router
