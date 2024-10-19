import request from "@/utils/request";

//登录

//获取信息
export const userGetInfo = () => {
  return request.get("/user/userInfo");
};
//更改头像 地址栏传参数

// 更改头像 地址栏传递参数
//获取详细页
export const detail = (id) => {
  return request.get(`/article/${id}`);
};

//注册
// 请求参数格式：x-www-form-urlencoded
export const userRegister = (data) => {
  const params = new URLSearchParams();
  for (let key in data) {
    params.append(key, data[key]);
  }
  return request.post("/user/register", params);
};
//登录
// 请求参数格式：x-www-form-urlencoded
export const userLogin = (data) => {
    const params = new URLSearchParams();
  for (let key in data) {
    params.append(key, data[key]);
  }
  return request.post('/user/login', params);}
  //获取用户信息
  export const getUserInfo = () => {
    return request.get('/user/userInfo')
  } 

