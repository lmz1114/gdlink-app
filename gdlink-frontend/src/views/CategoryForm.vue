<template>
  <DefaultLayout>
    <template #default>
      <section class="border rounded mt-0 shadow-sm bg-white" style="padding: 1.5em">
        <h2 style="margin-bottom: 1em;"><strong>Create Category</strong></h2>
        <form @submit.prevent="handleSubmit">
          <!-- Icon Display -->
          <div class="mb-3 icon-container">
            <div class="icon-box">
              <i id="color-indicator" class="bi bi-file-earmark-text-fill"></i>
            </div>
          </div>

          <!-- Category Input -->
          <div class="mb-3">
            <label for="category" class="form-label">New Category:</label>
            <input
              type="text"
              id="category"
              v-model="formData.categoryName"
              class="form-control"
              placeholder="Enter new category name"
              required
            />
          </div>

          <!-- Color Picker -->
          <div class="mb-3">
            <label for="color-picker" class="form-label">Color:</label>
            <div id="color-picker"></div>
          </div>

          <!-- Accessibility Options -->
          <div class="mb-3">
            <label for="accessibility" class="form-label">Accessibility:</label>
            <div>
              <div
                class="form-check"
                v-for="option in accessibilityOptions"
                :key="option.id"
              >
                <input
                  :id="option.id"
                  :value="option.value"
                  v-model="formData.accessibility"
                  class="form-check-input"
                  type="radio"
                />
                <label :for="option.id" class="form-check-label">{{ option.label }}</label>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="d-flex justify-content-end">
            <button type="button" class="btn btn-danger me-2" @click="cancel">Cancel</button>
            <button type="submit" class="btn btn-success">Create</button>
          </div>
        </form>
      </section>
    </template>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from '../components/DefaultLayout.vue';
import CategoryService from '../service/CategoryService';
import iro from '@jaames/iro';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default {
  components: {
    DefaultLayout,
  },
  data() {
    return {
      userId: null,
      formData: {
        categoryName: "",
        color: "#ffffff",
        accessibility: "All",
      },
      accessibilityOptions: [
        { id: "all", value: "All", label: "All" },
        { id: "students", value: "Student", label: "Student" },
        { id: "lecturers", value: "Lecturer", label: "Lecturer" },
        { id: "office-staff", value: "Office Staff", label: "Office Staff" },
      ],
    };
  },
  created() {
    this.loadUserSession();
  },
  mounted() {
    this.initializeColorPicker();
    // this.formData.accessibility = "All"; // Force default value
    // console.log('Forced accessibility to:', this.formData.accessibility);
  },
  methods: {
    loadUserSession() {
      const sessionData = sessionStorage.getItem("utmwebfc_session");
      if (sessionData) {
        const userSession = JSON.parse(sessionData);
        this.userId = userSession.user_id;
      }
    },
    initializeColorPicker() {
      const colorPicker = new iro.ColorPicker("#color-picker", {
        width: 100,
        color: this.formData.color,
        layout: [
            {
                component: iro.ui.Wheel,
                options: {}
            }
        ]
      });

      colorPicker.on("color:change", (color) => {
        this.formData.color = color.hexString;
        document.getElementById("color-indicator").style.color = color.hexString;
      });
    },
    cancel() {
      this.$router.push("/admin/category");
    },

    async handleSubmit() {
      try {
        console.log(this.formData); 
        const response = await CategoryService.createCategory(this.formData);
        console.log('Category created successfully:', response);
        this.$router.push('/admin/category'); 
      } catch (error) {
        console.error("Error while submitting the form:", error);
      }
    },
  },
  watch: {
  'formData.accessibility': function (newVal) {
    console.log('Accessibility changed to:', newVal);
  },
},
};
</script>

<style scoped>
.create-category-form {
  max-width: 500px;
  margin: auto;
}

.form-check-label {
  margin-left: 8px;
}

.bg-white {
  background-color: white;
}

.form-select {
  max-width: 180px;
}

#color-indicator {
    font-size: 6rem; /* Adjust the size as needed (e.g., 3rem, 5rem, etc.) */
    display: inline-block;
    margin-bottom: 1rem; /* Optional: Adds spacing below the icon */
}

.icon-container {
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;
}

.icon-box {
    background-color: white; /* White background for the container */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5); /* Subtle shadow effect */
    border-radius: 0.5rem;
    padding: 1.5rem; /* Padding inside the container */
    display: inline-flex;
    justify-content: center;
    align-items: center;
}   

</style>