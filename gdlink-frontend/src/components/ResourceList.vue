<template>
  <div class="container" v-if="displayType === 'card'">
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
  <div v-else>
      <table class="table table-striped table-bordered smaller-font">
        <thead class="text-center align-middle">
          <tr>
              <th scope="col">Resource No.</th>
              <th scope="col">Category</th>
              <th scope="col">Ref.Name</th>
              <th scope="col">Session-Semester</th>
              <th scope="col">Description</th>
              <th scope="col">Owner</th>
              <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(resource, index) in resources" :key="resource.resourceId" style="height: 50px;">
            <td class="align-middle">{{ index + 1 }}</td>
            <td class="align-middle">{{ resource.categoryName }}</td>
            <td class="align-middle">{{ resource.refName }}</td>
            <td class="align-middle">{{ resource.sessem }}</td>
            <td class="align-middle">{{ resource.description }}</td>
            <td class="align-middle">{{ resource.owner }}</td>
            <td class="align-middle text-center">
            <div class="d-flex justify-content-center align-items-center">
              <button @click="viewDetails(resource.resourceId, resource.resourceType)"
                        class="btn btn-info">View</button>
            </div>
          </td>
        </tr>  
      </tbody>
    </table>
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
      displayType: {
        type: String,
        required: true
      }
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

table.smaller-font {
  font-size: 0.8rem; /* Adjust the font size */
}

table.smaller-font th,
table.smaller-font td {
  padding: 0.5rem; /* Reduce padding to make rows more compact */
}

table.smaller-font tbody tr {
  height: 50px; /* Reduce row height */
}

</style>
  