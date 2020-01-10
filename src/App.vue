<template>
  <div id="app">
    <BarChart></BarChart>
    <label for="flavor">Favorite ice cream flavor?</label>
    <button @input="changed" name="flavor"></button>
  </div>
</template>

<script>
import BarChart from "./components/BarChart";

export default {
  name: "app",
  components: {
    BarChart
  },
  methods: {
    changed: function() {
      // this.$store.commit("change", event.target.value);
      this.$store.dispatch("loadDailyData");
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
