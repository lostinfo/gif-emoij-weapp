let nullFn = () => {
}

let services = {
  sleep: (time) => {
    return new Promise(function (resolve, reject) {
      setTimeout(resolve, time)
    })
  },
  stop: () => {
    return new Promise(function (resolve, reject) {
    })
  },
  taskSequence: () => {
    return new Promise(function (resolve, reject) {
      resolve()
    })
  },
  toastError: (msg) => {
    return wx.showToast({
      title: msg,
      icon: 'none'
    })
  },
  toastSuccess: (msg) => {
    return wx.showToast({
      title: msg,
      icon: 'success'
    })
  }
}
let wsApi =  new Proxy(services, {
  get: function (target, property) {
    if (property in target) {
      return target[property]
    } else if (property in wx) {
      return (obj) => {
        return new Promise(function (resolve, reject) {
          obj = obj || {}
          obj.success = (...args) => {
            resolve(...args)
          }
          obj.fail = (...args) => {
            reject(...args)
          }
          obj.complete = nullFn
          wx[property](obj)
        })
      }
    } else {
      throw {
        name: 'IllegalAPIException',
        message: "No Such API [" + property + "]"
      }
    }
  }
})

export default wsApi
