<script setup>
import { getCategoryFilterAPI, getSubCategoryAPI } from '@/apis/category'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import HomeGoodsItem from '@/views/Home/components/HomeGoodsItem.vue'

// 二级面包屑导航数据相关
const subCategoryData = ref([])
const route = useRoute()

const getSubCategory = async (id) => {
  const res = await getCategoryFilterAPI(id)
  // console.log('二级面包屑导航数据: ', res)
  subCategoryData.value = res.result
}
onMounted(() => {
  getSubCategory(route.params.id)
})


// 基础商品列表数据相关
const goodList = ref([])
// 调用接口时的请求体参数
const reqData = ref({
  categoryId: route.params.id,
  page: 1,
  pageSize: 20,
  sortField: 'publishTime'
})
const getGoodList = async () => {
  const res = await getSubCategoryAPI(reqData.value)
  console.log('此时请求体参数 sortField = ', reqData.value.sortField)
  // console.log('基础商品列表数据:', res)
  goodList.value = res.result.items
}
onMounted(() => getGoodList())


// tab栏切换帅选商品相关
const tabChange = () => {
  console.log('tab切换到了 -> ', reqData.value.sortField)
  reqData.value.page = 1 //重置页数
  getGoodList() //重新调用接口获取数据
  /** 备注：此处tab栏切换筛选请求的接口参数 sortField = publishTime 在后端被写死了
  所以即使切换tan栏也不会刷新数据，只需知道切换tab栏时如何去动态改变参数 发起请求获取最新数据，就行了 */
}

// 列表数据无限加载相关
/**
 使用elementPlus提供的 v-infinite-scroll 指令监听是否满足触底条件
  官方文档：https://element-plus.org/zh-CN/component/infinite-scroll.html
  基础用法：在要实现滚动加载的列表(元素标签)上添加  v-infinite-scroll，并赋值相应的加载方法，可实现滚动到底部时自动执行加载方法(回调)。
  实现逻辑：
  1. 触底条件满足之后 page++，拉取下一页数据
  2. 新老数据做数组拼接
  3. 判断是否已经全部加载完毕，停止监听
 */

// :infinite-scroll-disabled="disabled" 控制是否禁用加载(调用load函数)
// v-infinite-scroll="load" 通过触底加载指令属性绑定回调函数
const disabled = ref(false)
const load = async () => {
  console.log('加载更多数据了')
  // 获取下一页的数据
  reqData.value.page++ // 请求体参数中的 page页数加 1
  // 调用接口获取数据
  const res = await getSubCategoryAPI(reqData.value)
  // 原来的数据和新的加载数据拼接  解构赋值
  goodList.value = [...goodList.value, ...res.result.items]
  // 加载完毕 停止监听(判断后端获取到的数据长度) -> 否则重复数据拼接会越来越多
  if (res.result.items.length === 0) {
    disabled.value = true //禁用
    console.log('数据加载完毕了!')
  }
}
</script>

<template>
  <!-- 我是二级分类页 -->
  <div class="container">
    <!-- 1. 面包屑导航区域 -->
    <div class="bread-container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">
          <!-- 一级分类导航名 -->
          首页
        </el-breadcrumb-item>
        <el-breadcrumb-item :to="{ name: 'fenlei', params: { id: subCategoryData.parentId } }">
          <!-- 二级分类导航名 -->
          {{ subCategoryData.parentName }}
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          <!-- 当前分类导航名 -->
          {{ subCategoryData.name }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 2. 分类商品展示区域 -->
    <div class="sub-container">
      <!-- 2.1 tab栏切换筛选区域  name属性值会绑定到整个tab栏中 v-model指定的数据 -->
      <el-tabs v-model="reqData.sortField" @tab-change="tabChange">
        <el-tab-pane label="最新商品" name="publishTime"> </el-tab-pane>
        <el-tab-pane label="最高人气" name="orderNum"> </el-tab-pane>
        <el-tab-pane label="评论最多" name="evaluateNum"> </el-tab-pane>
      </el-tabs>
      <!-- 2.2 筛选商品列表展示区域  列表数据加载更多 -->
      <div class="body" v-infinite-scroll="load" :infinite-scroll-disabled="disabled">
        <HomeGoodsItem v-for="good in goodList" :key="good.id" :good="good" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bread-container {
  padding: 25px 0;
  color: #666;
}

.sub-container {
  padding: 20px 10px;
  background-color: #fff;

  .body {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
  }

  .goods-item {
    display: block;
    width: 220px;
    margin-right: 20px;
    padding: 20px 30px;
    text-align: center;

    img {
      width: 160px;
      height: 160px;
    }

    p {
      padding-top: 10px;
    }

    .name {
      font-size: 16px;
    }

    .desc {
      color: #999;
      height: 29px;
    }

    .price {
      color: $priceColor;
      font-size: 20px;
    }
  }

  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
}
</style>
