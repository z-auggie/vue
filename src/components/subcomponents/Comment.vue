<template>
  <div class="comment">
      <h2 class="title">发表评论</h2>
      <hr>
      <!-- .trim 默认将首尾空格清除 -->
      <textarea ecols="30" rows="10" placeholder="请输入要写的内容" v-model.trim="conten"></textarea>
      <mt-button type="primary" size="large" @click="pushComment">发表评论</mt-button>
      <div class="cmt-list">
        <div class="cmt-item" v-for="(item, i) in comments" :key="item.id">
          <!-- 增加全局时间过滤器 -->
          <div class="cmt-title">第{{ i + 1 }}楼 用户：{{ item.user_name }} 发表时间：{{ item.add_time | dateFormat }}</div>
          <!-- 将undefined的评论统一修改 -->
          <div class="ctm-body">{{ item.content === "undefined" ? "空白留言" : item.content }}</div>
        </div>
      </div>
      <!-- v-show判断加载按钮的显示/隐藏 -->
      <mt-button type="danger" size="large" plain  @click="getMore" v-show="flag">加载更多</mt-button>
  </div>
</template>

<script>

import { Toast } from 'mint-ui'
export default {
  data: () => ({
    comments: [],
    pageIndex: 1, //默认的评论页码
    flag: true, //加载按钮的显示与隐藏
    conten: ''
  }),
  props: ["id"],
  methods: {
    getComment() {
      this.$http.get('http://localhost:5000/api/getcomments/'+ this.id +'?pageindex=' + this.pageIndex).then(result => {
        if(result.body.status === 0) {
          this.comments = this.comments.concat(result.body.message)
          // 如果message没有就提示用户并隐藏加载按钮
          if (result.body.message.length === 0) {
            Toast('没有更多')
            this.flag = false
          }
        } else if(result.body.status !== 0) {
          Toast('加载失败')
        }
      })
    },
    // 加载更多
    getMore() {
      this.pageIndex++
      this.getComment()
    },
    // 提交评论
    pushComment() {
      // 没有输入内容提示客户并return
      if(this.conten.length === 0) {
        return Toast('评论的内容不能为空')
      }
      this.$http.post('http://localhost:5000/api/postcomment/' + this.id, { content:this.conten }).then(result => {
        if(result.body.status === 0) {
          Toast('评论成功')
          var cmt = {
            // 手动添加user-name和add_time
            user_name: "匿名用户",
            add_time: Date.now(),
            content: this.conten
          }
          // 最新评论置顶现在在最上面,没有直接刷新是因为pageIndex刷新后++前的评论数据不会显示
          this.comments.unshift(cmt)
          this.conten = ''
        } else {
          Toast('添加失败')
        }
      })
    }
  },
  created() {
    this.getComment()
  }
};
</script>

<style lang="less" scoped>
.comment {
  padding: 0 4px;
  .title {
    font-size: 16px;
    color: black;
  }
  textarea {
    height: 100px;
    min-height: 100px;
    font-size: 12px;
  }
  .cmt-list {
    font-size: 12px;
    line-height: 30px;
    .cmt-item {
      margin: 10px 0;
      .cmt-title {
        background-color: #ddd;
      }
      .ctm-body {
        padding-left: 30px;
      }
    }
  }
}
</style>


