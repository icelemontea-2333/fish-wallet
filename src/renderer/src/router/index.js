//配置路由的地方
import { createRouter,createWebHashHistory } from 'vue-router'
import Index from '@renderer/views/Index/index.vue'
import Record from '@renderer/views/Record/index.vue'
import Item from '@renderer/views/Item/index.vue'
import Shop from '@renderer/views/Shop/index.vue'
import System from '@renderer/views/System/index.vue'

const showMenu = {

}

//普通信息
const common = {
    isCommand:false
}

//定义路由信息
const routes = [
    {
        name:'index',
        path:"/index",
        component: Index,
        meta:{...showMenu,...common,title:'敲敲喵'},
        alias:"/"
    },
    {
        name:'record',
        path:"/record",
        component: Record,
        meta:{...showMenu,...common,title:'记录喵'},
    },
    {
        name:'item',
        path:"/item",
        component: Item,
        meta:{...showMenu,...common,title:'包裹喵'},
    },
    {
        name:'shop',
        path:"/shop",
        component: Shop,
        meta:{...showMenu,...common,title:'小卖部喵'},
    },
    {
        name:'system',
        path:"/system",
        component: System,
        meta:{...showMenu,...common,isCommand:true,title:'系统设置喵'},
    }
]

//创建路由实例并传递routes配置
//注意：url中不带#
const router = createRouter({
    history:createWebHashHistory(),
    routes,
})

//全局路由守卫
router.beforeEach(async (to,from)=>{
    //设置标题
    document.title = to.meta.title;
    return true;
})

//将路由实例导出
export default router