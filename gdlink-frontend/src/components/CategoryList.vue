<template>
  <div class="container">
    <div class="grid-layout">
      <div v-for="(category, index) in categories" :key="index" style="width: 180px;">
        <CategoryBox 
          :categoryColor="category.color"
          :categoryName="category.name"
          @click="viewDetails(category.categoryId)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CategoryBox from "./CategoryBox.vue";

export default {
  components: {
    CategoryBox,
  },
  props: {
    categories: {
      type: Array,
      required: true,
      default: () => [], 
    },
  },
  methods: {
    viewDetails(id) {
      this.$emit("viewDetails", id);
    },
  },
};
</script>

<style scoped>
.grid-layout {
  display: grid;
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  margin: 0 0 20px 0;
  padding: 0 1px;
}

@media (min-width: 576px) {
  .grid-layout {
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  }
}

@media (min-width: 980px) {
  .grid-layout {
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  }
}

@media (min-width: 1047px) {
  .grid-layout {
    grid-template-columns: repeat(auto-fit, minmax(180px, 180px));
  }
}
</style>
