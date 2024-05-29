// 1.导入vue 、 路由模块 和 登录组件模块
import toolMainpage from '@/pages/toolPages/toolMainpage/toolMainpage.vue'
import toolstoragepage from '@/pages/toolPages/toolstoragepage/storagepage.vue'
import toolapprovePage from '@/pages/toolPages/toolapprovePage/approvePage.vue'
import toolgiveoutRequestpage from '@/pages/toolPages/toolgiveoutRequestpage/giveoutRequestpage.vue'
import toolsupplyPage from '@/pages/toolPages/toolsupplyPage/supplyPage.vue'
import toolstoragemainpage from '@/pages/toolPages/toolstoragemainpage/toolstoragemainpage.vue'
import toolqueryMidPage from '@/pages/toolPages/toolqueryMidPage/queryMidPage.vue'
import toolqueryGiveoutpage from '@/pages/toolPages/toolqueryGiveoutpage/queryGiveoutpage.vue'
import toolquerySupplypage from '@/pages/toolPages/toolquerySupplypage/querySupplypage.vue'
import toolstatusmainpage from '@/pages/toolPages/toolstatusmainpage/toolstatusmainpage.vue'
import tooluserstatus from '@/pages/toolPages/toolUserStatus/toolUserStatus.vue'
import toolMaintainRequestPage from '@/pages/toolPages/toolMaintainRequestPage/toolMaintainRequestPage.vue'
import toolMaintainStatusUpdate from '@/pages/toolPages/toolMaintainStatusUpdate/toolMaintainStatusUpdate.vue'
import toolMaintainStatusConfirm from '@/pages/toolPages/toolMaintainStatusConfirm/toolMaintainStatusConfirm.vue'
import toolScrapApprovePage from '@/pages/toolPages/toolScrapApprovePage/toolScrapApprovePage.vue'
import toolScrapRequest from '@/pages/toolPages/toolScrapRequest/toolScrapRequest.vue'
import toolStatusQueryMidpage from '@/pages/toolPages/toolStatusQueryMidpage/toolStatusQueryMidpage.vue'
import toolMaintainHistory from '@/pages/toolPages/toolMaintainHistory/toolMaintainHistory.vue'
import toolScrapHistory from '@/pages/toolPages/toolScrapHistory/toolScrapHistory.vue'
import toolMaintainApprove from '@/pages/toolPages/toolMaintainApprove/toolMaintainApprove.vue'
import toolMaintainStatusUpdateDetail from '@/pages/toolPages/toolMaintainStatusUpdateDetail/toolMaintainStatusUpdateDetail.vue'

// 3.配置路由规则
const router = [
    {
        name:'toolMainpage',
        path:'/tool/toolMainpage',
        component:toolMainpage,
        meta: { title: '工具主页', requiresAuth: true }
    },
    {
        name:'toolstoragemainpage',
        path:'/tool/toolstoragemainpage',
        component:toolstoragemainpage,
        meta: { title: '工具库存管理主页', requiresAuth: true }
    },
    {
        path:'/tool/storagepage',
        component:toolstoragepage,
        meta: { title: '工具库存', requiresAuth: true }
    },
    {
        name:'toolapprovePage',
        path:'/tool/approvePage',
        component:toolapprovePage,
        meta: { title: '工具审批', requiresAuth: true }
    },
    {
        name:'toolGiveoutRequestpage',
        path:'/tool/giveoutRequestpage',
        component:toolgiveoutRequestpage,
        meta: { title: '工具发放', requiresAuth: true }
    },
    {
        name:'toolsupplyPage',
        path:'/tool/supplyPage',
        component:toolsupplyPage,
        meta: { title: '工具补库', requiresAuth: true }
    },
    {
        name:'toolqueryMidPage',
        path:'/tool/queryMidPage',
        component:toolqueryMidPage,
        meta: { title: '工具查询中间页', requiresAuth: true }
    },
    {
        name:'toolqueryGiveoutpage',
        path:'/tool/queryGiveoutpage',
        component:toolqueryGiveoutpage,
        meta: { title: '工具发放查询', requiresAuth: true }
    },
    {
        name:'toolquerySupplypage',
        path:'/tool/querySupplypage',
        component:toolquerySupplypage,
        meta: { title: '工具补库查询', requiresAuth: true }
    },
    {
        name:'toolstatusmainpage',
        path:'/tool/toolstatusmainpage',
        component:toolstatusmainpage,
        meta: { title: '工具状态管理主页', requiresAuth: true }
    },
    {
        name:'toolUserStatus',
        path:'/tool/toolUserStatus',
        component:tooluserstatus,
        meta: { title: '个人工具库存', requiresAuth: true }
    },
    {
        name:'toolMaintainRequestPage',
        path:'/tool/toolMaintainRequestPage',
        component:toolMaintainRequestPage,
        meta: { title: '个人工具维修申请', requiresAuth: true }
    },
    {
        name:'toolMaintainStatusUpdate',
        path:'/tool/toolMaintainStatusUpdate',
        component:toolMaintainStatusUpdate,
        meta: { title: '工具维修状态', requiresAuth: true }
    },
    {
        name:'toolMaintainStatusConfirm',
        path:'/tool/toolMaintainStatusConfirm',
        component:toolMaintainStatusConfirm,
        meta: { title: '工具维修确认', requiresAuth: true }
    },
    {
        name:'toolScrapApprovePage',
        path:'/tool/toolScrapApprovePage',
        component:toolScrapApprovePage,
        meta: { title: '工具报废审批', requiresAuth: true }
    },
    {
        name:'toolScrapRequest',
        path:'/tool/toolScrapRequest',
        component:toolScrapRequest,
        meta: { title: '工具报废申请', requiresAuth: true }
    },
    {
        name:'toolStatusQueryMidpage',
        path:'/tool/toolStatusQueryMidpage',
        component:toolStatusQueryMidpage,
        meta: { title: '工具状态查询中间页', requiresAuth: true }
    },
    {
        name:'toolMaintainHistory',
        path:'/tool/toolMaintainHistory',
        component:toolMaintainHistory,
        meta: { title: '工具维修历史页', requiresAuth: true }
    },
    {
        name:'toolScrapHistory',
        path:'/tool/toolScrapHistory',
        component:toolScrapHistory,
        meta: { title: '工具报废历史页', requiresAuth: true }
    },
    {
        name:'toolMaintainApprove',
        path:'/tool/toolMaintainApprove',
        component:toolMaintainApprove,
        meta: { title: '工具维修审批页', requiresAuth: true }
    },
    {
        name:'toolMaintainStatusUpdateDetail',
        path:'/tool/toolMaintainStatusUpdateDetail',
        component:toolMaintainStatusUpdateDetail,
        meta: { title: '工具维修状态更新页', requiresAuth: true }
    },
]




// 4.导出路由对象
export default router
