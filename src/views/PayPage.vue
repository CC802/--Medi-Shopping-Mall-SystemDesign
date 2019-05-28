<template>
  <div class="mygoodslist">
    <div class="box">
      <h1>订单确认</h1>
      <!-- 订单详情 -->
      <ul>
        <li>
          <div class="image">
            <span>图片</span>
          </div>
          <div class="title">
            <span>商品名称</span>
          </div>
          <div class="num">
            <span>商品数量</span>
          </div>
          <div class="price">
            <span>商品单价</span>
          </div>
          <div class="total">
            <span>商品合计</span>
          </div>
        </li>
        <li v-for="(item,index) in this.myGoodsList" :key="item.index">
          <div class="image">
            <img :src="item.product.imageUrls[0]">
          </div>
          <div class="title">
            <span>{{item.product.title}}</span>
          </div>
          <div class="num">
            <span>{{item.num}}</span>
          </div>
          <div class="price">{{item.product.price}}</div>
          <div class="total">
            <span>{{item.product.price*item.num}}</span>
          </div>
        </li>
        <el-form ref="form" label-width="80px">
          <el-form-item label="收货地址">
            <el-input v-model="myAddress"></el-input>
          </el-form-item>
          <el-form-item label="优惠券">
            <el-select v-model="value" clearable placeholder="请选择" @blur="getId">
              <el-option
                v-for="(item,index) in options"
                :key="index"
                :label="item.couponDiscount"
                :name="item.couponID"
                :value="item.couponDiscount"
              ></el-option>
            </el-select>折
          </el-form-item>
        </el-form>

        <el-button type="success" @click="submit">立刻支付</el-button>
        <span class="price-span">合计:￥{{total}}</span>
        <span class="price-span" v-show="value > 0 ">折后价:￥{{discountTotal}}</span>
      </ul>
      <!-- 订单详情 
      
      
      
      -->
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      options: [],
      value: 0,
      label: "",
      name: "",
      myGoodsList: [],
      myAddress: "",
      totalPrice: 0,
      discountPrice: 0
    };
  },
  created() {
    this.myGoodsList = this.$store.state.myGoodsList;
    this.myAddress = this.$store.state.address;
    this.$http
      .get("/api/getCoupon", {
        params: { username: this.$store.state.username }
      })
      .then(res => {
        this.options = res.data;
        console.log(this.options);
      });
  },
  computed: {
    total() {
      let price = 0;
      let arr = this.$store.state.myGoodsList;
      for (let i = 0; i <= arr.length - 1; i++) {
        let productPrice = arr[i].num * arr[i].product.price;
        price += productPrice;
      }
      this.totalPrice = price;
      console.log(this.totalPrice);
      return price;
    },
    discountTotal() {
      var price = this.totalPrice * Number(this.value) * 0.1;
      this.discountPrice = price;
      return price;
    }
  },
  methods: {
    submit() {
      if (this.value > 0) {
        if (this.$store.state.money < this.discountTotal) {
          this.alertMes("余额不足请充值");
          return 0;
        } else {
          this.payIt(this.discountTotal);
          let time = new Date();
          let date = time.toLocaleString();
          let username = this.$store.state.username;
          let address = this.myAddress;
          console.log(address);
          for (let i = 0; i <= this.myGoodsList.length - 1; i++) {
            let id = String(Math.floor(Math.random() * 10)) + time.valueOf();
            let productName = this.myGoodsList[i].product.title;
            let number = this.myGoodsList[i].num;
            let price = this.myGoodsList[i].product.price * this.value * 0.1;
            let status = 0;
            console.log(productName, number, price, status);
            this.$http
              .post(
                "api/addOrderList",
                {
                  username: username,
                  address: address,
                  productName: productName,
                  number: number,
                  price: price,
                  status: status,
                  date: date,
                  id: id
                },
                {}
              )
              .then(response => {
                console.log(response);
              });
          }
          this.alertMes("支付成功");
          setTimeout(() => {
            this.jumpToPage();
          }, 1500);
        }
      }
      ///////////
      else {
        if (this.$store.state.money < this.totalPrice) {
          this.alertMes("余额不足请充值");
          return 0;
        } else {
          this.payIt(this.totalPrice);
          let time = new Date();
          let date = time.toLocaleString();
          let username = this.$store.state.username;
          let address = this.myAddress;
          console.log(address);
          for (let i = 0; i <= this.myGoodsList.length - 1; i++) {
            let id = String(Math.floor(Math.random() * 10)) + time.valueOf();
            let productName = this.myGoodsList[i].product.title;
            let number = this.myGoodsList[i].num;
            let price = this.myGoodsList[i].product.price;
            let status = 0;
            console.log(productName, number, price, status);
            this.$http
              .post(
                "api/addOrderList",
                {
                  username: username,
                  address: address,
                  productName: productName,
                  number: number,
                  price: price,
                  status: status,
                  date: date,
                  id: id
                },
                {}
              )
              .then(response => {
                console.log(response);
              });
          }
          this.alertMes("支付成功");
          setTimeout(() => {
            this.jumpToPage();
          }, 1500);
        }
      }
    },
    alertMes(str) {
      this.$alert(str, "提示", {
        confirmButtonText: "确定",
        callback: action => {
          this.$message({
            type: "info",
            message: `action: ${action}`
          });
        }
      });
    },
    jumpToPage() {
      this.$router.replace({ path: "/home/myorderlist" });
      this.$store.commit("clearMyGoodList");
    },
    getId($evt) {
      console.log($evt);
    },
    payIt(decreasePrice) {
      console.log(decreasePrice);
      console.log(this.$store.state.money);
      var lastPrice = this.$store.state.money - decreasePrice;
      this.$store.commit("updateMoney", lastPrice);
      this.$http
        .post("api/updateMoney", {
          money: lastPrice,
          username: this.$store.state.username
        })
        .then(res => console.log(res));
    }
  }
};
</script>
<style lang="scss" scoped>
.mygoodslist {
  width: 100%;
  .box {
    padding-top: 20px;
    width: 900px;
    margin: 0 auto;
    ul {
      padding-top: 20px;
      width: 100%;
      li {
        width: 100%;
        height: 100px;
        display: table;
        background-color: azure;
        font-size: 15px;
        padding: 10px;
        margin-bottom: 10px;
        .title {
          display: table-cell;

          height: 100%;
          width: 150px;
          padding: 20px;
          word-wrap: break-word;
          vertical-align: middle;
          text-align: left;
        }
        .num,
        .total,
        .price {
          width: 150px;
          display: table-cell;
          text-align: center;
          vertical-align: middle;
        }
        .image {
          width: 100px;
          height: 100px;
          vertical-align: middle;
          display: table-cell;
          padding-right: 100px;
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