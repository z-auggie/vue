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
    //这是vue-preview的关键数据
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
    // 获取图片信息
    getInfo() {
      this.$http
        .get("http://localhost:5000/api/getimageInfo/" + this.$route.params.id)
        .then(result => {
          if (result.body.status === 0) {
            // this.mageInfo = result.body.message[0] //http://www.lovegf.cn:8899 用这个接口
            this.mageInfo = result.body.message //http://localhost:5000 用这个接口
          }
        });
    },
    // 获取缩略图
    getHumimg() {
      this.$http
        .get("http://localhost:5000/api/getthumimages/" + this.$route.params.id)
        .then(result => {
          let {status, message} = result.body
          // 声明变量接收vue-preview所需要的参数src、msrc、w、h
          let newImg = {}
          if (status === 0) {
            for(var i = 0; i < message.length; i++) {
              newImg.src = message[i].src
              newImg.msrc = message[i].src
              newImg.w = 200
              newImg.h = 300
              // 将添加的属性push到vue-preview的slide中
              this.slide.push(newImg)
              // 清空，用于下次循环后添加
              newImg = {}
            }
          }
        });
    }
  }
};
</script>

<style lang="less">
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
  div.my-gallery {
      display: flex;
      flex-wrap: wrap;
      padding: 10px;
      justify-content: space-between;
      text-align: center;
      figure {
        margin: 0;
        width: 30%;
        img {
          width: 100%;
          height: 120px;
        }
      }
  }
}
</style>
