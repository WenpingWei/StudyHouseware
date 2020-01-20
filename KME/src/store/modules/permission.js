import {
  asyncRouterMap,
  constantRouterMap,
  permissionRouterMap
} from '@/router'
import {
  menuList
} from '@/api/user'
import {
  getUseId
} from '@/utils/auth'
import axios from 'axios'
import Cookies from 'js-cookie'
import store from '@/store'

function hasPermission(roles, route) {
  if (route.meta && route.meta.role) {
    return roles.some(role => route.meta.role.indexOf(role) >= 0)
  } else {
    return true
  }
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: [],
    btnPermission: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    },
    SET_BtnPermission: (state, per) => {
      state.btnPermission = per
    }
  },
  actions: {
    GenerateRoutes({
      commit
    }, data) {
      return new Promise(resolve => {
        const menus = []
        menuList(getUseId()).then(res => {
          const {
            data
          } = res
          const arrMenu = []
          // console.log(arrMenu)
          permissionRouterMap.filter(v => {
            data.filter(s => {
              // const getMenu = () {}
              if (s.sons) {
                s.sons.map(child => {
                  if (child.sons) {
                    s.sons.push(...child.sons)
                    s.sons = Array.from(new Set(s.sons))
                  }
                })
              }
              // console.log(s.sons);
              // const result = arr2.filter(item => !arr1Ids.includes(item.id));
              if (v.meta.title === s.name) {
                menus.push(v)
                const sonsName = s.sons.map(f => {
                  return f.name
                })
                if (sonsName.includes('告警记录')) {
                  sonsName.push('告警详情')
                }
                v.children = v.children.filter(item => {
                  return sonsName.includes(item.meta.title)
                })
              }
            })
          })
          if (Cookies(window.localStorage.getItem("userName"))) {
            axios.defaults.headers.common['Authorization'] = 'VSZ ' + Cookies(window.localStorage.getItem("userName"))
          }
          commit('SET_BtnPermission', menus)
          commit('SET_ROUTERS', menus.concat(asyncRouterMap))
          resolve()
        })
      })
    }
  }
}

export default permission
