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
    <el-card type="border-card">
      <el-button style="margin-bottom: 20px" type="primary">添加分类</el-button>

      <!-- 表格 -->
          <el-table :data="tableData" style="width: 100%" border="true">
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="所属店铺">
                    <span>{{ props.row.shop }}</span>
                  </el-form-item>
                  <el-form-item label="商品 ID">
                    <span>{{ props.row.id }}</span>
                  </el-form-item>
                  <el-form-item label="店铺地址">
                    <span>{{ props.row.address }}</span>
                  </el-form-item>
                  <el-form-item label="商品描述">
                    <span>{{ props.row.desc }}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column label="#" type="index"></el-table-column>
            <el-table-column label="分类名称" prop="name"></el-table-column>
            <el-table-column label="是否有效" prop="name"></el-table-column>
            <el-table-column label="排序" prop="name"></el-table-column>
            <el-table-column label="操作">
                <el-button type="primary" size="small" icon="el-icon-edit">修改</el-button>
                <el-button type="danger" size="small" icon="el-icon-delete">删除</el-button>
            </el-table-column>
          </el-table>
    </el-card>

      
  </div>
</template>


<script>
import { ajaxCategoriesList } from "@/utils/api";
export default {
  name: "",
  data() {
    return {
      tableData:[],  //表格
    };
  },
  created() {},
  mounted() {}, //方法
  methods: {},
};
</script>

<style scoped>
</style>