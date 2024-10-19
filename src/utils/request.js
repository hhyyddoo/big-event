import axios from "axios";
import { useUserStore } from "@/stores/user.js";
import { ElMessage } from "element-plus";
import router from "@/router";
// 定义基础地址
const baseURL = '/api'
// 创建axios实例
const instance = axios.create({
  baseURL,
  timeout: 10000,
});
// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    const userStore = useUserStore()
    if (userStore.token) {
      config.headers.Token = userStore.token
    }
    return config  // 确保总是返回 config
  },
  (err) => Promise.reject(err)
)

instance.interceptors.response.use(
  (res) => {
    if (res.data.code === 0) {
      return res.data
    }
    ElMessage.error(res.data.message || '服务异常请联系管理员')

    return Promise.reject(res.data)
  },
  (err) => {
    const response = err.response
    const errorMessage = response?.data?.message || '服务异常请联系管理员'
    // 处理401错误
    if (response && response.status === 401) {
      ElMessage.error('身份验证失败，请重新登录')
      router.push('/login')  // 根据需求决定是否重定向
    } else {
      ElMessage.error(errorMessage)
    }
    return Promise.reject(err)
  }
)


/* // 响应拦截器
instance.interceptors.response.use(
  (res) => {
    if (res.data.code === 0) {
      return res
    }
    ElMessage.error(res.data.message || '服务异常请联系管理员 CODE no  0')
    return Promise.reject(res.data)
  },
  (err) => {
    const response = err.response
    const errorMessage = response?.data?.message || '服务异常请联系管理员1'
    // 处理401错误
    if (response && response.status === 401) {
      ElMessage.error('身份验证失败，请重新登录')
      // router.push('/login')
    } else {
      ElMessage.error(errorMessage)
    }
    return Promise.reject(err)
  }
) */

// 导出实例
export default instance;
export { baseURL };
