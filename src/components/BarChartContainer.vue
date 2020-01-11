<template>
  <div class="container">
    <Bar-chart v-if="chartdata" :chartdata="chartdata" :options="options" />
    {{ this.$store.getters.dailyChart }}
  </div>
</template>

<script>
import BarChart from "../BarChart";

export default {
  name: "BarChartContainer",
  components: { BarChart },
  data: () => ({
    loaded: false,
    chartdata: false
  }),
  mounted() {
    this.loaded = false;
    try {
      this.chartdata = this.$store.getters.dailyChart;
      // this.chartdata = userlist;
      this.loaded = true;
      // console.log(userlist);
    } catch (e) {
      console.error(e);
    }
  }
};
</script>
