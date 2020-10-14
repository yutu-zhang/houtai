<template>
    
  <div id="app">
    <div class="box-card">
      <div class="clearfix">
        <img src="@/assets/1.jpg" alt="" />
      </div>
      <div class="text item">
        <!-- 表单 -->
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
          <el-form-item prop="username">
            <el-input
              placeholder="请输入用户名"
              prefix-icon="el-icon-user-solid"
              v-model="ruleForm.username"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              v-model="ruleForm.password"
              placeholder="请输入密码"
              prefix-icon="el-icon-lollipop"
            ></el-input
          ></el-form-item>

          <!-- 按钮 -->
          <el-row>
            <el-button type="primary" @click="ajaxLogin()">登录</el-button>
            <el-button type="info" @click="resetForm()">重置</el-button>
          </el-row>
        </el-form>
      </div>
    </div>

      
  </div>
</template>


<script>
export default {
  name: "",
  data() {
    return {
      ruleForm: {
        username: "admin", //用户名
        password: "123456", //密码
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 18, message: "长度在 3 到 18个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 18, message: "长度在 3 到 18个字符", trigger: "blur" },
        ],
      },
    };
  },
  created() {},
  mounted() {},
  //方法
  methods: {
    // 登录
    // submitForm(formName) {
    //   // console.log(this.$refs[formName].validate(valid))
    //     this.$refs[formName].validate((valid) => {
    //       if (valid) {
    //         alert('submit!');
    //         this.ajaxLogin()
    //       } else {
    //         console.log('error submit!!');
    //         return false;
            
    //       }
    //     });
    //   },
    // add(){
    //     this.ajaxLogin()
    //   },
      //重置 
      resetForm() {
        // this.$refs[formName].resetFields();
        this.ruleForm.username="admin",
        this.ruleForm.password="123456"

      },

      // 登录方法
      async ajaxLogin(){
        let {data} = await this.$http.post('/api/private/v1/login',this.ruleForm)
        // console.log(data)
        if(data.meta.status == 200){
          this.$message({
            message: data.meta.msg,
            type: 'success',
            duration:2000
          })
          window.sessionStorage.setItem('token',data.data.token)
          this.$router.push('/home')
        }else {
          this.$message({
            message: data.meta.msg,
            type: 'error',
            duration:2000
          })
        }
      },
      
  },
};
</script>

<style scoped>
#app {
  width: 100%;
  height: 946px;
  background-color: lightskyblue;
}
/*  */
.box-card {
  width: 500px;
  height: 400px;
  position: fixed;
  top: 25%;
  left: 35%;
  z-index: 99;
  background-color: #fff;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}
.clearfix {
  height: 120px;
  border-bottom: 1px solid #aaa;
  position: relative;
}
.clearfix img {
  position: absolute;
  top: -40px;
  left: 35%;
  width: 120px;
  height: 120px;
  border: 10px solid #ddd;
  border-radius: 50%;
}
form {
  padding: 30px;
  box-sizing: border-box;
}
.el-input--prefix {
  height: 40px;
  margin-bottom: 20px;
  font-size: 16px;
}
.el-row {
  padding-left: 280px;
}
</style>