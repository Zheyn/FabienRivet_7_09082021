import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    username: "",
    email: "",
    token: "",
    isAdmin: false,
    messages: [],
    fetchUrl: "http://localhost:3000/api/",
  },
  mutations: {
    ADD_PROFILE(state, data) {
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
    getEmail: (state) => state.email,
  },
  actions: {
    fetchLogin(context, { endpoint, valueForm }) {
      return fetch(this.state.fetchUrl + endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(valueForm),
      });
    },
  },
  modules: {},
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
    }),
  ],
});
