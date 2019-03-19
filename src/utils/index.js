function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

export function formatDay(end_time) {
  //获取当前时间
  let date = new Date();
  let now = date.getTime();
  //设置截止时间
  let endDate = new Date(end_time);
  let end = endDate.getTime();

  //时间差
  let leftTime = end - now;
  //定义变量 d,h,m,s保存倒计时的时间
  let d, h, m, s;
  if (leftTime >= 0) {
    d = Math.floor(leftTime / 1000 / 60 / 60 / 24);
    h = Math.floor(leftTime / 1000 / 60 / 60 % 24);
    // m = Math.floor(leftTime / 1000 / 60 % 60);
    // s = Math.floor(leftTime / 1000 % 60);
    return d + '天' + h + '时'
  }
  return 0;
}

export default {
  formatNumber,
  formatTime,
  formatDay
}
