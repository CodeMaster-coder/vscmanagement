<template>
    <div class="queryMidPage_linebox">
      <div class="queryMidPage_bigonebox" @click="naviToQueryGiveout">
        <div class="queryMidPage_smallicon">
          <img :src="require('@/assets/发放查询.png')" alt="Query Icon" mode="" />
        </div>
        <div class="queryMidPage_smalltext">
          工具发放查询(tool giveout Query)
        </div>
      </div>
      <div class="queryMidPage_bigonebox" @click="naviToQuerySupply">
        <div class="queryMidPage_smallicon">
          <img :src="require('@/assets/补充资料.png')" alt="Query Icon" mode="" />
        </div>
        <div class="queryMidPage_smalltext">
          工具补库查询(tool supply Query)
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      naviToQueryGiveout() {
        // 处理发放查询的跳转逻辑
        this.$router.push('/tool/queryGiveoutpage')
      },
      naviToQuerySupply() {
        // 处理补库查询的跳转逻辑
        this.$router.push('/tool/querySupplypage')
      }
    }
  };
  </script>
  
  <style scoped>
  @import url('./queryMidPage.css')
  </style>
  