import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    dailyChart: false,
    carParkNames: []
  },
  actions: {
    async loadDailyData({ commit }, req) {
      await axios
        .get(`http://localhost:3000/dailyChart/${req.station}/${req.day}`)
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
