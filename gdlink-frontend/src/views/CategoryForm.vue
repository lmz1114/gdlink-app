<template>
  <DefaultLayout :activeTab = "activeTab">
    <template #default>
      <section class="border rounded mt-0 shadow-sm bg-white" style="padding: 1.5em">
        <h2 style="margin-bottom: 1em;">
          <strong>{{ formData.categoryId ? 'Edit Category' : 'Create Category' }}</strong>
        </h2>
        <form @submit.prevent="handleSubmit">
          <!-- Icon Display -->
          <div class="mb-3 icon-container">
            <div class="icon-box">
              <i id="color-indicator" class="bi bi-file-earmark-text-fill"></i>
            </div>
          </div>

          <!-- Category Input -->
          <div class="mb-3">
            <label for="category" class="form-label">Category Name:</label>
            <input
              type="text"
              id="category"
              v-model="formData.categoryName"
              class="form-control"
              placeholder="Enter category name"
            />
            <small v-if="errors.categoryName" class="text-danger">{{ errors.categoryName }}</small>
          </div>

          <!-- Color Picker -->
          <div class="mb-3">
            <label for="color-picker" class="form-label">Color:</label>
            <div id="color-picker"></div>
            <small v-if="errors.color" class="text-danger">{{ errors.color }}</small>
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
                  type="checkbox"
                />
                <label :for="option.id" class="form-check-label">{{ option.label }}</label>
              </div>
              <small v-if="errors.accessibility" class="text-danger">{{ errors.accessibility }}</small>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="d-flex justify-content-end">
            <button type="button" class="btn btn-warning me-2" @click="cancel">Cancel</button>
            <button type="submit" class="btn btn-success">{{ formData.categoryId ? 'Save Changes' : 'Create' }}</button>
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
import SweetAlert from '@/Utils/SweetAlertUtils';
import 'bootstrap-icons/font/bootstrap-icons.css';



export default {
  components: {
    DefaultLayout,
  },
  data() {
    return {
      categories: [],
      activeTab: 'Category',
      formData: {
        categoryId: null,
        categoryName: '',
        color: '#ffffff',
        accessibility: ['student','lecturer','staff'],
      },
      accessibilityOptions: [
        { id: "student", value: "student", label: "Student" },
        { id: "lecturer", value: "lecturer", label: "Lecturer" },
        { id: "staff", value: "staff", label: "Academic Office" },
      ],
      errors: {
        categoryName: '',
        color: '',
        accessibility: '',
      },
    };
  },
  created() {
    const categoryId = this.$route.params.categoryId;
    if (categoryId) {
      this.formData.categoryId = categoryId;
      this.loadCategoryData(categoryId);
    }
    this.loadCategoryList();
  },
  mounted() {
    this.initializeColorPicker();
  },
  methods: {
    isLightColor(hex) {
      hex = hex.replace("#", "");
      const bigint = parseInt(hex, 16);
      const r = (bigint >> 16) & 255;
      const g = (bigint >> 8) & 255;
      const b = bigint & 255;
      const brightness = (0.299 * r) + (0.587 * g) + (0.114 * b);
      return brightness > 220;
    },
    validateForm() {
      let isValid = true;

      if (!this.formData.categoryName.trim()) {
        this.errors.categoryName = 'Category name is required.';
        isValid = false;
      } else if (this.formData.categoryName.length < 3) {
        this.errors.categoryName = 'Category name must be at least 3 characters long.';
        isValid = false;
      } else if(this.categories.some(category =>
          category.categoryName.toLowerCase() === this.formData.categoryName.toLowerCase() &&
          (this.formData.categoryId ? category.categoryId !== this.formData.categoryId : true))){
        this.errors.categoryName = 'Category name already exists';
        isValid = false;
      } 
      else {
        this.errors.categoryName = '';
      }

      if (this.formData.color === '#ffffff') {
        this.errors.color = 'Category color is required.';
        isValid = false;
      } else if(this.isLightColor(this.formData.color)){
        this.errors.color = 'Selected color is too light! Please choose a darker color to ensure visibility.';
        isValid = false;
      } else if(this.categories.some(category =>
        category.color.toLowerCase() === this.formData.color.toLowerCase() &&
       (this.formData.categoryId ? category.categoryId !== this.formData.categoryId : true))){
        this.errors.color = 'Category color already exists';
        isValid = false;
      } 
      else {
        this.errors.color = '';
      }

      if (this.formData.accessibility.length === 0) {
        this.errors.accessibility = 'At least one accessibility option must be selected.';
        isValid = false;
      } else {
        this.errors.accessibility = '';
      }

      return isValid; 
    },
    async loadCategoryList() {
      try {
        this.categories = await CategoryService.getCategoryList();
        console.log('Service:', this.categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
        this.categories = []; 
      }
    },
    async loadCategoryData(categoryId) {
      try {
        const categoryArray = await CategoryService.getCategoryById(categoryId);
        if (Array.isArray(categoryArray) && categoryArray.length > 0) {
          const category = categoryArray[0];
          this.formData = {
            categoryId: category.category_id,
            categoryName: category.category_name,
            color: category.color,
            accessibility: category.accessibility,
          };
          document.getElementById("color-indicator").style.color = category.color;
        } else {
          throw new Error('Category not found');
        }
      } catch (error) {
        console.error('Error loading category data:', error);
        SweetAlert.showSwal('Error!','Failed to load category data.','error');
      }
    },
    initializeColorPicker() {
      const colorPicker = new iro.ColorPicker("#color-picker", {
        width: 100,
        color: this.formData.color,
        layout: [
          {
            component: iro.ui.Wheel,
            options: {},
          },
        ],
      });

      colorPicker.on("color:change", (color) => {
        this.formData.color = color.hexString;
        document.getElementById("color-indicator").style.color = color.hexString;
      });
    },
    async handleSubmit() {
      try {
        const { categoryId, categoryName, color, accessibility } = this.formData;

        const formData = {
          categoryName,
          color,
          accessibility,
        };
        if(this.validateForm()){
          if (categoryId) {
            const data = await CategoryService.updateCategory(categoryId, formData);
            if(data.success){
              SweetAlert.showSwal('Category Changed!',data.message,'success');
            }else{
              SweetAlert.showSwal('Failed!',data.message,'error');
            }
          } else {
            const isConfirmed = await SweetAlert.showConfirmDialog({
                confirmTitle: 'Create Category',
                confirmText: 'Are you sure you want to create this category? Once created, it cannot be deleted.',
                confirmButtonText: 'Create',
                cancelButtonText: 'Cancel'
            });
            if(isConfirmed){
              const data = await CategoryService.createCategory(formData);
              if(data.success){
                SweetAlert.showSwal('Category Created!',data.message,'success');
              }else{
                SweetAlert.showSwal('Failed!',data.message,'error');
              }
            }
          }
          this.$router.push('/admin/category');

        }
      } catch (error) {
        SweetAlert.showSwal('Error!',error.message || 'Failed to save category.','error');
      }
    },
    cancel() {
      this.$router.push("/admin/category");
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
