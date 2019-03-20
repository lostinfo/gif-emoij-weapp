<template>
  <div class="container">
    <div class="emoij-wrapper">
      <div class="emoij-item">
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
        <div class="emoij-actions">
          <div class="emoij-action">
            保存到手机
          </div>
          <div class="emoij-action" :data-id="emoij.id" @click="toCreateEmoij">
            使用此模板
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import wsApi from '../../utils/wsApi'
  export default {
    name: "index",
    data() {
      return {
        emoij: {
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
      }
    },
    created() {

    },
    mounted() {

    },
    methods: {
      toCreateEmoij(event) {
        let id = event.mp.currentTarget.dataset.id
        wsApi.navigateTo({
          url: '/pages/create_emoij/main?id=' + id
        })
      }
    },
  }
</script>

<style scoped>
  .emoij-wrapper{
    background-color: #FFFFFF;
  }
</style>