<template>
  <div class="box">
    <div class="center">
       <el-tabs v-model="activeName">
    <el-tab-pane label="未发货" name="first">
      <ul>
          
          <li v-for="(item,index) in this.userOrderList" :key="item.index" v-if="item.status==0">
            <span>产品名字:{{item.productname}}</span>
            <span>下单时间:{{item.date}}</span>
            <span>收货地址:{{item.address}}</span>
            <span>商品状态:{{item.status == 0 ? "未发货" : item.status == 1?"已发货":"已到货"}}</span>
            
          </li>
        </ul>
    </el-tab-pane>
    <el-tab-pane label="已发货" name="second">
       <ul>   
          <li v-for="(item,index) in this.userOrderList" :key="item.index" v-if="item.status==1 ">
            <span>产品名字:{{item.productname}}</span>
            <span>下单时间:{{item.date}}</span>
            <span>收货地址:{{item.address}}</span>
            <span>商品状态:{{item.status == 0 ? "未发货" : item.status == 1?"已发货":"已到货"}}</span>
          </li>
        </ul>
    </el-tab-pane>
    <el-tab-pane label="已到货" name="third">
       <ul>   
          <li v-for="(item,index) in this.userOrderList" :key="item.index" v-if="item.status==2">
            <span>产品名字:{{item.productname}}</span>
            <span>下单时间:{{item.date}}</span>
            <span>收货地址:{{item.address}}</span>
            <span>商品状态:{{item.status == 0 ? "未发货" : item.status == 1?"已发货":"已到货"}}</span>
          </li>
        </ul>
    </el-tab-pane>
  </el-tabs>
        
    </div>

  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName:"first",
      username: "",
      password: "",
      userOrderList: []
    };
  },
  created() {
    this.$http.get("/api/getOrderList", {}, {}).then(res => {
      let arr = res.data;
      console.log(arr);
      this.userOrderList = arr.filter(item => {
        return item.username == this.$store.state.username;
      });
    });
  }
  ,
  methods: {}
};
</script>
<style lang="scss" scoped>
.box{
  width: 100%;
  .center{
    width:1000px;
    margin:0 auto;
    ul
    {
      width: 100%;
      padding: 10px;
      box-sizing: border-box;
      li
      {
        width: 100%;
  
        background-color: #759EBB;
        margin-bottom:10px;
        span
        {
          display: block;
          padding: 10px;
        }
      }
    }
  }
}
</style>