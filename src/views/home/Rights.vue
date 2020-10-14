<template>
  <div>
 <el-table
    :data="tableData"
    stripe
    style="width: 100%"
    >
    <el-table-column
      prop="id"
      label="#"
      >
    </el-table-column>
    <el-table-column
      prop="authName"
      label="权限管理"
      >
    </el-table-column>
    <el-table-column
      prop="path"
      label="路径"
      >
    </el-table-column>
    <el-table-column
      prop="level"
      label="权限等级" >
      <template slot-scope="scope">

      <el-tag  v-show="scope.row.level == 0">一级</el-tag>
      <el-tag type="success" v-show="scope.row.level == 1">二级</el-tag>
      <el-tag type="danger" v-show="scope.row.level == 2">三级}</el-tag>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>


<script>
export default {
    name: '',
    data () {
        return {
            tableData:[], 
        }
    },
    created() {

    },
    mounted() {
        this.getTable()
    },
    //方法
    methods: {
        async getTable(){
            let {data} = await this.$http.get('/api/private/v1/rights/list')
            console.log(data.data)
            this.tableData = data.data
        }
    }
}
</script>

<style scoped>

</style>