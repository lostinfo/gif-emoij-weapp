<template>
  <div class="container">
    <div class="emoij-wrapper">
      <div class="emoij-item">
        <image class="emoij" mode="aspectFit" :src="emate_template.default_url"></image>
      </div>
    </div>
    <div class="create-form">
      <div class="form-item" v-for="(item, index) in emate_template.default_content" :key="index">
        <input type="text" :placeholder="item" :data-index="index" @input="handleInput">
      </div>
      <div class="form-submit">
        <div class="submit-btn">点击生成</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        emate_template: {
          id: 1,
          default_url: 'https://app.xuty.tk/static/upload/6_6c5a89ec586e4c8a161835697b27e098.gif',
          content_length: 5,
          default_content: [
            '好啊',
            '别说我是一等良民',
            '就算你们真的想要诬告我',
            '我有的是钱请律师帮我打官司',
            '我想我根本不用坐牢',
            '你别以为有钱了不起啊',
            'sorry 有钱真的了不起',
            '不过我想你不会明白这种感觉',
            '不明白 不明白'
          ],
          content: [

          ]
        }
      }
    },
    created() {

    },
    mounted() {

    },
    methods: {
      handleInput(event) {

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