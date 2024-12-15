<template>
    <DefaultLayout>
        <template #default>
            <section class="border rounded mt-0 shadow-sm bg-white" style="padding: 1.5em">
      <h2 style="margin-bottom: 1em;"><strong>Resource Share</strong></h2>
      <form>
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
            <option value="Assignments">Assignments</option>
            <option value="Lectures">Lectures</option>
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
            @click="addEmailField"
            style="width:120px;"
          >
            Add User ID
          </button>
        </div>
        </div>

        <div v-if="resource.shareTo === 'specific'" class="mb-3">
          <div v-for="(email, index) in emailInputs" :key="index" class="input-group mb-2">
            <input
              type="email"
              v-model="emailInputs[index]"
              class="form-control"
              placeholder="Enter User ID"
              required
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


  export default {
    components: {
        DefaultLayout
    },
    data() {
      return {
        resource: {
          link: "",
          category: "",
          refName: "",
          description: "",
          session: "",
          semester: "",
          shareTo: "",
        },
        emailInputs: [""], // Dynamic email inputs array
      };
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
        };
        this.emailInputs=[""];
        this.$router.push('/');
      },
      handleShareChange() {
      if (this.resource.shareTo !== "specific") {
        // Clear all email fields when switching from "Specific"
        this.emailInputs = [""];
      }
    },
      addEmailField() {
      // Add a new empty email input field
        this.emailInputs.push("");
      },
      submitForm() {
      // Collect all data and submit the form
      const formData = {
        ...this.resource,
        emails: this.emailInputs.filter((email) => email.trim() !== ""), // Filter non-empty emails
      };
      console.log("Submitted Form Data:", formData);
      alert("Form submitted successfully!");
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
  