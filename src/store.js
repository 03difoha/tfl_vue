import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

// import db from "./db";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    dailyChart: ""
  },
  actions: {
    loadDailyData({ commit }) {
      axios
        .get("http://localhost:3000/dailyChart/Barkingside_Stn/3")
        .then(result => {
          commit("change", result.data);
        })
        .catch(error => {
          throw new Error(`API ${error}`);
        });
    }
  },
  mutations: {
    change(state, dailyChart) {
      state.dailyChart = dailyChart;
    }
  },
  getters: {
    dailyChart: state => state.dailyChart
  }
});
