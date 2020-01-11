import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    dailyChart: {},
    carParkNames: []
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
    },
    loadCarParkNames({ commit }) {
      axios
        .get("http://localhost:3000/carParkNames")
        .then(result => {
          commit("setCarparkNames", result.data);
        })
        .catch(error => {
          throw new Error(`API ${error}`);
        });
    }
  },
  mutations: {
    change(state, dailyChart) {
      state.dailyChart = dailyChart;
    },
    setCarparkNames(state, carParkNames) {
      state.carParkNames = carParkNames;
    }
  },
  getters: {
    dailyChart: state => state.dailyChart,
    carParkNames: state => state.carParkNames
  }
});
