<template>
    <div class="d-flex align-items-center gap-5">
      <div  id="btn-category">
        <div style="position:relative;">
          <div class="select-btn" @click="selectButton('#btn-category')">
            <span class="btn-text">Category</span>
            <i class="bi bi-funnel-fill bi-solid"></i>
          </div>
        </div>
        <ul class="list-items">
          <li class="items" v-for="(category,index) in categories" :key="category" :id="'item-category-' + index" :value="category"  @click="selectCheck(selectedCategory,'category',category,index)">
            <span class="checkbox">
              <i class="bi bi-check check-icon"></i>
            </span>
            <span class="item-text"> {{ category }} </span>
          </li>
        </ul>
      </div>

      <div id="btn-semester">
        <div style="position:relative;">
          <div class="select-btn" @click="selectButton('#btn-semester')">
            <span class="btn-text">Semester</span>
            <i class="bi bi-funnel-fill bi-solid"></i>
          </div>
        </div>
        <ul class="list-items">
          <li class="items" v-for="(semester,index) in semesters" :key="semester" :id="'item-semester-' + index" :value="semester"  @click="selectCheck(selectedSemester,'semester',semester,index)">
            <span class="checkbox">
              <i class="bi bi-check check-icon"></i>
            </span>
            <span class="item-text"> {{ semester }} </span>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        selectedCategory: [],
        selectedSemester: [],
        categories: ["Course Files", "Meeting", "Workshop", "Others"], // Example categories
        semesters: ["2022/2023-1", "2022/2023-2", "2023/2024-1", "2023/2024-2","2024/2025-1"],   // Example semesters
      };
    },

    methods:{
      selectButton(id){
        const btn = document.querySelector(id);
        const listItem = btn.querySelector('.list-items')
        listItem.classList.toggle("open");
      },

      selectCheck(selectedItem,word,item,index){
        const check = document.querySelector(`#item-${word}-${index}`);
        if (check.classList.contains("checked")) {
          check.classList.remove("checked");
          const selectedIndex = selectedItem.indexOf(item);
          selectedItem.splice(selectedIndex,1);
        } else {
          check.classList.add("checked");
          selectedItem.push(item);
        }
        const filterWord = `filter${word}`;
        this.$emit(filterWord, selectedItem);
      }
    },
  };
  </script>
  
  <style scoped>
  .form-select {
    height: 40px;
    max-width: 150px;
    font-weight: bold;
    text-transform: capitalize;
    border-width: 2px;
  }

  .select-btn{
    display: flex;
    height: 40px;
    align-items:  center;
    padding: 0px 40px 3px 10px;
    border: 2px solid #D3D3D3;
    border-radius: 8px;
    cursor: pointer;
    background-color: #fff;
  }

  .bi-solid{
    position: absolute;
    right: 10px;
    bottom: 8px;
  }

  .list-items{
    position: absolute;
    z-index: 999;
    margin-top: -2px;
    border-radius: 8px;
    padding: 14px 0px;
    background-color: #fff;
    border: 2px solid #D3D3D3;
    display: none;
  }

  .list-items.open{
    display: block;
  }

  .list-items .items{
    display: flex;
    align-items: center;
    list-style: none;
    height: 30px;
    cursor: pointer;
    transition: 0.3s;
    padding: 0 15px;
    border-radius: 8px;
  }

  .list-items .items:hover{
    display: flex;
    align-items: center;
    list-style: none;
    height: 30px;
    cursor: pointer;
    background-color: #e7edfe;
  }

  .items .checkbox{
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 0;
    height: 16px;
    width: 16px;
    border-radius: 4px;
    margin-right: 12px;
    border: 1.5px solid #c0c0c0;
    transition: all 0.3s ease-in-out;
  }

  .items.checked .checkbox{
    background-color: #4070f4;
    border-color: #4070f4;
  }

  .bi::before, 
  [class*=" bi-"]::before, 
  [class^=bi-]::before {
    line-height: 0 !important; 
  }


  .checkbox .check-icon{
    color: #fff;
    font-size: 20px;
    transform: scale(0);
    transition: all 0.3s ease-in-out;
  }

  .items.checked .check-icon{
    transform: scale(1);
  }
  </style>
  