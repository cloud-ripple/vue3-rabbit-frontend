import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getCategoryAPI } from '@/apis/layout'

export const useCategoryStore = defineStore('category', () => {
  // 导航列表的数据管理
  const cateGoryList = ref([]) //分类列表
  
  // action 获取分类数据的方法
  const getCategory = async () => {
    const response = await getCategoryAPI()
    // console.log('分类结果：', response.result)
    if (response.code === '1') {
      cateGoryList.value = response.result
    }
  }
  //返回给组件中使用
  return { cateGoryList, getCategory }
})

//由于某些数据的特殊性，在很多组件中都有可能进行共享，共享的数据使用 Pinia 管理会更加方便
//遵循理念：和数据相关的所有操作（state + action）都放到 Pinia中，组件只负责触发action函数来获取数据
