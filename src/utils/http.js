// axios基础封装
// 引入axios
import axios from 'axios'
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'

// 创建axios实例
/**
 如果项目里面不同的业务模块需要的接口基地址不同
 axios.create() 方法可以执行多次，每次执行就会生成一个新的实例，比如：
 const instance1 = axios.create({ baseURL: 'url1'})
 const instance2 = axios.create({ baseURL: 'url2'})
 */
const instance = axios.create({
  //接口基地址
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  //接口超时时间
  timeout: 10000
})

// axios请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    return config
  },
  // 对请求错误做些什么
  (e) => Promise.reject(e)
)

// axios响应式拦截器
instance.interceptors.response.use(
  // 2xx 范围内的状态码都会触发该函数。对响应数据做点什么
  (res) => res.data,
  // 超出 2xx 范围的状态码都会触发该函数。对响应错误做点什么
  (e) => {
    // 统一错误提示
    ElMessage({
      type: 'warning',
      message: e.response.data.message    })
    return Promise.reject(e)
  }
)

export default instance
