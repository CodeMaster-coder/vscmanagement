<template>
    <div class="queryMidPage_linebox">
      <div class="queryMidPage_bigonebox" @click="naviToQueryGiveout">
        <div class="queryMidPage_smallicon">
          <img :src="require('@/assets/发放查询.png')" alt="Query Icon" mode="" />
        </div>
        <div class="queryMidPage_smalltext">
          工具维修历史(tool maintain history)
        </div>
      </div>
      <div class="queryMidPage_bigonebox" @click="naviToQuerySupply">
        <div class="queryMidPage_smallicon">
          <img :src="require('@/assets/补充资料.png')" alt="Query Icon" mode="" />
        </div>
        <div class="queryMidPage_smalltext">
          工具报废历史(tool scrap history)
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      naviToQueryGiveout() {
        // 处理发放查询的跳转逻辑
        this.$router.push('/tool/toolMaintainHistory')
      },
      naviToQuerySupply() {
        // 处理补库查询的跳转逻辑
        this.$router.push('/tool/toolScrapHistory')
      }
    }
  };
  </script>
  
  <style scoped>
  @import url('./toolStatusQueryMidpage.css')
  </style>
  