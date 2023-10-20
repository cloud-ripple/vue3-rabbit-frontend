<script setup>
  // 在组合式API中 定义props来声明接收 
  defineProps({
    // 主标题
    title: {
      type: String
    },
    // 副标题
    subTitle: {
      type: String
    }
  })
</script>


<template>
  <div class="home-panel">
    <div class="container">
      <div class="head">
         <!-- 主标题和副标题是纯文本，可以抽象成props传入 -->
        <h3>
          {{ title }}<small>{{ subTitle }}</small>
        </h3>
      </div>
      <!-- 主体内容区域：是复杂的模板，抽象成插槽传入 -->
      <!-- <div> 主体内容 </div> -->
      <!-- 此处采用默认插槽 -->
      <slot />
    </div>
  </div>
</template>

<style scoped lang='scss'>
.home-panel {
  background-color: #fff;

  .head {
    padding: 40px 0;
    display: flex;
    align-items: flex-end;

    h3 {
      flex: 1;
      font-size: 32px;
      font-weight: normal;
      margin-left: 6px;
      height: 35px;
      line-height: 35px;

      small {
        font-size: 16px;
        color: #999;
        margin-left: 20px;
      }
    }
  }
}
</style>