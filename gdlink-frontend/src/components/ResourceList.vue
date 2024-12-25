<template>
  <div class="container">
    <div class="grid-layout">
        <div style="width: 180px;" v-for="(resource, index) in resources" :key="index"> 
          <ResourceBox 
          @click="viewDetails(resource.resource_id, resource.resource_type)"
          :category_color="resource.color"
          :ref_name="resource.ref_name"
          :description="resource.description"
          :resource_type="resource.resource_type" 
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
    props: {
      resources: {
        type: Array,
        required: true,
      },
    },
    methods:{
      async viewDetails(id,type){
        if(type){
          this.$emit("viewDetails",id,type);
        }else{
          this.$emit("viewDetails", id);
        }
      },
    }
  };
  </script>
  
<style scope>

.grid-layout {
    display: grid;
    grid-column-gap: 20px;
    grid-row-gap: 20px;
    margin: 0 0 20px 0;
    padding: 0 1px;
}

@media (min-width: 576px) {
    .grid-layout {
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    }
}

@media (min-width: 980px) {
    .grid-layout {
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    }
}

@media (min-width: 1047px) {
    .grid-layout {
        grid-template-columns: repeat(auto-fit, minmax(180px, 180px));
    }
}
</style>
  