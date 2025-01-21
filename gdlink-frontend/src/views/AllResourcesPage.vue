<template>
    <DefaultLayout> 
        <template #default>
            <div class="border rounded shadow-sm bg-white min-800 w-100 p-4 d-flex flex-column">
                <div class="d-flex mb-4">
                    <svg class="me-3" width="2.5em" height="2.5em" viewBox="0 0 25 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24.8565 9.89987L21.7131 15.2885C21.4685 15.7079 21.1182 16.0558 20.6972 16.2976C20.2763 16.5394 19.7992 16.6667 19.3138 16.6667H1.95421C1.15026 16.6667 0.649349 15.7946 1.05443 15.1001L4.19783 9.71146C4.44246 9.2921 4.79272 8.94418 5.21372 8.70238C5.63471 8.46057 6.11173 8.33333 6.59722 8.33333H23.9568C24.7607 8.33333 25.2616 9.20542 24.8565 9.89987ZM6.59722 6.94444H20.8333V4.86111C20.8333 3.7105 19.9006 2.77778 18.75 2.77778H11.8056L9.02778 0H2.08333C0.932726 0 0 0.932726 0 2.08333V14.1513L2.99813 9.01163C3.74193 7.73654 5.12105 6.94444 6.59722 6.94444Z" fill="#74B5EE"/>
                    </svg>
                    <h2><strong>Admin Resource Management</strong></h2>
                </div>
                <SearchBar @search="search" />
                <FilterField
                    @filtercategory="updateCategory"
                    @filtersemester="updateSemester"
                    class="float-start w-100 mb-3"
                />
                <p style="margin:15px"><strong>Number of resources: {{ allResources.length }} </strong></p>
                <table class="table table-striped table-bordered smaller-font">
                    <thead class="text-center align-middle">
                        <tr>
                            <th scope="col">Resource No.</th>
                            <th scope="col">Category</th>
                            <th scope="col">Ref.Name</th>
                            <th scope="col">Session-Semester</th>
                            <th scope="col">Description</th>
                            <th scope="col">Owner</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(resource, index) in paginatedResources" :key="resource.resource_id" style="height: 50px;">
                            <td class="align-middle">{{ (currentPage - 1) * resourcesPerPage + index + 1 }}</td>
                            <td class="align-middle">{{ resource.category_name }}</td>
                            <td class="align-middle">{{ resource.ref_name }}</td>
                            <td class="align-middle">{{ resource.sessem }}</td>
                            <td class="align-middle">{{ resource.description }}</td>
                            <td class="align-middle">{{ resource.owner }}</td>
                            <td class="align-middle text-center">
                                <div class="d-flex justify-content-center align-items-center">
                                    <button @click="editResource(resource.resource_id)" class="btn btn-warning me-2">Edit</button>
                                    <button @click="deleteResource(resource.resource_id)" class="btn btn-danger">Delete</button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="d-flex justify-content-between mb-2 align-items-center float-bottom pagination-controls">
                    <button class="btn btn-primary" :disabled="currentPage === 1" @click="previousPage">Previous</button>
                    <span>Page {{ currentPage }} of {{ totalPages }}</span>
                    <button class="btn btn-primary" :disabled="currentPage === totalPages" @click="nextPage">Next</button>
                </div>
            </div>
        </template>
    </DefaultLayout>
</template>

<script>
import FilterField from '../components/FilterField.vue';
import SearchBar from '../components/SearchBar.vue';
import ResourcesSharingService from '../service/ResourcesSharingService';
import DefaultLayout from '../components/DefaultLayout.vue';

export default {
data() {
    return {
        allResources: [],
        selectedCategories: null,
        selectedSemesters: null,
        key: null,
        currentPage: 1,
        resourcesPerPage: 10
    };
},
components: {
    FilterField,
    SearchBar,
    DefaultLayout
},
created() {
    const sessionData = sessionStorage.getItem('utmwebfc_session');
    if (sessionData) {
        const userSession = JSON.parse(sessionData);
        this.userId = userSession.user_id;
    }
    this.displayAllResources();
},
computed: {
    filteredResources() {
        return this.allResources.filter((resource) => {
        const matchesCategory = this.selectedCategories
            ? this.selectedCategories.includes(resource.category_name)
            : true;
        const matchesSemester = this.selectedSemesters
            ? this.selectedSemesters.includes(resource.sessem)
            : true;
        const matchesSearch = this.key
            ? resource.ref_name.toLowerCase().includes(this.key.toLowerCase())
            : true;
        return matchesCategory && matchesSemester && matchesSearch;
        });
    },
    totalPages() {
        return Math.ceil(this.allResources.length / this.resourcesPerPage);
    },
    paginatedResources() {
        const start = (this.currentPage - 1) * this.resourcesPerPage;
        const end = start + this.resourcesPerPage;
        return this.sortedResources.slice(start, end);
    },
    sortedResources() {
        return this.allResources.slice().sort((a, b) => a.resource_id - b.resource_id);
    }
},
methods: {
    async displayAllResources() {
        this.allResources = await ResourcesSharingService.getAllResources();
    },
    async deleteResource(resource_id) {
        const confirmDelete = confirm('Are you sure you want to delete this resource?');
        if (!confirmDelete) return;

        try {
            const response = await ResourcesSharingService.deleteResource(this.userId, resource_id); //updated
            if (response.success) {
                this.allResources = this.allResources.filter(resource => resource.resource_id !== resource_id);
                alert('Resource deleted successfully.');
            } else {
                alert(response.message || 'Failed to delete resource.');
            }
        } catch (error) {
            console.error('Error deleting resource:', error);
            alert('An error occurred. Please try again.');
        }
    },
    nextPage() {
        if (this.currentPage < this.totalPages) {
            this.currentPage++;
        }
    },
    previousPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
        }
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
        this.currentPage = 1; // Reset to the first page
        this.displayFilteredResources();
    },
    search(key) {
        this.key = key;
        if (key) {
            this.displaySearchedResources();
        } else {
            this.displayAllResources();
        }
    },
    editResource(resourceId) {
        this.$router.push({ name: 'Edit Resource Form', params: { resourceId } });
    },
    viewDetails(id) {
        this.$router.push({ name: 'Resource Details', params: { resource_id: id } });
    }
}
};
</script>

<style scoped>
.pagination-controls {
margin-bottom: -15px; /* Adjust to bring closer to the table */
margin-top: 10px; /* Add slight space above for separation */
}

table.smaller-font {
font-size: 0.8rem; /* Adjust the font size */
}

table.smaller-font th,
table.smaller-font td {
padding: 0.5rem; /* Reduce padding to make rows more compact */
}

table.smaller-font tbody tr {
height: 50px; /* Reduce row height */
}

.min-800{
    min-height:800px;
}
</style>
