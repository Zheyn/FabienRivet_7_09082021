import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: '',
    token: ''
  },
  mutations: {
    ADD_USERNAME(state, data) {
      state.username = data.user
      state.token = data.token
    }
  },
  getters: {
    getToken: (state) => state.token
  },
  actions: {
    
  },
  modules: {
  }
})
