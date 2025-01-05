<template>
    <DefaultLayout>
        <template #default>
            <div class="border rounded shadow-sm bg-white vh-100 w-100 p-4" style="overflow-y:auto">
                <div class="d-flex mb-4">
                  <svg class="me-3" width="2.5em" height="2.5em" viewBox="0 0 23 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.7675 1.36753C18.3059 -0.717255 14.6448 -0.342262 12.3853 1.97466L11.5003 2.88089L10.6154 1.97466C8.36035 -0.342262 4.6948 -0.717255 2.23313 1.36753C-0.587914 3.76034 -0.736154 8.05491 1.78841 10.6486L10.4806 19.5681C11.0421 20.144 11.954 20.144 12.5155 19.5681L21.2078 10.6486C23.7368 8.05491 23.5886 3.76034 20.7675 1.36753Z" fill="#C70505"/>
                  </svg>
                      <h2><strong>Favourites</strong></h2>
                </div>
                <SearchBar
                    @search = "search"
                />
               
                <FilterField 
                    @filtercategory="updateCategory"
                    @filtersemester="updateSemester"
                    class="float-start w-100 mb-5"
                />
                <FavouriteResources 
                  :resources="favouriteResources" 
                  @viewDetails = "viewDetails"
                />
              </div>
        </template>
    </DefaultLayout>
</template>

<script>
import FilterField from '../components/FilterField.vue';
import DefaultLayout from '../components/DefaultLayout.vue';
import SearchBar from '../components/SearchBar.vue';
import FavouriteResources from '../components/ResourceList.vue'
import FavouriteService from '../service/FavouriteService';

export default {
  data() {
      return {
        userId: null,
        favouriteResources: [],
        selectedCategories: null,
        selectedSemesters: null,
        key: null
      };
    },
  components: {
      FilterField,
      SearchBar,
      DefaultLayout,
      FavouriteResources
  },
  created() {
    const sessionData = sessionStorage.getItem('utmwebfc_session');
      if (sessionData) {
            const userSession = JSON.parse(sessionData);
            this.userId = userSession.user_id;
        }
        this.displayFavouriteResources();
    },
    methods:{
        async displayFavouriteResources() {
            this.favouriteResources = await FavouriteService.getFavouriteResources(this.userId);
        },
        async displayFilteredResources() {
            this.favouriteResources = await FavouriteService.getFilteredFavouriteResources(this.userId,this.selectedCategories,this.selectedSemesters);
        },
        async displaySearchedResources() {
            this.favouriteResources = await FavouriteService.getSearchedFavouriteResources(this.userId,this.key);
        },
        updateCategory(categories) {
            this.selectedCategories = categories;
            console.log(this.selectedCategories);
            this.reloadPage();
        },
        updateSemester(semesters) {
            this.selectedSemesters = semesters;
            this.reloadPage();
        },
        reloadPage() {
            this.displayFilteredResources();
        },
        search(key){
            this.key = key;
            if(key){
                this.displaySearchedResources();
            }
            else{
                this.displayFavouriteResources();
            }
        },
        viewDetails(resourceId){
            this.$router.push({ name: 'Favourites Resource Details', params: { resourceId: resourceId } });
        }
    }
};
</script>