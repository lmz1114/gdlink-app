<template>
    <DefaultLayout>
        <template #default>
            <div class="border rounded shadow-sm bg-white vh-100 w-100 p-4">
                <div class="d-flex mb-4">
                    <svg class="me-3" width="2.5em" height="2.5em" viewBox="0 0 186 175" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M93 0C41.625 0 0 39.1633 0 87.5C0 135.837 41.625 175 93 175C144.375 175 186 135.837 186 87.5C186 39.1633 144.375 0 93 0ZM93 33.871C111.225 33.871 126 47.7722 126 64.9193C126 82.0665 111.225 95.9677 93 95.9677C74.775 95.9677 60 82.0665 60 64.9193C60 47.7722 74.775 33.871 93 33.871ZM93 155.242C70.9875 155.242 51.2625 145.857 38.0625 131.179C45.1125 118.69 58.9125 110.081 75 110.081C75.9 110.081 76.8 110.222 77.6625 110.469C82.5375 111.951 87.6375 112.903 93 112.903C98.3625 112.903 103.5 111.951 108.337 110.469C109.2 110.222 110.1 110.081 111 110.081C127.088 110.081 140.887 118.69 147.938 131.179C134.738 145.857 115.012 155.242 93 155.242Z" fill="black"/>
                    </svg>
                      <h2><strong>Profile</strong></h2>
                </div>
                <div class="d-flex flex-column align-items-center justify-content-center">
                    <img src="../assets/kwek.png" class="rounded-circle profile-image mb-3" alt="profile image" width="236" height="236"> 
                    <a href="#">Edit Picture</a>
                    <hr>
                    <div>
                        <div class="d-flex">
                            <p class="profile-text"><strong>Name</strong></p> 
                            <span><strong v-if="userSession">{{ userSession.full_name }}</strong></span>
                        </div>
                        <div class="d-flex">
                            <p class="profile-text"><strong>Matric No</strong></p>
                            <span><strong v-if="userSession">{{ userSession.login_name }}</strong></span>
                        </div>
                        <div class="d-flex">
                            <p class="profile-text"><strong>Email</strong></p>
                            <span><strong v-if="userSession">{{ userSession.email }}</strong></span>
                        </div>
                </div>
                </div>
            </div>
        </template>
    </DefaultLayout>
</template>

<script>
import DefaultLayout from '../components/DefaultLayout.vue';


export default {
    data(){
      return {
        userSession: null,
      }
    },
    components: {
      DefaultLayout
    },
    mounted() {
      const sessionData = sessionStorage.getItem('utmwebfc_session');
      if (sessionData) {
        this.userSession = JSON.parse(sessionData);
        console.log(this.userSession);
      }
    }
};
</script>

<style scoped>
  .bg-white{
    background-color: white;
  }

  .profile-image{
    border: 1px solid #000;

  }

  hr {
    width: 60%; /* Adjust width as needed */
    border: 1px solid #000; /* Light gray border */
    margin: 20px 0; /* Space above and below */
    }

  .profile-text{
    margin-right: 100px;
    width: 100px;
  }
</style>