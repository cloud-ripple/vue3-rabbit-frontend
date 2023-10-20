<script setup>
import { getDetailById } from '@/apis/detail'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import DetailHot from '@/views/Detail/components/DetailHot.vue'

// src/components 目录下有可能还会有很多其它项目通用型组件，有可能在多个业务模块中共享，统一进行全局组件注册
// import ImageView from '@/components/ImageView/index.vue'
// 引入SKU组件
// import Sku from '@/components/SKU/index.vue'

// 定义商品详情数据
const detailGoods = ref({})
const route = useRoute()

const getDetailGoods = async () => {
  const res = await getDetailById(route.params.id)
  // console.log(`id=${route.params.id}商品详情数据： `, res)
  detailGoods.value = res.result
}

onMounted(() => {
  getDetailGoods()
})

// SKU规格数据(商品颜色、尺码)被操作时
const skuChange = (sku) => {
  // console.log(sku)
}
</script>

<template>
  <div class="xtx-goods-page">
    <div class="container">
      <div class="bread-container">
        <!-- 首页中的商品详情，面包屑导航 -->
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/' }"> 首页 </el-breadcrumb-item>
          <!-- 注意：组件挂载在请求之前，数据还没有获取到，此处 {}.categories => undefined => undefined[1] 报错
          解决方法：1. 使用可选链语法 ?.      2. 通过v-if手动控制渲染时机，保证只有数据存在才会渲染
          -->
          <el-breadcrumb-item :to="{ path: `/category/${detailGoods.categories?.[1].id}` }">
            <!-- 父级分类导航名 -->
            {{ detailGoods.categories?.[1].name }}
          </el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: `/category/sub/${detailGoods.categories?.[0].id}` }">
            <!-- 二级商品分类导航名 -->
            {{ detailGoods.categories?.[0].name }}
          </el-breadcrumb-item>
          <el-breadcrumb-item>
            <!-- 当前商品详情名 -->
            {{ detailGoods.name }}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 商品信息 -->
      <div class="info-container">
        <div>
          <div class="goods-info">
            <div class="media">
              <!-- 图片预览区 -->
              <ImageView :image-list="detailGoods.mainPictures" />

              <!-- 左侧区域 统计数量 -->
              <ul class="goods-sales">
                <li>
                  <p>销量人气</p>
                  <p>{{ detailGoods.salesCount }}</p>
                  <p><i class="iconfont icon-task-filling"></i>销量人气</p>
                </li>
                <li>
                  <p>商品评价</p>
                  <p>{{ detailGoods.commentCount }}</p>
                  <p><i class="iconfont icon-comment-filling"></i>查看评价</p>
                </li>
                <li>
                  <p>收藏人气</p>
                  <p>{{ detailGoods.collectCount }}</p>
                  <p><i class="iconfont icon-favorite-filling"></i>收藏商品</p>
                </li>
                <li>
                  <p>品牌信息</p>
                  <p>{{ detailGoods.brand?.name }}</p>
                  <p><i class="iconfont icon-dynamic-filling"></i>品牌主页</p>
                </li>
              </ul>
            </div>
            <div class="spec">
              <!-- 右侧区域 商品信息区 -->
              <p class="g-name">{{ detailGoods.name }}</p>
              <p class="g-desc">{{ detailGoods.desc }}</p>
              <p class="g-price">
                <span>{{ detailGoods.oldPrice }}</span>
                <span> {{ detailGoods.price }}</span>
              </p>
              <div class="g-service">
                <dl>
                  <dt>促销</dt>
                  <dd>12月好物放送，App领券购买直降120元</dd>
                </dl>
                <dl>
                  <dt>服务</dt>
                  <dd>
                    <span>无忧退货</span>
                    <span>快速退款</span>
                    <span>免费包邮</span>
                    <a href="javascript:;">了解详情</a>
                  </dd>
                </dl>
              </div>
              <!-- sku组件 -->
              <Sku :goods="detailGoods" @change="skuChange" />
              <!-- 数据组件 -->

              <!-- 按钮组件 -->
              <div>
                <el-button size="large" class="btn"> 加入购物车 </el-button>
              </div>
            </div>
          </div>
          <div class="goods-footer">
            <div class="goods-article">
              <!-- 中部下方区域 商品详情 -->
              <div class="goods-tabs">
                <nav>
                  <a>商品详情</a>
                </nav>
                <div class="goods-detail">
                  <!-- 属性 -->
                  <ul class="attrs">
                    <!-- 特别注意：渲染模板时遇到对象的多层属性访问，可能会出现 Cannot read properties of undefined 属性未定义
                    是因为后台请求的数据在渲染之后才有，导致对象为null
                    解决方法：1. 使用可选链语法 ?.      2. 通过v-if手动控制渲染时机，保证只有数据存在才会渲染
                    -->
                    <li v-for="item in detailGoods.details?.properties" :key="item.value">
                      <span class="dt">{{ item.name }}</span>
                      <span class="dd">{{ item.value }}</span>
                    </li>
                  </ul>
                  <!-- 图片 -->
                  <img v-for="url in detailGoods.details?.pictures" :src="url" :key="url" alt="" />
                </div>
              </div>
            </div>
            <!-- 24热榜+专题推荐 -->
            <div class="goods-aside">
              <!-- 24小时热榜 -->
              <DetailHot :hot-type="1" />
              <!-- 周热榜 -->
              <DetailHot :hot-type="2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.xtx-goods-page {
  .goods-info {
    min-height: 600px;
    background: #fff;
    display: flex;

    .media {
      width: 580px;
      height: 600px;
      padding: 30px 50px;
    }

    .spec {
      flex: 1;
      padding: 30px 30px 30px 0;
    }
  }

  .goods-footer {
    display: flex;
    margin-top: 20px;

    .goods-article {
      width: 940px;
      margin-right: 20px;
    }

    .goods-aside {
      width: 280px;
      min-height: 1000px;
    }
  }

  .goods-tabs {
    min-height: 600px;
    background: #fff;
  }

  .goods-warn {
    min-height: 600px;
    background: #fff;
    margin-top: 20px;
  }

  .number-box {
    display: flex;
    align-items: center;

    .label {
      width: 60px;
      color: #999;
      padding-left: 10px;
    }
  }

  .g-name {
    font-size: 22px;
  }

  .g-desc {
    color: #999;
    margin-top: 10px;
  }

  .g-price {
    margin-top: 10px;

    span {
      &::before {
        content: '¥';
        font-size: 14px;
      }

      &:first-child {
        color: $priceColor;
        margin-right: 10px;
        font-size: 22px;
      }

      &:last-child {
        color: #999;
        text-decoration: line-through;
        font-size: 16px;
      }
    }
  }

  .g-service {
    background: #f5f5f5;
    width: 500px;
    padding: 20px 10px 0 10px;
    margin-top: 10px;

    dl {
      padding-bottom: 20px;
      display: flex;
      align-items: center;

      dt {
        width: 50px;
        color: #999;
      }

      dd {
        color: #666;

        &:last-child {
          span {
            margin-right: 10px;

            &::before {
              content: '•';
              color: $xtxColor;
              margin-right: 2px;
            }
          }

          a {
            color: $xtxColor;
          }
        }
      }
    }
  }

  .goods-sales {
    display: flex;
    width: 400px;
    align-items: center;
    text-align: center;
    height: 140px;

    li {
      flex: 1;
      position: relative;

      ~ li::after {
        position: absolute;
        top: 10px;
        left: 0;
        height: 60px;
        border-left: 1px solid #e4e4e4;
        content: '';
      }

      p {
        &:first-child {
          color: #999;
        }

        &:nth-child(2) {
          color: $priceColor;
          margin-top: 10px;
        }

        &:last-child {
          color: #666;
          margin-top: 10px;

          i {
            color: $xtxColor;
            font-size: 14px;
            margin-right: 2px;
          }

          &:hover {
            color: $xtxColor;
            cursor: pointer;
          }
        }
      }
    }
  }
}

.goods-tabs {
  min-height: 600px;
  background: #fff;

  nav {
    height: 70px;
    line-height: 70px;
    display: flex;
    border-bottom: 1px solid #f5f5f5;

    a {
      padding: 0 40px;
      font-size: 18px;
      position: relative;

      > span {
        color: $priceColor;
        font-size: 16px;
        margin-left: 10px;
      }
    }
  }
}

.goods-detail {
  padding: 40px;

  .attrs {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 30px;

    li {
      display: flex;
      margin-bottom: 10px;
      width: 50%;

      .dt {
        width: 100px;
        color: #999;
      }

      .dd {
        flex: 1;
        color: #666;
      }
    }
  }

  > img {
    width: 100%;
  }
}

.btn {
  margin-top: 20px;
}

.bread-container {
  padding: 25px 0;
}
</style>
