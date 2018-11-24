<template>
  <div class="goodsinfo-container">

    <!-- 购物车小球加入动画 -->
    <transition
     @before-enter="beforeEnter"
     @enter="enter"
     @after-enter="afterEnter"
    >
      <div class="ball" v-show="flag" ref="ball"></div>    
    </transition>


    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <!-- 轮播图组件 v-bind传参 -->
          <swipe :LoopList="LoopList"></swipe>
        </div>
      </div>
    </div>

    <div class="mui-card">
      <div class="mui-card-header">{{ GoodsInfo.title }}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            市场价：<del>￥{{ GoodsInfo.market_price }}</del> 销售价 <span>￥{{ GoodsInfo.sell_price }}</span>
          </p>
          <p>
            购买数量：
            <!-- input数量组件 @func 子组件向父组件传参 :max 传递商品最大值 -->
            <number @func="getCount" :max="GoodsInfo.stock_quantity"></number>
          </p>
          <mt-button type="primary" size="small">立即购买</mt-button>
          <mt-button type="danger" size="small" @click="flag=!flag">加入购物车</mt-button>
        </div>
      </div>
    </div>

    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号：{{ GoodsInfo.goods_no }}</p>
          <p>库存情况：{{ GoodsInfo.stock_quantity }}件</p>
          <p>上架时间：{{ GoodsInfo.add_time | dateFormat('YYYY-MM-DD HH:mm') }}</p>
        </div>
      </div>
      <div class="btn">
        <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
        <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
      </div>

    </div>
    

  </div>
</template>

<script>
// 轮播图
import swipe from "../subcomponents/Lunbo.vue"
// 数值框
import number from "../subcomponents/GoodsNumber.vue"

export default {
  data(){
    return {
      LoopList: [],
      GoodsInfo: [],
      id: this.$route.params.id,
      flag: false,    //小球默认隐藏
      count: 1 //默认商品数量   
    } 
  },
  created() {
    this.getLoopList()
    this.getGoodsInfo()
  },
  methods: {
    // 获取轮播图图片
    getLoopList() {
      this.$http.get('http://localhost:5000/api/getthumimages/' + this.id).then(result => {
        let { status, message } = result.body
        if(status === 0) {
          message.forEach(item => {
            item.img = item.src
          });
          this.LoopList = message
        }
      })
    },
    // 获取商品数据
    getGoodsInfo() {
      this.$http.get('http://localhost:5000/api/goods/getinfo/' + this.id).then( result => {
        let { status, message } = result.body
        if(status === 0) {
          this.GoodsInfo = message
        }
      })
    },
    goDesc(id) {
      // vue-router编程式导航
      this.$router.push({ name: 'goodsdesc', params: { id } })
    },
    goComment(id) {
      this.$router.push({ name: 'goodscomment', params: { id } })
    },
    beforeEnter(el) {
      el.style.transform = "translate(0, 0)"
      el.style.opacity = 0
      el.style.width = "80px"
      el.style.height = "80px"
      el.style.backgroundColor = "red"
    },
    enter(el,done) {
      el.offsetWidth

      ballPosition = this.$refs.ball.getBoundingClientRect()  //获取小球的视窗位置
      badgePosition = document.getElementById('badge').getBoundingClientRect()  //获取购物车徽标的视窗位置
      // 徽标视窗位置减去小球视窗位置得到动态获得小球进入购物车动画
      const yDist = badgePosition.top - ballPosition.top
      const xDist = badgePosition.left - ballPosition.left

      el.style.transform = `translate(${xDist}px,${yDist}px)`
      el.style.opacity = .5
      el.style.width = "15px"
      el.style.height = "15px"
      el.style.backgroundColor = "#ccc"
      el.style.transition = "all .8s" 
      done()
    },
    afterEnter(el) {
      this.flag = !this.flag
    },
    getCount(count) {
      this.count = count
      console.log('数量是' + count)
    }
  },
  components: {
    swipe,
    number
  }
}
</script>

<style lang="less" scoped>
.goodsinfo-container {
  background-color: #eee;
  overflow: hidden;
  .ball {
    position: absolute;
    width: 15px;
    height: 15px;
    top: 390px;
    left: 153px;
    border-radius: 50%;
    background-color: red;
    z-index: 99;
  }
  .price {
    span {
      color: red;
      font-weight: 700;
      font-size: 18px;
    }
  }
  .mint-button {
    margin: 10px 0;
  }
  .btn {
    padding: 0 10px;
  }
}
</style>
