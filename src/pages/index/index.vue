<template>
  <div class="container fixed">
    <div class="search-wrapper">
      <div class="search-input">
        <image mode="aspectFit" src="/static/images/search.png"></image><p>热门词汇</p>
      </div>
      <div class="search-keywords">
        <p>热门1</p>
        <p>热门2</p>
        <p>热门3</p>
      </div>
    </div>
    <div class="index-content">
      <div class="emoij-group">
        <div class="emoij-group-header">
          <div class="emoij-group-title">
            <p class="icon"></p>
            <div class="title">热门专区</div>
            <image class="arrow" src="/static/images/arrow-right.png"></image>
          </div>
        </div>
        <div class="emoij-list">
          <div class="emoij-item" v-for="(emoij, index) in emoij_list" :key="index">
            <image mode="aspectFit" :src="emoij.default_url"></image>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        emoij_list: [
          {
            id: 1,
            name: '名称',
            default_url: '/static/test/6_6c5a89ec586e4c8a161835697b27e098.gif'
          },
          {
            id: 1,
            name: '名称',
            default_url: '/static/test/6_6c5a89ec586e4c8a161835697b27e098.gif'
          },
          {
            id: 1,
            name: '名称',
            default_url: '/static/test/ok.jpg'
          },
          {
            id: 1,
            name: '名称',
            default_url: '/static/test/6_6c5a89ec586e4c8a161835697b27e098.gif'
          },
          {
            id: 1,
            name: '名称',
            default_url: '/static/test/6_6c5a89ec586e4c8a161835697b27e098.gif'
          },
          {
            id: 1,
            name: '名称',
            default_url: '/static/test/ok.jpg'
          },
          {
            id: 1,
            name: '名称',
            default_url: '/static/test/6_6c5a89ec586e4c8a161835697b27e098.gif'
          },
          {
            id: 1,
            name: '名称',
            default_url: '/static/test/ok.jpg'
          },
          {
            id: 1,
            name: '名称',
            default_url: '/static/test/ok.jpg'
          },
        ]
      }
    },
    created() {

    },
    mounted() {

    },
    methods: {

    },
  }
</script>

<style scoped>
  .container{
    background-color: #F4F4F4;
  }
  .search-wrapper{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 140rpx;
    background-color: #FFE000;
    padding: 10rpx 30rpx 0 30rpx;
    box-sizing: border-box;
  }
  .search-wrapper .search-input{
    width: 100%;
    height: 60rpx;
    border-radius: 10rpx;
    background-color: #FFFFFF;
    font-size: 24rpx;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .search-wrapper .search-input image{
    width: 30rpx;
    height: 30rpx;
  }
  .search-wrapper .search-input p{
    padding-left: 1em;
    color: #bfbfbf;
  }
  .search-wrapper .search-keywords{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    font-size: 24rpx;
    line-height: 60rpx;
    color: #222222;
  }
  .search-wrapper .search-keywords p:nth-child(n+2){
    padding-left: 2em;
  }
  .index-content{
    position: fixed;
    top: 140rpx;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .emoij-group{
    margin-top: 20rpx;
    background-color: #FFFFFF;
    width: 100%;
    padding: 10rpx 0;
    box-sizing: border-box;
  }
  .emoij-group-header{
    border-bottom: 1px solid #f8f8f8;
    padding: 10rpx 0;
  }
  .emoij-group-title{
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 60rpx;
    padding: 0 30rpx;
    box-sizing: border-box;
  }
  .emoij-group-title p.icon{
    width: 8rpx;
    height: 30rpx;
    background-color: #FFE000;
    margin-right: 1em;
  }
  .emoij-group-title .title{
    font-size: 24rpx;
    color: #222222;
    flex: 1;
  }
  .emoij-group-title .arrow{
    width: 30rpx;
    height: 30rpx;
  }
  .emoij-group .emoij-list{
    width: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    /* 750 */
    /* 30 a 30 b 30 c 30 d  30 */
    /* (750 - 150) / 4 = 150 */
  }
  .emoij-item{
    width: 150rpx;
    height: 150rpx;
    margin-right: 30rpx;
    margin-top: 30rpx;
  }
  /* 1 5 9 ... */
  .emoij-item:nth-child(4n+1){
    margin-left: 30rpx;
  }
  .emoij-item image{
    width: 150rpx;
    height: 150rpx;
    border: 1px solid #F4F4F4;
    box-sizing: border-box;
  }
</style>