<template>
    <div class="system-container">
      <command @onclose="onclose"></command>
    </div>
</template>

<script setup>
    import { inject,onMounted } from 'vue';
    import { useRouter,useRoute } from 'vue-router'
    import useStore from '@renderer/store'
    import Command from '@renderer/components/Command/index.vue'

    const appData = inject('appData');
    const globalStore = useStore().global;
    const router = useRouter();
    const route = useRoute();

    async function onclose(){
      if(!route.meta.isCommand){
        //获取窗口坐标 -> origin
        globalStore.win.origin = await window.api.setWinSize()
      }else if(globalStore.win.origin != null){
        //设置窗口坐标 -> origin
        await window.api.setWinSize({...globalStore.win.origin})
      }
      appData.isShowMenu = false
      router.push("/")
    }
  
</script>

<style lang="scss" scoped>

</style>