<template>
  <div class="container">
    <div class="grid-layout">
        <div box-width="180px" v-for="(resource, index) in resources" :key="index"> 
          <ResourceBox 
          @click="viewDetails(resource.resourceId, resource.resourceType)"
          :categoryColor="resource.color"
          :refName="resource.refName"
          :description="resource.description"
          :sessem="resource.sessem"
          :categoryName="resource.categoryName"
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
      async viewDetails(resourceId,resourceType){
        if(resourceType){
          this.$emit("viewDetails",resourceId,resourceType);
        }else{
          this.$emit("viewDetails",resourceId);
        }
      },
    }
  };
  </script>
  
<style scope>
:root{
  --box-width: 170px;
}
.container{
  display:flex;
  justify-content: center;
}

.grid-layout {
    display: grid;
    grid-template-columns: repeat(1, var(--box-width));
    grid-column-gap: 23px;
    grid-row-gap: 23px;
}

@media (min-width: 708px) {
    .grid-layout {
        grid-template-columns: repeat(2, var(--box-width));
    }
}

@media (min-width: 900px) {
    .grid-layout {
        grid-template-columns: repeat(3, var(--box-width));
    }
}

@media (min-width: 1095px) {
    .grid-layout {
        grid-template-columns: repeat(4, var(--box-width));
    }
}

@media (min-width: 1400px) {
    .grid-layout {
        grid-template-columns: repeat(6, var(--box-width));
    }
}
</style>
  