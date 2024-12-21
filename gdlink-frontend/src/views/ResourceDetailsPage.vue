<template>
    <DefaultLayout>
        <template #default>
            <div class="border rounded shadow-sm bg-white vh-100 w-100 p-4">
                <div class="d-flex mb-4">
                    <svg class="me-3" width="2.5em" height="2.5em" viewBox="0 0 74 92" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M43.1667 24.4375V0H4.625C2.06198 0 0 1.92266 0 4.3125V87.6875C0 90.0773 2.06198 92 4.625 92H69.375C71.938 92 74 90.0773 74 87.6875V28.75H47.7917C45.2479 28.75 43.1667 26.8094 43.1667 24.4375ZM55.5 66.8438C55.5 68.0297 54.4594 69 53.1875 69H20.8125C19.5406 69 18.5 68.0297 18.5 66.8438V65.4062C18.5 64.2203 19.5406 63.25 20.8125 63.25H53.1875C54.4594 63.25 55.5 64.2203 55.5 65.4062V66.8438ZM55.5 55.3438C55.5 56.5297 54.4594 57.5 53.1875 57.5H20.8125C19.5406 57.5 18.5 56.5297 18.5 55.3438V53.9062C18.5 52.7203 19.5406 51.75 20.8125 51.75H53.1875C54.4594 51.75 55.5 52.7203 55.5 53.9062V55.3438ZM55.5 42.4062V43.8438C55.5 45.0297 54.4594 46 53.1875 46H20.8125C19.5406 46 18.5 45.0297 18.5 43.8438V42.4062C18.5 41.2203 19.5406 40.25 20.8125 40.25H53.1875C54.4594 40.25 55.5 41.2203 55.5 42.4062ZM74 21.9039V23H49.3333V0H50.5089C51.7422 0 52.9177 0.449219 53.7849 1.25781L72.651 18.8672C73.5182 19.6758 74 20.7719 74 21.9039Z" fill="#FB2F2F"/>
                    </svg>
                    <h2><strong>Resource Details</strong></h2>
                </div>
                <div v-if="resource" class="resource-container">
                    <div class="resource-box">
                        <ResourceBox 
                            :category="resource.category"
                            :ref_name="resource.ref_name"
                            :description=null
                        />
                    </div>
                    <div class="info-container">
                            <p>Description: </p>
                            <span>{{ resource.description }}</span>
                            <p>Category: </p>
                            <span>{{ resource.category }}</span>
                            <p>Session/Semester: </p>
                            <span>{{ resource.sessem }}</span>
                            <p>Uploaded by: </p>
                            <span>{{ resource.name }}</span>
                            <p>Upload Date: </p> 
                            <span>{{ resource.shared_at }}</span>
                            <p>Owner: </p> 
                            <span>{{ resource.owner }}</span>
                            <p>Link: </p> 
                            <span>{{ resource.link }}</span>
                    </div>
                </div>
              </div>
        </template>
    </DefaultLayout>
</template>

<script>
import ResourceBox from '../components/ResourceBox.vue';
import DefaultLayout from '../components/DefaultLayout.vue';
import ResourcesSharingService from '../service/ResourcesSharingService';


export default {
    data(){
        return{
            resource: null
        }
    },
    components: {
      DefaultLayout,
      ResourceBox
    },
    mounted(){
        this.displayResourceDetails();
    },
    methods:{
        async displayResourceDetails(){
            const id = this.$route.params.resource_id;
            console.log(id);
            const resource = await ResourcesSharingService.getResourceDetails(id);
            this.resource = resource[0];
            console.log(this.resource);
        }
    }
};

</script>

<style scoped>
  .bg-white{
    background-color: white;
  }

  .resource-container {
    display: grid;
    grid-template-columns: 1fr 2fr; 
    gap: 30px; 
    align-items: center; 
}

.resource-box{
    margin: 10px 20px;
    display: flex;
    justify-content: center;
}

.info-container{
    display: grid;
    margin: 10px 0 0 0;
    grid-template-columns: 150px auto; 
}

.info-container p,span {
    font-weight: bold;
}

</style>
