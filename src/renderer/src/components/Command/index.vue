<template>
    <div class="command-container">
        <command-single v-show="!appData.isShowMenu" @onclose="onclose"/>
    </div>
</template>

<script setup>
  import { provide,onMounted,reactive,inject } from 'vue'
  import { utils,cmd } from '@renderer/utils/cmd-style'
  import { CommandSingle } from '@renderer/utils/cmd-style/single'
  import { save } from '@renderer/utils/file'
  import useStore from '@renderer/store'

  import logo from '/favicon.ico'

  const globalStore = useStore().global;
  const emit = defineEmits(['onclose']);

  const appData = inject('appData');
  const command = cmd.create({
    logo:logo,
    title:'系统设置'
  })

  onMounted(async ()=>{
    //设置窗口
    await window.api.setWinSize({
        width:900,
        height:600,
        isCenter:true
    })
    //获取用户名
    command.menuInfo.name = await window.api.getUserName()
    //设置坐标
    command.menuInfo.positionX = 45
    command.menuInfo.positionY = 40
    //设置宽度
    utils.send('width 90')
    //Help
    utils.send('help')
    //执行渲染
    utils.render();
  })

  const create = utils.create(command);

  provide('command',command)
  provide('create',create)

  function onclose(){
    emit("onclose")
  }

  //存档
  async function saveFile(){
    const content = save(globalStore.global)
    if(content != false){
      window.api.writeConfig(content);
    }
  }
  create({
    method(context){
        saveFile();
        context.send({value:null,info:`存档成功`});
    },
    data:{command:'save file',introduce:'[存档] save file'},
  })

  //金币
  create({
    method(context){
        let coin = parseInt(context.value)
        if(coin != coin){
          context.send({value:null,info:`请填写正确的内容喵`});
          return;
        }
        if(coin < 1){
          coin = 1;
        }
        globalStore.global.coin = coin;
        saveFile();
        context.send({value:null,info:`金币数量更改为${coin}`});
    },
    data:{command:'coin',introduce:'[金币更改] coin <number>'},
  },true)

  //天
  create({
    method(context){
        let day = parseInt(context.value)
        if(day != day){
          context.send({value:null,info:`请填写正确的内容喵`});
          return;
        }
        if(day < 1){
          day = 1;
        }
        if(day > 7){
          day = 7;
        }
        globalStore.global.day = day;
        saveFile();
        context.send({value:null,info:`天数更改为${day}`});
    },
    data:{command:'day',introduce:'[天数更改] day <number>'},
  },true)

  //小时
  create({
    method(context){
        let hour = parseInt(context.value)
        if(hour != hour){
          context.send({value:null,info:`请填写正确的内容喵`});
          return;
        }
        if(hour < 1){
          hour = 1;
        }
        if(hour > 24){
          hour = 24;
        }
        globalStore.global.hour = hour;
        saveFile();
        context.send({value:null,info:`小时更改为${hour}`});
    },
    data:{command:'hour',introduce:'[小时更改] hour <number>'},
  },true)

</script>

<style lang="scss" scoped>

</style>