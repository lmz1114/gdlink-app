<template>
  <div class="container">
    <div class="row grid-layout">
      <div class="col mb-20px" style="width: 180px;" v-for="(box, index) in boxes" :key="index"> 
        <ResourceBox
          :svgColor="box.color"
          :title="box.title"
          :description="box.description"
        />
      </div>
    </div>
  </div>
</template>
  
  <script>
  import ResourceBox from "../components/ResourceBox.vue";
  
  export default {
    components: {
      ResourceBox,
    },
    data() {
      return {
        boxes: [
          {
            color: "blue", // Blue
            title: 'SECJ2013-09',
            description: "Course files submission for DSA Course Section 09",
          },
          {
            color: "blue", // Blue
            title: 'SECR3104-03',
            description: "Course files submission for AD Course (R) Section 03",
          },
          {
            color: "blue", // Blue
            title: 'OOP-SPACE',
            description: "Course files submission for SECJ2154/SCSJ2154",
          },
        ],
      };
    },
  };
  </script>
  
<style scope>

.grid-layout {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); /* Fixed box width with auto-fit rows */
  gap: 20px; /* Space between items */
  padding: 0 20px; /* Padding ensures equal spacing at the start and end */
}

.mb-20px{
  margin-bottom: 20px;
}
</style>
  