<template>
  <div class="mygoodslist">
    <div class="box">
      <div class="title">
        <span class="iconfont icon-cart icon"></span>我的购物车
      </div>
      <hr>
      <ul v-if="!ifShow">
        <li>
          您的购物车暂时为空哦赶紧去逛逛吧 ===>
          <router-link to="/home/one">
            <span id="flag">商城首页</span>
          </router-link>
        </li>
      </ul>
      <ul v-else>
        <li v-for="(item,index) in this.myGoodsList" :key="item.index">
          <img
            v-for="(itemNext,indexNext) in item.product.imageUrls"
            :key="itemNext"
            :src="itemNext"
            v-if="indexNext==0"
          >
          <span class="title">{{item.product.title}}</span>
          <span class="num">{{item.num}}</span>
          <div class="btn1">
            <el-input-number v-model="item.num" :min="1" :max="10" label="描述文字"></el-input-number>
          </div>
          <div class="btn2">
            <el-button
              type="danger"
              class="btn2"
              icon="el-icon-delete"
              circle
              @click="delIt(index)"
            ></el-button>
          </div>
          <div class="price">{{item.product.price}}</div>
        </li>
        <router-link to="/PayPage">
          <el-button type="success" >去购买</el-button>
        </router-link>
        <span class="price-span">合计:￥{{total}}</span>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      myGoodsList: [],
      num: 0,
      ifShow: false
    };
  },
  created() {
    if (this.$store.state.myGoodsList.length > 0) {
      this.ifShow = true;
      this.myGoodsList = this.$store.state.myGoodsList;
    } else {
      this.ifShow = false;
    }
  },
  updated() {
    if (this.$store.state.myGoodsList.length > 0) {
      this.ifShow = true;
      this.myGoodsList = this.$store.state.myGoodsList;
    } else {
      this.ifShow = false;
    }
  },
  methods: {
  
    delIt(index) {
      console.log(index);
      this.$store.commit("deleteMyGoods", index);
    }
  },
  computed: {
    total() {
      let price = 0;
      let arr = this.$store.state.myGoodsList;
      for (let i = 0; i <= arr.length - 1; i++) {
        let productPrice = arr[i].num * arr[i].product.price;
        price += productPrice;
      }
      return price;
    }
  }
};
</script>
<style lang="scss" scoped>
#flag {
  color: #3795d3;
}
.mygoodslist {
  width: 100%;
  .box {
    padding-top: 20px;
    width: 900px;
    margin: 0 auto;
    .title {
      font-size: 15px;
      margin-bottom: 20px;
      .icon {
        font-size: 20px;
      }
    }
    ul {
      padding-top: 20px;
      width: 100%;
      li {
        width: 100%;
        height: 100px;

        background-color: azure;
        margin-bottom: 10px;
        padding: 10px;
        .title {
          box-sizing: border-box;
          padding-top: 20px;
          display: inline-block;
          width: 200px;
          word-wrap: break-word;
          margin-right: 60px;
        }
        .num {
          box-sizing: border-box;
          padding-top: 40px;
          display: inline-block;
          width: 100px;
          text-align: center;
          word-wrap: break-word;
          vertical-align: top;
        }
        .btn1 {
          display: inline-block;

          vertical-align: top;
          margin-top: 30px;
          margin-right: 45px;
        }
        .btn2 {
          display: inline-block;
          vertical-align: top;
          margin-top: 15px;
          margin-right: 20px;
        }
        .price {
          display: inline-block;
          vertical-align: top;
          margin-top: 40px;
        }

        img {
          height: 100px;
          width: 100px;
          vertical-align: top;
          margin-right: 20px;
        }
      }
      .price-span {
        font-size: 13px;
        display: inline-block;
        margin-left: 200px;
      }
    }
  }
}
</style>