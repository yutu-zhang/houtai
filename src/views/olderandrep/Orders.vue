<template>
    
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb
      separator-class="el-icon-arrow-right"
      style="font-size: 15px; margin-bottom: 20px"
    >
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
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

      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" label="#" width="100"></el-table-column>
        <el-table-column
          prop="order_number"
          label="订单编号"
          width="280"
        ></el-table-column>
        <el-table-column prop="order_price" label="订单价格"> </el-table-column>
        <el-table-column label="是否付款">
          <span class="el-tag--mini">未付款</span>
        </el-table-column>
        <el-table-column prop="is_send" label="是否发货"> </el-table-column>
        <el-table-column prop="create_time" label="下单时间"></el-table-column>
        <!-- 操作 -->
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" circle></el-button>
            <el-button
              type="success"
              icon="el-icon-location-outline"
              circle
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

      
  </div>
</template>


<script>
import { ajaxOrderList } from "@/utils/api";

import { formatDate } from "@/utils/common";
export default {
  name: "",
  data() {
    return {
      tableData: [], //表格信息
      userParams: {
        query: "", //查询关键字
        pagenum: 3, //用户列表初始页数
        pagesize: 3, //每页几条
      },
    };
  },
  created() {},
  mounted() {
    this.getTable();
  },
  filters: {
    formatDate(time) {
      var data = new Date(time);
      return formatDate(data, "yyyy-MM-dd");
    },
  },
  //方法
  methods: {
    async getTable() {
      let { data: res } = await ajaxOrderList();
      console.log(res);
      this.tableData = res.data.goods;
    },
  },
};
</script>

<style scoped>
.el-input {
  width: 500px;
  margin-bottom: 30px;
}
.el-tag--mini {
  background-color: #f56c6c;
  border-color: #f56c6c;
  color: #fff;
  height: 20px;
  padding: 0 5px;
  line-height: 19px;
  border-width: 1px;
  border-style: solid;
  border-radius: 4px;
  box-sizing: border-box;
  white-space: nowrap;
}
</style>