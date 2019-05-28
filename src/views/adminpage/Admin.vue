<template>
  <div>
    <div class="box">
      <div class=nav>
        <span class="nav_welcome">欢迎管理员{{this.$store.state.admin.adminName}} 编号{{this.$store.state.admin.id}}</span>
        <div class="nav_work" @click="work">上班打卡</div>
        <div class="nav_rest" @click="rest">下班打卡</div>
      </div>
      <el-row class="tac">
        <el-col :span="6">
          <div class="layer">
            <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              router
              background-color="#3B4651"
              text-color="white"
              active-text-color="#2F8993"
              height="600px"
            >
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>上班情况</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/admin/adminone">上班打卡记录</el-menu-item>
                  <el-menu-item index="/admin/admintwo">下班打卡记录</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>订单情况</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/admin/adminorderlist">未发货订单</el-menu-item>
                  <el-menu-item index="/admin/adminolfinish">已发货订单</el-menu-item>
                  <el-menu-item index="/admin/adminolarrive">已到货订单</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </div>
        </el-col>
        <el-col :span="18">
          <router-view></router-view>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    work()
    {
      if(!this.$store.state.admin.login)
      {
          let date = new Date();
          let time = date.toLocaleString();
          console.log(time);
          let adminName = this.$store.state.admin.adminName;
          let adminId = this.$store.state.admin.id;
          this.$http.post('/api/addAdminLogin',{adminName,time,adminId}).then(res=>{
            console.log(res);
            this.$store.state.admin.login = true;
            this.alertMes("上班打卡成功");
        })
      }
      else
      {
           this.alertMes("您已打卡");
      }
       
        
    },
    rest()
    {
      if(this.$store.state.admin.login)
      {
          let date = new Date();
          let time = date.toLocaleString();
          console.log(time);
          let adminName = this.$store.state.admin.adminName;
          let adminId = this.$store.state.admin.id;
          this.$http.post('/api/addAdminRest',{adminName,time,adminId}).then(res=>{
            console.log(res);
            this.$store.state.admin.login = false;
            this.alertMes("下班打卡成功");
        })
      }
      else
      {
           this.alertMes("下班无效");
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
    }
  }
};
</script>
<style lang="scss" scoped>
.box {
  width: 1100px;
  height: 600px;
  background-color: aliceblue;
  margin: 0 auto;
  .nav
  {
    display:table;
    padding: 20px 20px;
    box-sizing: border-box;
    width: 100%;
    height: 50px;
    background-color:#2F3941;
       border-collapse: separate;
       border-spacing: 10px 0px;
       .icon
       {
         color:white;
         font-size:20px;
          margin: 10px;
      padding: 10px;
      display:table-cell;
      text-align:center;
      width:25px;
      span
      {
        font-size:10px;
        
      }
       }
    .nav_welcome
    {
      font-size:15px;
      color:white;
      line-height:50px;
       
    }
    .nav_work,.nav_rest
    {
      margin: 10px;
      padding: 10px;
      display:table-cell;
      width:100px;
      vertical-align:middle;
      border-radius: 10px;
      text-align: center;
      background-color:aliceblue;
       cursor: pointer;  
    }
    .nav_work:active,.nav_rest:active
    {
      background-color:bisque;
    }
  }
  .tac {
    
    .layer
    {
     
        height:600px;
        background-color:#3B4651;
    }
  }
}
</style>