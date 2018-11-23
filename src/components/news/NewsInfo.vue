<template>
  <div class="newsinfo-caontainer">
    <h2 class="title">{{ newInfo.title }}</h2>
    <p class="subtitle">
      <span>发表时间：{{ newInfo.add_time | dateFormat}}</span>
      <span>点击： {{ newInfo.click }}次</span>
    </p>

    <hr>
    <!-- 内容 -->
    <div class="content" v-html="newInfo.content"></div>

    <!-- 评论 -->
    <comment :id="this.id"></comment>
  </div>
</template>

<script>
import comment from "../subcomponents/Comment.vue";
export default {
  data() {
    return {
      id: this.$route.params.id,
      newInfo: {}
    };
  },
  created() {
    this.getNewsInfo();
  },
  methods: {
    getNewsInfo() {
      this.$http.get("http://www.lovegf.cn:8899/api/getnew/" + this.id).then(result => {
        if (result.body.status === 0) {
          this.newInfo = result.body.message[0]
        }
      });
    }
  },
  components: {
    comment
  }
};
</script>

<style lang="less" scoped>
.newsinfo-caontainer {
  padding: 0 4px;
  .title {
    font-size: 16px;
    margin: 10px 5px;
    text-align: center;
    color: firebrick;
  }
  .subtitle {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: darkblue;
  }
  .content {
    font-size: 12px;
    margin: 15px 0;
  }
}
</style>
