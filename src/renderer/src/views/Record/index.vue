<template>
    <div class="record-container">
        <section class="record-panel u-s-t-n">
            <div class="record-item">
                <span>金币(总)：{{ globalStore.global.accumulatedCoin.toFixed(3) }}</span>
            </div>
            <div class="record-item">
                <span>喵喵币(总)：{{ globalStore.global.nekoCoin }}</span>
            </div>
        </section>
    </div>
</template>

<script setup>
  import useStore from '@renderer/store'

  const globalStore = useStore().global;

</script>

<style lang="scss" scoped>
    .record-container{
        font-family: 'Uranus_Pixel';
        .record-panel{
            margin-top: 35px;
            border-top: rgba(255,255,255,.5) 1px solid;
            height: calc(100vh - 35px);
            box-sizing: border-box;
            padding: 5px 10px;
            .record-item{
                margin-top: 10px;
                background: rgba(0, 0, 0, 0.25);
                color: rgb(255, 255, 255);
                padding: 0px 5px;
                border-bottom: rgb(255, 255, 255,.5) 1px dashed;
                word-break: break-all;
            }
        }
    }
</style>