import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './elui.js'
import i18n from './lang'
import '@/assets/css/common.scss'
import '@/assets/font/iconfont.css'
import { FastClick } from 'fastclick'
import { Message } from 'element-ui'
const fs = require('fs')
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false
const addr = JSON.parse(fs.readFileSync(__static + '/config/plc.txt', (err, data) => {
  console.log(err, data)
}).toString())
const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://' + addr.ip, {port: addr.port})
var plcArr = []
var updateTimes = Date.now()
client.on('connect', function () {
  client.subscribe('strander/read', function (err) {
    if (!err) {
      // client.publish('strander/write', '1,22')
    }
  })
  client.subscribe('strander/config_res')
})
client.on('message', function (topic, message) {
  if (topic === 'strander/read') {
    updateTimes = Date.now()
    plcArr = JSON.parse(message.toString())
  }
  if (topic === 'strander/config_res') {
    // 24 IPC通知GUI启动/停止 ：0停止工作 1开始工作
    client.publish('strander/write', JSON.stringify([[24, 1]]))
    Message({type: 'success', message: '开始检测'})
    router.push('moni')
  }
  // console.log(topic)
})
client.on('offline', function () {
  console.log('offline')
})
client.on('disconnect', function () {
  console.log('disconnect')
})
client.on('error', function () {
  console.log('error')
})
client.on('end', function () {
  console.log('end')
})
client.on('reconnect', function () {
  console.log(client)
  console.log('reconnect')
})
Vue.prototype.$client = client
Vue.mixin({
  methods: {
    writePlc (data) {
      store.commit('write', data)
      /* if (this.$store.state.app.online) {
        this.$client.publish('strander/write', JSON.stringify(data))
      } else {
        Message({type: 'warning', message: '链接断开，写人失败！'})
      } */
    }
  },
  computed: {
    dots: function () {
      return this.$store.state.app.dotAll
    },
    equips () {
      return this.$store.state.app.equips
    }
  }
})
new Vue({
  components: { App },
  router,
  store,
  i18n,
  template: '<App/>'
}).$mount('#app')
FastClick.attach(document.body)
var t
function loop () {
  plcArr = store.state.app.plc
  store.commit('setNet', Date.now() < (updateTimes + 3000))
  store.commit('setDots', plcArr.join('-'))
  clearTimeout(t)
  t = setTimeout(loop, 500)
}
loop()
