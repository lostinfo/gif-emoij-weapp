<template>
  <div class="container" v-if="emoij_template">
    <div class="emoij-wrapper">
      <div class="emoij-item">
        <image class="emoij" mode="aspectFit" :src="emoij_template.image_url" v-if="!create_image" @click="viewTemplateImage"></image>
        <image class="emoij" mode="aspectFit" :src="create_image" v-if="create_image" @click="viewCreateImage"></image>
      </div>
    </div>
    <div class="create-form">
      <div class="form-item" v-for="(item, index) in emoij_template.sentence" :key="index">
        <input type="text" :placeholder="item" :data-index="index" @input="handleInput">
      </div>
      <div class="form-submit">
        <div class="submit-btn" @click="submit">点击生成</div>
      </div>
    </div>
  </div>
</template>

<script>
  import wsApi from "../../utils/wsApi";

  export default {
    name: "index",
    data() {
      return {
        emoij_template: null,
        sentences: [],
        create_image: ''
      }
    },
    created() {

    },
    mounted() {
      let id = this.$root.$mp.query.id
      this.getEmoijTemplate(id)
    },
    methods: {
      getEmoijTemplate(id) {
        let that = this
        wsApi.showLoading()
        that.$http.get('/emoji/detail?id=' + id).then(res => {
          wsApi.hideLoading()
          that.emoij_template = res
          for (let i in res.sentence) {
            that.sentences.push("")
          }
        }).catch(err => {
          wsApi.hideLoading()
          console.log(err)
        })
      },
      handleInput(event) {
        let value = event.mp.detail.value
        let index = event.mp.currentTarget.dataset.index
        this.sentences[index] = value
      },
      submit(event) {
        let that = this
        for (let i in that.sentences) {
          if (that.sentences[i] == '') {
            that.sentences[i] = that.emoij_template.sentence[i]
          }
        }
        wsApi.showLoading()
        that.$http.post('/emoji/create?encode=' + that.emoij_template.md5_encode, {
          sentence: that.sentences.join('|')
        }).then(res => {
          wsApi.hideLoading()
          wsApi.toastSuccess('创建成功')
          that.create_image = res.image_url
        }).catch(err => {
          wsApi.hideLoading()
          console.log(err)
        })
      },
      viewTemplateImage() {
        wsApi.previewImage({
          current: this.emoij_template.image_url,
          urls: [this.emoij_template.image_url]
        })
      },
      viewCreateImage() {
        wsApi.previewImage({
          current: this.create_image,
          urls: [this.create_image]
        })
      }
    },
  }
</script>

<style scoped>
  .container{
    background-color: #FFFFFF;
    padding-bottom: 50rpx;
    box-sizing: border-box;
  }
  .emoij-wrapper{
    background-color: #FFFFFF;
  }
  .emoij-item{
    margin-top: 0;
  }
  .create-form{
    width: 100%;
    padding: 30rpx;
    box-sizing: border-box;
    background-color: #FFFFFF;
  }
  .create-form .form-item{
    width: 100%;
    height: 70rpx;
    padding: 10rpx 0;
    box-sizing: border-box;
    font-size: 24rpx;
    line-height: 50rpx;
    background-color: #FFFFFF;
    border-bottom: 1px solid #bfbfbf;
  }
  .create-form .form-item:nth-child(n+2){
    margin-top: 20rpx;
  }
  .create-form .form-submit{
    width: 100%;
    height: 120rpx;
    margin-top: 30rpx;
  }
  .create-form .form-submit .submit-btn{
    width: 100%;
    height: 90rpx;
    box-sizing: border-box;
    background: linear-gradient(90deg, rgba(255, 224, 0, 0.85), #ffe000);
    border-radius: 10rpx;
    color: #000000;
    font-size: 26rpx;
    line-height: 90rpx;
    text-align: center;
  }
</style>