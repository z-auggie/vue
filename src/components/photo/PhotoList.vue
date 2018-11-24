<template>
  <div>
    <!-- 顶部 -->
      <div id="slider" class="mui-slider">
        <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
          <div class="mui-scroll">
            <!-- id为0的分类默认高亮，避免其他分类也都高亮 -->
            <a :class="['mui-control-item', item.id === 0 ? 'mui-active' : '' ]" v-for="item in title" :key="item.id" @tap="getPhotoList(item.id)">
              {{ item.title }}
            </a>
          </div>
        </div>
      </div>

      <!-- 图片列表 -->
      <ul class="photo-list">
        <router-link :to="'/home/photoinfo/' + item.id" v-for="item in list" :key="item.id" tag="li">
        <!-- mintUI懒加载 -->
          <img v-lazy="item.img_url">
          <div class="info">
            <h1 class="info-title">{{ item.title }}</h1>
            <p class="info-body">{{ item.zhaiyao }}</p>
          </div>
        </router-link>
      </ul>

  </div>
</template>


<script>
// mui的scroll组件的js部分
import mui from "../../lib/mui/js/mui.min.js"
export default {
  data: () => ({
    title: [],
    list: []
  }),
  mounted() {
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },
  created() {
    this.getTitle();
    this.getPhotoList(0); //默认请求全部的图片列表
  },
  methods: {
    getTitle() {
      this.$http
        .get("http://localhost:5000/api/getimgcategory")
        .then(result => {
          console.log(result)
          if (result.body.status === 0) {
            this.title = result.body.message;
            this.title.unshift({ id: 0, title: "全部" });
          }
        });
    },
    // 根据id获取不同的分类下的图片列表
    getPhotoList(id) {
      this.$http
        .get("http://localhost:5000/api/getimages/" + id)
        .then(result => {
          console.log(result)
          if (result.body.status === 0) {
            this.list = result.body.message;
          }
        });
    }
  }
};
</script>

<style lang="less" scoped>
  * {
    touch-action: pan-y;
  }
  .photo-list {
    margin: 0;
    list-style: none;
    padding: 10px;
    li {
      background-color: #ddd;
      box-shadow: 0 0 9px #999;
      margin-bottom: 20px;
      text-align: center;
      position: relative;
      img {
        width: 100%;
        height: 300px;
        vertical-align: middle;
      }
      // 懒加载的加载中样式
      img[lazy="loading"] {
        width: 40px;
        height: 300px;
        margin: auto;
      }
      .info {
        position: absolute;
        bottom: 0;
        padding: 0 10px;
        max-height: 84px;
        width: 100%;
        color: #fff;
        text-align: left;
        background-color: rgba(0, 0, 0, .4);
        .info-title {
          font-size: 14px;
        }
        .info-body {
          color: #fff;
          font-size: 13px;
        }
      }
    }
  }
</style>

