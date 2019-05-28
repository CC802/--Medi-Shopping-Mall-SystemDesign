<template>
  <div>
    <apphead></apphead>
    <div class="notice">{{this.$store.state.notice}}</div>
    <!-- 导航栏 -->
    <div id="nav">
      <div class="box">
        <ul>
          <router-link to="/home/one">
            <li>热卖</li>
          </router-link>
          <router-link to="/home/two">
            <li>个人中心</li>
          </router-link>
    
        </ul>
      </div>
    </div>
    <div class="tags">
      <div class="union" v-for="(item,index) in this.$store.state.tags" :key="index">
        <span class="icon" :class="{first:index==0,second:index==1,third:index==2,fourth:index==3}"></span>
        <span>{{item}}</span>
      </div>
    </div>
  

    
    
    <router-view></router-view>
  </div>
</template> 
<script>
import apphead from "../.././components/apphead.vue";

import { mapstate } from "vuex";
export default {
  name: "app",
  components: {
    apphead
  },
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      userName: "",
      age: ""
    };
  },
  created()
  {
     this.$store.dispatch('getHotData')
     this.$store.dispatch('getNewData')
   
  },
  methods: {}
};
</script>

<style lang="scss" rel='stylesheet/scss'>





.notice {
  color: white;
  text-align: center;
  font-size: 10px;
  line-height: 20px;
  height: 20px;
  background-color: #013a66;
}
#nav {
  width: 100%;
  border-bottom: 3px solid #ccc;
  .box {
    margin: 0 auto;
    width: 1140px;
    height: 40px;
    font-size: 12px;
    ul {
      a {
        li {
          margin-right: 50px;
          line-height: 40px;
          text-align: center;
          width: 70px;
          height: 40px;
          float: left;
          cursor: pointer;
        }
        li:hover {
          color: red;
          border-bottom: 2px solid red;
        }
      }
    }
  }
}
.tags {
  width: 100%;
  height: 30px;
  font-size: 13px;

  display: flex;
  .union {
    line-height: 30px;
    flex: 1;
    .icon {
      vertical-align: top;
      width: 30px;
      height: 30px;
      display: inline-block;
      background-image: url("/img/美的图标.png");
      background-repeat: no-repeat;
      background-size: 200px 80px;
    }
    .first {
      background-position: 0px -6px;
    }
    .second {
      background-position: -45px -6px;
    }
    .third {
      background-position: -0px -45px;
    }
    .fourth {
      background-position: -45px -45px;
    }
    span {
      display: inline-block;
    }
  }
}

</style>
