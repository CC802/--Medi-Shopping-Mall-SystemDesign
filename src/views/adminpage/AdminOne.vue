<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="AdminName" label="管理员姓名" width="180"></el-table-column>
    <el-table-column prop="loginTime" label="上班时间" width="280"></el-table-column>
    <el-table-column prop="Id" label="管理员ID"></el-table-column>
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
    this.$http.get("/api/getAdminLogin").then(res => {
      console.log(res.data);
      this.tableData = res.data;
    });
  },
  methods: {
  }
};
</script>
<style lang="scss" scoped>
</style>