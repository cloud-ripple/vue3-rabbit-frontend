import myAxios from '@/utils/http'

// 获取导航分类数据
export function getCategoryAPI() {
  return myAxios({
    url: '/home/category/head'
  })
}
