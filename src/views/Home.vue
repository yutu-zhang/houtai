<template>
    
  <div>
    <el-container>
      <el-header>
        <span>电商后台管理系统</span>
         <el-button type="info" @click="toLogin" plain>退出</el-button>
      </el-header>
      <el-container>
        <!-- 左侧边栏 -->
        <el-aside :width="isCollapse?'64px':'200px'">
          <!--  -->
          <p class="he"><span @click="isCollapse=!isCollapse">| | |</span></p>
          <el-menu
            class="el-menu-vertical-demo" :collapse="isCollapse" 
            @open="handleOpen"
            @close="handleClose"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <el-submenu :index="item.id+' '" v-for="(item,index) in navList" :key="index">
              <!--- 1 -->
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{item.authName}}</span>
              </template>
              <!-- 二级菜单 -->
              <el-menu-item-group v-for="(it,ix) in item.children" :key="ix">
                <el-menu-item :index="item.id+'-'+it.id" @click="savePath(it.path)">{{it.authName}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <!-- container容器 -->
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
      
  </div>
</template>


<script>
export default {
  name: "",
  data() {
    return {
      isCollapse: false,   // 左侧点击隐藏显示
      navList: [],         // 用户列表  
      activePath:"",       // 激活的路由地址存储
    };
  },
  created() {
    let path = window.sessionStorage.getItem('activePath')
    this.activePath = path
  },
  watch:{
    $route(to,from){
      // console.log(to,from)
      window.sessionStorage.setItem('activePath',to.path)
      this.activePath = to.path
    }
  },
  mounted() {
    this.getNav()
  }, //方法
  methods: {
    // tologin
    toLogin(){
      this.$router.push('/')
    },
    // 获取导航信息
    async getNav(){
      let data = await this.$http.get('/api/private/v1/menus')
      // console.log(data.data.data)
      this.navList = data.data.data
    },
    // 左侧边栏
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    // 保存用户点击过的path地址
    savePath(path){
      this.$router.push('/home/'+path)
      window.sessionStorage.setItem("activePath",path)
      this.activePath = path
    }
  },
};
</script>

<style scoped>
.he {
  height: 35px;
  line-height: 35px;
  text-align: center;
  background-color: rgba(3, 10, 78, 0.295);
}
.el-header {
  background-color: rgba(23, 18, 58);
  color: #fff;
  height: 80px;
  font-weight: 600;
  font-size: 22px;
  display: flex;
  justify-content: space-between;
  align-items: center;  
}

.el-aside {
  background-color: rgba(25, 20, 58, 0.815);
  color: #fff;
  height: 887px;
}

.el-main {
  background-color: #eee;
  color: #333;
}

body > .el-container {
  margin-bottom: 40px;
}

/*  */
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>