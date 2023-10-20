import myAxios from '@/utils/http'

// 根据id获取商品详情信息
export const getDetailById = (id) => {
  return myAxios({
    url: '/goods',
    params: {
      id
    }
  })
}

/**
 * 获取热榜商品
 * @param {Number} id - 商品id
 * @param {Number} type - 1代表24小时热销榜 2代表周热销榜
 * @param {Number} limit - 获取个数
 */
export const fetchHotGoods = ({ id, type, limit = 3 }) => {
  return myAxios({
    url: '/goods/hot',
    params: {
      id,
      type,
      limit
    }
  })
}
