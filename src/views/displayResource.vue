<template>
    <div>
      <ResourceBox
        v-for="(box, index) in boxes"
        :key="index"
        :svgColor="box.color"
        :description="box.description"
      />
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
            color: 'red', // Red
            description: "Resource 1q22222222222222222222sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssshhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",
          },
          {
            color: "green", // Green
            description: "Resource 2",
          },
          {
            color: "blue", // Blue
            description: "Resource 3",
          },
        ],
      };
    },
  };
  </script>
  