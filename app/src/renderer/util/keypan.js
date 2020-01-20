import Vue from 'vue'
import KeyBord from '@/components/keybord.vue'
const Keypan = Vue.extend(KeyBord)
KeyBord.install = function () {
  let instance =  new Keypan().$mount()
  document.body.appendChild(instance.$el)
  Vue.prototype.$keybord = function (options) {
    console.log(Object.prototype.toString.call(options))
    if (Object.prototype.toString.call(options) !== '[object Object]') {
      throw new TypeError('what type of variable do you take me for?')
    }
    instance.istr = options.val
    instance.sucesss = options.sucesss || function (){}
    this.$nextTick(() => {
      instance.visible = true
    })
  }
}
export default KeyBord