<script setup>
import { getTopCategoryAPI } from '@/apis/category'
import { getBannerAPI } from '@/apis/home'
import { onMounted, ref } from 'vue'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import HomeGoodsItem from '@/views/Home/components/HomeGoodsItem.vue'

// 引入封装得业务逻辑函数
import { useBanner } from '@/views/Category/composables/useBanner'
import { useCategory } from '@/views/Category/composables/useCategory'


// 1. 分类数据相关
// const categoryData = ref([])
// const route = useRoute() // 得到路由实例
// //调用接口获取对应id的分类数据
// const getCategoryById = async (id = route.params.id) => {
//   const res = await getTopCategoryAPI(id)
//   console.log(`id = ${id}, 对应分类的数据：`, res)
//   categoryData.value = res.result
// }
// onMounted(() => {
//   getCategoryById()
// })

/** 路由缓存问题产生的原因：路由只有参数变化的时候，才会复用原来的组件实例
 解决方法：
  1. 在意性能问题，选择路由钩子 onBeforeRouteUpdate((to) => {}) 在路由发生变化时执行回调

  2. 不在意性能问题，在 RouterView中添加标识的唯一 key，比如指定路径值，简单粗暴
      每次切换路由组件时，都会使用新的路由实例。
      <!-- 二级路由出口组件 区域 -->
      <RouterView :key="$route.fullPath"/>
 */
// 需求：路由参数发生变化的时候，可以以把分类数据的接口重新调用，发起请求获取数据
//路由插件专属的生命钩子函数 对于当前路由组件，在路由切换发生变化时执行回调
// onBeforeRouteUpdate((to) => {
//   console.log('路由切换发生变化了', to) // to 即将要去的目标路由
//   getCategoryById(to.params.id) //传入最新路由参数id，发起请求
// })

// 调用封装的函数并通过解构赋值提取数据
const { categoryData } = useCategory()
// console.log('封装的函数获取到 分类数据:', bannerList)


// 2. 轮播图相关
// const bannerList = ref([])

// const getBanner = async () => {
//   const res = await getBannerAPI({
//     distributionSite: '2'
//   })
//   console.log('分类商品轮播图数据：', res)
//   bannerList.value = res.result
// }

// onMounted(() => {
//   getBanner()
// })

// 调用封装的函数并通过解构赋值提取数据
const { bannerList } = useBanner()
// console.log('封装的函数获取到 轮播图数据:', bannerList)


</script>

<template>
  <!-- 分类页 -->
  <div class="top-category">
    <div class="container m-top-20">
      <!-- 面包屑导航组件 -->
      <div class="bread-container">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{ categoryData.name }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 分类页轮播图 -->
      <div class="home-banner">
        <el-carousel height="500px">
          <el-carousel-item v-for="item in bannerList" :key="item.id">
            <img :src="item.imgUrl" alt="" />
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <!-- 分类轮播图下方区域 -->
    <div class="sub-list">
      <h3>全部分类</h3>
      <ul>
        <li v-for="i in categoryData.children" :key="i.id">
          <RouterLink :to="{
            name: 'subCategory', //跳转到二级分类路由组件
            params: { //携带参数
              id: i.id
            }
          }">
            <img :src="i.picture" />
            <p>{{ i.name }}</p>
          </RouterLink>
        </li>
      </ul>
    </div>
    <div class="ref-goods" v-for="item in categoryData.children" :key="item.id">
      <div class="head">
        <h3>- {{ item.name }}-</h3>
      </div>
      <div class="body">
        <HomeGoodsItem v-for="good in item.goods" :good="good" :key="good.id" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }

  .sub-list {
    margin-top: 20px;
    background-color: #fff;

    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;

      li {
        width: 168px;
        height: 160px;

        a {
          text-align: center;
          display: block;
          font-size: 16px;

          img {
            width: 100px;
            height: 100px;
          }

          p {
            line-height: 40px;
          }

          &:hover {
            color: $xtxColor;
          }
        }
      }
    }
  }

  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;

    .head {
      .xtx-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }

      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }

    .body {
      display: flex;
      justify-content: space-around;
      padding: 0 40px 30px;
    }
  }

  .bread-container {
    padding: 25px 0;
  }
  .home-banner {
    width: 1240px;
    height: 500px;
    margin: 0 auto;
    img {
      width: 100%;
      height: 500px;
    }
  }
}
</style>
