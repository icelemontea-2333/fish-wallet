<template>
    <div class="system-container">
      <command></command>
    </div>
</template>

<script setup>
    import { inject,onMounted } from 'vue';
    import useStore from '@renderer/store'
    import Command from '@renderer/components/Command/index.vue'

    const appData = inject('appData');
    const globalStore = useStore().global;
  
</script>

<style lang="scss" scoped>

</style>