<template>
  <div>

    <ul class="mui-table-view">

      <li class="mui-table-view-cell mui-media" v-for="item in newsList" :key="item.id">
        <router-link :to="'/home/newsinfo/' + item.id">
        <!-- scr记得绑定 -->
          <img class="mui-media-object mui-pull-left" :src="item.img_url">
          <div class="mui-media-body">
            <p>{{item.title}}</p>
            <p class="mui-ellipsis">
              <span>发表时间： {{item.add_time | dateFormat}} </span>
              <span>点击： {{item.click}}次</span>
            </p>
          </div>
        </router-link>
      </li>

    </ul>

  </div>
</template>

<script>
import { Toast } from "mint-ui"
export default {
  data: () => ({
    newsList: []
  }),
  created() {
    this.getNewsList()
  },
  methods: {
    getNewsList(){
      this.$http.get('http://www.lovegf.cn:8899/api/getnewslist').then( result => {
        if(result.body.status === 0) {
          this.newsList = result.body.message
        } else {
          Toast('获取数据失败')
        }
      })
    }
  }
}
</script>


<style lang="less" scoped>
  .mui-media-body {
    font-size: 14px;
    .mui-ellipsis {
      font-size: 12px;
      color: skyblue;
      display: flex;
      justify-content: space-between;
    }
  }
</style>

