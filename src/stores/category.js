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
