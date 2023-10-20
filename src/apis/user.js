// 封装所有和用户相关的接口函数

import myAxios from '@/utils/http'

// 用户登录 接收参数解构赋值，在调用该接口时必须传入一个对象数据，且包含有 account, password 属性
export const loginAPI = ({ account, password }) => {
  return myAxios({
    url: '/login',
    method: 'POST',
    data: {
      account,
      password
    }
  })
}
