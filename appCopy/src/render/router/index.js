import Vue from 'vue'
import Router from 'vue-router'
import index from '../page/index.vue'
import sets from '../page/sets.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index, // 登录前主界面
      redirect: '/sets',//默认打开的界面
      children:[
        {
          path:'sets',
          name:'sets',
          component:sets//登录界面
        }
      ]
    }
  ]
})
