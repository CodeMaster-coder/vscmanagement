<template>
    <div class="queryMidPage_linebox">
      <div class="queryMidPage_bigonebox" @click="naviToQueryGiveout">
        <div class="queryMidPage_smallicon">
          <img :src="require('@/assets/发放查询.png')" alt="Query Icon" mode="" />
        </div>
        <div class="queryMidPage_smalltext">
          耗材发放查询(material giveout Query)
        </div>
      </div>
      <div class="queryMidPage_bigonebox" @click="naviToQuerySupply">
        <div class="queryMidPage_smallicon">
          <img :src="require('@/assets/补充资料.png')" alt="Query Icon" mode="" />
        </div>
        <div class="queryMidPage_smalltext">
          耗材补库查询(material supply Query)
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      naviToQueryGiveout() {
        // 处理发放查询的跳转逻辑
        this.$router.push('/material/queryGiveoutpage')
      },
      naviToQuerySupply() {
        // 处理补库查询的跳转逻辑
        this.$router.push('/material/querySupplypage')
      }
    }
  };
  </script>
  
  <style scoped>
  @import url('./queryMidPage.css')
  </style>
  