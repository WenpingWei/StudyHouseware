import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import permission from './modules/permission'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
      state: {
        isCollapse: false,
        time:true,
        table:true,
        animation:true,
        listTab:true,
        roleId:"",
    },
    mutations: {
        commitCollapse(state, bool) {
            state.isCollapse = bool;
        }
    },
  modules: {
    app,
    settings,
    user,
    permission
  },
  getters
})

export default store
