import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'
// 设置cookie过期时间
var inFifteenMinutes = new Date(new Date().getTime() + 5*60*1000*60)
export function getToken(name) {
    return Cookies.get(name)
  return Cookies.get(TokenKey)
}
export function getUseId(name) {
  return Cookies.get(name+'userId')
}

export function setToken(token,name) {
  return Cookies.set(name, token, {
    expires: inFifteenMinutes
  })
}
export function setUseId(id,name) {
  return Cookies.set(name+'userId', id)
}

export function removeToken(name) {
  return Cookies.remove(name)
}

export function removeUseId(name) {
  return Cookies.remove(name+'userId')
}

export function getUseName(name) {
  return Cookies.get(name+'name')
}

export function setUseName(name,value) {
  return Cookies.set(name+'name', value)
}

export function removeUseName(name) {
  return Cookies.remove(name+'name')
}