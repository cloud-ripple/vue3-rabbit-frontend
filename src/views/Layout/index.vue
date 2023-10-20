<template>
  <!-- <div>我是首页</div> -->
  <!-- 吸顶导航组件 -->
  <LayoutFixed />
  <!-- 导航 Nav 区域 -->
  <LayoutNav />
  <!-- Header 区域 -->
  <LayoutHeader />

  <!-- 二级路由出口组件 区域 -->
  <!-- <RouterView :key="$route.fullPath"/> -->
  <RouterView />
  
  <!-- Footer 区域 -->
  <LayoutFooter />
</template>

<script setup>
import LayoutNav from '@/views/Layout/components/LayoutNav.vue'
import LayoutHeader from '@/views/Layout/components/LayoutHeader.vue'
import LayoutFooter from '@/views/Layout/components/LayoutFooter.vue'
import LayoutFixed from '@/views/Layout/components/LayoutFixed.vue'

import { useCategoryStore } from '@/stores/category'
import { onMounted } from 'vue'

// 得到一个 Store 实例, 里面包含了返回的 数据、action
const categoryStore = useCategoryStore()
// 调用接口 获取分类数据，这样其它子组件想要使用Store里面管理的数据时，直接
// 通过 Store 实例获取共享的数据
onMounted(() => {
  categoryStore.getCategory()
})
</script>

<style></style>
