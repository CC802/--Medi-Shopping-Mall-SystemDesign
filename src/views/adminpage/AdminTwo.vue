<template>
  <el-table :data="tableRestData" style="width: 100%">
    <el-table-column prop="AdminName" label="管理员姓名" width="180"></el-table-column>
    <el-table-column prop="restTime" label="下班时间" width="280"></el-table-column>
    <el-table-column prop="Id" label="管理员ID"></el-table-column>
  </el-table>
</template>
<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      tableRestData:[]
    };
  },
  created() {
    this.$http.get("/api/getAdminRest").then(res => {
      console.log(res.data);
      this.tableRestData = res.data;
    });
  },
  // updated() {
  //   this.$http.get("/api/getAdminRest").then(res => {
  //     console.log(res.data);
  //     this.tableRestData = res.data;
  //   });
  // },
  methods: {}
};
</script>
<style lang="scss" scoped>
</style>