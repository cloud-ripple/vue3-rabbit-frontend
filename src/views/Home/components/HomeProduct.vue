<script setup>
// 引入封装的组件
import HomePanel from '@/views/Home/components/HomePanel.vue'
import HomeGoodsItem from '@/views/Home/components/HomeGoodsItem.vue'

import { getGoodsAPI } from '@/apis/home'
import { onMounted, ref } from 'vue'

const goodsList = ref([])

const getGoods = async () => {
  const res = await getGoodsAPI()
  // console.log('所有商品数据：', res)
  goodsList.value = res.result
}

onMounted(() => {
  getGoods()
})
</script>

<template>
  <div class="home-product">
    <HomePanel
      :title="cate.name"
      :sub-title="cate.saleInfo"
      v-for="cate in goodsList"
      :key="cate.id"
    >
      <!-- 以下是放入插槽中的内容 -->
      <div class="box">
        <RouterLink class="cover" to="/">
          <!-- 使用封装的图片懒加载指令替换src -->
          <img v-img-lazy="cate.picture" />
          <strong class="label">
            <span>{{ cate.name }}馆</span>
            <span>{{ cate.saleInfo }}</span>
          </strong>
        </RouterLink>
        <ul class="goods-list">
          <li v-for="good in cate.goods" :key="good.id">
            <!-- 以下可以封装抽取成一个组件，方便复用 -->
            <!-- <RouterLink to="/" class="goods-item">
              <img v-img-lazy="good.picture" alt="" />
              <p class="name ellipsis">{{ good.name }}</p>
              <p class="desc ellipsis">{{ good.desc }}</p>
              <p class="price">&yen;{{ good.price }}</p>
            </RouterLink> -->
            <!-- 使用封装的组件来替代上面通用部分，并该该组件传入 good参数 -->
            <HomeGoodsItem :good="good" />
          </li>
        </ul>
      </div>
    </HomePanel>
  </div>
</template>

<style scoped lang="scss">
.home-product {
  background: #fff;
  margin-top: 20px;
  .sub {
    margin-bottom: 2px;

    a {
      padding: 2px 12px;
      font-size: 16px;
      border-radius: 4px;

      &:hover {
        background: $xtxColor;
        color: #fff;
      }

      &:last-child {
        margin-right: 80px;
      }
    }
  }

  .box {
    display: flex;

    .cover {
      width: 240px;
      height: 610px;
      margin-right: 10px;
      position: relative;

      img {
        width: 100%;
        height: 100%;
      }

      .label {
        width: 188px;
        height: 66px;
        display: flex;
        font-size: 18px;
        color: #fff;
        line-height: 66px;
        font-weight: normal;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translate3d(0, -50%, 0);

        span {
          text-align: center;

          &:first-child {
            width: 76px;
            background: rgba(0, 0, 0, 0.9);
          }

          &:last-child {
            flex: 1;
            background: rgba(0, 0, 0, 0.7);
          }
        }
      }
    }

    .goods-list {
      width: 990px;
      display: flex;
      flex-wrap: wrap;

      li {
        width: 240px;
        height: 300px;
        margin-right: 10px;
        margin-bottom: 10px;

        &:nth-last-child(-n + 4) {
          margin-bottom: 0;
        }

        &:nth-child(4n) {
          margin-right: 0;
        }
      }
    }

    // .goods-item {
    //   display: block;
    //   width: 220px;
    //   padding: 20px 30px;
    //   text-align: center;
    //   transition: all 0.5s;

    //   &:hover {
    //     transform: translate3d(0, -3px, 0);
    //     box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
    //   }

    //   img {
    //     width: 160px;
    //     height: 160px;
    //   }

    //   p {
    //     padding-top: 10px;
    //   }

    //   .name {
    //     font-size: 16px;
    //   }

    //   .desc {
    //     color: #999;
    //     height: 29px;
    //   }

    //   .price {
    //     color: $priceColor;
    //     font-size: 20px;
    //   }
    // }
  }
}
</style>
