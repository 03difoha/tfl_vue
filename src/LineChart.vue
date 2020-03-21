<script>
import { Line } from "vue-chartjs";

export default {
  extends: Line,
  props: {
    labels: {
      type: Array
    },
    chartTitle: {
      type: String,
      default: "Occupied parking spaces"
    },
    chartdata: {
      type: Array,
      default: () => [100, 40, 106]
    },
    max: {
      type: Number
    }
  },
  data () {
    return {
      gradient: null
    };
  },
  methods: {
    update () {
      this.renderChart(
        {
          labels: this.labels,
          datasets: [
            {
              label: this.chartTitle,
              pointBackgroundColor: [
                "#020211",
                "#1e172a",
                "#3c2441",
                "#602e52",
                "#88395d",
                "#af4560",
                "#d2575c",
                "#ef6f52",
                "#ff8e43",
                "#ffb131",
                "#ffd71e",
                "#fefe23",
                "#fefe23",
                "#ffd71e",
                "#ffb131",
                "#ff8e43",
                "#ef6f52",
                "#d2575c",
                "#af4560",
                "#88395d",
                "#602e52",
                "#3c2441",
                "#1e172a",
                "#020211"
              ],
              borderWidth: 0,
              backgroundColor: this.gradient,
              data: this.chartdata
            }
          ]
        },
        {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  max: this.max,
                  callback: function (value) { if (value % 1 === 0) { return value; } }

                }
              }
            ]
          },
          legend: {
            labels: {
              boxWidth: 0,
            }
          }
        }
      );
    }
  },

  mounted () {
    this.gradient = this.$refs.canvas
      .getContext("2d")
      .createLinearGradient(0, 0, 0, 300);

    this.gradient.addColorStop(0, "rgba(255, 0,0, 0.5)");
    this.gradient.addColorStop(0.5, "rgba(255, 0, 0, 0.25)");
    this.gradient.addColorStop(1, "rgba(0, 255, 128, 0.25)");


    this.update();
  },
  watch: {
    chartdata: function () {
      this.update();
    }
  }
};
</script>
