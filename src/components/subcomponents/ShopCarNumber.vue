<template>
  <div class="mui-numbox" data-numbox-min="1" data-numbox-max="9">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input id="test" class="mui-input-numbox" type="number" ref="number" :value="initcount" readonly @change="setcount">
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
</template>

<script>
import mui from "../../lib/mui/js/mui.min.js"
export default {
  // 初始化
  mounted() {
    mui(".mui-numbox").numbox()
  },
  props: ['initcount', 'goodsid'],
  methods: {
    // 修改商品数量时将值传递到store
    setcount() {
      // console.log(this.$refs.number.value)
      this.$store.commit('updateGoodsInfo', {
        id: this.goodsid,
        count: this.$refs.number.value
      })
    }
  }
}
</script>

<style lang="less" scoped>
input {
  color: #666;
}
</style>
