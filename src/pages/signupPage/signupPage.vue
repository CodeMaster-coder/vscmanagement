<template>
    <div class="register-container">
      <!-- 用户名输入行 -->
      <div class="input-row">
        <div class="label">
          <div class="label1">用户名</div>
          <div class="label2">(User):</div>
        </div>
        <input v-model="username" type="text" placeholder="请输入用户名" class="input-box">
      </div>
  
      <!-- 密码输入行 -->
      <div class="input-row">
        <div class="label">
          <div class="label1">密码</div>
          <div class="label2">(Password):</div>
        </div>
        <input v-model="password" type="password" placeholder="请输入密码" class="input-box">
      </div>
  
      <!-- 确认密码输入行 -->
      <div class="input-row">
        <div class="label">
          <div class="label1">确认密码</div>
          <div class="label2">(Confirm):</div>
        </div>
        <input v-model="confirmPassword" type="password" placeholder="请确认密码" class="input-box">
      </div>
  
      <!-- 注册按钮 -->
      <button @click="register" class="register-button">注册</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        password: '',
        confirmPassword: ''
      };
    },
    methods: {
      register() {
        if(this.password != this.confirmPassword){
          this.$message('两次密码输入不一致，请重新输入！')
        }else{
          this.$axios.post(
              '/glue/login/',
              {
                  demo:'registerInfo',
                  username: this.username,
                  password: this.password
              },
              {headers:{
                  'Content-Type': 'application/json',
              }}
          ).then(
              response => {
                  console.log(response.data);
                  if(response.data.status){
                    this.username = null
                    this.password = null
                    this.confirmPassword = null
                    this.$router.push('/waitAuthPage')
                  }else{
                    this.$message('注册失败，请重试！')
                  }
              }
          ).catch(
              error => {
                  console.log(error)
              }
          )
        }
        // 在这里处理注册逻辑，可以调用后端接口
        console.log('注册信息:', {
          username: this.username,
          password: this.password,
          confirmPassword: this.confirmPassword
        });
      }
    }
  };
  </script>
  
  <style scoped>
    @import url('./signupPage.css')
  </style>
  