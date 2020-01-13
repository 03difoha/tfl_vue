<template>
  <div class="container">
    <Bar-chart
      v-if="this.$store.getters.dailyChart"
      :chartdata="this.$store.getters.dailyChart"
      :options="options"
    />
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
    chartdata: false,
    options: {
      responsive: true
    }
  }),
  mounted() {}
};
</script>
