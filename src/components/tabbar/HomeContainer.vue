<template>
  <div>
    <!-- 轮播图 -->
    <mt-swipe :auto="2000">
      <mt-swipe-item v-for="items in LoopList" :key="items.url">
        <img :src='items.img'>
      </mt-swipe-item>
    </mt-swipe>
    <!-- 导航 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
        <img src="../../images/menu1(1).png">
        <div class="mui-media-body">新闻资讯</div></a></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
        <img src="../../images/menu2.png">
         <div class="mui-media-body">图片分享</div></a></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
       <img src="../../images/menu3.png">
        <div class="mui-media-body">商品购买</div></a></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
        <img src="../../images/menu4.png">
        <div class="mui-media-body">留言反馈</div></a></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
        <img src="../../images/menu5.png">
        <div class="mui-media-body">视频专区</div></a></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
        <img src="../../images/menu6.png">
        <div class="mui-media-body">联系我们</div></a></li>
    </ul>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
  data: () => ({
    LoopList: []
  }),
  created() {
    this.getLoopPic()
  },
  methods: {
    getLoopPic() {
      this.$http.get('http://localhost:5000/api/getlunbo').then(result => {
        if(result.body.status === 0) {
          this.LoopList = result.body.message
        } else {
          Toast('获取轮播图失败')
        }
      })
    }
  }
}

</script>

<style lang="less" scoped>
  body {
    background-color: #fff !important;
  }
// 轮播图样式
  .mint-swipe {
    height: 200px;
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
// 导航样式
  .mui-grid-view.mui-grid-9 {
    background-color: #fff;
    .mui-table-view-cell {
      border: none;
    }
    img {
      width: 50%;
    }
    .mui-media-body {
      font-size: 14px !important;
    }
  }
</style>

