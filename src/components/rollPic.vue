<template>
<div class="rollPic">
    <ul>
            <transition-group name="slide">
        <li v-for="(item,index) in this.pic" :key ="item" v-show="index == currentIndex">
            <img :src="item" >
        </li>
            </transition-group>
    </ul>
</div>
</template>
<script>
  import store from '../store/index'
import { clearInterval } from 'timers';
  export default {
    data() {
      return {
         pic:[],
         timer:null,
         currentIndex:0
        }
      }
    ,
    created()
    {
        this.pic = store.state.img;
        console.log(this.pic);
    },
    mounted()
    {
        this.$nextTick(function()
        {
            if(this.timer)
            {
                clearInterval(this.timer);
                this.timer = null;
            }
            this.timer =setInterval(() => {
                this.currentIndex ++;
                if(this.currentIndex >= store.state.img.length)
                {
                    this.currentIndex = 0;
                }
        
            }, 2000);
        })
    }
  }
</script>
<style lang="scss" scoped>
.slide-enter-active,.slide-leave-active
{
  transition:all 0.5s linear
}
.slide-enter
{
  transform: translateX(-100%)
}
.slide-enter-to
{
  transform: translateX(0)
}
.slide-leave
{
   transform: translateX(0)
}
.slide-leave-to
{
  transform: translateX(100%)
}
.rollPic
{
    margin-top:10px;
    width: 100%;
    ul
    {
        overflow: hidden;
        width: 1100px;
        height: 420px;
        margin:0 auto;
        position: relative;
        li
        {
            position: absolute;
            img
            {
                width: 100%;
                height: 100%;
                display: block;
            }
        }
    }
}
</style>