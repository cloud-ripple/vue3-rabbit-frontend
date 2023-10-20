<template>
  <!-- 我是home页 -->

  <div class="container">
    <!-- 左侧分类 -->
    <HomeCategory />
    <!-- 右侧轮播图 -->
    <HomeBanner />
  </div>
  <!-- 新鲜好物 -->
  <HomeNew />
  <!-- 人气推荐 -->
  <HomeHot />
  <!-- 产品列表 -->
  <HomeProduct />

  <!-- 测试面板组件
  <HomePanel title="新鲜好物" subTitle="新鲜好物 好多商品">
    <div>
      我是新鲜好物的插槽内容
    </div>
  </HomePanel>
  <HomePanel title="人气推荐" sub-title="人气推荐 好多商品">
    <div>
      我是人气推荐的插槽内容
    </div>
</HomePanel> -->
</template>

<script setup>
import HomeCategory from '@/views/Home/components/HomeCategory.vue'
import HomeBanner from '@/views/Home/components/HomeBanner.vue'
import HomeNew from '@/views/Home/components/HomeNew.vue'
import HomeHot from '@/views/Home/components/HomeHot.vue'
import HomeProduct from '@/views/Home/components/HomeProduct.vue'
import HomePanel from '@/views/Home/components/HomePanel.vue'
</script>

<style></style>
