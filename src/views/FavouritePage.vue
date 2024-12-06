<template>
    <DefaultLayout>
        <template #default>
            <FilterField style="float: right;"/>
        </template>
    </DefaultLayout>

</template>

<script>
import FilterField from '../components/FilterField.vue';
import DefaultLayout from '../components/DefaultLayout.vue';

export default {
    components: {
      FilterField,
      DefaultLayout
    },
};
</script>