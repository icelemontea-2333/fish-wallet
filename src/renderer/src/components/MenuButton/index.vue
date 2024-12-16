<template>
    <section class="menu-button-container">
        <div class="menu-button">
            <div class="circle circle-1"/>
            <div class="circle circle-2"/>
            <div class="circle circle-3"/>
        </div>
    </section>
</template>

<script setup>

</script>

<style lang="scss" scoped>
  .menu-button-container{
    position: absolute;
    top: 0;
    right: 10px;
    cursor: pointer;
    &:hover{
      .menu-button{
        rotate: 145deg;
        transform: translate(2px,-2px);
        opacity: 1;
        .circle{
          border: rgb(255, 255, 255) 2px solid;
        }
        .circle-1{
          transform: translate(5px,4px);
        }
        .circle-2{
          transform: translate(0px,-4px);
        }
        .circle-3{
          transform: translate(-5px,4px);
        }
      }
    }
    .menu-button{
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      transition:rotate .35s,transform .35s;
      opacity: .85;
      .circle{
        margin: 0 1px;
        width: 4px;
        height: 4px;
        border-radius: 50%;
        border: rgb(255, 220, 220) 2px solid;
        transition:transform .35s;
      }
    }
  }
</style>