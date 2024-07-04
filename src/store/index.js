// store/index.js
import { createStore } from "vuex";
import axios from "axios";

const store = createStore({
  state: {
    isAuthenticated: false,
    token: null,
  },
  getters: {
    isAuthenticated: (state) => state.isAuthenticated,
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      state.isAuthenticated = !!token;
    },
    clearToken(state) {
      state.token = null;
      state.isAuthenticated = false;
    },
  },
  actions: {
    async login({ commit }, credentials) {
      const response = await axios.post(
        "http://localhost:3000/auth/login",
        credentials
      );
      const token = response.data.access_token;
      localStorage.setItem("token", token);
      commit("setToken", token);
    },
    logout({ commit }) {
      localStorage.removeItem("token");
      commit("clearToken");
    },
  },
});

export default store;
