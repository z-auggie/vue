<template>
  <div class="photoinfo-container">
    <h1 class="title">{{ mageInfo.title }}</h1>
    <p class="subtitle">
      <span>发表时间：{{ mageInfo.add_time }}</span>
      <span>点击次数： {{ mageInfo.click }}次</span>
    </p>
    <hr>
    <div class="content" v-html="mageInfo.content"></div>
    <!-- 图片缩略图 -->
    <div id="img-box">
      <vue-preview :slides="slide"></vue-preview>      
    </div>

    <!-- 评论子组件 -->
    <comment :id="this.$route.params.id"></comment>
  </div>
</template>

<script>
import comment from "../subcomponents/Comment.vue";
export default {
  data: () => ({
    mageInfo: [],
    slide: []
  }),
  created() {
    this.getInfo();
    this.getHumimg();
  },
  components: {
    comment
  },
  methods: {
    getInfo() {
      this.$http
        .get("http://www.lovegf.cn:8899/api/getimageInfo/" + this.$route.params.id)
        .then(result => {
          console.log(result)
          if (result.body.status === 0) {
            this.mageInfo = result.body.message[0];
          }
        });
    },
    getHumimg() {
      this.$http
        .get("http://www.lovegf.cn:8899/api/getthumimages/" + this.$route.params.id)
        .then(result => {
          let {status, message} = result.body
          let newImg = {}
          if (status === 0) {
            for(var i = 0; i < message.length; i++) {
              newImg.src = message[i].src
              newImg.msrc = message[i].src
              newImg.w = 200
              newImg.h = 300
              this.slide.push(newImg)
              newImg = {}
            }
          }
        });
    }
  }
};
</script>

<style lang="less" scoped>
.photoinfo-container {
  padding: 0 5px;
  .title {
    padding: 15px 0;
    text-align: center;
    color: deepskyblue;
    font-size: 15px;
  }
  .subtitle {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
  }
  .content {
    font-size: 12px;
  }
  #img-box {
      text-align: center;
  }
}
</style>
