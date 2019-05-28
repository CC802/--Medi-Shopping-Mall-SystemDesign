<template>
  <div class="login_bg">
    <div class="login">
      <el-form
        :model="ruleForm2"
        status-icon
        :rules="rules2"
        ref="ruleForm2"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="name">
          <el-input type="text" v-model="ruleForm2.name" required="true" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm2.pass" required="true" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm2.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="收货地址" prop="locate">
          <el-input v-model="ruleForm2.locate"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm2')" ref="btn">提交</el-button>
          <el-button @click="resetForm('ruleForm2')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import store from "../store/index";
export default {
  //element-ui组件
  data() {
    var checkUserName = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("用户名不能为空"));
      }else if (value.length < 4 || value.length  > 10) {
        value = "";
        return callback(new Error("用户名为4至10个"));
      }else {
        this.judgeForm.first = true;
         callback();
      }
    };
    var checkAddress = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("地址不能为空"));
      } else if (/^[0-9]*$/.test(value)) {
        value = "";
        return callback(new Error("请输入中文"));
      } else {
        this.judgeForm.third = true;
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      }else if( value.length  < 10)
      {
         value = "";
        return callback(new Error("密码必须10位以上"));
      } 
      else {
        if (this.ruleForm2.checkPass !== "") {
          this.$refs.ruleForm2.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm2.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        this.judgeForm.sec = true;
        callback();
      }
    };
    return {
      judgeForm: {
        first: false,
        sec: false,
        third: false
      },
      ruleForm2: {
        name: "",
        pass: "",
        checkPass: "",
        locate: ""
      },
      rules2: {
        name: [{ validator: checkUserName, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        locate: [{ validator: checkAddress, trigger: "blur" }]
      }
    };
  },
  watch:
  {
    
  },
  methods: {
    submitForm(formName) {
      //element-ui组件
      if(this.judgeForm.first==false || this.judgeForm.sec==false || this.judgeForm.third==false)
      {
          this.showMes("表单未填完整");
          return 0;
      }
      else
      {
          var money = 0;
      this.$http
        .post("api/addUser", {
          username: this.ruleForm2.name,
          password: this.ruleForm2.pass,
          address: this.ruleForm2.locate,
          money:money
        })
        .then(response => {
          console.log(response);
          if (response.data.code == "1") {
             this.showMes("该用户已注册");

          }
          else
          {
            this.addCoupon();
             this.showMes("两秒后跳转登录界面")
          //延时两秒跳转
          setTimeout(() => {
            store.state.register = false;
            this.$router.replace({ path: "/login" });
          }, 2000);
          }
         
        });
    
      }
     
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    showMes(str) {
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
    addCoupon()
    {
       var username = this.ruleForm2.name;
       var time = new Date();
        for (var i = 1; i <4; i++) {
        var couponId = String(Math.floor(Math.random() * 10)) + time.valueOf();
        var couponDiscount = i+6.5;
        this.$http
          .post("/api/addCoupon", {
            couponId,
            couponDiscount,
            username
          })
          .then(res => {
            console.log(res);
          });
      }
    }
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
    padding: 80px 50px;
    box-sizing: border-box;
    position: relative;
    width: 600px;
    background-color: rgba(0, 0, 0, 0.8);
    margin: 0 auto;
    border-radius: 10px;

    .reg {
      background-color: aquamarine;
    }
    .btn {
      display: block;
      margin: 0 auto;
      width: 50%;
      margin-bottom: 20px;
    }
    .tips {
      position: absolute;
      color: white;
      font-size: 12px;
      left: 5px;
      bottom: 110px;
    }
  }
}
</style>