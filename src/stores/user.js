//由于某些数据的特殊性，在很多组件中都有可能进行共享，共享的数据使用 Pinia 管理会更加方便
//遵循理念：和数据相关的所有操作（state + action）都放到 Pinia中，组件只负责触发action函数来获取数据

// 管理用户数据相关
import {ref} from 'vue'
import { defineStore } from 'pinia'
import { loginAPI } from '@/apis/user'

export const useUserStore = defineStore('user', () => {
  // 1.定义管理用户数据据的 state
  const userInfo = ref({})
  // 2.定义获取接口数据的 action函数
  const getUserInfo = async ({ account, password }) => {
    const res = await loginAPI({ account, password })
    userInfo.value = res.result
  }
  // 3.以对象格式把 state和action 返回，方便组件使用
  return {
    userInfo,
    getUserInfo
  }
})
