import Router from 'uni-simple-router'

const router = new Router({
  // 定义路由表
  routes: [
    {
      path: '/pages/home/index',
      name: 'home',
      component: resolve => require(['@/pages/home/index.vue'], resolve)
    },
    // {
    //   path: '/pages/about/index',
    //   name: 'about',
    //   component: resolve => require(['@/pages/about/index.vue'], resolve)
    // },
    // 更多路由配置...
  ]
})

// 监听路由跳转前的事件
router.beforeEach((to, from, next) => {
  // 在这里进行一些路由跳转前的逻辑处理，例如校验登录状态等
  next()
})

// 监听路由跳转后的事件
router.afterEach((to, from) => {
  // 在这里进行一些路由跳转后的逻辑处理
})

export default router