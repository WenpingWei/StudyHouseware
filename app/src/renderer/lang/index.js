import Vue from 'vue'
import VueI18n from 'vue-i18n'
import elementEnLocale from 'element-ui/lib/locale/lang/en' // element-ui lang
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'// element-ui lang
import enLocale from './en'
import zhLocale from './zh'
import { merge } from 'lodash'
const fs = require('fs')
const hocon = require('hocon-parser')
// 预加载配置文件
const cnLang = hocon(fs.readFileSync(__static + '/config/lang_cn.txt').toString())
const enLang = hocon(fs.readFileSync(__static + '/config/lang_en.txt').toString())
console.log(enLang)
Vue.use(VueI18n)
const messages = {
  en: merge({}, elementEnLocale, enLocale, enLang),
  zh: merge({}, elementZhLocale, zhLocale, cnLang)
}

export function getLanguage () {
  // let units = fs.readFileSync(__static + '/data/units.txt').toString()
  let chooseLanguage = 'zh'
  if (chooseLanguage) return chooseLanguage
  // if has not choose language
  // const language = (navigator.language || navigator.browserLanguage).toLowerCase()
  // const locales = Object.keys(messages)
  // for (const locale of locales) {
  //   if (language.indexOf(locale) > -1) {
  //     return locale
  //   }
  // }
  // return 'en'
}

const i18n = new VueI18n({
  locale: getLanguage(),
  messages: JSON.parse(JSON.stringify(messages))
})
export default i18n
