import {
  login,
  logout,
  getInfo
} from '@/api/user'
import {
  getToken,
  setToken,
  removeToken,
  setUseId,
  getUseId,
  removeUseId,
  setUseName,
  getUseName,
  removeUseName
} from '@/utils/auth'
import {
  Message
} from 'element-ui'
import {
  resetRouter
} from '@/router'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  roles: '',
  roleId: getUseId(),
  myname: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLEID: (state, roleId) => {
    state.roleId = roleId
  },
  SET_USERNAME: (state, username) => {
    state.myname = username
  }
}

const actions = {
  // user login
  login({
    commit
  }, userInfo) {
    const {
      username,
      password
    } = userInfo
    return new Promise((resolve, reject) => {
      
      login({
        username: username.trim(),
        password: password
      }).then(response => {
        // console.log(response)
        const {
          data
        } = response
        console.log(username,1111)
        commit('SET_USERNAME', username);
        commit('SET_TOKEN', data.token)
        commit('SET_ROLEID', data.id)
        setToken(data.token,username)
        setUseId(data.id,username)
        setUseName(username,username)
        console.log("localStorage")
        window.localStorage.setItem("userName",username)
        // console.log(window.localStorage.getItem("userName"))
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      getInfo(state.roleId).then(response => {
        const {
          data
        } = response
        console.log(data)
        if (!data) {
          reject('Verification failed, please Login again.')
        }
        const {
          name,
          avatar
        } = data
        commit('SET_NAME', 111)
        commit('SET_AVATAR', 2222)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLEID', '')
        commit('SET_NAME', '')
        removeToken(window.localStorage.getItem("userName"))
        removeUseName(window.localStorage.getItem("userName"))
        removeUseId(window.localStorage.getItem("userName")+"userId")
        console.log("")
        // resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({
    commit
  }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken(state.myname)
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
