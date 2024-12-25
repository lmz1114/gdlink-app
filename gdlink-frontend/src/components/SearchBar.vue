<template>
    <div class="input-group mb-3">
      <input 
        type="text" 
        class="form-control" 
        v-model="key" 
        @keydown.enter="onSearch" 
        placeholder="Search"
        @input="handleInput"
      />
      <button 
        class="btn d-flex align-items-center justify-content-center" 
        :class="{'btn-pressed': isPressed}"
        @click="onSearch"
      >
        <svg width="1em" height="1em" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M24.6582 21.6162L19.79 16.748C19.5703 16.5283 19.2725 16.4062 18.96 16.4062H18.1641C19.5117 14.6826 20.3125 12.5146 20.3125 10.1562C20.3125 4.5459 15.7666 0 10.1562 0C4.5459 0 0 4.5459 0 10.1562C0 15.7666 4.5459 20.3125 10.1562 20.3125C12.5146 20.3125 14.6826 19.5117 16.4062 18.1641V18.96C16.4062 19.2725 16.5283 19.5703 16.748 19.79L21.6162 24.6582C22.0752 25.1172 22.8174 25.1172 23.2715 24.6582L24.6533 23.2764C25.1123 22.8174 25.1123 22.0752 24.6582 21.6162ZM10.1562 16.4062C6.7041 16.4062 3.90625 13.6133 3.90625 10.1562C3.90625 6.7041 6.69922 3.90625 10.1562 3.90625C13.6084 3.90625 16.4062 6.69922 16.4062 10.1562C16.4062 13.6084 13.6133 16.4062 10.1562 16.4062Z" fill="black"/>
        </svg>
      </button>
    </div>
</template>
  
  <script>
  export default {
    data() {
      return {
        key: '', // Holds the search query
        isPressed: false, // Track if Enter key was pressed
      };
    },
    methods: {
      handleInput() {
        // Emit event when input is cleared
        if (this.key.trim() === '') {
          this.$emit('search', ''); // Emit empty search event
          console.log('Search input cleared');
        } else {
          console.log(`Searching for: ${this.key}`);
        }
      },
      onSearch() {
        this.$emit('search', this.key); // Emit search query to parent
        this.isPressed = true; // Set the flag to true when Enter is pressed
        setTimeout(() => {
          this.isPressed = false; // Reset after 300ms (time for the visual change)
        }, 300);
      },
    },
  };
  </script>
  
  <style scoped>
  input{
    border: 2px solid #D3D3D3;
    border-right:none;
  }

  .btn {
    background-color: #FCCF3A;
    border-top: 2px solid #D3D3D3;
    border-right: 2px solid #D3D3D3;
    border-bottom: 2px solid #D3D3D3;
    transition: background-color 0.3s; 
  }
  
  .btn-pressed {
    background-color: #ffaa00; 
  }

  .btn:active {
    background-color: #ffaa00; 
  }
  
  .form-control:focus {
    outline: none;
    box-shadow: none;
  }

  .bg-white{
    --bs-bg-opacity: 0;
    background-color: white;
  }
  </style>
  