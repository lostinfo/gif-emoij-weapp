import wsApi from './wsApi'
let Fly = require('flyio/dist/npm/wx')
let fly = new Fly()

// fly.config.headers = {}

// dev
// fly.config.baseURL = 'http://pmall.localhost/api'
fly.config.baseURL = 'http://taiziling.localhost'

// prod
// fly.config.baseURL = 'https://hdy.enwei.com.cn/api'

fly.config.headers = {
  'Content-Type': 'application/json',
}

import store from '../store'

//添加请求拦截器
fly.interceptors.request.use((request)=>{
  let authorization = store.state.authorization
  if (authorization !== null) {
    request.headers['Authorization'] = 'Bearer ' + authorization
  }
  return request
})

//添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use(
  (response) => {
    //只将请求结果的data字段返回
    return response.data
  },
  (err) => {
    //发生网络错误后会走到这里
    return new Promise((resolve, reject) => {
      let message = ''
      switch (err.status) {
        case 422:
          message = err.response.data.message
          break
        case 401:
          store.commit('unsetUser')
          store.commit('unsetAuthorization')
          wsApi.navigateTo({
            url: '/pages/login/main'
          })
          message = '请登录'
          break
        default:
          message = '未知错误'
          break
      }
      wsApi.toastError(message)
      let response_data = null
      if (err.response !== undefined && err.response.data != undefined) {
        response_data = err.response.data
      }
      setTimeout(() => {
        reject(response_data)
      }, 2000)
    })
  }
)

fly.uploadFile =(url, file_path) => wsApi.uploadFile({
  url: fly.config.baseURL + url,
  filePath: file_path,
  name: 'file',
  header: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + store.state.authorization,
  }
}).then(res => {
  return JSON.parse(res.data)
}).catch(err => {
  wsApi.toastError(err.message)
  return Promise.resolve(err.message)
})

export default fly
