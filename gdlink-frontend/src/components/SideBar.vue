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
          <svg width="40px" height="40px" viewBox="0 0 41 45" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_491_18)">
            <path d="M29.9286 23.125C28.2633 23.125 26.7327 23.69 25.5244 24.635L17.9752 20.0061C18.1988 19.014 18.1988 17.9859 17.9752 16.9938L25.5244 12.3649C26.7327 13.31 28.2633 13.875 29.9286 13.875C33.834 13.875 37 10.769 37 6.9375C37 3.10605 33.834 0 29.9286 0C26.0232 0 22.8571 3.10605 22.8571 6.9375C22.8571 7.45478 22.9153 7.95861 23.0248 8.44359L15.4756 13.0725C14.2673 12.1275 12.7368 11.5625 11.0714 11.5625C7.16601 11.5625 4 14.6685 4 18.5C4 22.3315 7.16601 25.4375 11.0714 25.4375C12.7368 25.4375 14.2673 24.8725 15.4756 23.9275L23.0248 28.5564C22.9132 29.051 22.857 29.556 22.8571 30.0625C22.8571 33.894 26.0232 37 29.9286 37C33.834 37 37 33.894 37 30.0625C37 26.231 33.834 23.125 29.9286 23.125Z" fill="white"/>
            </g>
            <defs>
            <filter id="filter0_d_491_18" x="0" y="0" width="41" height="45" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dy="4"/>
            <feGaussianBlur stdDeviation="2"/>
            <feComposite in2="hardAlpha" operator="out"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_491_18"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_491_18" result="shape"/>
            </filter>
            </defs>
          </svg>
          <span class="mt-2" style="color:white;"><strong>Share Resource</strong></span>
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
          <li><a class="dropdown-item" href="/profile">Profile</a></li>
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
          { name: 'My ShareLinks', link: '/my_sharelinks', icon: 'mysharelinks' },
          { name: 'Shared With Me', link: '/shared_with_me', icon: 'sharewithme' },
          { name: 'Favourites', link: '/favourites', icon: 'favourites' },
          { name: 'Notification', link: '/notification', icon: 'notification' },
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
  
  