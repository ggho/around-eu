import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentPage: 'START'
  },
  getters: {},
  mutations: {
    changePage: (state, payload) => {
      state.currentPage = payload.newPage;
    },
  },
  actions: {}
});