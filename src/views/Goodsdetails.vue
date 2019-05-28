<template>
  <div class="details">
    <div class="shopcar" @click="goToMyList">
      <div class="number">
        {{this.$store.state.myGoodsList.length}}
      </div>
      <span class="iconfont icon-cart"></span>
    </div>
    <div class="box">
      <div class="image">
        <div class="maxImage">
          <img
            v-for="(item,index) in this.goodsDetails.imageUrls"
            :key="index"
            :src="item"
            
            v-show="currentIndex == index"
          >
        </div>
        <div class="wrapper" ref="wrapper">
          <div class="miniImage">
            <ul>
              <li v-for="(item,index) in this.goodsDetails.imageUrls" :key="index">
        
                <img :src="item" @click="changeImage(index)">
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="title">
              <h1>{{this.goodsDetails.title}}</h1>
        </div>
        <div class="description">
            <span v-for="(item,index) in this.goodsDetails.tags" :key="index">{{item}}</span>
        </div>
        <div class="price">
           ￥<span>{{this.goodsDetails.price}}</span>
        </div>
        <div class="number">
             数量：  <el-input-number v-model="num" :min="1" :max="10" label="描述文字" ></el-input-number>
        </div>
        <div class="btn">
              <el-row>
            <el-button type="primary" @click="addToMyList">加入购物车</el-button>
            <el-button type="warning" @click="buyThis">立即购买</el-button>
      </el-row>
        </div>
      

      </div>
    </div>
  </div>
</template>
<script>
import BScroll from "better-scroll";
import { mapstate } from "vuex";
export default {
  data() {
    return {
      goodsDetails: {},
      num:0,
      currentIndex:0
    };
  },
  created() {
    this.goodsDetails = this.$route.params.item;
    console.log(this.goodsDetails);
  },
  mounted() {
    this.$nextTick(() => {
      //$refs绑定元素
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.wrapper, {
          //开启点击事件 默认为false
          click: true,
           scrollX: true,
        // eventPassthrough: 'vertical'
        });
        // console.log(this.scroll)
      } else if (!this.$refs.wrapper) {
        return;
      } else {
        this.scroll.refresh();
      }
    });
  },
  components:{

  },
  methods: {

    addToMyList()
    {
      console.log(1);
      this.$store.commit('pushToMyList',{product:this.goodsDetails,num:this.num})
    },
    goToMyList()
    {
      this.$router.replace({path:'/home/mygoodslist'})
    },
    buyThis()
    {
      console.log(2);
      this.$store.commit('pushToMyList',{product:this.goodsDetails,num:this.num});
      this.$router.replace({path:'/paypage'});
    },
    changeImage(index)
    {
      console.log(index);
      this.currentIndex = index;
    }
  }
};
</script>
<style lang="scss" scoped>
.details {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background-color: white;
  z-index: 100;
  .shopcar
  {
    position:fixed;
    top: 50px;
    right:50px;
   
    .number
    {
      color:white;
       font-weight: normal;
       position: absolute;
       right: -18px;
       line-height: 25px;
       top:-20px;
        width: 23px;
        height:23px;
        font-size: 16px;
        border-radius: 23px;
        background-color: red;
        text-align: center;
    }
    span{
      border-radius:40px;
        font-size:40px;
        border:3px solid black;
        padding: 10px;
         box-shadow: 0.05em 0.05em 0.3em;
         cursor: pointer;
    }
  
  }
  .box {
    padding: 20px;
    width: 1200px;
    margin: 0 auto;
    height: 700px;
    box-sizing: border-box;
    display: flex;
    .image {
      flex: 0 0 600px;
      box-sizing: border-box;

      .maxImage {
        position: relative;
        height: 80%;
        img {
          position: absolute;

          width: 100%;
          display: block;
        }
      }
      .wrapper {
        width: 600px; /*关键*/
        overflow: hidden;
    
        .miniImage {
           width: 1100px;
           padding: 5px;
          ul {
           
            li {
              width: 100px;
              height: 100px;
              display: inline-block;
              margin-right: 5px;
              img {
                height: 100%;
              }
            }
          }
        }
      }
    }
    .content {
      flex: 0 0 500px;
      padding:0px 20px;
       .title
        {
          padding:20px;
          box-sizing: border-box;
          background-color: #F5F7FA;
          width: 100%;
          height: 80px;
        }
         .description
        {
         padding:20px;
                box-sizing: border-box;
          background-color: #D8D6D9;
          width: 100%;
          span{
            display: inline-block;
            border:1px solid black;
            padding: 5px;
            border-radius:10px;
            margin-right: 5px;
            margin-bottom:5px;

          }
        }
         .price
        {
          color:orangered;
          padding:20px;
          box-sizing: border-box;
          width: 100%;
          height: 60px;
          background-color: #F2F2F2;
          span
          {
            font-size:35px;
            font-weight: bolder;
          }
        }
        .btn
        {
            padding:20px;
          box-sizing: border-box;
          width: 100%;
          height: 60px;
        }
        .number
        {
          padding:20px;
          box-sizing: border-box;
          width: 100%;
          height: 60px;
        }

    }
  }
}
</style>