/**
 * Created by Admin on 2019/4/17.
 */
 let path = ''
// let path1 = 'http://192.168.30.8:8800'
// let path = 'http://project.vszapp.com:9099/vsz_cloud'
// let path1 = 'http://192.168.5.16:8090/cameo_cloud'
let path1='http://114.116.196.109:8800/cameo_cloud'
function $$ (url) {
  return url
}
function $$$ (url) {
  return path1 + url
}

//时间戳转换时间格式
  function datetimeFormat(longTypeDate) {
  let date = new Date();
  date.setTime(longTypeDate);
  let mouth = parseInt(date.getMonth() + 1);
  let dateDay = date.getDate();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let showMonth = mouth < 10 ? '0' + mouth : mouth;
  let showDay = dateDay < 10 ? '0' + dateDay : dateDay;
  let showHour = hours < 10 ? '0' + hours : hours;
  let showMinutes = minutes < 10 ? '0' + minutes : minutes;
  let showSeconds = seconds<10 ? '0' + seconds : seconds;
  let datetimeType = date.getFullYear() + '-' + showMonth + '-' + showDay +
    ' ' + showHour + ':'+ showMinutes +':'+showSeconds;//yyyy-MM-dd 00:00:00格式日期
  return datetimeType;
}


