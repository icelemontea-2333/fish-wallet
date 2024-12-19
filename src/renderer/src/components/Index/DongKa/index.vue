<template>
    <div class="dong-ka-container u-s-t-n">
        <!-- taiko -->
        <div class="taiko-container" :class="{'taiko-container-idle':!appData.event.isKeyDown && dongKaData.timer == null,'taiko-container-click':appData.event.isKeyDown}">
            <template v-if="!appData.event.isKeyDown">
                <img src="/images/dong-ka/taiko.png">
            </template>
            <template v-else-if="dongKaData.dongKaType == 0">
                <template v-if="Math.random() < 0.5">
                    <img src="/images/dong-ka/taiko-dong-1.png">
                </template>
                <template v-else>
                    <img src="/images/dong-ka/taiko-dong-2.png">
                </template>
            </template>
            <template v-else-if="dongKaData.dongKaType == 1">
                <template v-if="Math.random() < 0.5">
                    <img src="/images/dong-ka/taiko-ka-1.png">
                </template>
                <template v-else>
                    <img src="/images/dong-ka/taiko-ka-2.png">
                </template>
            </template>
        </div>
        <!-- 杠杠 -->
         <div class="taiko-line"/>
        <!-- 背景 -->
        <div class="background-container">
            <img src="/images/dong-ka/background.png">
        </div>
        <!-- 背景特效 -->
        <section class="particle-container">
            <div class="particle" style="--x:4;--y:4;--t:.75;--d:.5"></div>
            <div class="particle" style="--x:4;--y:4;--t:.75;--d:1.5"></div>
            <div class="particle" style="--x:-4;--y:-4;--t:.75;--d:.35"></div>
            <div class="particle" style="--x:-2;--y:-2;--t:.75;--d:1.25"></div>
            <div class="particle" style="--x:4;--y:4;--t:.75;--d:.45"></div>
            <div class="particle" style="--x:-4;--y:-4;--t:.75;--d:.75"></div>
            <div class="particle" style="--x:4;--y:4;--t:.75;--d:.55"></div>
            <div class="particle" style="--x:4;--y:4;--t:.75;--d:.25"></div>
        </section>
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

    import audioDong from '/audios/dong-ka/dong.mp3'
    import audioKa from '/audios/dong-ka/ka.mp3'

    const globalStore = useStore().global;
    const appData = inject('appData');

    const dongKaData = reactive({
        dongKaType:0,
        idleTimer:null,
        volume:0.15,
        //敲击时更偏侧于dong的权重
        weight:0.5
    })

    onMounted(()=>{
        globalStore.event.oncontinuekeydown = (_event, value, event) => {
            fishNeko.$().$(
                fishNeko.fishNeko().$(
                    fishNeko.$("dong-ka-pop u-s-t-n","img").$(($)=>{
                        const rd = Math.random();
                        if(rd < dongKaData.weight){
                            const sound = new Audio(audioDong);
                            sound.volume = dongKaData.volume;
                            sound.play();
                            dongKaData.dongKaType = 0;
                            $.setSrc(imageDong);
                        }else{
                            const sound = new Audio(audioKa);
                            sound.volume = dongKaData.volume;
                            sound.play();
                            dongKaData.dongKaType = 1;
                            $.setSrc(imageKa);
                        }
                        $.value.style.right = `${(Math.random() * 50 + 15) * fishNeko.proportion(16)}px`
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
        globalStore.event.oncontinuekeydown = null
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
        .particle-container{
            opacity: .75;
            margin-left: 15px;
            div:nth-child(1){
                margin-top: 120px;
                margin-left: 125px;
                background: rgba(207, 69, 69);
            }
            div:nth-child(2){
                margin-top: 150px;
                margin-left: 100px;
                background: rgba(74, 166, 182);
            }
            div:nth-child(3){
                margin-top: 150px;
                margin-left: 150px;
                background: rgba(207, 69, 69);
            }
            div:nth-child(4){
                margin-top: 165px;
                margin-left: 200px;
                background: rgba(74, 166, 182);
            }
            div:nth-child(5){
                margin-top: 180px;
                margin-left: 75px;
                background: rgba(74, 166, 182);
            }
            div:nth-child(6){
                margin-top: 180px;
                margin-left: 125px;
                background: rgba(207, 69, 69);
            }
            div:nth-child(7){
                margin-top: 200px;
                margin-left: 150px;
                background: rgba(207, 69, 69);
            }
            div:nth-child(8){
                margin-top: 210px;
                margin-left: 100px;
                background: rgba(74, 166, 182);
            }
            .particle{
                position: absolute;
                border: rgba(255, 255, 255) 2px solid;
                // background: v-bind("dongKaData.dongKaType == 0 ? 'rgba(207, 69, 69)' : 'rgba(74, 166, 182)'");
                border-radius: 2.5px;
                width: 10px;
                height: 10px;
                rotate: 45deg;
                animation: animation-particle-move calc(var(--t) * 1s) calc(var(--d) * 1s) infinite,
                animation-particle-size 1s infinite;
                @keyframes animation-particle-move {
                    50%{
                        transform: translate(calc(var(--x) * 1px),calc(var(--y) * 1px));
                    }
                }
                @keyframes animation-particle-size {
                    0%,30%{
                        scale: 1;
                        box-shadow: 0 0 rgba(255,255,255,0);
                    }
                    50%{
                        scale: 1.05;
                        box-shadow: 0 0 15px rgba(255,255,255,.5);
                    }
                    75%,100%{
                        scale: 1;
                        box-shadow: 0 0 rgba(255,255,255,0);
                    }
                }
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