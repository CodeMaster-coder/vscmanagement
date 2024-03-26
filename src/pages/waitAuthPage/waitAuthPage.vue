<template>  
    <div class="bigBox">  
      <div class="waitbox">  
        请耐心等待审核通过！  
      </div>  
    </div>  
  </template>  
    
  <script>  
  export default {  

  }  
  </script>  
    
  <style scoped>  

.bigbox {  
    position: relative;  
  height: 100vh; /* 设置容器高度为视口高度 */  
}  
.waitbox {  
    position: absolute;  
  top: 50%;  
  left: 50%;  
  transform: translate(-50%, -50%); /* 将div自身的中心点移动到其父容器的中心点 */ 
  width: 200px;
	height: 200px;
	background-color: #a1cde2;
	/* margin-top: 200px; */
	line-height: 200px;
	text-align: center;
	border-radius: 50px;

}  
  </style>