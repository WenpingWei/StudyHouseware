/**
 * Created by Visizen on 2019/5/17.
 */
export default {
  // 删除更多
  delMore(checkBoxData, ele, url, dataGet) {
    if (checkBoxData.length === 0) {
      ele.$message({
        showClose: true,
        message: '你还没有勾选哦',
        type: 'error'
      });
      return false
    };
    let axios = ''
    ele.$confirm('此操作将永久删除该文件,是否继续？', '提示', {
      cancelButtonClass: "btn-custom-cancel",
      cancelButtonText: '取消',
      confirmButtonText: '确定',
      type: 'warning'
    }).then(() => {
      let ids = [];
      checkBoxData.map(v => {
        ids.push(v.id)
      });
      axios = ele.$ajax({
        method: 'delete',
        url: $$(url),
        data: ids
      }).then(res => {
        if (res.data.status === 200) {
          ele.$message({
            type: 'success',
            message: '删除成功!'
          });
          dataGet()
        }
      })
    }).catch(() => {
      ele.$message({
        type: 'info',
        message: '已取消删除'
      });

    })
  },
  delFun(checkBoxData, ele, url, dataGet,name) {
    let axios = ''
    ele.$confirm('此操作将永久删除该文件,是否继续？', '提示', {
      cancelButtonClass: "btn-custom-cancel",
      cancelButtonText: '取消',
      confirmButtonText: '确定',
      type: 'warning'
    }).then(() => {
      let ids = [];
      checkBoxData.map(v => {
        ids.push(v.id)
      });
      axios = ele.$ajax({
        method: 'delete',
        url: $$(url),
        data: ids
      }).then(res => {
        if (res.data.status === 200) {
          ele.$message({
            type: 'success',
            message: '删除成功!'
          });
          ele.checkBoxData = []
          dataGet()
        }
      })
    }).catch(() => {
      ele.$message({
        type: 'info',
        message: '已取消删除'
      });
      ele.checkBoxData = []
      dataGet()
    })
  },
  //获取筛选列表
  getList(ele, url, data, callback) {
    ele.$ajax.get($$(url), {
      params: data
    }).then(res => {
      let result = res.data.data
      typeof callback === 'function' && callback.call(window, result);
      return result;
    })
  },
  //获取表格列表
  getTableList(ele, url, data, callback) {
    ele.$ajax.get($$(url), {
      params: data
    }).then(res => {
      let result = res.data.data
      typeof callback === 'function' && callback.call(window, result);
      return result;
    })
  },
  //时间格式
  datetimeFormat(longTypeDate) {
    if (longTypeDate) {
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
      let showSeconds = seconds < 10 ? '0' + seconds : seconds;
      let datetimeType = date.getFullYear() + '-' + showMonth + '-' + showDay+
        ' '+ showHour + ':' + showMinutes + ':' + showSeconds; 
        //yyyy-MM-dd 00:00:00格式日期
      return datetimeType;
    } else {
      return '---'
    }
  },
  dateFormat(longTypeDate) {
    if (longTypeDate) {
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
      let showSeconds = seconds < 10 ? '0' + seconds : seconds;
      let datetimeType = date.getFullYear() + '-' + showMonth + '-' + showDay
        // ' '+ showHour + ':' + showMinutes + ':' + showSeconds; 
        //yyyy-MM-dd 00:00:00格式日期
      return datetimeType;
    } else {
      return '---'
    }
  },
  //  获取url参数
  urlGet() {
    const url = location.href;
    const i = url.indexOf("?");
    if (i == -1) return;
    const querystr = url.substr(i + 1);
    const arr1 = querystr.split("&");
    const arr2 = new Object();
    for (let j in arr1) {
      const ta = arr1[j].split("=");
      arr2[ta[0]] = ta[1];
    }
    return arr2;
  },

  //  跳转到设备详情
  linkDeviceDetail(row) {
    let devID = row.deviceTemplateId;
    console.log(row)
    //现在根据有机械手id来判断，该进入哪个页面,后面后台会加入标识来判断
    // if (devID === "30BC4F3C3ACA43B9F2DD3943D4F9665A") {
    //   window.location.href =
    //     "#/system/detail?id=" +
    //     row.serialNumber +
    //     "&detailID=" +
    //     row.id +
    //     "&devID=" +
    //     devID +
    //     "&deviceTemplateId=" +
    //     devID;
    // } else {
    //   window.location.href =
    //     "#/system/detailInfo?id=" + row.serialNumber + "&detailID=" + row.id + "&deviceTemplateId=" + devID;
    // }
    // window.location.href='#/equipmentManage/menu8?deviceId'
  },
  //根据表达式返回数据
  expressionConversion(val) {
    if (val.indexOf("==") != -1) {
      let num = val.substring(val.indexOf("==") + 2, val.length);
      return {
        num,
        num1: '',
        rule: '等于'
      }
    } else if (val) {
      if (val.indexOf(">") != -1 && val.indexOf("<") != -1) {
        if (val.indexOf(">") > val.indexOf("<")) {
          let num = val.substring(val.indexOf("<") + 2, val.indexOf("and") - 1);
          let num1 = val.substring(val.indexOf(">") + 2, val.length);
          return {
            num,
            num1,
            rule: '禁用区间'
          }
        } else if (val.indexOf(">") < val.indexOf("<")) {
          let num = val.substring(val.indexOf(">") + 2, val.indexOf("and") - 1);
          let num1 = val.substring(val.indexOf("<") + 2, val.length);
          return {
            num,
            num1,
            rule: '允许区间'
          }
        }

      } else {
        if (val.indexOf(">") != -1) {
          let num = val.substring(val.indexOf(">") + 2, val.length);
          return {
            num,
            num1: '',
            rule: '大于'
          }
        } else if (val.indexOf("<") != -1) {
          let num = val.substring(val.indexOf("<") + 2, val.length);
          return {
            num,
            num1: '',
            rule: '小于'
          }
        }
      }
    } else {
      return {
        num: '',
        num1: '',
        rule: '不启用'
      }
    }
  },
  //判断tab页是否渲染
  tabRender(e, val) {
    const permission = e.$store.state.permission.btnPermission.map(v => {
      const children = v.children.filter(item => {
        return item.meta.title === val
      })
      return children.length !== 0
    })
    // console.log(permission)
    const a = permission.includes(true)
    return a
  }

}
