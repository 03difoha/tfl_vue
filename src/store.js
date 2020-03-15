import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const API_ADDRESS = "ec2-3-81-61-32.compute-1.amazonaws.com";
// const PORT = 3000;

export const store = new Vuex.Store({
  state: {
    dailyChart: false,
    carParkNames: []
  },
  actions: {
    async loadDailyData({ commit }, req) {
      console.log(req);
      await axios
        .get(`http://${API_ADDRESS}/dailyChart/${req.station}/${req.day}`)
        .then(result => {
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
          console.log(result);
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
