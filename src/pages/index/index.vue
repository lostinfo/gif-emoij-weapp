<template>
  <div class="container">
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
    <div class="index-block">
      <div class="block-header">
        <div class="title">热门表情</div>
        <div class="desc">有趣的表情</div>
      </div>
      <div class="block-content">
        <div class="emoij-list">
          <div class="emoij-item" v-for="(emoij, index) in emoij_list" :key="index" :data-id="emoij.id" @click="toEmoijInfo">
            <image class="emoij" mode="aspectFit" :src="emoij.emoij_url"></image>
            <div class="emoij-item-content">
              <image class="user-avatar" :src="emoij.user.avatar"></image>
              <div class="user-n-t">
                <p class="nickname">{{emoij.user.nickname}}</p>
                <p class="created-at">{{emoij.created_at}}</p>
              </div>
              <div class="emoij-icon">
                <image src="/static/images/vote.png" class="icon"></image>
                <p>{{emoij.vote_count}}</p>
              </div>
              <div class="emoij-icon">
                <image src="/static/images/view.png" class="icon"></image>
                <p>{{emoij.view_count}}</p>
              </div>
            </div>
          </div>
        </div>
        <div v-if="emoij_empty" class="scroll-list-empty">
          <empty></empty>
        </div>
        <div v-if="emoij_list.length > 0" class="scroll-list-footer">
          <scroll-footer :loading="emoij_loading" :has-more="emoij_has_more"></scroll-footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import scrollFooter from '../../components/scrollFooter'
  import wsApi from '../../utils/wsApi'
  export default {
    name: "index",
    data() {
      return {
        emoij_list: [
          {
            id: 1,
            emoij_url: 'https://app.xuty.tk/static/upload/6_6c5a89ec586e4c8a161835697b27e098.gif',
            created_at: '03-20 18:40',
            user: {
              avatar: '/static/test/avatar.jpg',
              nickname: '热心网页系五五'
            },
            view_count: '999+',
            vote_count: '9999+'
          },
          {
            id: 1,
            emoij_url: 'https://app.xuty.tk/static/upload/6_6c5a89ec586e4c8a161835697b27e098.gif',
            created_at: '03-20 18:40',
            user: {
              avatar: '/static/test/avatar.jpg',
              nickname: '热心网页系五五'
            },
            view_count: '999+',
            vote_count: '9999+'
          },
          {
            id: 1,
            emoij_url: 'https://app.xuty.tk/static/upload/6_6c5a89ec586e4c8a161835697b27e098.gif',
            created_at: '03-20 18:40',
            user: {
              avatar: '/static/test/avatar.jpg',
              nickname: '热心网页系五五'
            },
            view_count: '999+',
            vote_count: '9999+'
          },
          {
            id: 1,
            emoij_url: 'https://app.xuty.tk/static/upload/6_6c5a89ec586e4c8a161835697b27e098.gif',
            created_at: '03-20 18:40',
            user: {
              avatar: '/static/test/avatar.jpg',
              nickname: '热心网页系五五'
            },
            view_count: '999+',
            vote_count: '9999+'
          },
          {
            id: 1,
            emoij_url: 'https://app.xuty.tk/static/upload/6_6c5a89ec586e4c8a161835697b27e098.gif',
            created_at: '03-20 18:40',
            user: {
              avatar: '/static/test/avatar.jpg',
              nickname: '热心网页系五五'
            },
            view_count: '999+',
            vote_count: '9999+'
          },
        ],
        emoijCurrentPage: 1,
        emoijPageSize: 8,
        produtcTotal: 24,
        emoij_empty: false,
        emoij_loading: false,
      }
    },
    components: {
      scrollFooter
    },
    computed: {
      emoij_has_more: function () {
        let that = this
        return that.emoijCurrentPage * that.emoijPageSize < that.produtcTotal
      }
    },
    created() {

    },
    mounted() {

    },
    onReachBottom() {
      this.loadMore()
    },
    onUnload() {
      let that = this
      that.emoij_list = that.emoij_list.slice(0, 5)
      that.emoijCurrentPage = 1
      that.emoijPageSize = 8
      that.produtcTotal = 24
      that.emoij_empty = false
      that.emoij_loading = false
    },
    methods: {
      loadMore() {
        let that = this
        if (!that.emoij_has_more) return
        that.emoijCurrentPage++
        that.getEmoijList()
      },
      getEmoijList() {
        let that = this
        that.emoij_loading = true
        setTimeout(() => {
          that.emoij_loading = false
          that.emoij_list = that.emoij_list.concat(that.emoij_list)
        }, 2000)
      },
      toEmoijInfo(event) {
        let id = event.mp.currentTarget.dataset.id
        wsApi.navigateTo({
          url: '/pages/emoij_info/main?id=' + id
        })
      }
    },
  }
</script>

<style scoped>
  .container{
    background-color: #F4F4F4;
  }
  .search-wrapper{
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
  .index-block{
    width: 100%;
  }
  .index-block .block-header{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 30rpx;
    box-sizing: border-box;
    background-color: #FFFFFF;
  }
  .index-block .block-header .title{
    color: #222222;
    font-size: 40rpx;
    font-weight: 600;
  }
  .index-block .block-header .desc{
    color: #999999;
    font-size: 24rpx;
  }
  .index-block .block-content{

  }
</style>