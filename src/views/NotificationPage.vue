<template>
    <DefaultLayout>
        <template #default>
            <div class="border rounded shadow-sm bg-white vh-100 w-100 p-4">
                <div class="d-flex mb-4">
                    <svg class="me-3" width="2.5em" height="2.5em" viewBox="0 0 37 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_d_436_214)">
                    <path d="M18.5 33C20.7863 33 22.6409 31.1534 22.6409 28.875H14.3591C14.3591 31.1534 16.2137 33 18.5 33ZM32.4426 23.3507C31.192 22.0127 28.8519 19.9998 28.8519 13.4062C28.8519 8.39824 25.3253 4.38926 20.5701 3.4057V2.0625C20.5701 0.923613 19.6432 0 18.5 0C17.3568 0 16.4299 0.923613 16.4299 2.0625V3.4057C11.6747 4.38926 8.14807 8.39824 8.14807 13.4062C8.14807 19.9998 5.80801 22.0127 4.55739 23.3507C4.169 23.7664 3.99681 24.2634 4.00004 24.75C4.00717 25.807 4.84027 26.8125 6.07794 26.8125H30.9221C32.1597 26.8125 32.9935 25.807 33 24.75C33.0032 24.2634 32.831 23.7658 32.4426 23.3507Z" fill="#FAB74C"/>
                    </g>
                    <defs>
                    <filter id="filter0_d_436_214" x="0" y="0" width="37" height="41" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset dy="4"/>
                    <feGaussianBlur stdDeviation="2"/>
                    <feComposite in2="hardAlpha" operator="out"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_436_214"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_436_214" result="shape"/>
                    </filter>
                    </defs>
                    </svg>
                    <h2><strong>Notification</strong></h2>
                </div>
                <div class="w-100 mb-4" style="height: 37.6px;">
                    <div class="float-end  set-width">
                        <select class="form-select" v-model="selectedOption">
                            <option value="all">All</option>
                            <option value="1-week">1 week ago</option>
                            <option value="1-month">1 month ago</option>
                            <option value="2-months">2 months ago</option>
                            <option value="3-months">3 months ago</option>
                            <option value="more-than-3-months">More than 3 months ago</option>
                        </select>
                    </div>
                </div>
                <NotificationBox />
            </div>
        </template>
    </DefaultLayout>
</template>

<script>
import DefaultLayout from '../components/DefaultLayout.vue';
import NotificationBox from '../components/NotificationBox.vue';

export default {
    data() {
        return {
            selectedOption: 'all', 
        };
    },
    components: {
      DefaultLayout,
      NotificationBox
    },
};
</script>

<style scoped>
  .bg-white{
    background-color: white;
  }

  .set-width{
    width:200px !important;
  }


</style>