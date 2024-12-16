<template>
    <div class="wallet-container">
        <!-- 钱钱记录 -->
        <section class="record-container u-s-t-n">
            <span class="count-panel">{{ appData.event.isKeyDown ? '＿' : '︹' }} {{ compute(globalStore.global.nekoCoin,'ฅ') }}</span>
            <span class="count-panel">♡ {{ globalStore.global.accumulatedCoin.toFixed(3) }}</span>
        </section>
    </div>
</template>

<script setup>
    import { onMounted,reactive,ref,computed,inject,onBeforeUnmount } from 'vue';
    import { fishNeko } from 'fish-neko'
    import { compute } from '@renderer/utils/compute-unit'
    import useStore from '@renderer/store'

    const globalStore = useStore().global;
    const appData = inject('appData');

    //颜色最小值
    const colorMin = 175

    onMounted(()=>{
        globalStore.event.onkeydown = (_event, value, event) => {
            fishNeko.$().$(
                fishNeko.fishNeko().$(
                    fishNeko.$("coin-pop u-s-t-n","section",`+${event.coin.toFixed(3)}杂鱼♡~`).$((self)=>{
                        self.value.style.color = `rgba(${colorMin + Math.floor(Math.random() * (255 - colorMin))},${colorMin + Math.floor(Math.random() * (255 - colorMin))},${colorMin + Math.floor(Math.random() * (255 - colorMin))},1)`
                    })
                ).destroy(4000)
            )
        }
    })

    onBeforeUnmount(()=>{
        globalStore.event.onkeydown = null
    })

</script>

<style lang="scss" scoped>
    .wallet-container{
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
        .coin-pop{
            font-size: 20px;
            position: fixed;
            right: 10px;
            color: rgb(255, 216, 216);
            animation: animation-coin-pop-move-20241292214 4s forwards;
            white-space: nowrap;
            font-family: 'Uranus_Pixel';
            @keyframes animation-coin-pop-move-20241292214 {
                0%{
                    bottom: 20px;
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