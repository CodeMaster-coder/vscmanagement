<template>
    <div>
      <div class="image-container">
        <div class="background-image-container">
          <img class="background-image" :src="require('@/assets/EVKB-Management System.png')" alt="Background Image">
        </div>
        <div class="floating-image-container">
          <img class="floating-image" :src="require('@/assets/vsc.png')" alt="Floating Image">
        </div>
      </div>
  
      <div class="linebox">
        <div class="bigonebox">
          <div class="smallicon">
            <img :src="require('@/assets/storage.png')" alt="Storage Icon" @click="naviToStorage">
          </div>
          <div class="smalltext">
            工具库存管理(tool storage)
          </div>
        </div>
        <div class="bigonebox" @click="naviToGiveout">
          <div class="smallicon">
            <img :src="require('@/assets/使用状态-01.png')" alt="Giveout Icon">
          </div>
          <div class="smalltext">
            工具状态管理(tool status)
          </div>
        </div>
      </div>
    </div>
  </template>


<script>
import store from '@/store';
export default {

  beforeRouteLeave(to,from,next){
        if(to.name == 'supplyPage'){
          if(store.getters.auth > 1){
            next()
          }else{
            this.$message.error('你没有权限！')
          }
        }else{
          next()
        }
    },

  methods: {
    // getData1(){
    //     this.$axios
    //     .get('/glue/login/?demo=queryStorage')
    //     .then(res =>{
    //       console.log(res);
    //     });
    // },
    naviToStorage() {
      // 处理点击库存图标的逻辑
      this.$router.push('/tool/toolstoragemainpage')
    },
    naviToGiveout() {
      // 处理点击审批图标的逻辑
      this.$router.push('/tool/toolstatusmainpage')
    },
 
  },

  
};
</script>

<style scoped>
/* 在这里添加样式规则，以适应Vue的样式语法 */
    /* pages/mainpage/mainpage.css */

page {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
}

.image-container {
  position: relative;
  width: 100%;
  height: 350rpx;
  /* border-bottom: 1rpx solid #1296da; */
}

.background-image-container {
  width: 100%;
  height: 100%;
}

.background-image {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 保持图像比例，覆盖整个区域 */
}

.floating-image-container {
  position: absolute;
  top: 0;
  right: 0;
}

.floating-image {
  width: 50px; /* 调整悬浮图片的宽度 */
  height: 50px; /* 调整悬浮图片的高度 */
}

.linebox {
  width: 100%;
  display: flex;
  flex-direction: row;
}

.bigonebox {
  width: 50%;
  display: flex;
  flex-direction: column;
}

.smallicon {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.smallicon img {
  width: 200rpx;
  height: 200rpx;
}

.smalltext {
  text-align: center;
}

</style>

