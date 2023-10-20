import myAxios from '@/utils/http'

// 获取轮播图数据
/**
 广告区域展示位置，1 为首页，2 为分类商品页 默认是1
 distributionSite: 接口指定的请求参数， 是否必须传入：否
 */
export function getBannerAPI(params = {}) {
  const { distributionSite = '1' } = params
  return myAxios({
    url: 'home/banner',
    params: {
      distributionSite
    }
  })
}

// 获取新鲜好物数据
export const findNewAPI = () => {
  return myAxios({
    url: '/home/new'
  })
}

// 获取人气推荐数据
export const getHotAPI = () => {
  return myAxios({
    url: 'home/hot'
  })
}

// 获取所有商品模块
export const getGoodsAPI = () => {
  return myAxios({
    url: '/home/goods'
  })
}

