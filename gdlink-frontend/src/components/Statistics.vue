<template>
    <section class="border mt-4 p-3 rounded shadow-sm">
        <div class="position-relative d-flex justify-content-center align-items-center" style="min-height: 30vh;">
            <canvas id="sharedWithMeChart"></canvas>
        </div>
    </section>
</template>

<script>
import { Chart, DoughnutController, ArcElement, Tooltip, Legend, Title } from "chart.js";
Chart.register(DoughnutController, ArcElement, Tooltip, Legend, Title);

export default {
  name: "SharedWithMeChart",
  props: {
    resources: {
      type: Array,
      required: true,
    },
    chartTitle: {
      type: String,
      default: "Total Shared With You",
    },
  },
  data() {
    return {
      chart: null,
    };
  },
  computed: {
    totalUploads() {
      return this.resources.reduce((sum, resource) => sum + resource.count, 0);
    },
    chartData() {
      return {
        labels: this.resources.map((resource) => resource.category_name),
        counts: this.resources.map((resource) => resource.count),
        colors: this.resources.map((resource) => resource.category_color),
      };
    },
  },
  mounted() {
    this.createChart();
  },
  watch: {
    resources: {
      deep: true,
      handler() {
        if (this.chart) {
          this.updateChart();
        }
      },
    },
  },
  methods: {
    createChart() {
      const ctx = document.getElementById("sharedWithMeChart").getContext("2d");
 
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
              callbacks: {
                label: (context) => `${context.label}: ${context.raw}`,
              },
            },
            title: {
                display: true, // Show the title
                text: 'Total Shared With You', // Title text
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
      });
      // Register the custom plugin here, not inside the chart options
      const plugin = {
        id: 'centerText',
        afterDraw(chart) {
          const ctx = chart.ctx;
          const x = chart.getDatasetMeta(0).data[0].x;
          const y = chart.getDatasetMeta(0).data[0].y;

          // Set the style for the text
          ctx.font = "bold 20px Arial";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillStyle = "#000";  // Set the text color

          // Add the totalUploads value in the center of the chart
          ctx.fillText(this.totalUploads, x, y);
        }
      };

      Chart.register(plugin);
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
/* Optional styling for better responsiveness */
canvas {
  max-width: 100%;
  max-height: 100%;
}

</style>
