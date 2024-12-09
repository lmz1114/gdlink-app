<template>
    <div class="d-flex flex-column flex-shrink-0 p-3 bg-light vh-100 shadow" style="width: 280px; position:fixed">
      <a href="/" class="align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
        <span class="fs-4">
          <strong>UTM 
            <br>Res
            <svg width="0.7em" height="0.7em" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="vertical-align: middle; margin-left: -6px; margin-right: -8px;">
              <path d="M15.4383 8.99912V10.499C15.4383 10.8083 15.164 11.0614 14.8288 11.0614H11.985V13.6862C11.985 13.9955 11.7107 14.2486 11.3756 14.2486H9.75048C9.4153 14.2486 9.14107 13.9955 9.14107 13.6862V11.0614H6.29718C5.96201 11.0614 5.68778 10.8083 5.68778 10.499V8.99912C5.68778 8.68978 5.96201 8.43668 6.29718 8.43668H9.14107V5.81193C9.14107 5.50259 9.4153 5.24949 9.75048 5.24949H11.3756C11.7107 5.24949 11.985 5.50259 11.985 5.81193V8.43668H14.8288C15.164 8.43668 15.4383 8.68978 15.4383 8.99912ZM25.6458 22.3431L24.2086 23.6696C23.7312 24.1101 22.9593 24.1101 22.487 23.6696L17.4188 18.9966C17.1903 18.7857 17.0633 18.4998 17.0633 18.1998V17.4358C15.2707 18.7294 13.0159 19.4981 10.563 19.4981C4.72796 19.4981 0 15.1345 0 9.74905C0 4.36364 4.72796 0 10.563 0C16.3981 0 21.126 4.36364 21.126 9.74905C21.126 12.0129 20.2932 14.0939 18.8915 15.7485H19.7193C20.0443 15.7485 20.3541 15.8656 20.5826 16.0766L25.6458 20.7495C26.1181 21.1901 26.1181 21.9025 25.6458 22.3431ZM17.4696 9.74905C17.4696 6.22439 14.382 3.37467 10.563 3.37467C6.74408 3.37467 3.65643 6.22439 3.65643 9.74905C3.65643 13.2737 6.74408 16.1234 10.563 16.1234C14.382 16.1234 17.4696 13.2737 17.4696 9.74905Z" fill="black"/>
            </svg>
            urce 
            <br>Center
          </strong>
        </span>
      </a>
      <hr>
      
      <div>
        <SideBarTab :items="navItems"/>
      </div>

      <div class="d-flex justify-content-center align-items-end vh-100">
        <div class="rounded d-flex flex-column justify-content-center align-items-center upload-effect shadow" style="background-color: #D36B6C; width: 150px; height: 100px;" @click="navUploadForm">
          <svg width="25" height="36" viewBox="0 0 25 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.5833 9.5625V0H1.5625C0.696615 0 0 0.752344 0 1.6875V34.3125C0 35.2477 0.696615 36 1.5625 36H23.4375C24.3034 36 25 35.2477 25 34.3125V11.25H16.1458C15.2865 11.25 14.5833 10.4906 14.5833 9.5625ZM18.8268 24.7507H14.5833V30.3757C14.5833 30.9973 14.1172 31.5007 13.5417 31.5007H11.4583C10.8828 31.5007 10.4167 30.9973 10.4167 30.3757V24.7507H6.17318C5.24349 24.7507 4.7793 23.535 5.43945 22.827L11.7168 16.098C12.1497 15.6333 12.849 15.6333 13.2819 16.098L19.5592 22.827C20.2201 23.535 19.7565 24.7507 18.8268 24.7507ZM24.5443 7.38281L18.1706 0.492188C17.8776 0.175781 17.4805 0 17.0638 0H16.6667V9H25V8.57109C25 8.12813 24.8372 7.69922 24.5443 7.38281Z" fill="white"/>
          </svg>
          <span class="mt-2" style="color:white;"><strong>Upload</strong></span>
        </div>
      </div>

      <hr>
      <div class="dropdown">
        <a href="#" class="d-flex align-items-center link-dark text-decoration-none dropdown-toggle" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
          <img src="../assets/kwek.png" alt="" width="32" height="32" class="rounded-circle me-2">
          <strong v-if="userSession">{{ userSession.full_name }}</strong>
        </a>
        <ul class="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
          <li><a class="dropdown-item" href="#">New project...</a></li>
          <li><a class="dropdown-item" href="#">Settings</a></li>
          <li><a class="dropdown-item" href="#">Profile</a></li>
          <li><hr class="dropdown-divider"></li>
          <li><a class="dropdown-item" @click="logout">Sign out</a></li>
        </ul>
      </div>
    </div>
  </template>
  <script>

import SideBarTab from './SideBarTab.vue';

  export default {
    components: {
      SideBarTab,
    },
    data() {
      const navItems = [
          { name: 'Home', link: '/', icon: 'home', },
          { name: 'Favourites', link: '/favourites', icon: 'favourites' },
          { name: 'My Uploads', link: '/my_uploads', icon: 'myuploads' },
          { name: 'Shared With Me', link: '/shared_with_me', icon: 'sharewithme' },
          { name: 'Category', link: '/category', icon: 'category', 
            subItems: [
              { name: 'Timetable', link: '#', isActive: false, icon: 'timetable' },
              { name: 'Research', link: '#', isActive: false, icon: 'research' },
              { name: 'Course Files', link: '#', isActive: false, icon: 'coursefiles' },
              { name: 'Others', link: '#', isActive: false, icon: 'others' },
            ],
          },
      ]


      return {
        userSession: null,
        navItems,
      };
    },
    methods:{
        logout() {
          // Clear sessionStorage and reset local data
          sessionStorage.removeItem('utmwebfc_session');
          this.userSession = null;
          this.$router.push('/login'); // Redirect to login page
        },

        navUploadForm() {
          this.$router.push('/resource_upload'); // Redirect to login page
        },
    },
    computed: {
      filteredNavItems() {
        const role = "<%= userSession.description %>";
        return this.navItems.filter(item => item.name !== 'Shared with me' || role!=='Pensyarah');
      }
    },
    mounted() {
      const sessionData = sessionStorage.getItem('utmwebfc_session');
      if (sessionData) {
        this.userSession = JSON.parse(sessionData);
        console.log(this.userSession);
      }
    }
  }
  </script>
  
  <style scoped>
  .upload-effect {
  transition: transform 0.3s, background-color 0.3s;
}

  .upload-effect:hover {
    transform: scale(1.1); /* Slightly enlarge */
    background-color: #b85859; /* Change background color on hover */
  }

  .upload-effect:active {
    transform: scale(0.95); /* Slightly shrink when pressed */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Add a pressed shadow effect */
    background-color: #a14a4b; /* Darken background color */
  }

  .bottom-div {
    position: absolute;
    bottom: 0; /* Keeps the div at the bottom of the sidebar */
    width: 100%; /* Make sure it spans the width of the sidebar */
  }
  </style>
  
  