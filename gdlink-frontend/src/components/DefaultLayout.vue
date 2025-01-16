<template>
    <div class="container-fluid">
      <div class="d-flex" style="height: 100vh;">
        <!-- Sidebar -->
        <SideBar :activeTab="activeTab"/>
        <!-- Main Content Area (Slot for dynamic content) -->
        <div class="flex-grow-1 p-4 bg-grey" style="margin-left:280px; overflow-y: auto;">
          <slot></slot> <!-- Content will be injected here -->
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import SideBar from './SideBar.vue'; // Assuming Sidebar is in the same folder
  
  export default {
    components: {
      SideBar
    },
    props:{
      activeTab: String
    },
  };
  </script>
  
  <style scoped>
    .container-fluid {
        padding: 0;
    }
    
    .d-flex {
        display: flex;
        flex-direction: row;
    }
    
    .flex-grow-1 {
        flex-grow: 1;
    }
    
    .p-4 {
        padding: 2rem;
    }

    .bg-grey{
      background-color: #EDEBEB; 
      color: inherit;  
    }
  </style>
  