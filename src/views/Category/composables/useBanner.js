// 封装banner轮播图相关得业务代码
import { ref, onMounted } from 'vue'
import { getBannerAPI } from '@/apis/home'

export const useBanner = () => {
  console.log('useBanner被调用了')
  // 定义轮播图数据(响应式)
  const bannerList = ref([])

  const getBanner = async () => {
    const res = await getBannerAPI({
      distributionSite: '2'
    })
    bannerList.value = res.result
    // console.log('getBanner接口调用')
  }

  // 组件挂载完毕后执行回调
  onMounted(() => {
    getBanner()
  })
  
  // 返回对象数据(响应式的)，调用该函数时通过解构赋值获取数据
  return {
    bannerList
  }
}
