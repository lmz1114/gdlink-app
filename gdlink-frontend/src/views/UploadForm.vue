<template>
    <DefaultLayout>
        <template #default>
            <section class="border rounded mt-0 shadow-sm bg-white" style="padding: 1.5em">
      <h2 style="margin-bottom: 1em;"><strong>Resource Share</strong></h2>
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
            v-model="resource.category"
            class="form-select"
            required
          >
            <option value="" disabled>Select Category</option>
            <option value="Course Files">Course Files</option>
            <option value="Meeting">Meeting</option>
            <option value="Workshop">Workshop</option>
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
            required
          >
            <option value="" disabled>Select Session</option>
            <option value="2024/2025">2024/2025</option>
            <option value="2023/2024">2023/2024</option>
            <option value="2022/2023">2022/2023</option>
          </select>
        </div>
  
        <!-- Semester Dropdown -->
        <div class="mb-3">
          <label for="semester" class="form-label">Semester:</label>
          <select
            id="semester"
            v-model="resource.semester"
            class="form-select"
            required
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
            required
            @click="handleShareChange">
            <option value="" disabled>Select Share To</option>
            <option value="all">All</option>
            <option value="lecturers">All Lecturers</option>
            <option value="students">All Students</option>
            <option value="specific">Specific</option>
          </select>

          <button v-if="resource.shareTo === 'specific'"
            type="button"
            class="btn btn-outline-primary"
            @click="addReceiverField"
            style="width:120px;"
          >
            Add User ID
          </button>
        </div>
        </div>

        <div v-if="resource.shareTo === 'specific'" class="mb-3">
          <div v-for="(email, index) in resource.receiver" :key="index" class="input-group mb-2">
            <input
              type="email"
              v-model="resource.receiver[index]"
              class="form-control"
              placeholder="Enter User ID"
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
          <button type="submit" class="btn btn-success">Upload</button>
        </div>
      </form>
    </section>
</template>
</DefaultLayout>
  </template>
  
  <script>
  import DefaultLayout from '../components/DefaultLayout.vue'; 
  import ResourcesSharingService from '../service/ResourcesSharingService';

  export default {
    components: {
        DefaultLayout
    },
    data() {
      return {
        userId: null,
        resource: {
          link: "",
          category: "",
          owner: "",
          refName: "",
          description: "",
          session: "",
          semester: "",
          shareTo: "",
          receiver: [""]
        },
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
      cancelUpload() {
        // Clear all input fields
        this.resource = {
          link: "",
          category: "",
          refName: "",
          description: "",
          session: "",
          semester: "",
          shareTo: "",
          receiver: [""]
        };
        this.$router.push('/');
      },
      handleShareChange() {
      if (this.resource.shareTo !== "specific") {
        // Clear all email fields when switching from "Specific"
        this.resource.receiver = [""];
      }
    },
      addReceiverField() {
      // Add a new empty email input field
        this.resource.receiver.push("");
      },
      submitForm() {      
        if(this.resource.receiver){
          this.resource.receiver.filter((email) => email.trim() !== "");
        }
        const response = ResourcesSharingService.shareResource(this.userId,this.resource);
        console.log(response);
        this.cancelUpload();
      },
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
  