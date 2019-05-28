<template>
  <div class="appHead">
      <div class="box clearfix font_white center">
        <div class="left">
          <i class="icon">

          </i>
          <span>
             020-000020200
          </span>
          <span>
            email@email.com
          </span>
          <span>
            Guangzhou,China
          </span>
        </div>
        <div class="right">
             
             <span class="login">
              您好,欢迎{{this.$store.state.username}}
              </span>
    
         
        
          <span>
            <router-link to='/home/myorderlist'>  
                       我的订单</router-link>
          </span>
          <span>
          <router-link to='/home/mygoodsList'>  
                       我的购物车 </router-link>
          </span>
        </div>
      </div>
    </div>
</template>
      
<script>
// @ is an alias to /src

import {mapstate} from 'vuex'
export default {
  name: 'home',
  components: {

  }
}
</script>
<style lang="scss" rel='stylesheet/scss'>
.appHead {
  height: 30px;
  color: white;
  font-size:10px;
  background-color: #0092D8;
  .box {
    width: 1140px;
    height: 30px;
    margin:0 auto;
    .left {
      float: left;
      line-height: 30px;
      .icon
      {
          display: block;
          width: 100px;
          height: 30px;
          float: left;
          background-image: url('/img/美的图标.png');
          background-repeat: no-repeat;
          background-size:200px 80px;
          background-position: -80px -6px ;
      }
    }
    .right {
      float: right;
      .login {
        cursor: pointer;
      }
    }
    span {
      /*background-size:20px;*/
      float: left;
      display:block;
      margin-left: 20px;
      line-height: 30px;
      cursor: pointer;
     
    }
    span:hover {
      color: darkred;
    }
  }
}
</style>