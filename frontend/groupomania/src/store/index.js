import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: ''
  },
  mutations: {
    ADD_USERNAME(state, data) {
      state.username = data.user
    }
  },
  actions: {
    
  },
  modules: {
  }
})
