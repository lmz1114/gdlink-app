<template>
  <DefaultLayout>
    <template #default>
      <SearchBar class="bg-white"/>
      <section class="border rounded mt-0 shadow-sm bg-white" style="padding: 0.7em">
        <h4 style="vertical-align: middle;">Welcome to the UTM Resource Center, 
          <strong v-if="userSession">{{ userSession.full_name }}</strong>
        !!!</h4>
      </section>
      <Statistics class="bg-white"/>
      <div style="padding-bottom: 1em;">
        <section  class="border rounded mt-4 shadow-sm bg-white"  style="padding: 1.5em;">
        <h2 style="margin-bottom: 1em;">Recent Access</h2>
        <displayResource class="flex-box" style="margin-top: 1em;" />
      </section>
      </div>
    </template>
  </DefaultLayout>
</template>
  
  <script>
  import DefaultLayout from '../components/DefaultLayout.vue'; 
  import SearchBar from '../components/SearchBar.vue';
  import Statistics from '../components/Statistics.vue';
  import displayResource from './displayResource.vue';
  
  export default {
    data(){
      return {
        userSession: null,
        role: 'academicoffice'
      }
    },
    components: {
      DefaultLayout,
      SearchBar,
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
  .text-center {
    text-align: center;
  }

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
  