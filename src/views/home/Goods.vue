<template>
    
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb
      separator-class="el-icon-arrow-right"
      style="font-size: 15px; margin-bottom: 20px"
    >
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
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
            <!-- 更改用户信息 -->
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
          <el-form-item label="商品名称" prop="goods_name">
            <el-input v-model="ruleForm.username"></el-input>
          </el-form-item>
          <el-form-item label="商品价格" prop="goods_name">
            <el-input v-model="ruleForm.goods_name"></el-input>
          </el-form-item>
          <el-form-item label="商品重量" prop="goods_weight">
            <el-input v-model="ruleForm.goods_name"></el-input>
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
          prop="goods_name"
          label="商品名称"
          width="400"
        ></el-table-column>
        <el-table-column prop="goods_price" label="商品价格" width="160"
        ></el-table-column>
        <el-table-column prop="goods_weight" label="商品重量" width="160">
        </el-table-column>
        <el-table-column prop="add_time" label="创建时间" width="220">
        </el-table-column>
        <!-- 操作 -->
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button type="info" icon="el-icon-edit" circle></el-button>
            <el-button type="danger" icon="el-icon-delete" @click="remove()" circle></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
      
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="userParams.pagenum"
      :page-sizes="[1, 3, 5, 10]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalNum"
    >
    </el-pagination>
  </div>
</template>


<script>
import { ajaxGoodsList, ajaxUserList, ajaxChangeState , ajaxAddUsers } from "@/utils/api";
export default {
  name: "",
  data() {
    return {
      tableMenu: [], //表格信息
      userParams: {
        query: "", //查询关键字
        pagenum: 3, //用户列表初始页数
        pagesize: 3, //每页几条
      },
      totalNum: 1, //总数
      dialogVisible: false, //添加用户信息
      // 绑定的数据
      ruleForm: {
        goods_name: "",
        goods_price: "",
        goods_weight: "",
        add_time: "",
      }, // 更改用户信息
      rules: {
        goods_name: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
        ],
        goods_price: [
          { required: true, message: "请输入商品价格", trigger: "blur" },
        ],
        goods_weight: [
          { required: true, message: "请输入商品重量", trigger: "blur" },
        ]
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
      let { data } = await ajaxGoodsList(this.userParams);
    //   console.log(data)
    //   console.log(data.data.goods);
      this.tableMenu = data.data.goods;
      this.totalNum = data.data.total;
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
    //   删除
    remove(i) {
        this.tableMenu.splice(i,1)
    }
  },
};
</script>

<style lang="scss" scoped>
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