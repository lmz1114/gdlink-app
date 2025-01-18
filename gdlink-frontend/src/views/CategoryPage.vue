<template>
  <DefaultLayout>
    <template #default>
      <section class="border rounded shadow-sm bg-white vh-100 w-100 p-4">
        <div class="d-flex mb-4">
          <svg class="me-3" width="2.5em" height="2.5em" viewBox="0 0 125 126" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M74.2437 115.267V79.1777C74.2437 77.1156 75.8856 75.4443 77.9115 75.4443H113.367C115.393 75.4443 117.035 77.1156 117.035 79.1777V115.267C117.035 117.329 115.393 119 113.367 119H77.9115C75.8856 119 74.2437 117.329 74.2437 115.267Z" stroke="#6700BB" stroke-width="13.9547"/>
            <path d="M7 115.267V79.1777C7 77.1156 8.64215 75.4443 10.6678 75.4443H46.1236C48.1493 75.4443 49.7914 77.1156 49.7914 79.1777V115.267C49.7914 117.329 48.1493 119 46.1236 119H10.6678C8.64215 119 7 117.329 7 115.267Z" stroke="#6700BB" stroke-width="13.9547"/>
            <path d="M74.2437 46.8222V10.7333C74.2437 8.67147 75.8856 7 77.9115 7H113.367C115.393 7 117.035 8.67147 117.035 10.7333V46.8222C117.035 48.8841 115.393 50.5556 113.367 50.5556H77.9115C75.8856 50.5556 74.2437 48.8841 74.2437 46.8222Z" stroke="#6700BB" stroke-width="13.9547"/>
            <path d="M7 46.8222V10.7333C7 8.67147 8.64215 7 10.6678 7H46.1236C48.1493 7 49.7914 8.67147 49.7914 10.7333V46.8222C49.7914 48.8841 48.1493 50.5556 46.1236 50.5556H10.6678C8.64215 50.5556 7 48.8841 7 46.8222Z" stroke="#6700BB" stroke-width="13.9547"/>
          </svg>
          <h2><strong>Category Management</strong></h2>
        </div>
        <!-- Add category button -->
        <button class="btn btn-primary" @click="addCategory" style="width:auto; margin:15px">Add Category</button>
        <!-- Category list -->
        <CategoryList
          :categories="categories"
          @viewDetails="viewDetails"
        />
      </section>
    </template>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from '../components/DefaultLayout.vue';
import CategoryService from '../service/CategoryService';
import CategoryList from '../components/CategoryList.vue';

export default {
  components: {
    DefaultLayout,
    CategoryList
  },
  data() {
    return {
      userId: null,
      categories: [],
    };
  },
  async created() {
    const sessionData = sessionStorage.getItem('utmwebfc_session');
    if (sessionData) {
      const userSession = JSON.parse(sessionData);
      this.userId = userSession.user_id;
    }
    this.displayCategoryList();
  },
  methods: {
    async addCategory() {
      this.$router.push({ name: 'CategoryForm' });
    },

    async displayCategoryList() {
      try {
        this.categories = await CategoryService.getCategoryList();
        console.log('Service:', this.categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
        this.categories = []; 
      }
    },
    viewDetails(id) {
      console.log("Category ID:", id);
      this.$router.push({ name: 'CategoryDetails', params: { categoryId: id } });
    },
  },
};
</script>

<style scoped>
.categorylist-container{
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1em;
}

.table {
  width: 100%;
  margin-bottom: 1rem;
  color: #212529;
  border-collapse: collapse;
}
.table th,
.table td {
  padding: 0.75rem;
  vertical-align: top;
  border: 1px solid #dee2e6;
}
.table th {
  background-color: #f8f9fa;
}
.btn {
  padding: 0.375rem 0.75rem;
}
</style>
