<template>
  <div id="app">
    <div class="md-layout md-gutter md-alignment-center">

      <div class="md-layout-item md-medium-size-50 md-small-size-50 md-xsmall-size-100">

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
              :value="c.Tables_in_tfl"
            >{{ c.Tables_in_tfl }}</md-option>
          </md-select>
        </md-field>

        <md-field>
          <label>Choose a day</label>
          <md-select
            @md-selected="update()"
            v-model="currentday"
            name="days"
            id="days"
          >
            <md-option
              :key="index"
              v-for="(val, day, index) in days"
              :value="val"
            >{{ day }}</md-option>
          </md-select>
        </md-field>

        <!-- <BarChartContainer></BarChartContainer> -->
        <Line-Chart
          v-if="this.$store.getters.dailyChart"
          :chartdata="this.$store.getters.dailyChart.datasets[0].data"
          :labels="this.$store.getters.dailyChart.labels"
        ></Line-Chart>
      </div>

    </div>
  </div>
</template>

<script>
// import BarChartContainer from "./components/BarChartContainer";
import LineChart from './LineChart'

export default {
  name: "app",
  components: {
    // BarChartContainer,
    LineChart
  },
  data () {
    return {
      days: {
        Monday: 0,
        Tuesday: 1,
        Wednesday: 2,
        Thursday: 3,
        Friday: 4,
        Saturday: 5,
        Sunday: 6
      },
      currentCarPark: "Barkingside_Stn",
      currentday: "0",
    };
  },
  methods: {
    update () {
      this.$store.dispatch("loadDailyData", { station: this.currentCarPark, day: this.currentday });
      console.log(this.$store.getters.dailyChart)
    }
  },
  async mounted () {
    this.$store.dispatch("loadCarParkNames");
    this.update()
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
