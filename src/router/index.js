// 1.导入vue 、 路由模块 和 登录组件模块
import Vue from "vue"
import Router from 'vue-router'
import Login from '@/components/Login.vue'
import Helloworld from '@/components/HelloWorld.vue'
import mainpage from '@/pages/mainpage/mainpage.vue'
import storagepage from '@/pages/storagepage/storagepage.vue'
import approvePage from '@/pages/approvePage/approvePage.vue'
import giveoutRequestpage from '@/pages/giveoutRequestpage/giveoutRequestpage.vue'
import loginPage from '@/pages/loginPage/loginPage.vue'
import signupPage from '@/pages/signupPage/signupPage.vue'
import waitAuthPage from '@/pages/waitAuthPage/waitAuthPage.vue'
import supplyPage from '@/pages/supplyPage/supplyPage.vue'
import queryMidPage from '@/pages/queryMidPage/queryMidPage.vue'
import queryGiveoutpage from '@/pages/queryGiveoutpage/queryGiveoutpage.vue'
import querySupplypage from '@/pages/querySupplypage/querySupplypage.vue'
import store from '@/store'; // 导入 Vuex store

// 2.全局注册路由
Vue.use(Router)


// 3.配置路由规则
const router = new Router({
    // mode: 'hash',
    routes:[
        {
            name:'mainpage',
            path:'/mainpage',
            component:mainpage,
            meta: { title: '主页', requiresAuth: true }
        },
        {
            path:'/storagepage',
            component:storagepage,
            meta: { title: '库存', requiresAuth: true }
        },
        {
            path: '/login',
            component: Login
        },
        {
            path:'/Helloworld',
            component:Helloworld
        },
        {
            name:'approvePage',
            path:'/approvePage',
            component:approvePage,
            meta: { title: '审批', requiresAuth: true }
        },
        {
            name:'giveoutRequestpage',
            path:'/giveoutRequestpage',
            component:giveoutRequestpage,
            meta: { title: '发放', requiresAuth: true }
        },
        {
            name:'loginPage',
            path:'/',
            component:loginPage,
            meta: { title: '登录' }
        },
        {
            name:'signupPage',
            path:'/signupPage',
            // component: () => import ('@/pages/signupPage/signupPage.vue'),
            component:signupPage,
            meta: { title: '注册' }
        },
        {
            name:'waitAuthPage',
            path:'/waitAuthPage',
            component:waitAuthPage,
            meta: { title: '等待审批', requiresAuth: true }
        },
        {
            name:'supplyPage',
            path:'/supplyPage',
            component:supplyPage,
            meta: { title: '补库', requiresAuth: true }
        },
        {
            name:'queryMidPage',
            path:'/queryMidPage',
            component:queryMidPage,
            meta: { title: '查询中间页', requiresAuth: true }
        },
        {
            name:'queryGiveoutpage',
            path:'/queryGiveoutpage',
            component:queryGiveoutpage,
            meta: { title: '发放查询', requiresAuth: true }
        },
        {
            name:'querySupplypage',
            path:'/querySupplypage',
            component:querySupplypage,
            meta: { title: '补库查询', requiresAuth: true }
        },


]
})


// 针对ElementUI导航栏中重复导航报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

router.beforeEach((to, from, next) => {
    console.log('Before each navigation');
  console.log('To route:', to);

    

    // 在每次导航之前设置页面标题
    document.title = to.meta.title || 'Default Title';

    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  const isLogin = store.getters.isLogin;

  const auth = store.getters.auth;

  console.log(isLogin, auth)

  if (requiresAuth) {  

    // 如果目标路由需要认证  

    if (!isLogin) {  
            next('/')   
      } else{
        next()
      }

  } else {  

    // 目标路由不需要认证，直接通过  


        next()
 

  }  




    
    

    
  });



// 4.导出路由对象
export default router
