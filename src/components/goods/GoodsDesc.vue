<template>
  <div class="goodsdesc-container">
    <h1>{{ getMessage.title }}</h1>
    <hr>
    <div v-html="getMessage.content" class="content"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      getMessage: []
    }
  },
  created() {
    this.getMsg()
  },
  methods: {
    getMsg() {
      this.$http.get("http://localhost:5000/api/goods/getdesc/" + this.$route.params.id).then(result => {
        let { status, message } = result.body
        if(status === 0) {
          this.getMessage = message
        }
      })
    }
  }
}
</script>


<style lang="less" scoped>
.goodsdesc-container {
  padding: 0 4px;
  h1 {
    font-size: 16px;
    color: #226aff;
    text-align: center;
    margin: 15px 0;
  }
  .content {
    padding: 5px;
    font-size: 12px;
  }
}
</style>
