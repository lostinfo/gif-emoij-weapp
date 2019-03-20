<template>
  <div class="scroll-footer">
    <div v-if="loading" class="footer-content">
      <image src="/static/images/loading.gif"></image>
      <!--<loading></loading>-->
      <p>正在加载更多数据</p>
    </div>
    <div v-if="!loading" class="footer-content">
      <p v-if="hasMore">上拉查看更多内容</p>
      <p v-if="!hasMore">没有更多内容了</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "scrollFooter",
    props: {
      loading: {
        type: Boolean,
        required: false,
        default: false
      },
      hasMore: {
        type: Boolean,
        required: false,
        default: true
      },
    },
    data() {
      return {
        loading: this.loading,
        hasMore: this.hasMore,
        animation: ''
      }
    },
    created() {

    },
    mounted() {

    },
    methods: {},
  }
</script>

<style scoped>
  .scroll-footer{
    background-color: transparent;
  }
  .scroll-footer .footer-content{
    width: 100%;
    height: 70rpx;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .scroll-footer .footer-content image{
    width: 50rpx;
    height: 50rpx;
  }
  .scroll-footer .footer-content p{
    font-size: 24rpx;
    color: #999999;
  }
</style>