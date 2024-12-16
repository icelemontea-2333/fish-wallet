<template>
    <div class="index-container">
      <!-- 钱包 -->
      <wallet v-if="!appData.isShowMenu && globalStore.global.type == 0"></wallet>
      <!-- dong ka -->
      <dong-ka v-if="!appData.isShowMenu && globalStore.global.type == 1"></dong-ka>
    </div>
</template>

<script setup>
    import { inject,onMounted } from 'vue';
    import useStore from '@renderer/store'
    import Wallet from '@renderer/components/Index/Wallet/index.vue'
    import DongKa from '@renderer/components/Index/DongKa/index.vue'

    const appData = inject('appData');
    const globalStore = useStore().global;
  
</script>

<style lang="scss" scoped>

</style>