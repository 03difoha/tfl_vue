<template>
  <div id="app">
    <div class="md-layout md-gutter md-alignment-center">
      <div
        class="md-layout-item md-medium-size-60 md-small-size-70 md-xsmall-size-90"
      >
        <h1 class="display-1">Parking Planner</h1>
        <div class="md-alignment-right">
          <h3 class="h2-responsive">
            Parking in London can be a pain. In 2018-2019 alone TFL issued
            <a
              href="https://www.londoncouncils.gov.uk/services/parking-services/parking-and-traffic/parking-information-professionals/information"
              >3,804,343</a
            >
            Penalty Charge Notices (PCN) across London for parking violations
          </h3>
        </div>

        <md-tabs>
          <md-tab id="tab-pages-1" md-label="What does this app do?"
            >While some apps can find you a free parking space, not all can
            guarantee it won't be taken when you arrive. Those that do may
            require a booking fee to be paid to secure the spot. This Parking
            Planner uses historic data from TFL to plot the average number of
            free spaces at any time at a number of car parks around London, so
            if you can't afford to pay up front fees to book spaces or pay
            subcription fees to parking apps, you can plan your journey
            accordingly to increase your chances of finding a spot where you
            need it.</md-tab
          >
          <md-tab id="tab-pages-2" md-label="How does it work?"
            >A script pulls TFL data and writes to a MYSQL DB every 15 minutes
            with the current numer of free spaces. This Vue application speaks
            to a Node API which grabs the relevant data does some simple maths
            to create hourly averages and outputs in a format friendly to
            chart.js. All services are running on AWS EC2 instances. The script
            that pulls data from the TFL API runs 24 hours a day so the average
            with get more acurate over time.
          </md-tab>
        </md-tabs>

        <md-field>
          <label for="currentCarPark">Choose a Carpark</label>
          <md-select
            @md-selected="update()"
            v-model="currentCarPark"
            name="currentCarPark"
            id="currentCarPark"
          >
            <md-option
              :key="index"
              v-for="(key, val, index) in this.$store.getters.carParkNames"
              :value="key"
              >{{ val }}</md-option
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
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
}
</style>
