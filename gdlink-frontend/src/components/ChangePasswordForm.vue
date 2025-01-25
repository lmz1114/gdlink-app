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
              <form>
                <div v-if="isDefaultPassword" class="mb-3">
                  <label for="currentPassword" class="form-label">Current Password</label>
                  <input 
                    type="password" 
                    class="form-control" 
                    id="currentPassword" 
                    v-model="currentPassword" 
                  />
                  <small v-if="errors.currentPassword" class="text-danger">{{ errors.currentPassword }}</small>
                </div>
                <div class="mb-3">
                  <label for="newPassword" class="form-label">New Password</label>
                  <input 
                    type="password" 
                    class="form-control" 
                    id="newPassword" 
                    v-model="newPassword" 
                  />
                  <small v-if="errors.newPassword" class="text-danger">{{ errors.newPassword }}</small>
                </div>
                <div class="mb-3">
                  <label for="confirmPassword" class="form-label">Confirm New Password</label>
                  <input 
                    type="password" 
                    class="form-control" 
                    id="confirmPassword" 
                    v-model="confirmPassword" 
                  />
                  <small v-if="errors.confirmPassword" class="text-danger">{{ errors.confirmPassword }}</small>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
              <button 
                ref="submit"
                type="button" 
                class="btn btn-primary" 
                :data-bs-dismiss = "dismiss ? 'modal' : null"
                style="width: 40%"
                @click="handleSubmit"
              >Change Password</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import SweetAlert from '@/Utils/SweetAlertUtils';
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
        dismiss: false,
        errors: {
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        }
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
      validation(){
        this.errors = {
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        };

        let isValid = true;
        if (this.isDefaultPassword && !this.currentPassword) {
          this.errors.currentPassword = "Current password is required.";
          isValid = false;
        }

        if (this.newPassword !== this.confirmPassword) {
          this.errors.newPassword = "New password and confirmation do not match.";
          this.errors.confirmPassword = "New password and confirmation do not match.";
          isValid = false;
        }

        if (!this.newPassword || !this.confirmPassword) {
          if (!this.newPassword) this.errors.newPassword = "New password is required.";
          if (!this.confirmPassword) this.errors.confirmPassword = "Confirm new password is required.";
          isValid = false;
        }
        return isValid;

      },
      async handleSubmit() {
        if(this.validation()){
          if(!this.dismiss){
          this.dismiss = true;
          this.$nextTick(() => {
            setTimeout(() => {
              this.$refs.submit.click();
              }, 100);
            }); 
          }else{
            await this.processChangePassword();
            this.resetForm();
          }
        }
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
          if(data.success){
            SweetAlert.showSwal('Password Changed!',data.message,'success');
          }else{
            SweetAlert.showSwal('Failed!',data.message,'error');
          }
        }catch(error){
          if (error.response) {
            this.errorMessage = error.response.data.message || "An error occurred.";
            SweetAlert.showSwal('Error!', this.errorMessage,'error');
            console.log(this.errorMessage);
          } else {
            SweetAlert.showSwal('Error!', 'Server unavailable. Please try again later.','error');
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