<template>
  <div id="app">
    <div class="md-layout md-gutter md-alignment-center">
      <div
        class="md-layout-item md-medium-size-60 md-small-size-70 md-xsmall-size-90"
      >
        <md-field>
          <label for="currentCarPark">Choose a Carpark</label>
          <md-select
            @md-selected="update()"
            v-model="currentCarPark"
            name="currentCarPark"
            id="currentCarPark"
          >
            <md-option
              :key="c.index"
              v-for="c in this.$store.getters.carParkNames"
              :value="c.Tables_in_TFL"
              >{{ c.Tables_in_TFL }}</md-option
            >
          </md-select>
        </md-field>

        <md-field>
          <label>Choose a day</label>
          <md-select
            @md-selected="update()"
            v-model="currentDay"
            name="days"
            id="days"
          >
            <md-option
              :key="index"
              v-for="(key, val, index) in days"
              :value="val"
              >{{ key }}</md-option
            >
          </md-select>
        </md-field>

        <Line-Chart
          v-if="this.$store.getters.dailyChart"
          :chartdata="this.$store.getters.dailyChart.datasets[0].data"
          :labels="this.$store.getters.dailyChart.labels"
          :chartTitle="
            `Occupied parking spaces at ${this.currentCarPark} on ${
              days[this.currentDay]
            }`
          "
        ></Line-Chart>
      </div>
    </div>
  </div>
</template>

<script>
import LineChart from "./LineChart";

export default {
  name: "app",
  components: {
    LineChart
  },
  data() {
    return {
      days: {
        0: "Monday",
        1: "Tuesday",
        2: "Wednesday",
        3: "Thursday",
        4: "Friday",
        5: "Saturday",
        6: "Sunday"
      },
      currentCarPark: "Barkingside_Stn",
      currentDay: 0
    };
  },
  methods: {
    update() {
      this.$store.dispatch("loadDailyData", {
        station: this.currentCarPark,
        day: this.currentDay
      });
    }
  },
  async mounted() {
    this.$store.dispatch("loadCarParkNames");
    this.update();
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap");

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
