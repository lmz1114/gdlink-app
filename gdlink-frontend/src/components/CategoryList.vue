<template>
  <div class="container">
    <div class="grid-layout">
      <div v-for="(category, index) in categories" :key="index" style="width: 180px;">
          <CategoryBox 
            :categoryColor="category.color"
            :categoryName="category.categoryName"
            :categoryAccessibility="category.accessibility"
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
:root{
  --box-width: 170px;
}
.container{
  display:flex;
  justify-content: center;
}

.grid-layout {
    display: grid;
    grid-template-columns: repeat(1, var(--box-width));
    grid-column-gap: 23px;
    grid-row-gap: 23px;
}

@media (min-width: 708px) {
    .grid-layout {
        grid-template-columns: repeat(2, var(--box-width));
    }
}

@media (min-width: 900px) {
    .grid-layout {
        grid-template-columns: repeat(3, var(--box-width));
    }
}

@media (min-width: 1095px) {
    .grid-layout {
        grid-template-columns: repeat(4, var(--box-width));
    }
}

@media (min-width: 1400px) {
    .grid-layout {
        grid-template-columns: repeat(6, var(--box-width));
    }
}
</style>
