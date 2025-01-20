<template>
    <DefaultLayout :activeTab = "activeTab">
        <template #default>
            <section class="border rounded mt-0 shadow-sm bg-white" style="padding: 1.5em">
      <h2 style="margin-bottom: 1em;"><strong>{{ (view==='edit') ? 'Resource Edit' : 'Resource Share' }}</strong></h2>
      <form @submit.prevent="submitForm">
        <!-- Link Input -->
        <div class="mb-3">
          <label for="link" class="form-label">Link:</label>
          <input
            type="url"
            id="link"
            v-model="resource.link"
            class="form-control"
            placeholder="Enter the link"
            required
          />
        </div>

        <!-- Owner -->
        <div class="mb-3">
          <label for="owner" class="form-label">Owner:</label>
          <input
            type="text"
            id="owner"
            v-model="resource.owner"
            class="form-control"
            placeholder="Enter the owner"
            required
          />
        </div>
  
        <!-- Category Dropdown -->
        <div class="mb-3">
          <label for="category" class="form-label">Category:</label>
          <select
            id="category"
            v-model="resource.categoryId"
            class="form-select"
            required
          >
            <option value="" disabled>Select Category</option>
            <option v-for="category in categories" :key="category.categoryId" :value="category.categoryId">
              {{ category.categoryName }}
            </option>
          </select>
        </div>
  
        <!-- Reference Name Input -->
        <div class="mb-3">
          <label for="refName" class="form-label">Ref. Name:</label>
          <input
            type="text"
            id="refName"
            v-model="resource.refName"
            class="form-control"
            placeholder="Enter reference name"
            required
          />
        </div>
  
        <!-- Description Input -->
        <div class="mb-3">
          <label for="description" class="form-label">Description:</label>
          <input
            type="text"
            id="description"
            v-model="resource.description"
            class="form-control"
            placeholder="Enter description"
            required
          />
        </div>
  
        <!-- Session Dropdown -->
        <div class="mb-3">
          <label for="session" class="form-label">Session:</label>
          <select
            id="session"
            v-model="resource.session"
            class="form-select"
            disabled
          >
            <option value="" disabled>Select Session</option>
            <option value="2024/2025">2024/2025</option>
            <option value="2023/2024">2023/2024</option>
            <option value="2022/2023">2022/2023</option>
          </select>
        </div>
  
        <div class="mb-3">
          <label for="semester" class="form-label">Semester:</label>
          <select
            id="semester"
            v-model="resource.semester"
            class="form-select"
            disabled
          >
            <option value="" disabled>Select Semester</option>
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
        </div>
  
        <!-- Share To Dropdown -->
        <div class="mb-3">
          <label for="shareTo" class="form-label">Share To:</label>
          <div class = "d-flex">
          <select
            id="shareTo"
            v-model="resource.shareTo"
            class="form-select me-2"
            @click="handleShareChange">
            <option value="" selected>None</option>
            <option value="all">All</option>
            <option value="lecturers">All Lecturers</option>
            <option value="students">All Students</option>
            <option value="specific groups">Specific Groups</option>
            <option value="specific users">Specific Users</option>
          </select>

          <button v-if="resource.shareTo === 'specific users'"
            type="button"
            class="btn btn-outline-primary"
            @click="addReceiverField"
            style="width:150px;"
          >
            Add User Email
          </button>
        </div>
        </div>

        <div v-if="resource.shareTo === 'specific groups'">
          <span>Choose group(s) to share:</span>
          <div v-for="(group, index) in groups" :key="group.groupId" class="form-check">
            <input class="form-check-input" type="checkbox" 
              :id="`group-${index}`" 
              :value="group.groupId" 
              v-model="resource.receiverGroups"
            />
            <label class="form-check-label" :for="`group-${index}`">
              {{ group.groupName }}
            </label>
          </div>
          
        </div>

        <div v-if="resource.shareTo === 'specific users'" class="mb-3">
          <div v-for="(receiver, index) in resource.receivers" :key="index" class="input-group mb-2" style="width: 250px;">
            <input
              type="email"
              v-model="receiver.email"
              class="form-control"
              placeholder="Enter User Email"
            />
          </div>
        </div>

        <div class="d-flex justify-content-end">
          <button
            type="button"
            class="btn btn-danger me-2"
            @click="cancelUpload"
          >
            Cancel
          </button>
          <button type="submit" class="btn btn-success">{{ (view==='edit') ? 'Update' : 'Share' }}</button>
        </div>
      </form>
    </section>
</template>
</DefaultLayout>
  </template>
  
  <script>
  import DefaultLayout from '../components/DefaultLayout.vue'; 
  import ResourcesSharingService from '../service/ResourcesSharingService';
  import CategoryService from '../service/CategoryService';
  import GroupService from '../service/GroupService';
import SweetAlert from '@/Utils/SweetAlertUtils';

  export default {
    components: {
        DefaultLayout
    },
    data() {
      return {
        view: null,
        activeTab: null,
        userId: null,
        resourceId: null,
        resource: {
          link: "",
          categoryId: "",
          owner: "",
          refName: "",
          description: "",
          session: "2024/2025",
          semester: "1",
          shareTo: "",
          receiverGroups: [],
          receivers: [{
            email:''
          }]
        },
        categories: [],
        groups: [],
        previousShareTo: '',
        previousReceiverGroups: '',
        previousReceivers: ''
      };
    },
    created() {
      this.resourceId = this.$route.params.resourceId;
      this.view = this.$route.meta.view;
      console.log(this.view);
      const sessionData = sessionStorage.getItem('utmwebfc_session');
      if (sessionData) {
        const userSession = JSON.parse(sessionData);
        this.userId = userSession.user_id;
      }
        this.displayCategoryList();
        this.getGroupData();
      if(this.view === 'edit'){
        this.getResourceData();
      }
      this.activeTab = 'My ShareLinks'
    },
    methods: {
      transformData(inputData) {
        return inputData.map(item => ({
            link: item.link,
            categoryId: item.categoryId,
            owner: item.owner,
            refName: item.refName,
            description: item.description,
            session: item.sessem.split("-")[0],
            semester: item.sessem.split("-")[1],
            shareTo: item.shareTo,
            receiverGroups: item.groups.map(group => group.groupId),
            receivers: item.receivers.map(receiver => ({ email: receiver.receiverEmail })),
        }));
      },
      async displayCategoryList(){
        this.categories = await CategoryService.getCategoryList();
      },
      async getResourceData(){
        const resource = await ResourcesSharingService.getMyShareLinksResourceDetails(this.resourceId);
        this.resource = this.transformData(resource)[0];
        this.previousShareTo = this.resource.shareTo;
        console.log(this.previousShareTo);
        this.previousReceiverGroups = [...this.resource.receiverGroups];
        console.log(this.previousReceiverGroups);
        this.previousReceivers = [...this.resource.receivers];
        console.log(this.previousReceivers);
      },
      cancelUpload() {
        this.clearForm();
        if(this.view === 'edit'){
          this.$router.push('/my_sharelinks');
        }else{
          this.$router.push('/');
        }
      },
      clearForm() {
        this.resource = {
          link: "",
          category_id: "",
          refName: "",
          description: "",
          session: "2024/2025",
          semester: "1",
          shareTo: "",
          receivers: [
            { email: '' } 
          ]
        };
      },
      handleShareChange() {
      if (this.resource.shareTo !== "specific users") {
        this.resource.receivers = [{ email: '' }];
      }
      if(this.resource.shareTo !== "specific groups"){
        this.resource.receiverGroups = [];
      }
    },
      addReceiverField() {
        this.resource.receivers.push({email:''});
      },
      async submitForm() {  
        if (this.resource.receivers.length > 0) {
          this.resource.receivers = this.resource.receivers.filter(
            (item) => item.email.trim() !== ""
          );
        }
        if(this.view === 'edit'){
          await this.edit();
          this.clearForm();
          this.previousShareTo = '';
          this.previousReceiverGroups = [];
          this.previousReceivers = [];
          this.$router.push({ name: 'My ShareLinks Resource Details', params: { resourceId: this.resourceId } });
        }else{
          await this.share();
          this.clearForm();
          this.$router.push('/my_sharelinks');
        }
      },
      async getGroupData(){
          this.groups = await GroupService.getGroupList(this.userId);
      },
      async share(){
        const data = await ResourcesSharingService.shareResource(this.userId,this.resource);
        try{
          if(data.success){
            SweetAlert.showSwal('Resource Shared!',data.message,'success');
          }else{
            SweetAlert.showSwal('Failed!',data.message,'error');
          }
        }catch(error){
          console.error('Error sharing resource:', error);
          SweetAlert.showSwal('Error!', 'An unexpected error occurred. Please try again later.', 'error');
        }
      },
      async edit(){
        const data = await ResourcesSharingService.editResource(this.userId,this.resourceId,this.previousShareTo,this.previousReceiverGroups,this.previousReceivers,this.resource);
        try{
          if(data.success){
            SweetAlert.showSwal('Resource Updated!',data.message,'success');
          }else{
            SweetAlert.showSwal('Failed!',data.message,'error');
          }
        }catch(error){
          console.error('Error editing resource:', error);
          SweetAlert.showSwal('Error!', 'An unexpected error occurred. Please try again later.', 'error');
        }
      }
    },
  };
  </script>
  
  <style scoped>
  .bg-white{
    background-color: white;
  }

  .form-select {
    max-width: 180px;
  }
  </style>
  