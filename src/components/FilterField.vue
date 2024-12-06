<template>
    <div class="d-flex align-items-center gap-3">
      <!-- Category Dropdown -->
      <div>
        <select
          v-model="selectedCategory"
          class="form-select"
          aria-label="Category Dropdown"
        >
          <option disabled value="">Category</option>
          <option v-for="category in categories" :key="category" :value="category">
            {{ category }}
          </option>
        </select>
      </div>
  
      <!-- Semester Dropdown -->
      <div>
        <select
          v-model="selectedSemester"
          class="form-select"
          aria-label="Semester Dropdown"
        >
          <option disabled value="">Semester</option>
          <option v-for="semester in semesters" :key="semester" :value="semester">
            {{ semester }}
          </option>
        </select>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        selectedCategory: "",
        selectedSemester: "",
        categories: ["Timetable", "Research", "Course Files", "Others"], // Example categories
        semesters: ["2022/2023-1", "2022/2023-2", "2023/2024-1", "2023/2024-2","2024/2025-1"],   // Example semesters
      };
    },
  };
  </script>
  
  <style>
  /* Custom styles to match the appearance */
  .form-select {
    height: 40px;
    max-width: 150px;
    font-weight: bold;
    text-transform: capitalize;
    border-width: 2px;
  }
  </style>
  