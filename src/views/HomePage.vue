<template>
  <DefaultLayout>
    <template #default>
      <h2 class="ms-2 mb-4">Session {{ currentSession }} Semester {{ currentSemester }}</h2>
      <div class="border rounded shadow-sm bg-white p-3">
        <h4 class="align-middle">Welcome to UTM Resource Center, 
          <strong v-if="userSession">{{ userSession.full_name }}</strong>
        !!!</h4>
      </div>
      <Statistics class="bg-white"/>
      <div class="border rounded mt-4 shadow-sm bg-white p-4">
        <h2 class="mb-2">Recent Access</h2>
        <displayResource class="flex-box"/>
      </div>
    </template>
  </DefaultLayout>
</template>
  
  <script>
  import DefaultLayout from '../components/DefaultLayout.vue'; 
  import Statistics from '../components/Statistics.vue';
  import displayResource from './displayResource.vue';
  
  export default {
    data(){
      return {
        userSession: null,
        role: 'academicoffice',
        currentSession: '2024/2025',
        currentSemester: '1'
      }
    },
    components: {
      DefaultLayout,
      Statistics,
      displayResource
    },
    mounted() {
      // Load session data when the component is mounted
      const sessionData = sessionStorage.getItem('utmwebfc_session');
      if (sessionData) {
        this.userSession = JSON.parse(sessionData);
        console.log(this.userSession);
      }
    }
  };
  </script>
  
  <style scoped>
  .flex-box{
    display: flex;
    align-items:center;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .bg-white{
    background-color: white;
  }
  </style>
  