<template>
  <div id="app">
    <header>
      <h1 class="display-1">Parking Planner</h1>
    </header>

    <div class="md-layout md-alignment-center md-gutter">
      <div class="left-col md-layout-item md-medium-size-40 md-small-size-90 md-xsmall-size-95 md-gutter">
        <img
          id="car"
          src="../img/car_image.svg"
        />
        <h3 class="h2-responsive">
          Parking in London can be a pain. In 2018-2019 TFL issued
          <a href="https://www.londoncouncils.gov.uk/services/parking-services/parking-and-traffic/parking-information-professionals/information">3,804,343</a>
          Penalty Charge Notices (PCN) across London for parking violations
        </h3>

        <md-tabs>
          <md-tab
            id="tab-pages-1"
            md-label="What does this app do?"
          >While some apps find free parking spaces, not all can
            guarantee it'll be free when you arrive. Those that do may
            require a booking fee to be paid to secure the spot. This Parking
            Planner uses TFL data to plot the average number of
            free spaces at various car parks around London. Avoid
            fees by planning your journey accordingly to increase your chances
            of finding a spot where you
            need it.</md-tab>
          <md-tab
            id="tab-pages-2"
            md-label="How does it work?"
          >A script pulls data from the TFL API and writes to a MYSQL DB every
            15 minutes with the current number of free spaces. A node API sends
            requested data to this Vue frontend, which is then displayed using
            chart.js. Each service runs on its own AWS EC2 instance. The script
            that pulls data from the TFL API runs 24 hours a day so averages get
            more acurate over time.
          </md-tab>
        </md-tabs>
      </div>

      <div class="right-col md-gutter md-layout md-layout-item md-medium-size-60 md-small-size-90 md-xsmall-size-95 ">

        <div class="md-layout-item md-size-50 md-xsmall-size-100">
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
              >{{ val }}</md-option>
            </md-select>
          </md-field>
        </div>
        <div class="md-layout-item md-size-50 md-xsmall-size-100">
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
              >{{ key }}</md-option>
            </md-select>
          </md-field>
        </div>
        <div class="md-layout-item md-size-100 md-xsmall-size-100">
          <md-field>
            <label>Access Type</label>
            <md-select
              @md-selected="update()"
              v-model="currentAccess"
              name="access"
              id="access"
            >
              <md-option
                :key="index"
                v-for="(key, val, index) in accessTypes"
                :value="key"
              >{{ val }}</md-option>
            </md-select>
          </md-field>
        </div>
        <img
          id="spinner"
          v-if="!this.$store.getters.loaded"
          src="../img/spinner.gif"
        >
        <Line-Chart
          v-if="this.$store.getters.dailyChart"
          class="chart md-layout-item md-size-100"
          :chartdata="this.$store.getters.dailyChart.datasets[0].data"
          :max="this.$store.getters.dailyChart.max"
          :labels="this.$store.getters.dailyChart.labels"
          :chartTitle="
            `Occupied spaces at ${this.currentLabel} on ${
              days[this.currentDay]
            }`
          "
        ></Line-Chart>
      </div>
    </div>
    <footer>
      Built by Harry Difolco
      <a href="https://github.com/03difoha">
        <img
          class="icon"
          src="../img/github_icon.png"
        /></a><br />
      car illustration by
      <a href="https://www.freepik.com/free-photos-vectors/car">
        macrovector
      </a>
    </footer>
  </div>
</template>

<script>
import LineChart from "./LineChart";

export default {
  name: "app",
  components: {
    LineChart
  },
  data () {
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
      currentLabel: "",
      currentDay: 0,
      currentAccess: 'reg',
      accessTypes: { 'Non-disabled': 'reg', 'Disabled': 'dis' },
      loaded: false
    };
  },
  methods: {
    update () {
      this.$store.dispatch("loadDailyData", {
        station: this.currentCarPark,
        day: this.currentDay,
        access: this.currentAccess
      });

    }
  },
  async mounted () {
    this.$store.dispatch("loadCarParkNames");
    this.update();
    this.currentLabel = this.currentCarPark.slice(0, -4) + " Station"

  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap");

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  overflow-x: hidden;
}

@media (min-width: 959px) {
  .left-col {
    padding-left: 40px !important;
  }
  .right-col {
    padding-right: 40px !important;
  }

  .chart {
    margin-top: 3em;
    height: 100%;
  }
}

footer,
header {
  background-color: #3b494c;
  color: aliceblue;
  text-align: center;
  padding: 5px;
}

footer {
  margin-top: 2em;
}

.icon {
  height: 20px !important;
}

#car {
  padding-top: 2em;
  padding-bottom: 1em;
  width: 100%;
  max-width: 500px;
  margin: auto;
  display: block;
}

#spinner {
  height: 100px;
  width: 100px;
  position: fixed;
  left: 50%;
  margin-left: -50px;
  top: 50%;
  margin-top: -50px;
}
</style>
