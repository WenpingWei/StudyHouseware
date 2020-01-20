import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: require('@/page/index').default, // 登录前主界面
      redirect: 'sets',
      children: [
        {
          path: '/sets',
          name: 'sets',
          component: require('@/page/sets').default // 登录界面
        },
        {
          path: '/edit',
          name: 'edit',
          component: require('@/page/edit').default
        },
        {
          path: '/moni',
          name: 'moni',
          component: require('@/page/monitor').default
        }
      ]
    }
  ]
})
