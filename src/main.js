import Vue from "vue";
import App from "./App.vue";

import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";

Vue.use(VueMaterial);

import Vuex from "vuex";
import { store } from "./store";

Vue.use(Vuex);

Vue.config.productionTip = false;

new Vue({
  store,
  el: "#app",
  render: h => h(App)
});
