import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    username: "",
    token: "",
    isAdmin: false,
    messages: [],
  },
  mutations: {
    ADD_PROFILE(state, data) { // renommer
      state.username = data.user;
      state.token = data.token;
      state.isAdmin = data.isAdmin;
      state.email = data.email;
    },
    ADD_MESSAGES(state, data) {
      state.messages = data;
    },
    DISCONNECT(state) {
      state.token = "";
      state.username = "";
      state.isAdmin = "";
    },
  },
  getters: {
    getToken: (state) => state.token,
    getMessages: (state) => state.messages,
    getAdmin: (state) => state.isAdmin,
    getProfile: (state) => state.username,
  },
  actions: {},
  modules: {},
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
    }),
  ],
});
