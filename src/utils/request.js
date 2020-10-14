import axios from 'axios'
import router from '../router'

const server = axios.create({
    baseURL:"https://www.liulongbin.top:8888",
    timeout:2000
})

// 请求拦截
server.interceptors.request.use(config=>{
    const token = window.sessionStorage.getItem('token')
    if(token){
        config.headers.Authorization = token
    }

    return config
})


// 响应拦截
server.interceptors.response.use(res=>{
    if(res.data.meta.status==401){
        window.sessionStorage.removeItem('token')
        router.push('/')
    }

    return res
})

export default server