<template>
  <div class="empty-wrapper">
    <image src="/static/images/no-data.png"></image>
    <p>{{notice}}</p>
  </div>
</template>

<script>
  export default {
    name: "empty",
    props: {
      notice: {
        type: String,
        required: false,
        default: '没有数据'
      }
    },
    data () {
      return {
        notice: this.notice
      }
    }
  }
</script>

<style scoped>
  .empty-wrapper{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .empty-wrapper image{
    width: 300rpx;
    height: 300rpx;
    margin-top: 50rpx;
  }
  .empty-wrapper p{
    font-size: 28rpx;
    color: #7d7e80;
    line-height: 100rpx;
  }
</style>