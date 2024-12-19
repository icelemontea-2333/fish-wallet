<template>
    <div class="item-container">
        <section class="item-panel u-s-t-n">
            <div class="item-item">
                <div class="item-name">经典</div>
                <div v-if="globalStore.global.type == 0" class="item-button item-button-used">已装载</div>
                <div v-else class="item-button" @click="onclickEquip(0)">装载</div>
            </div>
            <div v-if="globalStore.global.item.taiko" class="item-item">
                <div class="item-name">太鼓达人</div>
                <div v-if="globalStore.global.type == 1" class="item-button item-button-used">已装载</div>
                <div v-else class="item-button" @click="onclickEquip(1)">装载</div>
            </div>
        </section>
    </div>
</template>

<script setup>
    import useStore from '@renderer/store'

    const globalStore = useStore().global;

    function onclickEquip(type){
        globalStore.global.type = type
    }


</script>

<style lang="scss" scoped>
    .item-container{
        font-family: 'Uranus_Pixel';
        .item-panel{
            margin-top: 35px;
            border-top: rgba(255,255,255,.25) 1px dashed;
            height: calc(100vh - 35px);
            box-sizing: border-box;
            padding: 5px 10px;
            .item-item{
                margin-top: 5px;
                color: rgb(255, 255, 255);
                background: rgba(0,0,0,.5);
                padding: 5px;
                display: flex;
                flex-direction: column;
                align-items: center;
                border: rgba(255,255,255,.5) 1px solid;
                border-radius: 10px;
                .item-name{
                    padding: 2px 0 0 0;
                }
                .item-button{
                    margin-top: 5px;
                    height: 15px;
                    width: 150px;
                    font-size: 12px;
                    border: rgba(255,255,255,1) 1px solid;
                    background: rgba(0,0,0,.25);
                    border-radius: 15px;
                    cursor: pointer;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    transition: rotate .35s;
                    &:hover{
                        background: rgba(255,255,255,1);
                        color: rgba(0,0,0,1);
                        rotate: 2deg;
                    }
                }
                .item-button-used{
                    background: rgba(0,0,0,.25);
                    &:hover{
                        color: rgb(255, 255, 255);
                        background: rgba(0,0,0,.25);
                        rotate: -2deg;
                    }
                }
            }
        }
    }
</style>