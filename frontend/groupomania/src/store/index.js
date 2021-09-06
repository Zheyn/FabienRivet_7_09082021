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

    fetchListMessages(context, { endpoint }) {
      return fetch(this.state.fetchUrl + endpoint, {
        method: "GET",
      });
    },

    fetchRegister(context, { endpoint, valueForm }) {
      return fetch(this.state.fetchUrl + endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(valueForm),
      });
    },

    fetchCreateMessages(context, { endpoint, formData }) {
      return fetch(this.state.fetchUrl + endpoint, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + this.state.token,
        },

        body: formData,
      });
    },

    fetchModifyMessages(context, { endpoint, message }) {
      return fetch(this.state.fetchUrl + endpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.state.token,
        },

        body: JSON.stringify(message),
      });
    },

    fetchDeleteMessages(context, { endpoint, idMessage }) {
      return fetch(this.state.fetchUrl + endpoint, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.state.token,
        },

        body: JSON.stringify(idMessage),
      });
    },

    fetchModifyUsers(context, { endpoint, valueForm }) {
      return fetch(this.state.fetchUrl + endpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.state.token,
        },

        body: JSON.stringify(valueForm),
      });
    },

    fetchDeleteUsers(context, { endpoint, idUser }) {
      return fetch(this.state.fetchUrl + endpoint, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.state.token,
        },
        body: JSON.stringify(idUser),
      });
    },

    fetchGetUsers(context, { endpoint }) {
      return fetch(this.state.fetchUrl + endpoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.state.token,
        },
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
