import request from '@/utils/request'
import Qs from 'qs'
import Cookies from 'js-cookie'

export function login(data) {
  return request({
    url: '/login',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    transformRequest: [res => {
      res = Qs.stringify(res);
      return res;
    }],
    method: 'post',
    data
  })
}

export function getInfo(token) {
   const id = Cookies(window.localStorage.getItem("userName")+"userId")
  return request({
    url: '/sys/user',
    method: 'get',
    params: {
      id: id
    }
  })
}

export function logout(token) {
  return request({
    url: 'logout',
    method: 'post',
    headers: {
      'Authorization': token
    }
  })
}

export function menuList(id) {
  return request({
    url: '/sys/menu/list/tree',
    method: 'get',
    params: {
      userId: id
    }
  })
}
