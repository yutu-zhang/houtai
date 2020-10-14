import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "./assets/common.css"
import http from './utils/request' //路由响应拦截
import {gets,posts} from "./utils/api"

// elment ui
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import {Message} from "element-ui";
Vue.use(ElementUI)

// 引入axios
import axios from 'axios'
// 将axios定义在原型上
Vue.prototype.$axios = axios

Vue.prototype.$http = http  //导出

Vue.prototype.$http = http
Vue.prototype.$gets = gets
Vue.prototype.$posts = posts
Vue.prototype.$message = Message

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
