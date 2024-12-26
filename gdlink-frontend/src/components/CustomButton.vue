<template>
    <button 
        class="square-btn"
        :style="{ backgroundColor: buttonColor }"
    >
        <div class="d-flex flex-column">
            <i :class = "buttonIcon" class="icon"></i>
            <span class = "btn-text">{{ fullName }}</span>
        </div>
    </button>
</template>
  
<script>
export default {
    props: {
        name: {
            type: String,
            required: true,
        },
    },
    computed:{
        fullName(){
            let fullName;
            switch(this.name){
                case "set-favourite": fullName = "Add to Favourites"; break;
                case "remove-favourite": fullName = "Remove Favourite"; break;
                case "edit": fullName = "Edit"; break;
                case "del": fullName = "Delete"; break;
            }
            return fullName;
        },
        buttonColor(){
            let color;
            switch(this.name){
                case "set-favourite": color = "#C70505"; break;
                case "remove-favourite": color = "#1582FF"; break;
                case "edit": color = "#FCCF3A"; break;
                case "del": color = "#1582FF"; break;
            }
            return color;
        },
        buttonIcon(){
            let icon;
            switch(this.name){
                case "set-favourite": icon = 'bi bi-heart-fill'; break;
                case "remove-favourite": icon = 'bi bi-heartbreak-fill'; break;
                case "edit": icon = 'bi bi-pencil-square'; break;
                case "del": icon = 'bi bi-trash3'; break;
            }
            return icon;
        }
    },
};
</script>
  
<style scoped>
.square-btn {
  width: 120px; 
  height: 120px; 
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff; 
  border: none; 
  border-radius: 5px; 
  cursor: pointer; 
  transition: transform 0.3s;
}

.square-btn:hover{
    transform: scale(1.1);
}

.square-btn:active{
    transform: scale(0.95); 
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); 
}

.icon {
  font-size: 30px; 
  color: white;
  font-weight: bold;
} 

.btn-text {
  font-size: 15px; 
  color: white;
  font-weight: bold;
} 
</style>
  
  