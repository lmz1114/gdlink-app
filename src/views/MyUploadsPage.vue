<template>
    <DefaultLayout>
        <template #default>
            <FilterField/>
        </template>
    </DefaultLayout>
</template>

<script>
import FilterField from '../components/FilterField.vue';

export default {
    components: {
      FilterField,
    },
};
</script>