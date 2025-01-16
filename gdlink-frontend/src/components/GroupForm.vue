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
                type="button" 
                class="btn-close position-absolute" 
                style="right: 20px;" 
                data-bs-dismiss="modal" 
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
                data-bs-dismiss="modal"
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
        errorMessage: '',
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
    openModalForEdit(group) {
      this.editing = true;
      this.group = group;
    },
    openModalForAdd(){
      this.editing = false;
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
      if(this.editing === false){
        await this.createGroup();
      }else{
        await this.editGroup();
      }
        this.$emit('refresh');
    },
    resetForm() {
      this.group.groupName = '';
      this.errorMessage = '';
    },
    },
  };
  </script>
  
  <style scoped>
  .modal-header h2 {
    font-size: 1.5rem;
  }
  </style>