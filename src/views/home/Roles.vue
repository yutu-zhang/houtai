<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb
      separator-class="el-icon-arrow-right"
      style="font-size: 15px; margin-bottom: 20px"
    >
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片 -->
    <el-card class="box-card">

        <!-- 表格 -->
<el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="商品名称">
            <span>{{ props.row.authName }}</span>
          </el-form-item>
          <el-form-item label="所属店铺">
            <span>{{ props.row.shop }}</span>
          </el-form-item>
          <el-form-item label="商品 ID">
            <span>{{ props.row.id }}</span>
          </el-form-item>
          <el-form-item label="店铺 ID">
            <span>{{ props.row.shopId }}</span>
          </el-form-item>
          <el-form-item label="商品分类">
            <span>{{ props.row.category }}</span>
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
    <el-table-column label="#" type="index"> </el-table-column>
    <el-table-column
      label="商品名称"
      prop="roleName">
    </el-table-column>
    <el-table-column
      label="角色描述"
      prop="roleDesc">
    </el-table-column>
    <el-table-column label="操作" prop="desc">
        <el-button type="primary" size="small" icon="el-icon-edit">编辑</el-button>
        <el-button type="warning" size="small" icon="el-icon-delete">删除</el-button>
        <el-button type="danger" size="small" icon="el-icon-setting">分配</el-button>    
    </el-table-column>
  </el-table>


    </el-card>


  </div>
</template>


<script>
import {ajaxRolesList} from "@/utils/api";
export default {
    name: '',
    data () {
        return {
            tableData: []
        }
    },
    created() {

    },
    mounted() {
        this.getList()
    },
    //方法
    methods: {
        async getList(){
            let {data:res} = await ajaxRolesList()
            this.tableData = res.data

            console.log(res.data)
        }
    }
}
</script>

<style scoped>
/* 表格 */
.demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>