import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css
import '@/assets/css/reset.css' // global css
import '@/assets/css/global.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import '@/icons' // icon
import '@/permission' // permission control

import Cookies from 'js-cookie'
import echarts from 'echarts' // 引入echarts
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor)
Vue.prototype.$echarts = echarts // 引入组件
Vue.prototype.Cookies = Cookies // 引入组件

// 共用的方法
import common from '../src/assets/js/common.js'
import axios from 'axios'
import Qs from 'qs'
// console.log('main.js')
// console.log(Cookies('vue_admin_template_token'))
// axios.defaults.headers.common['Authorization'] = 'VSZ ' + Cookies('vue_admin_template_token')
axios.defaults.baseURL = process.env.VUE_APP_BASE_API
Vue.prototype.$ajax = axios
Vue.prototype.qs = Qs

Vue.prototype.common = common

Vue.directive('btn', {
  bind(el, binding, vnode) {
    // console.log(binding)
    const permission = store.state.permission.btnPermission.map(v => {
      // return v.children.every(role => role.meta.title === binding.value.text)
      const children = v.children.filter(item => {
        return item.meta.title === binding.value.text
      })
      return children.length !== 0
    })
    // console.log(permission)
    const a = permission.includes(true)
    if (!a) {
      el.style.display = 'none'
    }
  }
})

import customList from '@/views/vue-common/customList.vue'
import deviceStatus from '@/views/vue-common/deviceStatus.vue'
import map from '@/views/vue-common/map.vue'
import table from '@/views/vue-common/table.vue'
import guide from '@/views/vue-common/guide.vue'
Vue.component('vs-custom-list', customList) // 客户列表下拉框
Vue.component('vs-map', map)
Vue.component('vs-table', table)
Vue.component('vs-guide', guide)
Vue.component('vs-status', deviceStatus)

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
import {
  mockXHR
} from '../mock'
if (process.env.NODE_ENV === 'production') {
  mockXHR()
}

// set ElementUI lang to EN
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
