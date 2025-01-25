<template>
    <div>
      <div 
        class="modal fade" 
        id="groupFormModal" 
        data-bs-backdrop="static"
        data-bs-keyboard="false" 
        tabindex="-1" 
        aria-labelledby="groupFormLabel" 
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h2 class="modal-title w-100 text-center" id="groupFormLabel">
                {{ editing ? 'Edit Group' : 'Add Group' }}
              </h2>
              <button 
                @click="closeModal"
                ref="close"
                type="button" 
                class="btn-close position-absolute" 
                style="right: 20px;" 
                :data-bs-dismiss = "dismiss ? 'modal' : null "
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body p-4">
              <form @submit.prevent="handleSubmit">
                <div class="mb-3">
                  <label for="groupName" class="form-label">Group Name</label>
                  <input 
                    type="text" 
                    class="form-control" 
                    id="groupName" 
                    v-model="group.groupName" 
                  />
                  <small v-if="groupNameError" class="text-danger">{{ groupNameError }}</small>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button @click="closeModal" type="button" class="btn btn-danger" :data-bs-dismiss = "dismiss ? 'modal' : null ">Cancel</button>
              <button 
                ref="submit"
                type="button" 
                class="btn btn-primary"
                :data-bs-dismiss = "dismiss ? 'modal' : null "
                style="width: 40%"
                @click="handleSubmit"
              >
              {{ editing ? 'Update' : 'Submit' }}
            </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
<script>
import GroupService from '../service/GroupService';
import SweetAlert from '@/Utils/SweetAlertUtils';

  export default {
    data() {
      return {
        userId: null, 
        group:{
          groupName: ''
        },  
        groupList: null,
        groupNameError: null,    
        dismiss: false, 
        editing: false,
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
      validateForm() {
        this.groupNameError = null;

        if (!this.group.groupName) {
          this.groupNameError = 'Group Name is required';
          return false;
        } else if (this.group.groupName.length < 3) {
          this.groupNameError = 'Group Name must be at least 3 characters long';
          return false;
        } else if (this.groupList.some(group =>
  group.groupName.toLowerCase() === this.group.groupName.toLowerCase() &&
  (this.editing ? group.groupId !== this.group.groupId : true))) {
          this.groupNameError = 'Group Name already exists';
          return false;
        }
        
        return true;
      },
    openModalForEdit(group,groups) {
      this.groupList = groups;
      this.editing = true;
      this.dismiss = false;
      this.group = group;
      this.groupNameError= null;    
    },
    openModalForAdd(groups){
      this.groupList = groups;
      this.editing = false;
      this.dismiss = false;
      this.groupNameError= null;    
      this.resetForm();
    },
    async createGroup(){
      try {
        const data = await GroupService.createGroup(this.userId,this.group);
        if (data.success) {
          SweetAlert.showSwal('Created!', data.message, 'success');
        } else {
          SweetAlert.showSwal('Error!', data.message, 'error');
        }
      } catch (error) {
        console.error('Error creating group:', error);
        SweetAlert.showSwal('Error!', 'An unexpected error occurred. Please try again later.', 'error');
      }
    },

    async editGroup(){
      try {
        const data = await GroupService.editGroup(this.group);
        if (data.success) {
          SweetAlert.showSwal('Updated!', data.message, 'success');
        } else {
          SweetAlert.showSwal('Error!', data.message, 'error');
        }
      } catch (error) {
          console.error('Error updating group:', error);
          SweetAlert.showSwal('Error!', 'An unexpected error occurred. Please try again later.', 'error');
      }
    },

    async handleSubmit() {
      if(this.validateForm()){
        if(!this.dismiss){
          this.dismiss = true;
          this.$nextTick(() => {
            setTimeout(() => {
              this.$refs.submit.click();
            }, 100);
          }); 
        }else{
          if(this.editing === false){
            await this.createGroup();
          }else{
            await this.editGroup();
          }
          this.$emit('refresh');
        }
      }
    },
    resetForm() {
      this.group.groupName = '';
      this.errorMessage = '';
    },
    closeModal(){
      if(!this.dismiss){
        this.dismiss = true;
        this.$nextTick(() => {
          setTimeout(() => {
            this.$refs.close.click();
          }, 100);
        }); 
      }else{
        this.$emit('refresh');
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