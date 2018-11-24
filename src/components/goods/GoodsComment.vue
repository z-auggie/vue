<template>
  <div>
    <commment :id="this.$route.params.id"></commment>
  </div>
</template>

<script>
// 获取评论组件
import commment from '../subcomponents/Comment.vue'
export default {
  components: {
    commment
  }
}
</script>


<style lang="less" scoped>

</style>
