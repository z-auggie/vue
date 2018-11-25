<template>
  <div class="shopcar-container">
    <!-- 商品列表 -->
    <div class="mui-card" v-for="(item, i) in carList" :key="item.id">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <!-- 按钮  -->
          <mt-switch v-model="$store.getters.getSelected[item.id]" @change="selectedChanged(item.id, $store.getters.getSelected[item.id])"></mt-switch>
          <!-- <img :src= "item.thumb_path"> -->
          <!-- 图片不可用 -->
          <img src="http://localhost:5000/share/images/9.jpg" >
          <div class="info">
            <p class="title">{{ item.title }}</p>
            <!-- input数量组件 -->
            <span class="price">￥{{ item.sell_price }}</span>
            <div class="infobox">
              <number :initcount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></number>
              <a class="del" href="#" @click.prevent="removeGoods(item.id, i)">删除</a>                  
            </div>
          </div>

        </div>
      </div>
    </div>
    <!-- 结算部分 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner payment">
          <div class="left">
            <p>总计（不含运费）</p>
            <p>
              已勾选商品 <i>{{ $store.getters.getAmount.count }}</i> 件
            </p>
            <p>
              总价：<i>￥{{ $store.getters.getAmount.amount }}</i>
            </p>
          </div>
          <div class="right">
            <mt-button type="danger">去结算</mt-button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import number from "../subcomponents/ShopCarNumber.vue";

export default {
  data: function() {
    return {
      carList: [],
      counts: this.$store.getters.getGoodsCount
    };
  },
  created() {
    this.getShopList();
  },
  methods: {
    getShopList() {
      var arr = [];
      JSON.parse(localStorage.getItem("car")).forEach(item => {
        arr.push(item.id);
      });
      if (arr.length <= 0) {
        return;
      }
      // 接口木有
      this.$http
        // .get("http://localhost:5000/api/goods/getshopcarlist/" + arr.join(","))
        .get(
          "http://www.lovegf.cn:8899/api/goods/getshopcarlist/" + arr.join(",")
        )
        .then(result => {
          console.log(result);
          let { status, message } = result.body;
          if (status === 0) {
            this.carList = message;
          }
        });
    },
    removeGoods(id, index) {
      // id用来在store中删除 index用来购物车界面删除
      this.carList.splice(index, 1);
      this.$store.commit("removeGoods", id);
    },
    selectedChanged(id, selected) {
      // console.log(id + '---' + selected)
      let info = {id, selected}
      this.$store.commit('updateSelected', info)
    }
  },
  components: {
    number
  }
};
</script>


<style lang="less" scoped>
.shopcar-container {
  .mui-card-content-inner {
    display: flex;
    align-items: center;
    img {
      margin: 2vw;
      width: 16vw;
      height: 16vw;
    }
    p {
      margin: 0;
    }
    .info {
      .title {
        font-size: 13px;
        font-weight: 700;
      }

      .price {
        color: red;
        font-weight: 700;
      }
      .infobox {
        display: flex;
        justify-content: space-between;
        .mui-numbox {
          padding: 0 10.67vw;
          // width: 9vw;
          height: 6.67vw;
        }
      }
    }
  }
  .payment {
    justify-content: space-between;
    i {
      font-style: normal;
      color: red;
      font-weight: 700;
      font-size: 18px;
    }
  }
}
</style>



