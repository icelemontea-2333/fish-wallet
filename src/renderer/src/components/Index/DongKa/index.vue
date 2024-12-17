<template>
    <div class="dong-ka-container u-s-t-n">
        <!-- taiko -->
        <div class="taiko-container" :class="{'taiko-container-idle':!appData.event.isKeyDown && dongKaData.timer == null,'taiko-container-click':appData.event.isKeyDown}">
            <img v-if="!appData.event.isKeyDown" src="/images/dong-ka/taiko.png">
            <img v-else-if="dongKaData.dongKaType == 0" src="/images/dong-ka/taiko-dong.png">
            <img v-else-if="dongKaData.dongKaType == 1" src="/images/dong-ka/taiko-ka.png">
        </div>
        <!-- 杠杠 -->
         <div class="taiko-line"/>
        <!-- 背景 -->
        <div class="background-container">
            <img src="/images/dong-ka/background.png">
        </div>
        <!-- 钱钱记录 -->
        <section class="record-container u-s-t-n">
            <span class="count-panel">{{ appData.event.isKeyDown ? '●' : '◎' }} {{ compute(globalStore.global.nekoCoin,'♪') }}</span>
            <span class="count-panel">❉ {{ globalStore.global.accumulatedCoin.toFixed(3) }}</span>
        </section>
    </div>
</template>

<script setup>
    import { onMounted,reactive,ref,computed,inject,onBeforeUnmount } from 'vue';
    import { fishNeko } from 'fish-neko'
    import { compute } from '@renderer/utils/compute-unit'
    import useStore from '@renderer/store'
    
    import imageDong from '/images/dong-ka/dong.png'
    import imageKa from '/images/dong-ka/ka.png'

    const globalStore = useStore().global;
    const appData = inject('appData');

    const dongKaData = reactive({
        dongKaType:0,
        idleTimer:null,
        volume:0.2
    })

    onMounted(()=>{
        globalStore.event.onanykeydown = (_event, value, event) => {
            fishNeko.$().$(
                fishNeko.fishNeko().$(
                    fishNeko.$("dong-ka-pop u-s-t-n","img").$((self)=>{
                        const rd = Math.random() * 2;
                        if(rd < 1.35){
                            const sound = new Audio("/audios/dong-ka/dong.mp3");
                            sound.volume = dongKaData.volume;
                            sound.play();
                            dongKaData.dongKaType = 0;
                            self.setSrc(imageDong);
                        }else{
                            const sound = new Audio("/audios/dong-ka/ka.mp3");
                            sound.volume = dongKaData.volume;
                            sound.play();
                            dongKaData.dongKaType = 1;
                            self.setSrc(imageKa);
                        }
                        self.value.style.right = `${(Math.random() * 50 + 15) * fishNeko.proportion(16)}px`
                    })
                ).destroy(4000)
            )
            if(dongKaData.timer != null){
                clearTimeout(dongKaData.timer)
                dongKaData.timer = null
            }
            dongKaData.timer = setTimeout(() => {
                dongKaData.timer = null
            }, 2000);
        }
        globalStore.event.onkeyup = (_event, value, event) => {
            
        }
    })

    onBeforeUnmount(()=>{
        globalStore.event.onkeydown = null
        globalStore.event.onanykeydown = null
        globalStore.event.onkeyup = null
        if(dongKaData.timer != null){
            clearTimeout(dongKaData.timer)
            dongKaData.timer = null
        }
    })

</script>

<style lang="scss" scoped>
    .dong-ka-container{
        .taiko-container{
            position: absolute;
            margin-top: 135px;
            margin-left: 15px;
            z-index: 2;
            img{
                width: 60px;
                height: 60px;
            }
        }
        .taiko-container-idle{
            animation: animation-taiko-idle .75s infinite;
        }
        .taiko-container-click{
            transform: translateY(5px);
        }
        @keyframes animation-taiko-idle {
            0%,40%{
                transform: translateY(0);
            }
            50%{
                transform: translateY(5px);
            }
            60%,100%{
                transform: translateY(0);
            }
        }
        .taiko-line{
            position: absolute;
            width: 80px;
            height: 70px;
            margin-top: 135px;
            margin-left: 10px;
            border-right: rgba(255,255,255,.5) 1px dashed;
        }
        .background-container{
            position: absolute;
            overflow: hidden;
            margin-top: 35px;
            border-top: rgba(255,255,255,.5) 1px solid;
            border-bottom: rgba(255,255,255,.5) 1px solid;
            background: v-bind("dongKaData.dongKaType == 0 ? 'rgba(146, 14, 14, 0.5)' : 'rgba(38, 112, 172, 0.5)'");
            width: 100%;
            height: 15px;
            box-sizing: border-box;
            pointer-events: none;
            height: 90px;
            img{
                margin-top: 5px;
                height: 80px;
                object-fit: cover;
                object-position: 10% 80%;
                width: 100vw;
            }
        }
        .record-container{
            position: absolute;
            font-family: 'Uranus_Pixel';
            color: rgba(255,255,255,1);
            bottom: 5px;
            margin-left: 13px;
            .count-panel{
                border-bottom: rgba(255,255,255,1) solid 1px;
                padding: 1px 5px;
                width: auto;
            }
        }
    }
</style>

<style lang="scss">
    .fish-neko{
        .dong-ka-pop{
            height: 20px;
            width: 20px;
            position: fixed;
            right: 50px;
            animation: animation-dong-ka-pop-move-20241292214 4s forwards;
            @keyframes animation-dong-ka-pop-move-20241292214 {
                0%{
                    bottom: 25px;
                    opacity: 1;
                }
                100%{
                    bottom: calc(100% - 50px);
                    opacity: 0;
                }
            }
        }
    }
</style>