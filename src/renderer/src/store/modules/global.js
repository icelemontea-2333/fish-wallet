import { defineStore } from 'pinia'
import { reactive } from 'vue'
 
const useGlobal = defineStore('global',()=>{
    //小钱钱
    const global = reactive(
        {
            //上次敲击时间
            updateTime:new Date().getTime(),
            //金币
            coin:10000,
            //累计金币
            accumulatedCoin:0,
            //天/周（默认30天）
            day:5,
            //小时/天
            hour:8,
            //喵喵币
            nekoCoin:0,
            //皮肤类型
            type:0,
            //包裹
            item:{
                taiko:false
            }
        }
    )

    const event = reactive({
        //有间隔且无法触发ctrl和shift 可持续触发 可接收第三个event参数（coin增加事件）
        onkeydown:null,
        //无间隔 可接收第三个event参数（nekoCoin增加事件）
        onanykeydown:null,
        //无间隔
        onkeyup:null,
    })

    const win = reactive({
        origin:null,
        command:null
    })

    return{
        global,event,win
    }
})
 
export default useGlobal