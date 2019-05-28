<template>
  <el-table :data="tableData" border style="width: 100%">
    <el-table-column fixed prop="username" label="用户名" width="150"></el-table-column>
    <el-table-column prop="address" label="收货地址" width="120"></el-table-column>
    <el-table-column prop="productname" label="产品名字" width="120"></el-table-column>
    <el-table-column prop="number" label="数量" width="120"></el-table-column>
    <el-table-column prop="date" label="日期" width="300"></el-table-column>
    <el-table-column fixed="right" label="操作" width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">发货</el-button>
        <el-button type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      tableData: []
    };
  },
  created() {
    this.$http.get("/api/getOrderList").then(res => {
       this.tableData = res.data.filter(item => item.status == 0);
      console.log( this.tableData);
    }) 
  },
  methods: {
    handleClick(row) {
      console.log(row);
      var status = "1";
      this.$http
        .post("/api/updateOrderList", {
          status:status,
          id:row.id,
        })
        .then(res => {
          console.log(res.data);
        });
    }
  }
};
</script>
<style lang="scss" scoped>
</style>