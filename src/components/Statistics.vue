<template>
    <section class="border mt-4 p-3 rounded shadow-sm">
        <div class="position-relative d-flex justify-content-center align-items-center" style="min-height: 30vh;">
            <canvas id="uploadChart"></canvas>
        </div>
    </section>
</template>

<script>
import { Chart, DoughnutController, ArcElement, Tooltip, Legend, Title } from "chart.js";
// Register necessary components
Chart.register(DoughnutController, ArcElement, Tooltip, Legend, Title);

export default {
  name: "UploadChart",
  data() {
    return {
      uploads: {
        Timetable: 3,
        Research: 5,
        CourseFiles: 4,
        Others: 6
      },
      totalUploads: 0,
      chart: null,
    };
  },
  mounted() {
    this.totalUploads = Object.values(this.uploads).reduce((a, b) => a + b, 0);

    this.createChart();
  },
  methods: {
    createChart() {
      const ctx = document.getElementById("uploadChart").getContext("2d");
 
      this.chart = new Chart(ctx, {
        type: "doughnut", // Set the type of chart
        data: {
          labels: Object.keys(this.uploads),
          datasets: [
            {
              data: Object.values(this.uploads),
              backgroundColor: ["#4A18FF", "#67E613", "#FAB74C","#585656"],
              hoverBackgroundColor: ["#4A18FF", "#67E613", "#FAB74C","#585656"],
            },
          ],
          totalUploads: this.totalUploads
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
                text: 'Total Uploads', // Title text
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
          const totalUploads = chart.config.data.totalUploads;
          ctx.fillText(totalUploads, x, y);
        }
      };

      // Register the plugin globally
      Chart.register(plugin);
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
