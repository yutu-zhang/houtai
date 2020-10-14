import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  // 登录页
  {
    path:"/",
    name:"login",
    // redirect:"/login",
    component:()=> import ("../views/Login")
  },
  // 主页面
  {
    path: '/home',
    name: 'Home',
    component: Home,
    beforeEnter(to,from,next){   //路由首页拦截守卫
     window.sessionStorage.getItem('token') ? next() : next('/login')
    },
    redirect:'/home/welcome',
    children:[
        // welcome
      {
        path:'welcome',
        name:'welcome',
        component:()=> import ('../views/home/welcome')
      },
      {
        path:'users',
        name:'user',
        component:()=> import ('../views/home/user')
      },
      // 权限管理 角色管理
      {
        path:'roles',
        name:'roles',
        component:()=> import ('../views/home/Roles')
      },
      // 权限管理 权限list
      {
        path:'rights',
        name:'rights',
        component:()=> import ('../views/home/Rights')
      },
      // 商品管理 商品列表
      {
        path:'goods',
        name:'goods',
        component:()=> import ('../views/home/Goods')
      },
      // 商品管理 分类参数
      {
        path:'params',
        name:'params',
        component:()=> import ('../views/home/Params')
      },
      // 商品管理 商品分类
      {
        path:'categories',
        name:'categories',
        component:()=> import ('../views/home/Categories')
      },
      // 订单管理
      {
        path:'orders',
        name:'orders',
        component:()=> import ('../views/olderandrep/Orders')
      },
      // 数据统计
      {
        path:'reports',
        name:'reports',
        component:()=> import ('../views/olderandrep/reports')
      },

    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
