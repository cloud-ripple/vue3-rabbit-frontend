<script setup>
// 引入封装的面板组件
import HomePanel from '@/views/Home/components/HomePanel.vue'
// 引入获取新鲜好物数据的接口
import { findNewAPI } from '@/apis/home'

import { ref, onMounted } from 'vue'

// 定义数据
const newList = ref([])

const findNew = async () => {
  const res = await findNewAPI()
  // console.log('新鲜好物:', res)
  newList.value = res.result
}

// 组件挂载完毕后调用接口
onMounted(() => {
  findNew()
})

</script>

<template>
  <!-- 使用封装的面板组件 -->
  <HomePanel title="新鲜好物" sub-title="新鲜出炉 品质靠谱">
    <!-- 下面是插槽主体内容模版 -->
    <ul class="goods-list">
      <li v-for="item in newList" :key="item.id">
        <RouterLink :to="{
          name: 'detail',
          params: {id: item.id}
        }">
          <img :src="item.picture" alt="" />
          <p class="name">{{ item.name }}</p>
          <p class="price">&yen;{{ item.price }}</p>
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
