<template>
  <div class="goods-list">

    <!-- <router-link :to="'/home/goodsinfo/' + item.id" class="goods-item" v-for="item in goodsList" :key="item.id" tag="div">
      <img :src="item.img_url" alt="">
      <h2>{{ item.title }}</h2>
      <div class="info">
        <p class="pric">
          <span class="new">￥{{ item.sell_price }}</span>
          <span class="old">￥{{ item.market_price }}</span>
        </p>
        <p class="sellers">
          <span>热卖中</span>
          <span>剩{{ item.stock_quantity }}件</span>
        </p>
      </div>
    </router-link> -->
    <div class="goods-item" v-for="item in goodsList" :key="item.id" @click="goDetail(item.id)">
      <img :src="item.img_url" alt="">
      <h2>{{ item.title }}</h2>
      <div class="info">
        <p class="pric">
          <span class="new">￥{{ item.sell_price }}</span>
          <span class="old">￥{{ item.market_price }}</span>
        </p>
        <p class="sellers">
          <span>热卖中</span>
          <span>剩{{ item.stock_quantity }}件</span>
        </p>
      </div>
    </div>

    <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>

  </div>
</template>

<script>
export default {
  data: () => ({
    pageIndex: 1,
    goodsList: []
  }),
  created() {
    this.getList()
  },
  methods: {
    // 获取页面数据
    getList() {
      this.$http
        // .get("http://localhost:5000/api/getgoods?pageindex=" + this.pageIndex)
        .get("http://www.lovegf.cn:8899/api/getgoods?pageindex=" + this.pageIndex)
        .then(result => {
          let { status, message } = result.body;
          if (status === 0) {
            this.goodsList = this.goodsList.concat(message);
          }
        });
    },
    // 加载更多
    getMore() {
      this.pageIndex++;
      this.getList();
    },
    // 跳转详情
    goDetail(id) {
      // this.$router.push('/home/goodsinfo/' + id) 
      this.$router.push({ name: 'goodsinfo', params: { id }})
    }
  }
};
</script>

<style lang="less" scoped>
.goods-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 10px;
  .goods-item {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 2px;
    width: 49%;
    min-height: 260px;
    margin-bottom: 10px;
    box-shadow: 0 0 8px #999;
    img {
      width: 100%;
    }
    h2 {
      font-size: 16px;
    }
    .info {
      background-color: #eee;
      .pric {
        .new {
          color: crimson;
        }
        .old {
          color: #999;
          font-size: 12px;
          text-decoration: line-through;
        }
      }
      p {
        padding: 5px;
        margin: 0;
      }
    }
    .sellers {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
