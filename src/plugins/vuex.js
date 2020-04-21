import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentPage: 'START',
    locationFrom: '',
    locationTo: '',
    dateFrom: '',
    dateTo: '',
  },
  getters: {},
  mutations: {
    changePage: (state, payload) => {
      state.currentPage = payload.newPage;
    },
    saveUserInputs: (state, payload) => {
      state.locationFrom = payload.locationFrom;
      state.locationTo = payload.locationTo;
      state.dateFrom = payload.dateFrom;
      state.dateTo = payload.dateTo;
    }
  },
  actions: {}
});