<template>
    <div class="shop-container">
        <div class="neko-coin-container">
            <span>喵喵币：{{ globalStore.global.nekoCoin }}</span>
        </div>
        <section class="shop-panel u-s-t-n">
            <div class="shop-item">
                <div class="item-name">太鼓达人 ♪10000</div>
                <div v-if="globalStore.global.item.taiko" class="item-button">已购买</div>
                <div v-else class="item-button" @click="onclickBuy('taiko',10000)">购买</div>
            </div>
        </section>
    </div>
</template>

<script setup>
    import useStore from '@renderer/store'
    import { load,save } from '@renderer/utils/file'

    const globalStore = useStore().global;

    //购买
    function onclickBuy(item,nekoCoin){
        if(globalStore.global.nekoCoin < nekoCoin){
            return false;
        }
        globalStore.global.nekoCoin -= nekoCoin;
        globalStore.global.item[item] = true;
        saveFile();
    }

    //保存
    function saveFile(){
        const content = save(globalStore.global)
        if(content != false){
            window.api.writeConfig(content);
        }
    }

</script>

<style lang="scss" scoped>
    .shop-container{
        font-family: 'Uranus_Pixel';
        .neko-coin-container{
            opacity: .75;
            position: absolute;
            color: rgba(255,255,255,1);
            margin-top: 190px;
            margin-right: 50%;
            transform: translateX(50%);
            white-space: nowrap;
        }
        .shop-panel{
            margin-top: 35px;
            border-top: rgba(255,255,255,.5) 1px solid;
            height: calc(100vh - 35px);
            box-sizing: border-box;
            padding: 2px 5px;
            font-size: 14px;
            .shop-item{
                margin-top: 10px;
                background: rgba(0, 0, 0, 0.25);
                color: rgb(255, 255, 255);
                padding: 5px 5px;
                display: flex;
                .item-name{
                    padding: 0 5px;
                    border-bottom: rgba(255,255,255,1) 1px solid;
                }
                .item-button{
                    position: absolute;
                    margin-top: 2px;
                    right: 15px;
                    border: rgba(255,255,255,1) 1px solid;
                    height: 15px;
                    width: 40px;
                    font-size: 10px;
                    border-radius: 15px;
                    cursor: pointer;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    &:hover{
                        background: rgba(255,255,255,1);
                        color: rgba(0,0,0,1);
                    }
                }
            }
        }
    }
</style>