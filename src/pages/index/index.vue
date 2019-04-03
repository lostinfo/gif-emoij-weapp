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
      <div class="block-content" v-if="user">
        <div class="emoij-list">
          <div class="emoij-item" v-for="(emoij, index) in emoij_list" :key="index" :data-id="emoij.id" @click="toEmoijInfo">
            <image class="emoij" mode="aspectFit" :src="emoij.cover_url"></image>
            <div class="emoij-item-content">
              <image class="user-avatar" :src="emoij.cover_url"></image>
              <div class="user-n-t">
                <p class="nickname">no name</p>
                <p class="created-at">no datetime</p>
              </div>
              <div class="emoij-icon">
                <image src="/static/images/vote.png" class="icon"></image>
                <p>999+</p>
              </div>
              <div class="emoij-icon">
                <image src="/static/images/view.png" class="icon"></image>
                <p>999+</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="!user">
        <button class="login-btn" open-type="getUserInfo" @getuserinfo="onGetUserInfo">登录体验</button>
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
        emoij_list: [],
      }
    },
    components: {
      scrollFooter
    },
    computed: {
      user() {
        return this.$store.state.user
      }
    },
    created() {

    },
    mounted() {
      this.getEmoijList()
    },
    onReachBottom() {

    },
    onUnload() {
      let that = this
      that.emoij_list = []
    },
    methods: {
      getEmoijList() {
        let that = this
        wsApi.showLoading()
        that.$http.get('/emoji/list').then(res => {
          wsApi.hideLoading()
          that.emoij_list = res
        })
      },
      toEmoijInfo(event) {
        let id = event.mp.currentTarget.dataset.id
        // wsApi.navigateTo({
        //   url: '/pages/emoij_info/main?id=' + id
        // })
        wsApi.navigateTo({
          url: '/pages/create_emoij/main?id=' + id
        })
      },
      onGetUserInfo(event) {
        if (event.mp.detail.userInfo === undefined) {
          wsApi.toastError('未授权 登录失败')
          return false
        }
        let that = this
        wsApi.login()
          .then(res => {
            let code = res.code
            wsApi.showLoading()
            that.$http.get('/user/login', {...event.mp.detail.userInfo, code})
              .then(res => {
                that.$store.commit('setUser', event.mp.detail.userInfo)
                console.log(that.$store.state)
                wsApi.hideLoading()
                wsApi.toastSuccess('登录成功')
              }).catch(err => {
                console.log(err)
            })
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
  .login-btn{
    margin: 30rpx 60rpx;
    width: 630rpx;
    box-sizing: border-box;
    border: unset;
    background-color: unset;
    color: #999999;
  }
</style>