<template>
  <div class="no-more-wrapper">
    <div class="line"></div>
    <div class="notice">没有更多内容了</div>
    <div class="line"></div>
  </div>
</template>

<script>
  export default {
    name: "noMore",
    data() {
      return {}
    },
    created() {

    },
    mounted() {

    },
    methods: {},
  }
</script>

<style scoped>
  .no-more-wrapper{
    width: 100%;
    padding: 20rpx;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .no-more-wrapper .line{
    width: 100rpx;
    height: 1px;
    background-color: #7d7e80;
  }
  .no-more-wrapper .notice{
    font-size: 24rpx;
    color: #7d7e80;
    padding: 0 50rpx;
  }
</style>