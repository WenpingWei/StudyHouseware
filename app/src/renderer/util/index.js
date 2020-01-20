export function padStart (str) {
  let len = str.toString().length
  while (len < 2) {
    str = '0' + str
    len++
  }
  return str
}
export function getDateTime (ft, date) {
  let now = date || new Date()
  let y = now.getFullYear()
  let week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  let mm = padStart(now.getMonth() + 1, 2, '0')
  let dd = padStart(now.getDate(), 2, '0')
  let hh = padStart(now.getHours(), 2, '0')
  let mi = padStart(now.getMinutes(), 2, '0')
  let ss = padStart(now.getSeconds(), 2, '0')
  let ww = week[now.getDay()]
  var res = ft.replace(/yyyy|mm|dd|hh|mi|ss|ww/gi, function (m) {
    let rem
    switch (m) {
      case 'yyyy':rem = y; break
      case 'mm':rem = mm; break
      case 'dd':rem = dd; break
      case 'hh':rem = hh; break
      case 'mi':rem = mi; break
      case 'ss':rem = ss; break
      case 'ww':rem = ww; break
      default: rem = m
    }
    return rem
  })
  return res
}
export function toFixeds (num, s) { // 保留三位小数
  var times = Math.pow(10, s)
  var des = num * times + 0.5
  des = parseInt(des, 10) / times
  return des + ''
}
export function timeCount (diff) {
  if (!diff) {
    return {
      day: 0,
      hrs: 0,
      min: 0
    }
  }
  let dayDiff = Math.floor(diff / (24 * 3600 * 1000)) // 天数
  let leave1 = diff % (24 * 3600 * 1000) // 计算天数后剩余的毫秒数
  let hours = Math.floor(leave1 / (3600 * 1000))// 计算出小时数
  // 计算相差分钟数
  let leave2 = leave1 % (3600 * 1000) // 计算小时数后剩余的毫秒数
  let minutes = Math.floor(leave2 / (60 * 1000))// 计算相差分钟数
  // 计算相差秒数
  // var leave3 = leave2 % (60 * 1000) // 计算分钟数后剩余的毫秒数
  // var seconds = Math.round(leave3 / 1000)
  // return `${dayDiff}天${hours}小时${minutes}分钟${seconds}秒`
  return {
    day: dayDiff,
    hrs: hours + dayDiff * 24,
    min: minutes
  }
}

export function reverBit (num,x = 0) {
  return num ^ (1 << x)
}
export function getBit (num,x = 0) {
  return (num & (1 << x)) >> x
}

export default {
  PI: 3.1415925,
  MS: 24 * 3600 * 1000,
  inHg: 2.0360209
}
