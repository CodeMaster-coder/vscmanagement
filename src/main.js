import Vue from 'vue'
import App from './App.vue'
//导入路由
import router from '@/router/index.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import store from './store'

axios.defaults.baseURL = '/'
axios.defaults.headers.post['Content-Type'] = 'application/json'

Vue.prototype.$axios = axios;

Vue.config.productionTip = false

Vue.use(ElementUI)

new Vue({
  router: router,
  store,
  render: h => h(App),
}).$mount('#app')
