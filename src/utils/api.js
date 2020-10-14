import request from './request'

// get
export function gets(url,data){
    return request.get(url,{
        params:data
    })
}
// post 
export function posts(url,data){
    return request.post(url,data)
}
// put
export function put(url,data){
    return request.put(url,data)
}

// 用户列表
export function ajaxUserList(data){
    return gets(`/api/private/v1/users?query=${data.query}&pagesize=${data.pagesize}&pagenum=${data.pagenum}`)
}
// 用户列表 编辑
export function ajaxUserBian(data){
    return gets(data)
}
// 用户列表 确定编辑
export function ajaxUserYesian(data){
    return request.put(`/api/private/v1/users/${data.id}`,data)
}
// 用户列表 删除
export function ajaxUserDelete(data){
    return request.delete(data)
}

// 状态修改
export function ajaxChangeState(uId,type){
    return put(`/api/private/v1/users/${uId}/state/${type}`)
}

// user 用户添加
export function ajaxAddUsers(obj){
    return posts(`/api/private/v1/users`,obj)
}

// 权限管理 角色列表
export function ajaxRolesList(data){
    return gets('/api/private/v1/roles',data)
}

// 商品管理 商品列表
export function ajaxGoodsList(data){
    return gets(`/api/private/v1/goods?query=${data.query}&pagesize=${data.pagesize}&pagenum=${data.pagenum}`)
}
// // 商品管理 商品列表
// export function ajaxGoodsList(data){
//     return gets('/api/private/v1/goods?query=&pagenum=1&pagesize=10')
// }

// 商品管理 商品分类
export function ajaxCategoriesList(data){
    return gets('/api/private/v1/categories?type=3&pagenum=1&pagesize=5')
}

// 订单管理 订单列表
export function ajaxOrderList(data){
    return gets(`/api/private/v1/orders?query=&pagenum=1&pagesize=10`)
}

