<template>
  <div>
    <mt-swipe :auto="2000">
      <mt-swipe-item v-for="items in LoopList" :key="items.url">
        <img :src='items.img'>
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
export default {
  data: () => ({

  }),
  // 获取父组件传来的参数,展示对应的图片
  props: ['LoopList']
}
</script>

<style lang="less" scoped>
// 轮播图样式
.mint-swipe {
  height: 200px;
  min-height: 200px;
  .mint-swipe-item {
    &:nth-of-type(1) {
      background-color: skyblue;
    }
    &:nth-of-type(2) {
      background-color: deeppink;
    }
    &:nth-of-type(3) {
      background-color: gold;
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
