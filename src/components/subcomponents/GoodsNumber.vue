<template>
  <div class="mui-numbox" data-numbox-min="1" data-numbox-max="9">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input id="test" class="mui-input-numbox" type="number" value="1" @change="setcount" ref="number">
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
  methods: {
    setcount() {
      this.$emit('func', parseInt( this.$refs.number.value ))
    }
  },
  props: ['max'],
  watch: {
    // 通过监听触发mui自带API更新最大值
    max: function(newVla) {
      mui('.mui-numbox').numbox().setOption('max', this.max)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
