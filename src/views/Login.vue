<template>
  <div class="login_bg">
    <div class="login">
      <el-tabs v-model="activeName">
        <el-tab-pane label="用户登录" name="first">
          <el-form ref="form" :model="form" label-width="80px" label-color="black">
            <el-form-item label="用户名" class="labelColor">
              <el-input type="text" v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" class="labelColor">
              <el-input type="password" v-model="form.password"></el-input>
            </el-form-item>
            <el-button type="primary" class="btn log" @click="onSubmit">立即登录</el-button>
            <el-button type="primary" class="btn reg" @click="goToReg">立即注册</el-button>
            <span class="tips"><<<点击立刻注册</span>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="管理者登录" name="second">
          <el-form ref="form2" :model="form" label-width="80px" label-color="black">
            <el-form-item label="管理员" class="labelColor">
              <el-input type="text" v-model="form2.adminName"></el-input>
            </el-form-item>
            <el-form-item label="ID" class="labelColor">
              <el-input type="text" v-model="form2.id"></el-input>
            </el-form-item>
            <el-form-item label="密码" class="labelColor">
              <el-input type="password" v-model="form2.password"></el-input>
            </el-form-item>

            <el-button type="primary" class="btn log" @click="onAdminSubmit">登录</el-button>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import store from "../store/index";
import { mapstate } from "vuex";
export default {
  data() {
    return {
      login: false,
      activeName: "first",
      form: {
        username: "",
        password: ""
      },
      form2: {
        adminName: null,
        password: null,
        id: null
      }
    };
  },
  methods: {
    // 用户登录
    onSubmit() {
      let username = this.form.username;
      let password = this.form.password;
      //向数据库发送请求获取数据库用户数据
      this.$http.get("/api/getUser", {}, {}).then(res => {
        // console.log(res);
        let userList = res.data;
        userList.forEach((item, index) => {
          if (username == item.username && password == item.password) {
            store.state.login = true;
          }
          // console.log(store.state.login);
        });
        if (store.state.login) {
          //element-ui弹窗组件

          this.alertMes("登陆成功 两秒后跳转到商城");
          store.dispatch("getUserData", username);
          setTimeout(() => {
            this.$router.replace({ path: "/home/one" });
          }, 2000);
        } else {
          this.alertMes("登陆失败 请输入正确的用户名或密码");
        }
      });
    },

    // 管理员登录
    onAdminSubmit() {
      let AdminName = this.form2.adminName;
      console.log(1);
      this.$http.get("/api/getAdmin", { params: { AdminName } }).then(res => {
        console.log(res.data);
        if (
          this.form2.adminName == null ||
          this.form2.password == null ||
          this.form2.id == null
        ) {
          this.alertMes("请完整填写");
        } else if (res.data.length < 1) {
          this.alertMes("无该管理员");
        } else if (res.data.length > 0) {
          let data = res.data;
          //
          //
          data.forEach(item => {
            if (
              item.AdminName == this.form2.adminName &&
              item.Password == this.form2.password &&
              item.Id == this.form2.id
            ) {
              store.state.adminLogin=true;
               this.alertMes("登陆成功")
            }
          });
          console.log(store.state.adminLogin);
          if(store.state.adminLogin)
          {
             store.state.admin.adminName = this.form2.adminName;
             store.state.admin.id = this.form2.id;
             setTimeout(() => {
               this.$router.replace({path:'/admin/adminone'});
             }, 1000);
             
          }
        }
      });
      // this.$http.post("/api/addAdminLogin,")
    },
    goToReg() {
      store.state.register = true;
      this.$router.replace({ path: "/register" });
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
    // addUser() {
    //   var username = this.username;
    //   var password = this.password;
    //   this.$http
    //     .post(
    //       "/api/setValue",
    //       {
    //         username: username,
    //         password: password
    //       },
    //       {}
    //     )
    //     .then(response => {
    //       console.log(response);
    //     });
    // },

    // // 获取数据库内的数据
    // getUser() {
    //   var username = this.username;
    //   this.$http
    //     .get(
    //       "/api/getValue",
    //       {
    //         params: { username }
    //       },
    //       {}
    //     )
    //     .then(res => {
    //       console.log(res.data);
    //     });
    // }
  }
};
</script>
<style lang="scss" scoped>
.login_bg {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: 0;
  width: 100%;
  padding: 40px;
  box-sizing: border-box;
  overflow: hidden;
  background-color: #c2e5e8;
  .login {
    color: black;
    padding: 50px 20px;
    box-sizing: border-box;
    position: relative;
    width: 600px;
    background-color: rgba(1, 1, 1, 0.2);
    margin: 0 auto;
    border-radius: 10px;
    .tips {
      position: absolute;
      color: white;
      font-size: 12px;
      right: 20px;
      bottom: 30px;
      z-index: 99;
    }
  }
}
.reg {
  background-color: aquamarine;
}
.btn {
  display: block;
  margin: 0 auto;
  width: 50%;
  margin-bottom: 20px;
}
</style>