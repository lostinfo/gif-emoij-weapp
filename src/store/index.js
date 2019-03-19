import Vue from 'vue'
import Vuex from 'vuex'
import wsApi from '../utils/wsApi'
import fly from '../utils/fly'
Vue.use(Vuex)

const AUTHORIZATION_NAME = 'authorization_name'

const store = new Vuex.Store({
  state: {
    user: null,
    authorization: null,
    isIPhoneX: false,
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    unsetUser(state) {
      state.user = null
    },
    setAuthorization(state, authorization) {
      state.authorization = authorization
      wsApi.setStorage({key: AUTHORIZATION_NAME, data: authorization})
    },
    unsetAuthorization(state) {
      state.authorization = null
      wsApi.removeStorage({key: AUTHORIZATION_NAME})
    },
    setIsIPhoneX(state, isIPhoneX) {
      state.isIPhoneX = isIPhoneX
    }
  },
  actions: {
    login({commit}, res) {
      let user = res.user
      let authorization = res.token
      return new Promise((resolve, reject) => {
        commit('setUser', user)
        commit('setAuthorization', authorization)
        resolve()
      })
    },
    autoLogin({commit}) {
      return new Promise((resolve, reject) => {
        wsApi.getStorage({key: AUTHORIZATION_NAME}).then(res =>{
          let authorization = res.data
          if (authorization) {
            commit('setAuthorization', authorization)
            fly.post('/check').then(res => {
              if (res.status) {
                commit('setUser', res.user)
                resolve()
              } else {
                commit('unsetUser')
                commit('unsetAuthorization')
                reject()
              }
            }).catch(err => {
              commit('unsetUser')
              commit('unsetAuthorization')
              reject()
            })
          } else {
            commit('unsetUser')
            commit('unsetAuthorization')
            reject()
          }
        }).catch(err => {
          console.log(err)
        })
      })
    },
    logout() {

    },
    refreshUser({commit}) {
      fly.get('/user').then(res => {
        commit('setUser', res)
      })
    },
    waitLogin({commit}) {
      return new Promise((resolve, reject) => {
        let sleep_count = 0
        let sh = setInterval(() => {
          console.log('waitLogin', sleep_count)
          if (sleep_count > 10 || this.state.user !== null) {
            console.log('waitLogin end',)
            clearInterval(sh)
            resolve()
          } else {
            sleep_count++
          }
        }, 200)
      })
    }
  },
})

Vue.prototype.$store = store

export default store