<template>
  <section class="border mt-4 p-3 rounded shadow-sm">
    <div class="position-relative d-flex justify-content-center align-items-center" style="min-height: 50vh;">
        <canvas ref="resourcesChart"></canvas>
    </div>
</section>
</template>

<script>
import { Chart, DoughnutController, ArcElement, Tooltip, Legend, Title } from "chart.js";
Chart.register(DoughnutController, ArcElement, Tooltip, Legend, Title);

export default {
props: {
  resources: {
    type: Array,
    required: true,
  },
  chartTitle: {
    type: String,
    default: "Total My ShareLinks",
  },
},
data() {
  return {
    chart: null,
  };
},
computed: {
  chartData() {
    if(this.resources.length === 0){
      return {
        labels: ['No Resource'],
        counts: [1],
        colors: ['#000000'],
      };
    }
    return {
      labels: this.resources.map((resource) => resource.categoryName),
      counts: this.resources.map((resource) => resource.categoryCount),
      colors: this.resources.map((resource) => resource.categoryColor),
    };
  },
},
mounted() {
  if (this.resources.length) {
    this.createChart();
  }
},
watch: {
  resources: {
    deep: true,
    handler() {
      if (this.chart) {
        this.updateChart();
      } else {
        this.createChart();
      }
    },
  },
},
methods: {
  createChart() {
    const ctx = this.$refs.resourcesChart.getContext("2d");
    const resourcesLength = this.resources.length;
    this.chart = new Chart(ctx, {
      type: "doughnut", 
      data: {
        labels: this.chartData.labels,
        datasets: [
          {
            data: this.chartData.counts,
            backgroundColor: this.chartData.colors,
            hoverBackgroundColor: this.chartData.colors,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
            onClick: null
          },
          tooltip: {
            enabled: resourcesLength,
            callbacks: {
              label: (context) => `${context.label}: ${context.raw}`,
            },
          },
          title: {
              display: true, 
              text: this.chartTitle, // Title text
              position: 'top', // Title position: top, left, right, bottom
              font: {
                  size: 30,
              },
              color: "#000000" ,
              padding: {
              top: 10, // Padding from the top
              bottom: 10, // Padding from the bottom
              }
          },
        },      
      },
      plugins: [
        {
          id: "centerText",
          afterDraw(chart) {
            const ctx = chart.ctx;
            const x = chart.getDatasetMeta(0).data[0].x;
            const y = chart.getDatasetMeta(0).data[0].y;

            const total = resourcesLength === 0? 0 : chart.data.datasets[0].data.reduce(
                                                        (sum, value) => sum + value,
                                                        0
                                                      );

            ctx.font = "bold 20px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillStyle = "#000"; 

            ctx.fillText(total, x, y);
          },
        },
      ],
    });
  },
  updateChart() {
    this.chart.data.labels = this.chartData.labels;
    this.chart.data.datasets[0].data = this.chartData.counts;
    this.chart.data.datasets[0].backgroundColor = this.chartData.colors;
    this.chart.data.datasets[0].hoverBackgroundColor = this.chartData.colors;
    this.chart.update();
  },
},
};
</script>

<style scoped>
canvas {
  width: 300px;
  height: 300px;
}
</style>