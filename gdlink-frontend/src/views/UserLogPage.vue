<template>
  <DefaultLayout>
    <template #default>
      <section
        class="border rounded shadow-sm bg-white vh-100 w-100 p-4 d-flex flex-column"
      >
        <div class="d-flex mb-4">
          <svg
            class="me-3"
            width="2.5em"
            height="2.5em"
            viewBox="0 0 25 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.5 8.75C9.91797 8.75 11.875 6.79297 11.875 4.375C11.875 1.95703 9.91797 0 7.5 0C5.08203 0 3.125 1.95703 3.125 4.375C3.125 6.79297 5.08203 8.75 7.5 8.75ZM10.5 10H10.1758C9.36328 10.3906 8.46094 10.625 7.5 10.625C6.53906 10.625 5.64062 10.3906 4.82422 10H4.5C2.01562 10 0 12.0156 0 14.5V15.625C0 16.6602 0.839844 17.5 1.875 17.5H13.125C14.1602 17.5 15 16.6602 15 15.625V14.5C15 12.0156 12.9844 10 10.5 10ZM18.75 8.75C20.8203 8.75 22.5 7.07031 22.5 5C22.5 2.92969 20.8203 1.25 18.75 1.25C16.6797 1.25 15 2.92969 15 5C15 7.07031 16.6797 8.75 18.75 8.75ZM20.625 10H20.4766C19.9336 10.1875 19.3594 10.3125 18.75 10.3125C18.1406 10.3125 17.5664 10.1875 17.0234 10H16.875C16.0781 10 15.3438 10.2305 14.6992 10.6016C15.6523 11.6289 16.25 12.9922 16.25 14.5V16C16.25 16.0859 16.2305 16.168 16.2266 16.25H23.125C24.1602 16.25 25 15.4102 25 14.375C25 11.957 23.043 10 20.625 10Z"
              fill="#E074EE"
            />
          </svg>
          <h2><strong>User Activity Log</strong></h2>
        </div>
        <SearchBar @search="search" />

        <table class="table table-striped table-bordered smaller-font">
          <thead class="text-center align-middle">
            <tr>
              <th scope="col">No.</th>
              <th scope="col">User ID</th>
              <th scope="col">Role</th>
              <th scope="col">User Name</th>
              <th scope="col">Action</th>
              <th scope="col" @click="toggleSort" style="cursor: pointer">
                Time
                <span v-if="sortDirection === 'asc'">↑</span>
                <span v-if="sortDirection === 'desc'">↓</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(log, index) in paginatedLogs" :key="log.log_id">
              <td class="align-middle">
                {{
                  sortDirection === "desc"
                    ? (currentPage - 1) * logsPerPage + index + 1
                    : this.userLogs.length -
                      (currentPage - 1) * logsPerPage -
                      index
                }}
              </td>

              <td class="align-middle">{{ log.userId || "N/A" }}</td>
              <td class="align-middle">{{ log.role || "N/A" }}</td>
              <td class="align-middle">{{ log.userName || "N/A" }}</td>
              <td class="align-middle">{{ log.action }}</td>
              <td class="align-middle">
                {{ formatDate(log.actionTime) }}
              </td>
            </tr>
            <tr v-if="!paginatedLogs.length">
              <td class="text-center" colspan="5">No user logs available.</td>
            </tr>
          </tbody>
        </table>

        <!-- Pagination controls -->
        <nav aria-label="Page navigation ">
          <ul class="pagination justify-content-end">
            <li class="page-item" :class="{ disabled: currentPage === 1 }">
              <a
                class="page-link"
                href="#"
                @click.prevent="goToPage(currentPage - 1)"
                tabindex="-1"
              >
                Previous
              </a>
            </li>
            <li
              class="page-item"
              v-for="page in pageNumbers"
              :key="page"
              :class="{ active: currentPage === page }"
            >
              <a class="page-link" href="#" @click.prevent="goToPage(page)">
                {{ page }}
              </a>
            </li>
            <li
              class="page-item"
              :class="{ disabled: currentPage === totalPages }"
            >
              <a
                class="page-link"
                href="#"
                @click.prevent="goToPage(currentPage + 1)"
              >
                Next
              </a>
            </li>
          </ul>
        </nav>
      </section>
    </template>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from '../components/DefaultLayout.vue';
import UserLogService from "../service/UserLogService";
import SearchBar from "../components/SearchBar.vue";
import dayjs from "dayjs";

export default {
  data() {
    return {
      userLogs: [],
      key: null,
      currentPage: 1,
      logsPerPage: 9,
      sortDirection: "desc",
    };
  },
  components: {
    DefaultLayout,
    SearchBar,
  },
  created() {
    const sessionData = sessionStorage.getItem("utmwebfc_session");
    if (sessionData) {
      const userSession = JSON.parse(sessionData);
      this.userId = userSession.user_id;
    }
    this.fetchUserLogs();

    setInterval(() => {
      this.fetchUserLogs();
    }, 5000);
  },
  computed: {
    pageNumbers() {
      return Array.from({ length: this.totalPages }, (_, i) => i + 1);
    },

    totalPages() {
      return Math.ceil(this.userLogs.length / this.logsPerPage);
    },

    paginatedLogs() {
      const start = (this.currentPage - 1) * this.logsPerPage;
      const end = start + this.logsPerPage;
      return this.userLogs.slice(start, end);
    },

    filteredLogs() {
      if (!this.searchQuery.trim()) {
        return this.userLogs; 
      }
      const query = this.searchQuery.trim().toLowerCase();
      return this.userLogs.filter(
        (log) =>
          (log.userId && log.userId.toString().toLowerCase().includes(query)) ||
          (log.userName && log.userName.toLowerCase().includes(query))
      );
    },
  },

  methods: {
    async fetchUserLogs() {
      try {
        const response = await UserLogService.getAllUserLogs();
        if (response?.UserLog) {
          this.userLogs = response.UserLog;
          this.sortLogs();
        } else {
          console.error("Unexpected response format:", response);
        }
      } catch (error) {
        console.error("Failed to fetch user logs:", error);
        alert("Unable to fetch user logs. Please try again later.");
      }
    },

    async displaySearchedUserLogs() {
      this.userLogs = await UserLogService.getSearchedUserLogs(this.key);
    },

    sortLogs() {
      this.userLogs.sort((a, b) => {
        const compareA = dayjs(a.actionTime).toDate();
        const compareB = dayjs(b.actionTime).toDate();

        if (this.sortDirection === "asc") {
          return compareA < compareB ? -1 : compareA > compareB ? 1 : 0;
        } else {
          return compareA < compareB ? 1 : compareA > compareB ? -1 : 0;
        }
      });
    },

    toggleSort() {
      this.sortDirection = this.sortDirection === "asc" ? "desc" : "asc";
      this.sortLogs(); 
    },

    formatDate(date) {
      console.log("Date received:", date);
      if (!date) return "No Date Available"; 
      const formattedDate = dayjs(date).format("DD-MMM-YYYY  hh:mm A");
      return formattedDate;
    },

    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },

    search(key) {
      this.key = key;
      if (key) {
        this.displaySearchedUserLogs();
      } else {
        this.fetchUserLogs();
      }
    },
  },
};
</script>

<style scoped>
.pagination-controls {
  margin-top: 10px;
}

table.smaller-font {
  font-size: 0.8rem;
}

table.smaller-font th,
table.smaller-font td {
  padding: 0.5rem;
}

table.smaller-font tbody tr {
  height: 50px;
}
</style>
