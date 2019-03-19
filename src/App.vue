<script>
  import wsApi from './utils/wsApi'
  export default {
    data () {
      return {
        can_post: true
      }
    },
    created() {
      let that = this
      wsApi.getSystemInfo().then(res => {
        let model = res.model
        let isIPhoneX = /iphone x/i.test(model)
        that.$store.commit('setIsIPhoneX', isIPhoneX)
      })
    },
    onShow(options) {
      console.log('app onShow', options)
      // 小程序启动，或从后台进入前台显示时
      let that = this
      // that.$store.dispatch('autoLogin')
    },
    onError(err) {
      let that = this
      if (that.can_post) {
        that.$http.post('/wechat_error', {err: err}).then(res => {
          console.log('post wechat error success')
        }).catch(err => {
          that.can_post = false
          console.log('post wechat error fail')
        })
      }
    }
  }
</script>

<style>

</style>
