<script setup>
// 引入封装的面板组件
import HomePanel from '@/views/Home/components/HomePanel.vue'
// 引入人气推荐数据的接口
import { getHotAPI } from '@/apis/home'

import { ref, onMounted } from 'vue'

// 定义数据
const hotList = ref([])

const findHot = async () => {
  const res = await getHotAPI()
  hotList.value = res.result
}

// 组件挂载完毕后调用接口
onMounted(() => {
  findHot()
})
</script>

<template>
  <!-- 使用封装的面板组件 -->
  <HomePanel title="人气推荐" sub-title="人气爆款 不容错过">
    <!-- 下面是插槽主体内容模版 -->
    <ul class="goods-list">
      <li v-for="item in hotList" :key="item.id">
        <RouterLink to="/">
          <img v-img-lazy="item.picture" alt="" />
          <p class="name">{{ item.title }}</p>
          <p class="desc">{{ item.alt }}</p>
        </RouterLink>
      </li>
    </ul>
  </HomePanel>
</template>

<style scoped lang="scss">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;

  li {
    width: 306px;
    height: 406px;

    background: #f0f9f4;
    transition: all 0.5s;

    &:hover {
      transform: translate3d(0, -3px, 0);
      box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
    }

    img {
      width: 306px;
      height: 306px;
    }

    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    .price {
      color: $priceColor;
    }
  }
}
</style>
