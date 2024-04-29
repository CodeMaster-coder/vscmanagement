// 1.导入vue 、 路由模块 和 登录组件模块
import materialmainpage from '@/pages/materialPages/materialmainpage/materialmainpage.vue'
import storagepage from '@/pages/materialPages/storagepage/storagepage.vue'
import approvePage from '@/pages/materialPages/approvePage/approvePage.vue'
import giveoutRequestpage from '@/pages/materialPages/giveoutRequestpage/giveoutRequestpage.vue'
import supplyPage from '@/pages/materialPages/supplyPage/supplyPage.vue'
import queryMidPage from '@/pages/materialPages/queryMidPage/queryMidPage.vue'
import queryGiveoutpage from '@/pages/materialPages/queryGiveoutpage/queryGiveoutpage.vue'
import querySupplypage from '@/pages/materialPages/querySupplypage/querySupplypage.vue'
// import store from '@/store'; // 导入 Vuex store



// 3.配置路由规则
const router = [
        {
            name:'materialmainpage',
            path:'/material/materialmainpage',
            component:materialmainpage,
            meta: { title: '耗材主页', requiresAuth: true }
        },
        {
            path:'/material/storagepage',
            component:storagepage,
            meta: { title: '耗材库存', requiresAuth: true }
        },
        {
            name:'approvePage',
            path:'/material/approvePage',
            component:approvePage,
            meta: { title: '耗材审批', requiresAuth: true }
        },
        {
            name:'giveoutRequestpage',
            path:'/material/giveoutRequestpage',
            component:giveoutRequestpage,
            meta: { title: '耗材发放', requiresAuth: true }
        },
        {
            name:'supplyPage',
            path:'/material/supplyPage',
            component:supplyPage,
            meta: { title: '耗材补库', requiresAuth: true }
        },
        {
            name:'queryMidPage',
            path:'/material/queryMidPage',
            component:queryMidPage,
            meta: { title: '耗材查询中间页', requiresAuth: true }
        },
        {
            name:'queryGiveoutpage',
            path:'/material/queryGiveoutpage',
            component:queryGiveoutpage,
            meta: { title: '耗材发放查询', requiresAuth: true }
        },
        {
            name:'querySupplypage',
            path:'/material/querySupplypage',
            component:querySupplypage,
            meta: { title: '耗材补库查询', requiresAuth: true }
        },


]




// 4.导出路由对象
export default router
