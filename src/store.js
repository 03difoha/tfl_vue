import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const API_ADDRESS = "localhost:3000";

export const store = new Vuex.Store({
  state: {
    dailyChart: false,
    carParkNames: []
  },
  actions: {
    async loadDailyData({ commit }, req) {
      console.log(req);
      await axios
        .get(
          `http://${API_ADDRESS}/dailyChart/${req.station}/${req.day}/${req.access}`
        )
        .then(result => {
          console.log(result.data);
          commit("change", result.data);
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
    change(state, dailyChart) {
      state.dailyChart = dailyChart;
    },
    setCarparkNames(state, carParkNames) {
      let namesFormatted = {};
      for (let i of carParkNames) {
        var current = i.Tables_in_TFL.replace(/_/gi, " ");
        namesFormatted[current.replace("Stn", "Station")] = i.Tables_in_TFL;
      }
      state.carParkNames = namesFormatted;
    }
  },
  getters: {
    dailyChart: state => state.dailyChart,
    carParkNames: state => state.carParkNames
  }
});
