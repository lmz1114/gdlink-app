<template>
    <div>
      <div 
        class="modal fade" 
        id="changePasswordModal" 
        data-bs-backdrop="static" 
        data-bs-keyboard="false" 
        tabindex="-1" 
        aria-labelledby="changePasswordLabel" 
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h2 class="modal-title w-100 text-center" id="changePasswordLabel">Change Password</h2>
              <button 
                type="button" 
                class="btn-close position-absolute" 
                style="right: 20px;" 
                data-bs-dismiss="modal" 
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body p-4">
              <form @submit.prevent="handleSubmit">
                <div v-if="isDefaultPassword" class="mb-3">
                  <label for="currentPassword" class="form-label">Current Password</label>
                  <input 
                    type="password" 
                    class="form-control" 
                    id="currentPassword" 
                    v-model="currentPassword" 
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="newPassword" class="form-label">New Password</label>
                  <input 
                    type="password" 
                    class="form-control" 
                    id="newPassword" 
                    v-model="newPassword" 
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="confirmPassword" class="form-label">Confirm New Password</label>
                  <input 
                    type="password" 
                    class="form-control" 
                    id="confirmPassword" 
                    v-model="confirmPassword" 
                    required
                  />
                </div>
                <div v-if="errorMessage" class="alert alert-danger" role="alert">
                  {{ errorMessage }}
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
              <button 
                type="button" 
                class="btn btn-primary" 
                style="width: 40%"
                @click="handleSubmit"
                data-bs-dismiss="modal"
              >Change Password</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import ProfileService from '../service/ProfileService';

  export default {
    props: {
      isDefaultPassword: {
        type: Boolean,
        required: true, 
      },
    },
    data() {
      return {
        userId: null,        
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        errorMessage: '',
      };
    },
    created() {
      const sessionData = sessionStorage.getItem('utmwebfc_session');
      if (sessionData) {
        const userSession = JSON.parse(sessionData);
        this.userId = userSession.user_id;
      }
    },
    methods: {
      async handleSubmit() {
        await this.processChangePassword();
        this.resetForm();
      },
      resetForm() {
        this.currentPassword = '';
        this.newPassword = '';
        this.confirmPassword = '';
        this.errorMessage = '';
      },
      async processChangePassword(){
        try{
          const data = await ProfileService.updatePassword(this.userId,this.currentPassword,this.newPassword,this.confirmPassword);
          alert(data.message);
        }catch(error){
          if (error.response) {
            this.errorMessage = error.response.data.message || "An error occurred.";
            console.log(this.errorMessage);
          } else {
            alert("Server unavailable. Please try again later.");
          }
        }
      }
    },
  };
  </script>
  
  <style scoped>
  .modal-header h2 {
    font-size: 1.5rem;
  }
  </style>