<template>
    
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb
      separator-class="el-icon-arrow-right"
      style="font-size: 15px; margin-bottom: 20px"
    >
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片 -->
    <el-card class="box-card">
      <!-- 搜索 -->
      <el-input
        @clear="getTable"
        clearable
        placeholder="请输入内容"
        v-model="userParams.query"
        class="input-with-select"
      >
        <el-button
          slot="append"
          @click="getTable"
          icon="el-icon-search"
        ></el-button>
      </el-input>
      <el-button
        type="primary"
        style="margin-left: 20px"
        @click="dialogVisible = true"
        >添加信息</el-button
      >
      <!-- 添加用户 -->
      <el-dialog
        title="添加用户"
        :visible.sync="dialogVisible"
        width="50%"
      >
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="ruleForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="ruleForm.password"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="ruleForm.email"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="mobile">
            <el-input v-model="ruleForm.mobile"></el-input>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button
          >
        </span>
      </el-dialog>

      <!-- table -->
      <el-table :data="tableMenu" border style="width: 100%">
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column
          prop="username"
          label="姓名"
          width="200"
        ></el-table-column>
        <el-table-column prop="email" label="邮箱" width="240">
        </el-table-column>
        <el-table-column prop="mobile" label="电话" width="220">
        </el-table-column>
        <el-table-column
          prop="role_name"
          label="角色"
          width="200"
        ></el-table-column>
        <!-- 状态 -->
        <el-table-column label="状态" width="150">
          <template slot-scope="scope">
            <el-switch
              @change="changeState(scope.row.id, scope.row.mg_state)"
              v-model="scope.row.mg_state"
              active-color="#409EFF"
              inactive-color="#DCDFE6"
            >
            </el-switch>
          </template>
        </el-table-column>
        <!-- 操作 -->
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button type="info" icon="el-icon-edit" @click="bianji(scope.row.id)" circle></el-button>
            <el-button type="danger" icon="el-icon-delete" @click="remove(scope.row.id)" circle></el-button>
            <el-tooltip :enterable="false" content="分类权限" placement="top">
              <el-button
                type="warning"
                icon="el-icon-setting"
                circle
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
          <!-- 编辑 -->
 <el-dialog
        title="添加用户"
        :visible.sync="flags"
        width="50%"
      >
        <el-form
          :model="ruleForm1"
          :rules="rules"
          ref="ruleForm1"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="ruleForm1.username"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="ruleForm1.email"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="mobile">
            <el-input v-model="ruleForm1.mobile"></el-input>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="flags = false">取 消</el-button>
          <el-button type="primary" @click="yesbianji">确 定</el-button
          >
        </span>
      </el-dialog>
          <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="userParams.pagenum"
      :page-sizes="[1, 2, 3, 5]"
      :page-size="userParams.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalNum"
      style="margin-top:30px;"
    >
    </el-pagination>

    </el-card>
      
  </div>
</template>


<script>
import { ajaxUserList, ajaxChangeState , ajaxAddUsers ,ajaxUserDelete ,ajaxUserBian,ajaxUserYesian } from "@/utils/api";
export default {
  name: "",
  data() {
    // email
    let checkEmail = (rule, value, callback) => {
      let em = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (!value) {
        return callback(new Error("Email不能为空"));
      }
      // 验证email类型
      if (em.test(value)) {
        callback();
      } else {
        callback("请输入正确的email");
      }
    }
    // 手机号
    let checkMobile = (rule, value, callback) => {
      let phone = /^1[3456789]\d{9}$/
      if (!value) {
        return callback(new Error("手机号不能为空"));
      }
      // 验证手机号类型
      if (phone.test(value)) {
        callback();
      } else {
        callback("请输入正确的手机号");
      }
    };
    return {
      ruleForm1: {},   // 修改
      flags:false,   // 编辑弹框
      tableMenu: [], // 表格信息
      userParams: {
        query: "",   // 查询关键字
        pagenum: 1,  // 用户列表初始页数
        pagesize: 3, // 每页几条
      },
      totalNum: 1,   // 总数
      dialogVisible: false,  // 添加用户信息
      ruleForm: {            // 绑定的数据
        username: "",
        password: "",
        email: "",
        mobile: "",
      }, // 用户信息
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 18, message: "长度在 3 到 18个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 18, message: "长度在 3 到 18个字符", trigger: "blur" },
        ],
        email: [
          { required: true, message: "请输入正确的email", trigger: "blur" },
          { validator: checkEmail },
        ],
        mobile: [
          { required: true, message: "请输入正确的手机号", trigger: "blur" },
          { validator: checkMobile   },
        ],
      },
    };
  },
  created() {},
  mounted() {
    this.getTable();
  },
  //方法
  methods: {
    handleClick(row) {
      console.log(row);
    },
    // 用户列表请求
    async getTable() {
      let { data: res } = await ajaxUserList(this.userParams);
      console.log(res.data.users);
      this.tableMenu = res.data.users;
      this.totalNum = res.data.total;
    },
    // 分页 当size发生变化时，调整每页的条数时触发的方法
    handleSizeChange(size) {
      // console.log(size)
      this.userParams.pagesize = size;
      this.getTable();
    },
    // 分页 当page发生变化时，调整每页的条数时触发的方法
    handleCurrentChange(page) {
      // console.log(`当前页: ${page}`);
      this.userParams.pagenum = page;
      this.getTable();
    },
    // 滑块改变时触发回调
    async changeState(uId, bool) {
      console.log(bool.uId);
      let { data: res } = await ajaxChangeState(uId, bool);
      console.log(res);
      if (res.meta.status == 200) {
        this.$message({
          message: res.meta.msg,
          type: "success",
          duration: 1000,
        });
      }
    },
    // 添加用户方法
    async submitUserAdd(){
      let {data:res} = await ajaxAddUsers(this.ruleForm)
      console.log(res)
      if(res.meta.status == 201){
        this.$message({
          message: res.meta.msg,
          type: "success",
          duration: 1000,
        });
        this.dialogVisible = false  // 隐藏
        this.getTable()  // 更新页面
      }
    },
    // 提交预校验
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.submitUserAdd()
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      // 重置
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      // 删除
      async remove(i){
        let {data:roe} = await ajaxUserDelete(`/api/private/v1/users/${i}`)
        // console.log(roe)
        this.getTable()
      },
      // 编辑
      async bianji(i){
         let {data} = await ajaxUserBian(`/api/private/v1/users/${i}`)
         console.log(data)
          this.ruleForm1 = data.data
          this.flags = true
      },
      // 确定编辑
      async yesbianji(){
        let {data} = await ajaxUserYesian(this.ruleForm1)
        // console.log(data)
        this.getTable()
          this.flags = false
      }

  },
};
</script>

<style scoped lang="scss">
.el-input {
  width: 500px;
  margin-bottom: 30px;
}
.el-input-group__prepend {
  background-color: #fff;
}
.el-pagination {
  margin-top: 10px;
}
/*  */
.el-dialog {
  width: 50%;
  text-align: center;
  .el-dialog__body {
    width: 90%;
    .el-input__inner {
      width: 80%;
    }
  }
}
</style>