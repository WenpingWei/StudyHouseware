import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
/* Router Modules */
import equipmentMonitor from './modules/equipmentMonitor'
import device from './modules/device'
import dataNum from './modules/dataNum'
import custom from './modules/custom'
import system from './modules/system'
import gateway from './modules/gateway'
import personal from './modules/personal'
import notifications from './modules/notifications'
// 所有权限通用路由表
export const constantRouterMap = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [{
    path: '/redirect/:path*',
    component: () => import('@/views/redirect/index')
    }]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: {
        title: '首页',
        icon: 'home'
      }
    }]
  },
  personal,
  notifications
  // 设备监控
  // equipmentMonitor,
  // 数据管理
  // dataNum,
  // 设备管理
  // device,
  // 网关管理
  // gateway,
  // 客户管理
  // custom,
  // 系统设置
  // system,
  // 个人中心
  // personal,
  // 通知中心
  // notifications
]

//异步挂载的路由
//动态需要根据权限加载的路由表
export const asyncRouterMap = [
  // 设备管理
  // device,
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

// 需要权限的路由
export const permissionRouterMap = [
  equipmentMonitor,
  dataNum,
  device,
  gateway,
  custom,
  system,
  personal,
  notifications
]


export default new Router({
  routes: constantRouterMap
})
// const createRouter = () => new Router({
//   // mode: 'history', // require service support
//   scrollBehavior: () => ({
//     y: 0
//   }),
//   routes: constantRoutes
// })




// const router = createRouter()


// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
// export function resetRouter() {
//   const newRouter = createRouter()
//   router.matcher = newRouter.matcher // reset router
// }

// export default router
