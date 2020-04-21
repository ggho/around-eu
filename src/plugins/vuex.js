import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pageHistory: [{
      page: 'START'
    }],
    locationFrom: '',
    locationTo: '',
    dateFrom: '',
    dateTo: '',
  },
  getters: {},
  mutations: {
    changePage: (state, payload) => {
      state.pageHistory.push(payload);
    },
    saveUserInputs: (state, payload) => {
      state.locationFrom = payload.locationFrom;
      state.locationTo = payload.locationTo;
      state.dateFrom = payload.dateFrom;
      state.dateTo = payload.dateTo;
    },
    popPage: (state) => {
      state.pageHistory.pop();
    }
  },
  actions: {
    previousPage: (context) => {
      const state = context.state;
      const lastPage = state.pageHistory[state.pageHistory.length - 2];
      context.commit('popPage');
      context.commit('popPage');

      context.commit('changePage', lastPage);

    },
  }
});