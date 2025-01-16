<template>
    <DefaultLayout>
        <template #default>
          <div>
            <div class="border rounded shadow-sm bg-white w-100 p-4 mb-4" style = "height:90px; ">
                <div class="d-flex mb-4">
                    <svg class="me-3" width="2.5em" height="2.5em" viewBox="0 0 186 175" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M93 0C41.625 0 0 39.1633 0 87.5C0 135.837 41.625 175 93 175C144.375 175 186 135.837 186 87.5C186 39.1633 144.375 0 93 0ZM93 33.871C111.225 33.871 126 47.7722 126 64.9193C126 82.0665 111.225 95.9677 93 95.9677C74.775 95.9677 60 82.0665 60 64.9193C60 47.7722 74.775 33.871 93 33.871ZM93 155.242C70.9875 155.242 51.2625 145.857 38.0625 131.179C45.1125 118.69 58.9125 110.081 75 110.081C75.9 110.081 76.8 110.222 77.6625 110.469C82.5375 111.951 87.6375 112.903 93 112.903C98.3625 112.903 103.5 111.951 108.337 110.469C109.2 110.222 110.1 110.081 111 110.081C127.088 110.081 140.887 118.69 147.938 131.179C134.738 145.857 115.012 155.242 93 155.242Z" fill="black"/>
                    </svg>
                      <h2><strong>Profile</strong></h2>
                </div>
            </div>

            <div class="d-flex">
              <div class="border rounded shadow-sm bg-white w-25 vh-100 p-4 me-4 d-flex flex-column justify-content-center align-items-center">
                <div class="d-flex justify-content-center align-items-center">
                  <img v-if="!user || !user.picture" src="../assets/defaultPicture.jpg" class="rounded-circle profile-image mb-3" alt="profile image" >
                  <img v-else :src="imageUrl" class="rounded-circle profile-image mb-3" alt="default profile image">
                </div>
                <div class="d-flex flex-row justify-content-center align-items-center w-100" style="position: relative">
                  <button class="btn btn-primary w-50" type="button" data-bs-toggle="modal" data-bs-target="#uploadModalDiv">
                    Edit Picture
                  </button>
                  <i class="bi bi-trash3" @click="deletePicture"></i>
                </div>
                  
                  <ProfilePictureUploadForm  @refresh="getProfileData"/>
              </div>

              <div class = "d-flex flex-column w-75">
                <div class="border rounded shadow-sm bg-white h-50 p-4 mb-4">
                  <h2 class = "mb-5"><b>User Information</b></h2>
                  <div class="d-flex">
                    <p class="profile-text"><strong>Name</strong></p> 
                    <span><strong v-if="user">{{ user.name }}</strong></span>
                  </div>
                  <div class="d-flex">
                    <p class="profile-text"><strong>Matric No</strong></p>
                    <span><strong v-if="user">{{ user.userId }}</strong></span>
                  </div>
                  <div class="d-flex">
                    <p class="profile-text"><strong>Email</strong></p>
                    <span><strong v-if="user">{{ user.email }}</strong></span>
                  </div>
                  <button class="btn btn-primary w-25 float-end mt-4" type="button" data-bs-toggle="modal" data-bs-target="#changePasswordModal">
                    Change Password
                  </button>
                  <ChangePasswordForm v-if="user" :is-default-password="!!user.isPassChanged"/>
                </div>

                <div class="border rounded shadow-sm bg-white h-50 p-4">

                </div>

              </div>
            </div>
          </div>
        </template>
    </DefaultLayout>
</template>

<script>
import DefaultLayout from '../components/DefaultLayout.vue';
import ProfilePictureUploadForm from '../components/ProfilePictureUploadForm.vue';
import ChangePasswordForm from '../components/ChangePasswordForm.vue';
import ProfileService from '@/service/ProfileService';
import SweetAlert from '../Utils/SweetAlertUtils'

export default {
    data(){
      return {
        userId: null,
        user: null,
        imageUrl: null
      }
    },
    components: {
      DefaultLayout,
      ProfilePictureUploadForm,
      ChangePasswordForm,
    },
    created() {
      const sessionData = sessionStorage.getItem('utmwebfc_session');
      if (sessionData) {
        const userSession = JSON.parse(sessionData);
        this.userId = userSession.user_id;
        this.getProfileData();
      }
    },
    methods:{
      async getProfileData(){
        try {
          const data = await ProfileService.getUserData(this.userId);
          this.user = data[0];
          if(this.user.picture){
            this.imageUrl = ProfileService.getPictureUrl(this.user);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      },
      async deletePicture(){
          await SweetAlert.deleteSwal({
            confirmText: 'This action will permanently delete the picture.',
            successText: 'The picture has been deleted.',
            deleteAction: () => ProfileService.deletePicture(this.userId),
            refreshData: () => this.getProfileData(),
          });
      }
    }
};
</script>

<style scoped>

.profile-page{
  min-height: 100vh; /* Full height of the viewport */
  display: flex;
  flex-direction: column;
  overflow: hidden; /* Prevent scrollbar */
}
  .bg-white{
    background-color: white;
  }

  .profile-image{
    border: 1px solid #000;
    width: 200px;
    height: 200px;
  }

  .profile-text{
    margin-right: 100px;
    width: 100px;
  }

  .bi-trash3{
    color: red;
    position:absolute;
    right:30px;
    cursor: pointer;
  }
</style>