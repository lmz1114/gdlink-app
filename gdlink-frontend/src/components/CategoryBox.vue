<template>
    <div class="card" style="width: 180px;" :style="itemStyle"
    @mousemove="handleMouseMove"
    @mouseleave="resetTransform">
      <div class="card-image">
          <svg style="width:3em; height:3em;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 120">
            <path :style="{ fill: categoryColor }" d="M43.1667 24.4375V0H4.625C2.06198 0 0 1.92266 0 4.3125V87.6875C0 90.0773 2.06198 92 4.625 92H69.375C71.938 92 74 90.0773 74 87.6875V28.75H47.7917C45.2479 28.75 43.1667 26.8094 43.1667 24.4375ZM55.5 66.8438C55.5 68.0297 54.4594 69 53.1875 69H20.8125C19.5406 69 18.5 68.0297 18.5 66.8438V65.4062C18.5 64.2203 19.5406 63.25 20.8125 63.25H53.1875C54.4594 63.25 55.5 64.2203 55.5 65.4062V66.8438ZM55.5 55.3438C55.5 56.5297 54.4594 57.5 53.1875 57.5H20.8125C19.5406 57.5 18.5 56.5297 18.5 55.3438V53.9062C18.5 52.7203 19.5406 51.75 20.8125 51.75H53.1875C54.4594 51.75 55.5 52.7203 55.5 53.9062V55.3438ZM55.5 42.4062V43.8438C55.5 45.0297 54.4594 46 53.1875 46H20.8125C19.5406 46 18.5 45.0297 18.5 43.8438V42.4062C18.5 41.2203 19.5406 40.25 20.8125 40.25H53.1875C54.4594 40.25 55.5 41.2203 55.5 42.4062ZM74 21.9039V23H49.3333V0H50.5089C51.7422 0 52.9177 0.449219 53.7849 1.25781L72.651 18.8672C73.5182 19.6758 74 20.7719 74 21.9039Z" transform="translate(12.5,12.5)"/>
          </svg>
      </div>
      <hr>
      <div class="card-body" style="width: 180px;">
        <h5 class="card-title"><strong>{{ categoryName }}</strong></h5>
      </div>
    </div>
</template>
  
  <script>
  export default {
    name: "CategoryBox",
    props: {
      categoryColor: { type: String, required: true }, 
      categoryName: { type: String, required: true },
    },
    data() {
      return {
        transform: 'perspective(500px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      };
    },
    computed: {
      itemStyle() {
        return {
          willChange: 'transform',
          transform: this.transform,
        };
      },
    },
    methods: {
      handleMouseMove(event) {
        const rect = event.currentTarget.getBoundingClientRect();
        const itemCenterX = rect.left + rect.width / 2;
        const itemCenterY = rect.top + rect.height / 2;

        const offsetX = event.clientX - itemCenterX;
        const offsetY = event.clientY - itemCenterY;

        const maxRotation = 30; // Maximum rotation in degrees

        const rotateX = ((offsetY / rect.height) * maxRotation * -1).toFixed(2);
        const rotateY = ((offsetX / rect.width) * maxRotation).toFixed(2);

        this.transform = `perspective(500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1, 1, 1)`;
      },
      resetTransform() {
        this.transform = 'perspective(500px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      },
    },
  };
  </script>

  <style scoped>
  .card-image{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 10vh;
  }

  hr{
    width: 80%;
    margin-top: 0px;
    margin-bottom: 0px;
  }

  .card-body {
    display: -webkit-box;            
    -webkit-box-orient: vertical;    
    -webkit-line-clamp: 5; 
    height: 150px;  
    overflow: hidden;  
    text-overflow: ellipsis;

    line-clamp: 5;                  
    box-orient: vertical; 
  }

  .card-title{
    font-size: 15px;
  }

  .card-text{
    font-size: 12px;
  }

  .card{
    cursor: pointer;
    transition: transform 0.1s ease-out;
    transform-style: preserve-3d;
    text-align: center;
    border: 1px solid #D3D3D3;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 0.5rem; 
    display: flex;
    justify-content: center;
    align-items: center;
  }
  </style>

  