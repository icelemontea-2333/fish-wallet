<template>
    <div class="shop-container u-s-t-n">
        <div class="neko-coin-container">
            <svg t="1734446503896" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5618"><path d="M518.245749 994.371192l-0.416486 0c-48.940642 0-99.488899-6.414083-150.242839-19.062148-52.513004-13.083993-92.414783-29.658484-116.640534-41.258683-58.661028-27.977191-111.261013-67.267033-152.071488-113.609501-41.329291-46.927799-71.114664-101.710496-86.139869-158.415986-13.370519-50.474578-15.384385-102.030791-5.983271-153.238057 9.621125-52.408627 31.067576-103.34574 63.771419-151.48104l1.330298-5.040806c39.254026-148.835793 79.844489-302.740022 182.337815-321.453223l1.206478-0.217964 1.217734-0.118704c5.813403-0.560772 11.70867-0.845251 17.525142-0.845251 99.55439 0 169.660074 80.939427 194.129372 113.985054l81.267908 0c0.690732-0.825808 1.379417-1.655709 2.032286-2.438539 27.621081-33.167401 92.305289-110.838388 182.961008-110.838388l0.927115 0.004093 0.546446-0.004093c107.185184 0 171.298388 183.861518 210.199373 322.159304 1.330298 4.744048 2.699482 9.599635 3.618411 12.710486 64.004733 93.821829 86.215594 187.855482 66.00939 279.549857-35.059494 159.102624-185.587835 252.975619-200.466708 261.911128-12.458753 8.463766-126.523625 82.777285-296.699446 87.691201L518.245749 994.371192zM263.478322 88.067778c-65.560158 13.554714-104.355743 160.653957-135.564535 278.980899l-3.924379 14.877849-2.924609 4.200672c-57.537438 82.70463-75.618235 172.97354-52.284807 261.047458 12.731976 48.065715 38.183647 94.729501 73.607438 134.948505 35.678594 40.513716 81.863473 74.959226 133.557832 99.612719 26.776853 12.822027 123.125225 54.56064 241.464447 54.656831 158.278863-4.690836 264.703731-77.218686 265.760806-77.948303l0.898463-0.624217 0.995677-0.587378c1.397836-0.825808 143.809313-86.319971 174.228113-225.309512 16.709567-76.358085-3.340071-156.192342-59.595306-237.285265l-2.102894-3.032056-1.277086-3.458775c-1.270946-3.448542-2.736321-8.609075-5.924943-19.953448-9.810437-34.869159-30.218232-107.426685-60.185754-171.962513-31.847336-68.581981-66.182328-107.915825-94.200452-107.915825l-0.530073 0.005117-0.944512-0.005117c-63.49001 0-115.989711 63.041802-138.409326 89.960895-10.236132 12.294001-14.908548 17.906835-23.546276 21.302165l-5.114484 2.013867-130.400932 0-8.515954-13.626345c-0.599657-0.953721-64.355727-100.357685-154.404626-100.357685C270.607696 87.60729 267.026124 87.761809 263.478322 88.067778z" stroke-width="150" stroke="#ffffff" p-id="5619" fill="#ffffff"></path></svg>
            {{ globalStore.global.nekoCoin }}
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
            position: absolute;
            opacity: .75;
            color: rgba(255,255,255,1);
            margin-top: 190px;
            right: 15px;
            white-space: nowrap;
            .icon{
                width: 11px;
                height: 11px;
            }
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