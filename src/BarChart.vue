<script>
import { Bar } from "vue-chartjs";

export default {
  extends: Bar,
  props: {
    chartdata: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      ctx: this.$refs.canvas,
      options: {
        type: Object,
        default: null
      },
      gradient: null
    };
  },
  mounted () {
    this.renderChart(this.chartdata, this.options);
    this.gradient = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)
    this.gradient.addColorStop(0, 'rgba(255, 0,0, 0.5)')
    this.gradient.addColorStop(0.5, 'rgba(255, 0, 0, 0.25)');
    this.gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');
    // this.chartdata.datasets[0].fillColour = gradient;
    console.log(this.chartdata.datasets[0])

  },
  watch: {
    chartdata: function () {
      this.renderChart(this.chartdata, this.options);
    }
  }
};

</script>
