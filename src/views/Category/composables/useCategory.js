// 封装分类数据业务相关得代码
import { getTopCategoryAPI } from '@/apis/category'
import { onMounted, ref } from 'vue'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'

export const useCategory = () => {
  console.log('useCategory被调用了')
  // 定义分类数据
  const categoryData = ref([])
  // 得到路由实例
  const route = useRoute()

  //调用接口获取对应id的分类数据
  const getCategoryById = async (id = route.params.id) => {
    const res = await getTopCategoryAPI(id)
    // console.log(`id = ${id}, 对应分类的数据：`, res)
    categoryData.value = res.result
    // console.log('getCategoryById接口调用')
  }

  // 组件挂载完毕后执行回调一次
  onMounted(() => {
    getCategoryById()
  })

  // 需求：路由参数发生变化的时候，可以以把分类数据的接口重新调用，发起请求获取数据
  //路由插件专属的生命钩子函数 对于当前路由组件，在路由切换发生变化时执行回调
  onBeforeRouteUpdate((to) => {
    // console.log('路由切换发生变化了', to) // to 即将要去的目标路由
    getCategoryById(to.params.id) //传入最新路由参数id，发起请求
  })

  //返回获取的数据(响应式的)
  return {
    categoryData
  }
}

/** 路由缓存问题产生的原因：路由只有参数变化的时候，才会复用原来的组件实例
 解决方法：
  1. 在意性能问题，选择路由钩子 onBeforeRouteUpdate((to) => {}) 在路由发生变化时执行回调

  2. 不在意性能问题，在 RouterView中添加标识的唯一 key，比如指定路径值，简单粗暴
      每次切换路由组件时，都会使用新的路由实例。
      <!-- 二级路由出口组件 区域 -->
      <RouterView :key="$route.fullPath"/>
 */
