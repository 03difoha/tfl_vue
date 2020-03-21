import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const API_ADDRESS = "ec2-3-81-61-32.compute-1.amazonaws.com";

export const store = new Vuex.Store({
  state: {
    dailyChart: false,
    carParkNames: [],
    loaded: false
  },
  actions: {
    async loadDailyData({ commit }, req) {
      commit("changeLoaded", false);
      await axios
        .get(
          `http://${API_ADDRESS}/dailyChart/${req.station}/${req.day}/${req.access}`
        )
        .then(result => {
          commit("updateChart", result.data);
          commit("changeLoaded", true);
        })
        .catch(error => {
          throw new Error(`API ${error}`);
        });
    },
    loadCarParkNames({ commit }) {
      axios
        .get(`http://${API_ADDRESS}/carParkNames`)
        .then(result => {
          commit("setCarparkNames", result.data);
        })
        .catch(error => {
          throw new Error(`API ${error}`);
        });
    }
  },
  mutations: {
    updateChart(state, dailyChart) {
      state.dailyChart = dailyChart;
    },
    setCarparkNames(state, carParkNames) {
      let namesFormatted = {};
      for (let i of carParkNames) {
        var current = i.Tables_in_TFL.replace(/_/gi, " ");
        namesFormatted[current.replace("Stn", "Station")] = i.Tables_in_TFL;
      }
      state.carParkNames = namesFormatted;
    },
    changeLoaded(state, loaded) {
      state.loaded = loaded;
    }
  },
  getters: {
    dailyChart: state => state.dailyChart,
    carParkNames: state => state.carParkNames,
    loaded: state => state.loaded
  }
});
