import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    username: "",
    token: "",
    isAdmin: false,
    messages: []
  },
  mutations: {
    ADD_USERNAME(state, data) {
      state.username = data.user;
      state.token = data.token;
    },
    ADD_MESSAGES(state, data) {
      state.messages = data
      // state.messages.title = data.title;
      // state.messages.username = data.user
    }
  },
  getters: {
    getToken: (state) => state.token,
    getMessages: (state) => state.messages
  },
  actions: {},
  modules: {},
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
    }),
  ],
});
