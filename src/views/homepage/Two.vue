<template>
  <div class="layer">
    <div class="box">
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple">
            <span>用户名:{{this.$store.state.username}}</span>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple">
            <span>收货地址:{{this.$store.state.address}}</span>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple">
            <span>余额:{{this.money}}</span>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple">
            <span>优惠券:</span>
            <el-table :data="tableData" style="width: 100%">
              <el-table-column prop="couponID" label="优惠券ID"></el-table-column>
              <el-table-column prop="couponDiscount" label="折扣"></el-table-column>
            </el-table>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple">
            <el-button type="primary" @click="invest">充值</el-button>
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      options: [
        {
          value: "100",
          label: "100"
        },
        {
          value: "300",
          label: "300"
        },
        {
          value: "500",
          label: "500"
        },
        {
          value: "1000",
          label: "1000"
        },
        {
          value: "2000",
          label: "2000"
        }
      ],
      value: "",
      username: "",
      password: "",
      tableData: [],
      money:0
    };
  },
  created() {
    this.$http
      .get("/api/getCoupon", {
        params: { username: this.$store.state.username }
      })
      .then(res => (this.tableData = res.data));
    this.$http
      .get("/api/getUserMoney", {
        params: { username: this.$store.state.username }
      })
      .then(res => {
      
        console.log(res.data);
          this.money = res.data[0].money ;
      });
  },
  methods: {
    invest() {
      var money = Number(this.value)+Number(this.money);
      this.$store.commit("updateMoney", money);
      this.$http
        .post("/api/updateMoney", {
          username: this.$store.state.username,
          money: money
        })
        .then(res =>{
           console.log(res.data);
           this.alertMes("充值成功");
        
        });
       
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
    }
  }
};
</script>
<style lang="scss" scoped>
.layer {
  width: 100%;
  .box {
    background-color: #99a9bf;
    width: 400px;
    height: 500px;
    border-radius: 10px;
    margin: 0 auto;
    padding: 10px;
  }
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
    span {
      font-size: 15px;
      line-height: 36px;
    }
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
}
</style>