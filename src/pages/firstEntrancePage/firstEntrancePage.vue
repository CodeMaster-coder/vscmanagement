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
            <img :src="require('@/assets/耗材费.png')" alt="Storage Icon" @click="naviToMaterial">
          </div>
          <div class="smalltext">
            耗材(material)
          </div>
        </div>
        <div class="bigonebox" @click="naviToTool">
          <div class="smallicon">
            <img :src="require('@/assets/wxb工具.png')" alt="Giveout Icon">
          </div>
          <div class="smalltext">
            工具(tool)
          </div>
        </div>
      </div>
  

    </div>
  </template>


<script>
import store from '@/store';
export default {

  methods: {
    naviToMaterial() {
      // 处理点击库存图标的逻辑
      this.$router.push('/material/materialmainpage')
    },
    naviToTool() {
      // 处理点击审批图标的逻辑
      this.$router.push('/tool/toolMainpage')
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
  height: 200rpx;
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

