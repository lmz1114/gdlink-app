<template>
  <DefaultLayout>
    <template #default>
      <h2 class="ms-2 mb-4">Session {{ currentSession }} Semester {{ currentSemester }}</h2>
      <div class="border rounded shadow-sm bg-white p-3">
        <h4 class="align-middle">Welcome to UTM Resource Center, 
          <strong v-if="userSession">{{ userSession.name }}</strong>
        !!!</h4>
      </div>
      <div class="d-flex justify-content-center">
        <ResourcesChart :resources="myShareLinksResources" :chartTitle="'Total My ShareLinks'" class="bg-white w-50 me-2"/>
        <ResourcesChart :resources="sharedWithMeResources" :chartTitle="'Total Shared With You'" class="bg-white w-50 ms-2"/>
      </div>
      <div class="recent border rounded mt-4 shadow-sm bg-white p-4">
        <h2 class="mb-4">Recent Access</h2>
        <RecentAccessResources 
          @viewDetails = "viewDetails"
          :resources="recentAccessResources"
        />
      </div>
    </template>
  </DefaultLayout>
</template>
  
  <script>
  import HomeService from '../service/HomeService';
  import DefaultLayout from '../components/DefaultLayout.vue'; 
  import ResourcesChart from '../components/ResourcesChart.vue';
  import RecentAccessResources from '../components/ResourceList.vue'
  
  export default {
    data(){
      return {
        userId: null,
        userSession: null,
        recentAccessResources: [],
        myShareLinksResources: [],
        sharedWithMeResources: [],
        currentSession: '2024/2025',
        currentSemester: '1'
      }
    },
    components: {
      DefaultLayout,
      ResourcesChart,
      RecentAccessResources
    },
    created() {
      const sessionData = sessionStorage.getItem('utmwebfc_session');
        if (sessionData) {
            this.userSession = JSON.parse(sessionData);
            this.userId = this.userSession.user_id;
        }
        this.displayChartData();
        this.displayRecentAccess();
    },
    methods: {
      async displayChartData(){
        const data = await HomeService.getChartData(this.userId);
        this.myShareLinksResources = data.myShareLinks;
        this.sharedWithMeResources = data.sharedWithMe;
      },
      async displayRecentAccess(){
        this.recentAccessResources = await HomeService.getRecentAccessResource(this.userId);
      },
      async viewDetails(resourceId,resourceType){
        if(resourceType === "share"){
          this.$router.push({ name: 'My ShareLinks Resource Details', params: { resourceId: resourceId } });
        }else{
          this.$router.push({ name: 'Shared With Me Resource Details', params: { resourceId: resourceId } });
        }
      }
    }
  };
  </script>
  
  <style scoped>

  .recent{
    min-height: 500px;
  }
  </style>
  