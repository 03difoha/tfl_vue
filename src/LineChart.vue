<script>
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: {
    labels: {
      type: Array,
      default: () => ['A', 'B', 'C']
    },
    datalabel: {
      type: String,
      default: 'Downloads per Week'
    },
    chartdata: {
      type: Array,
      default: () => [100, 40, 106]
    }
  },
  data () {
    return {
      gradient: null
    }
  },
  methods: {
    update () {
      this.renderChart({
        labels: this.labels,
        datasets: [
          {
            label: this.datalabel,
            pointBackgroundColor: ["#EDF72A", "#E2EC2E", "#D8E233", "#CED837", "#C4CD3C", "#B9C341", "#AFB945", "#A5AF4A", "#9BA44E", "#919A53", "#869058", "#7C865C", "#727B61", "#687165", "#5D676A", "#535D6F", "#495273", "#3F4878", "#353E7C", "#2A3481", "#202986", "#161F8A", "#0C158F", "#020B94"],
            borderWidth: 0,
            pointColor: ["green", "#E2EC2E", "#D8E233", "#CED837", "#C4CD3C", "#B9C341", "#AFB945", "#A5AF4A", "#9BA44E", "#919A53", "#869058", "#7C865C", "#727B61", "#687165", "#5D676A", "#535D6F", "#495273", "#3F4878", "#353E7C", "#2A3481", "#202986", "#161F8A", "#0C158F", "#020B94"],
            backgroundColor: this.gradient,
            data: this.chartdata
          }
        ]
      }, { responsive: true, maintainAspectRatio: false })
    }
  },





  mounted () {
    this.gradient = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 300)


    this.gradient.addColorStop(0, 'rgba(255, 0,0, 0.5)')
    this.gradient.addColorStop(0.5, 'rgba(255, 0, 0, 0.25)');
    this.gradient.addColorStop(1, 'rgba(0, 255, 128, 0.25)');

    this.update()



  },
  watch: {
    chartdata: function () {
      this.update()
    }
  }
}
</script>




