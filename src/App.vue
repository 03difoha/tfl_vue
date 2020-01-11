<template>
  <div id="app">
    <mdb-dropdown>
      <mdb-dropdown-toggle color="primary" slot="toggle"
        >Select Carpark</mdb-dropdown-toggle
      >
      <mdb-dropdown-menu>
        <mdb-dropdown-item
          :key="c.index"
          v-for="c in this.$store.getters.carParkNames"
          >{{ c.Tables_in_tfl }}</mdb-dropdown-item
        >
      </mdb-dropdown-menu>
    </mdb-dropdown>

    <mdb-dropdown>
      <mdb-dropdown-toggle color="primary" slot="toggle"
        >Select Day</mdb-dropdown-toggle
      >
      <mdb-dropdown-menu>
        <mdb-dropdown-item :key="d.index" v-for="d in this.days">{{
          d
        }}</mdb-dropdown-item>
      </mdb-dropdown-menu>
    </mdb-dropdown>

    <BarChartContainer></BarChartContainer>
  </div>
</template>

<script>
import BarChartContainer from "./components/BarChartContainer";
import {
  mdbDropdown,
  mdbDropdownItem,
  mdbDropdownMenu,
  mdbDropdownToggle
} from "mdbvue";

export default {
  name: "app",
  components: {
    BarChartContainer,
    mdbDropdown,
    mdbDropdownItem,
    mdbDropdownMenu,
    mdbDropdownToggle
  },
  data() {
    return {
      days: {
        Monday: 0,
        Tuesday: 1,
        Wednesday: 2,
        Thursday: 3,
        Friday: 4,
        Saturday: 5,
        Sunday: 6
      }
    };
  },
  methods: {},
  mounted() {
    this.$store.dispatch("loadCarParkNames");
    this.$store.dispatch("loadDailyData");
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
