<template>
  <DefaultLayout>
    <template #default>
      <section class="border rounded mt-0 shadow-sm bg-white" style="padding: 1.5em">
        <h2 style="margin-bottom: 1em;"><strong>Edit Category</strong></h2>
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
                  type="checkbox"
                />
                <label :for="option.id" class="form-check-label">{{ option.label }}</label>
              </div>
            </div>
          </div>


          <!-- Action Buttons -->
          <div class="d-flex justify-content-end">
            <button type="button" class="btn btn-danger me-2" @click="deleteCategory">Delete</button>
            <button type="button" class="btn btn-warning me-2" @click="cancel">Cancel</button>
            <button type="submit" class="btn btn-success">Save</button>
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
import Swal from 'sweetalert2';

export default {
  components: {
    DefaultLayout,
  },
  data() {
    return {
      formData: {
        categoryId: null,
        categoryName: '',
        color: '#ffffff',
        accessibility: "",
      },
      accessibilityOptions: [
        { id: "student", value: "student", label: "Student" },
        { id: "lecturer", value: "lecturer", label: "Lecturer" },
        { id: "staff", value: "staff", label: "Academic Office" },
      ],
    };
  },
  created() {
    const categoryId = this.$route.params.categoryId;
    if (categoryId) {
      this.formData.categoryId = categoryId;
      this.loadCategoryData(categoryId);
    }
  },
  mounted() {
    this.initializeColorPicker();
  },
  methods: {
    async loadCategoryData(categoryId) {
      try {
        const categoryArray = await CategoryService.getCategoryById(categoryId); 
        console.log('Fetched category data:', categoryArray);

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
        Swal.fire({
          title: 'Error!',
          text: 'Failed to load category data.',
          icon: 'error',
          timer: 2000,
          showConfirmButton: false,
        });
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
        const { categoryId, categoryName, color , accessibility} = this.formData;

        if (!categoryId || !categoryName) {
          throw new Error('Category ID and name are required.');
        }

        const formData = {
          categoryName,
          color,
          accessibility,
        };

        const response = await CategoryService.updateCategory(categoryId, formData);
        console.log('Category updated successfully:', response);
        Swal.fire({
          title: 'Success!',
          text: 'Category updated successfully.',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false,
        });
        this.$router.push('/admin/category');
      } catch (error) {
        console.error("Error while submitting the form:", error);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to update category. Please try again.',
          icon: 'error',
          timer: 2000,
          showConfirmButton: false,
        });
      }
    },
    cancel() {
      this.$router.push("/admin/category");
    },

    async deleteCategory(){
                  try {
                const result = await Swal.fire({
                    title: 'Are you sure?',
                    text: 'This action will permanently delete the category.',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!',
                    cancelButtonText: 'Cancel',
                });
                if (result.isConfirmed) {
                    const data = await CategoryService.deleteCategory(this.formData.categoryId);
                    if (data.success) {
                        Swal.fire({
                            title: 'Deleted!',
                            text: 'The category has been deleted.',
                            icon: 'success',
                            timer: 2000,
                            showConfirmButton: false,
                        });
                        this.$router.push('/admin/category');
                    } else {
                        Swal.fire({
                            title: 'Error!',
                            text: 'Failed to delete the resource. Please try again.',
                            icon: 'error',
                            timer: 2000,
                            showConfirmButton: false,
                        });
                    }
                }
            } catch (error) {
                console.error('Error deleting resource:', error);
                Swal.fire({
                    title: 'Error!',
                    text: 'An unexpected error occurred. Please try again later.',
                    icon: 'error',
                    timer: 2000,
                    showConfirmButton: false,
                });
            }
    }
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
    font-size: 6rem; 
    display: inline-block;
    margin-bottom: 1rem; 
}

.icon-container {
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;
}

.icon-box {
    background-color: white; 
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5); 
    border-radius: 0.5rem;
    padding: 1.5rem; 
    display: inline-flex;
    justify-content: center;
    align-items: center;
}   

</style>