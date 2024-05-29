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
          <div class="label1">旧密码</div>
          <div class="label2">(Old password):</div>
        </div>
        <input v-model="password" type="password" placeholder="请输入旧密码" class="input-box">
      </div>
  
      <!-- 确认密码输入行 -->
      <div class="input-row">
        <div class="label">
          <div class="label1">新密码</div>
          <div class="label2">(New passwpord):</div>
        </div>
        <input v-model="newPassword" type="password" placeholder="请确认密码" class="input-box">
      </div>

      <div class="input-row">
        <div class="label">
          <div class="label1">确认新密码</div>
          <div class="label2">(Confirm new passwpord):</div>
        </div>
        <input v-model="confirmNewPassword" type="password" placeholder="请确认新密码" class="input-box">
      </div>
  
      <!-- 注册按钮 -->
      <button @click="register" class="register-button">重设密码(Password reset)</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: null,
        password: null,
        newPassword:null,
        confirmNewPassword: null
      };
    },
    methods: {
      register() {
        if(this.newPassword != this.confirmNewPassword){
          this.$message.error('新密码两次输入不一致，请重新输入(The new password entered twice does not match. Please re-enter it)！')
        }else{
          this.$axios.post(
              '/glue/login/',
              {
                  demo:'resetPassword',
                  username: this.username,
                  password: this.password,
                  newPassword:this.newPassword,
                  confirmNewPassword: this.confirmNewPassword
              },
              {headers:{
                  'Content-Type': 'application/json',
              }}
          ).then(
              response => {
                  console.log(response.data);
                  if(response.data.status == 'OK'){
                    this.username = null
                    this.password = null
                    this.newPassword = null
                    this.confirmNewPassword = null
                    this.$message.success('密码重设成功，请返回登陆！(Password reset successful, please return to login!)')
                  }else if(response.data.status == 'wrong'){
                    this.$message.error('旧的用户名或密码输入错误，请重试！(Old username or password entered incorrectly, please try again)')
                  }
                  else{
                    this.$message.error('密码重设失败，请重试！(Password reset failed, please try again!)')
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
  