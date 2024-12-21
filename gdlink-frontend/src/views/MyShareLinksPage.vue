<template>
    <DefaultLayout>
        <template #default>
            <section class="border rounded shadow-sm bg-white vh-100 w-100 p-4">
                <div class="d-flex mb-4">
                    <svg class="me-3" width="2.5em" height="2.5em" viewBox="0 0 25 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24.8565 9.89987L21.7131 15.2885C21.4685 15.7079 21.1182 16.0558 20.6972 16.2976C20.2763 16.5394 19.7992 16.6667 19.3138 16.6667H1.95421C1.15026 16.6667 0.649349 15.7946 1.05443 15.1001L4.19783 9.71146C4.44246 9.2921 4.79272 8.94418 5.21372 8.70238C5.63471 8.46057 6.11173 8.33333 6.59722 8.33333H23.9568C24.7607 8.33333 25.2616 9.20542 24.8565 9.89987ZM6.59722 6.94444H20.8333V4.86111C20.8333 3.7105 19.9006 2.77778 18.75 2.77778H11.8056L9.02778 0H2.08333C0.932726 0 0 0.932726 0 2.08333V14.1513L2.99813 9.01163C3.74193 7.73654 5.12105 6.94444 6.59722 6.94444Z" fill="#74B5EE"/>
                    </svg>
                    <h2><strong>My ShareLinks</strong></h2>
                </div>
                <SearchBar></SearchBar>
                <FilterField 
                    @filtercategory="updateCategory"
                    @filtersemester="updateSemester"
                    class="float-start w-100 mb-5"
                />
                <MyShareLinkResources />
            </section>
        </template>
    </DefaultLayout>
</template>

<script>
import FilterField from '../components/FilterField.vue';
import DefaultLayout from '../components/DefaultLayout.vue';
import SearchBar from '../components/SearchBar.vue';
import MyShareLinkResources from '../components/MyShareLinkResources.vue';


export default {
    data() {
      return {
        selectedCategories: [],
        selectedSemesters: []
      };
    },
    components: {
      FilterField,
      SearchBar,
      DefaultLayout,
      MyShareLinkResources
    },
    methods:{
        updateCategory(categories) {
            console.log(categories);
            this.selectedCategories = categories;
            console.log(this.selectedCategories);
        },
        updateSemester(semesters) {
            console.log(semesters);
            this.selectedSemesters = semesters;
            console.log(this.selectedSemesters);
        }
    }
};
</script>