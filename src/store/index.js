
// src/store.js  
import Vue from 'vue';  
import Vuex from 'vuex';  
  
Vue.use(Vuex);  
  
export default new Vuex.Store({  
  state: {  
    // 初始状态  
    isLogin:false,  
     auth:null,
     username:null
  },  
  mutations: {  
    // 更改状态的唯一方法  
    SET_USER_INFO(state, payload) {
      state.isLogin = payload.isLogin;
      state.auth = payload.auth;
      state.username = payload.username;
    },
  },  
  actions: {  
    // 提交 mutation，可以包含任意异步操作  
    async setUserInfo({ commit }, {isLogin,auth,username}) {  
      // 这里可以添加任何你需要的逻辑，比如验证 userInfo  
      commit('SET_USER_INFO', {isLogin,auth,username});  
    },  
  },  
  getters: {  
    // 基于 state 的计算属性，用于简化 state 的访问  
    isLogin: state => state.isLogin,  
    auth: state => state.auth,  
    username: state => state.username, 
  },  
});