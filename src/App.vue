<template>
  <div class="app-caontainer">
      <!-- 顶部 -->
      <mt-header fixed title="Vue项目"></mt-header>
      <!-- 内容 -->
      <transition>
        <router-view></router-view>      
      </transition>

      <!-- 底部 -->
      <nav class="mui-bar mui-bar-tab">
        <!-- router-link路由链接 -->
        <router-link class="mui-tab-item-zyl" to="/home">
          <span class="mui-icon mui-icon-home"></span>
          <span class="mui-tab-label">首页</span>
        </router-link>
        <router-link class="mui-tab-item-zyl" to="/member">
          <span class="mui-icon mui-icon-contact"></span>
          <span class="mui-tab-label">会员</span>
        </router-link>
        <router-link class="mui-tab-item-zyl" to="/shopcar">
          <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
            <span class="mui-badge" id="badge">0</span>
          </span>
          <span class="mui-tab-label">购物车</span>
        </router-link>
        <router-link class="mui-tab-item-zyl" to="/search">
          <span class="mui-icon mui-icon-search"></span>
          <span class="mui-tab-label">搜索</span>
        </router-link>
      </nav>
  </div>
</template>

<script>
</script>

<style lang="less" scoped>
.mint-header.is-fixed {
  z-index: 999;
}
.app-caontainer {
  padding-top: 40px;
  padding-bottom: 50px;
  overflow-x: hidden;
}
// 切换动画
.v-enter {
  opacity: 0;
  transform: translateX(100%);
}
.v-leave-to {
  position: absolute;
  opacity: 0;
  transform: translateX(-100%);  
}
.v-enter-active,
.v-leave-active {
  transition: all 1s;
}
// 该类名，解决 tabbar 点击无法切换的问题
.mui-bar-tab .mui-tab-item-zyl.mui-active {
    color: #007aff;
}

.mui-bar-tab .mui-tab-item-zyl {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
}

.mui-bar-tab .mui-tab-item-zyl .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
}

.mui-bar-tab .mui-tab-item-zyl .mui-icon~.mui-tab-label {
    font-size: 11px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>


