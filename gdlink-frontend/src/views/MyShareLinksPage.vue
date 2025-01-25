<template>
    <DefaultLayout>
        <template #default>
            <div class="border rounded shadow-sm bg-white w-100 min-1000 p-4">
                <div class="d-flex mb-4">
                    <svg class="me-3" width="2.5em" height="2.5em" viewBox="0 0 25 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24.8565 9.89987L21.7131 15.2885C21.4685 15.7079 21.1182 16.0558 20.6972 16.2976C20.2763 16.5394 19.7992 16.6667 19.3138 16.6667H1.95421C1.15026 16.6667 0.649349 15.7946 1.05443 15.1001L4.19783 9.71146C4.44246 9.2921 4.79272 8.94418 5.21372 8.70238C5.63471 8.46057 6.11173 8.33333 6.59722 8.33333H23.9568C24.7607 8.33333 25.2616 9.20542 24.8565 9.89987ZM6.59722 6.94444H20.8333V4.86111C20.8333 3.7105 19.9006 2.77778 18.75 2.77778H11.8056L9.02778 0H2.08333C0.932726 0 0 0.932726 0 2.08333V14.1513L2.99813 9.01163C3.74193 7.73654 5.12105 6.94444 6.59722 6.94444Z" fill="#74B5EE"/>
                    </svg>
                    <h2><strong>My ShareLinks</strong></h2>
                </div>
                <SearchBar
                    @search = "search"
                />
               
                <FilterField 
                    @filtercategory="updateCategory"
                    @filtersemester="updateSemester"
                    class="float-start mb-5"
                    style="width: 90%;"
                />
                <div class="btn-group float-end" style="width: 10%;">
                    <a class="btn btn-secondary" :class="{ active: displayType === 'card' }" @click.prevent="setDisplayType('card')">Card</a>
                    <a class="btn btn-secondary" :class="{ active: displayType === 'table' }" @click.prevent="setDisplayType('table')">Table</a>
                </div>                 

                <MyShareLinkResources 
                    :resources="myResources"
                    @viewDetails = "viewDetails"
                    :displayType="displayType"
                    :resourceType="'share'"
                />
            </div>
        </template>
    </DefaultLayout>
</template>

<script>
import FilterField from '../components/FilterField.vue';
import DefaultLayout from '../components/DefaultLayout.vue';
import SearchBar from '../components/SearchBar.vue';
import MyShareLinkResources from '../components/ResourceList.vue';
import ResourcesSharingService from '../service/ResourcesSharingService';


export default {
    data() {
      return {
        userId: null,
        myResources: [],
        selectedCategories: null,
        selectedSemesters: null,
        key: null,
        displayType: 'card'
      };
    },
    components: {
      FilterField,
      SearchBar,
      DefaultLayout,
      MyShareLinkResources
    },
    created() {
        const sessionData = sessionStorage.getItem('utmwebfc_session');
        if (sessionData) {
            const userSession = JSON.parse(sessionData);
            this.userId = userSession.user_id;
        }
        this.displayMyShareLinksResources();
    },
    methods:{
        async displayMyShareLinksResources() {
            this.myResources = await ResourcesSharingService.getMyShareLinksResources(this.userId);
            console.log(this.myResources);
        },
        async displayFilteredResources() {
            this.myResources = await ResourcesSharingService.getFilteredMyShareLinksResources(this.userId,this.selectedCategories,this.selectedSemesters);
            console.log(this.myResources);
        },
        async displaySearchedResources() {
            this.myResources = await ResourcesSharingService.getSearchedMyShareLinksResources(this.userId,this.key);
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
                this.displayMyShareLinksResources();
            }
        },
        viewDetails(resourceId){
            this.$router.push({ name: 'My ShareLinks Resource Details', params: { resourceId: resourceId } });
        },
        setDisplayType(type){
            this.displayType = type;
        }
    }
};
</script>

<style scoped>

.min-1000{
    min-height:1000px;
}

</style>
