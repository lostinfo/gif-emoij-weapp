import wsApi from './wsApi'
let Fly = require('flyio/dist/npm/wx')
let fly = new Fly()

// fly.config.headers = {}

fly.config.baseURL = 'https://emoij.it9g.com:9527/api/v1'

fly.config.headers = {
  'Content-Type': 'application/json',
}

import store from '../store'

//添加请求拦截器
fly.interceptors.request.use((request)=>{
  let authorization = store.state.authorization
  if (authorization !== null) {
    request.headers['Authorization'] = authorization
  }
  return request
})

//添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use(
  (response) => {
    //只将请求结果的data字段返回
    if (response.headers.hasOwnProperty('authorization')) {
      store.commit('setAuthorization', response.headers.authorization[0])
    }
    return new Promise((resolve, reject) => {
      if (response.data.code == 200) {
        resolve(response.data.data)
      } else {
        reject(response)
      }
    })
  },
  (err) => {
    //发生网络错误后会走到这里
    return new Promise((resolve, reject) => {
      let message = '网络错误'
      wsApi.toastError(message)
      setTimeout(() => {
        reject(err.response)
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
    'Authorization': store.state.authorization,
  }
}).then(res => {
  return JSON.parse(res.data)
}).catch(err => {
  wsApi.toastError(err.message)
  return Promise.resolve(err.message)
})

export default fly
