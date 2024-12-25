<template>
    <DefaultLayout>
        <template #default>
            <section class="border rounded shadow-sm bg-white vh-100 w-100 p-4">
                <div class="d-flex mb-4">
                    <svg class="me-3" width="2.5em" height="2.5em" viewBox="0 0 25 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.5 8.75C9.91797 8.75 11.875 6.79297 11.875 4.375C11.875 1.95703 9.91797 0 7.5 0C5.08203 0 3.125 1.95703 3.125 4.375C3.125 6.79297 5.08203 8.75 7.5 8.75ZM10.5 10H10.1758C9.36328 10.3906 8.46094 10.625 7.5 10.625C6.53906 10.625 5.64062 10.3906 4.82422 10H4.5C2.01562 10 0 12.0156 0 14.5V15.625C0 16.6602 0.839844 17.5 1.875 17.5H13.125C14.1602 17.5 15 16.6602 15 15.625V14.5C15 12.0156 12.9844 10 10.5 10ZM18.75 8.75C20.8203 8.75 22.5 7.07031 22.5 5C22.5 2.92969 20.8203 1.25 18.75 1.25C16.6797 1.25 15 2.92969 15 5C15 7.07031 16.6797 8.75 18.75 8.75ZM20.625 10H20.4766C19.9336 10.1875 19.3594 10.3125 18.75 10.3125C18.1406 10.3125 17.5664 10.1875 17.0234 10H16.875C16.0781 10 15.3438 10.2305 14.6992 10.6016C15.6523 11.6289 16.25 12.9922 16.25 14.5V16C16.25 16.0859 16.2305 16.168 16.2266 16.25H23.125C24.1602 16.25 25 15.4102 25 14.375C25 11.957 23.043 10 20.625 10Z" fill="#E074EE"/>
                    </svg>
                    <h2><strong>Shared With Me</strong></h2>      
                </div>
                <SearchBar
                    @search = "search"
                />
                <FilterField 
                    @filtercategory="updateCategory"
                    @filtersemester="updateSemester"
                    class="float-start w-100 mb-5"
                />
                <SharedWithMeResources
                    :resources="sharedWithMeResources"
                />
            </section>
        </template>
    </DefaultLayout>
</template>

<script>
import FilterField from '../components/FilterField.vue';
import DefaultLayout from '../components/DefaultLayout.vue';
import SearchBar from '../components/SearchBar.vue';
import SharedWithMeResources from '../components/ResourceList.vue';
import ResourcesSharingService from '../service/ResourcesSharingService';


export default {
    data() {
      return {
        userId: null,
        sharedWithMeResources: [],
        selectedCategories: null,
        selectedSemesters: null,
        key: null
      };
    },
    components: {
      FilterField,
      SearchBar,
      DefaultLayout,
      SharedWithMeResources
    },
    created() {
        const sessionData = sessionStorage.getItem('utmwebfc_session');
        if (sessionData) {
            const userSession = JSON.parse(sessionData);
            this.userId = userSession.user_id;
        }
        this.displaySharedWithMeResources();
    },
    methods:{
        async displaySharedWithMeResources() {
            this.sharedWithMeResources = await ResourcesSharingService.getSharedWithMeResources(this.userId);
        },
        async displayFilteredResources() {
            this.sharedWithMeResources = await ResourcesSharingService.getFilteredSharedWithMeResources(this.userId,this.selectedCategories,this.selectedSemesters);
        },
        async displaySearchedResources() {
            this.sharedWithMeResources = await ResourcesSharingService.getSearchedSharedWithMeResources(this.userId,this.key);
            console.log(this.myResources);
        },
        updateCategory(categories) {
            this.selectedCategories = categories;
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
                this.displaySharedWithMeResources();
            }
        }
    }
};
</script>
