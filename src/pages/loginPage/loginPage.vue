<template>
 <div class="login-container">
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

    <!-- 注册行 -->
    <div class="register-row">
      <div class="register-link" @click = 'naviToSignuppage'>
        <span class="register-text">没有账号？注册(Sigh up)</span>
      </div>
    </div>

    <!-- 登录按钮 -->
    <button @click="login" class="login-button">登录</button>
  </div>

  </template>
  
  <script>
  import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
  export default {
    data() {
      return {
        username: '',
        password: '',

      };
    },

        

   
  methods: {
      ...mapActions(['setUserInfo']), 
    async login() {

         try {
    const response = await this.$axios.post('/glue/login/', {
      demo: 'queryLogin',
      username: this.username,
      password: this.password,
    });
    console.log(response.data);
    

    // 登录成功后，获取服务器返回的用户信息或其他数据
    // const userInfo = response.data;
    
    if(response.data.length == 0){
      await this.setUserInfo({isLogin:false, auth:false});
      this.$message('密码或用户名输入错误！')
    }else{
      await this.setUserInfo({isLogin:true, auth:response.data[0].auth,  username: this.username});
    }
// 等待 setUserInfo 方法执行完毕


if(response.data.length != 0){
  if (response.data[0].auth == 0) {
      this.$router.push('/waitAuthPage');
      // console.log(1)
    } else {
      this.$router.push('/mainpage');
      // console.log(11)
    }
}else{
  this.$router.push('/');
}

    // console.log(userInfo);

    // console.log('Before setUserInfo:', userInfo);
    
  } catch (error) {
    console.error('Login failed:', error);
    // 处理登录失败的情况
  }
         
     
    },
      naviToSignuppage(){
        this.$router.push('/signupPage')
      },
      goToRegister() {
        // 跳转到注册页面的逻辑
        // 这里使用 Vue Router 进行导航，确保你的项目中已经配置了路由
        this.$router.push('/register');
      }
    }
  };
  </script>
  
  <style scoped>
    @import url('./loginPage.css')
  </style>
  