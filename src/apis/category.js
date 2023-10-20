import myAxios from '@/utils/http'

// 根据id获取一级分类数据
export const getTopCategoryAPI = (id) => {
  return myAxios({
    url: '/category',
    params: {
      id
    }
  })
}

// 根据id获取二级分类列表数据
export const getCategoryFilterAPI = (id) => {
  return myAxios({
    url: '/category/sub/filter',
    params: {
      id
    }
  })
}

/**
 * @description: 获取导航数据
 * 请求参数体
 * @data { 
     categoryId: 1005000 ,
     page: 1,
     pageSize: 20,
     sortField: 'publishTime' | 'orderNum' | 'evaluateNum'
   } 
 * @return {*}
 */
export const getSubCategoryAPI = (data) => {
  return myAxios({
    url: '/category/goods/temporary',
    method: 'POST',
    data
  })
}
