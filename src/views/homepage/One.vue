<template>
  <div class="hotProduct">
    <router-view></router-view>
    <rollPic></rollPic>
    <h1>新款上市</h1>
     <div class="box" ref="product">
      
      <ul>
        <li v-for="(item,index) in this.$store.state.newdata" :key="index">
          <router-link :to="{name:'Goodsdetails',params:{item}}">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <img
                  v-for="(itemImg,index) in item.imageUrls "
                  :key="itemImg.index"
                  :src="itemImg"
                  v-if="index== 0"
                >
                <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
              </div>
              <div class="text item">{{item.title}}</div>
            </el-card>
          </router-link>
        </li>
      </ul>
    </div>
    <h1>热卖款式</h1>
    <div class="box" ref="product">
      
      <ul>
        <li v-for="(item,index) in this.$store.state.hotdata" :key="index">
          <router-link :to="{name:'Goodsdetails',params:{item}}">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <img
                  v-for="(itemImg,index) in item.imageUrls "
                  :key="itemImg.index"
                  :src="itemImg"
                  v-if="index== 0"
                >
                <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
              </div>
              <div class="text item">{{item.title}}</div>
            </el-card>
          </router-link>
        </li>
      </ul>
    </div>
    
  </div>
</template>
<script>
import BScroll from "better-scroll";
import rollPic from "../.././components/rollPic.vue";
export default {
  data() {
    return {
      hotdata: []
    };
  },
   mounted() {
    this.$nextTick(() => {
      //$refs绑定元素
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.product, {
          //开启点击事件 默认为false
          click: true,
           scrollY: true,
        // eventPassthrough: 'vertical'
        });
        // console.log(this.scroll)
      } else if (!this.$refs.product) {
        return;
      } else {
        this.scroll.refresh();
      }
    });
  },
  components: {
    rollPic
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
//element-ui
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  content: "";
  clear: both;
}
.clearfix:after {
  display: table;
}

.box-card {
  width: 400px;

  img {
    width: 200px;
    height: 200px;
  }
}
//
.hotProduct {
  position: relative;

  width: 100%;
  h1
  {
    padding: 20px;
    font-size: 30px;
    font-weight: lighter;
    text-align: center;
  }
  .box {
    height: 400px;
    overflow:hidden;
    ul {
      width: 1250px;

      margin: 5px auto;

      li {
        display: inline-block;
        margin-right: 10px;
        margin-bottom: 10px;
      }
    }
  }
}
//

</style>