const {Registry} = require('rage-edit')
// const path = require('path')
const {app} = require('electron)

module.exports = {
  url:'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run',
  name:'my_application',
  //设置启动
  setAppStart (cbSus,cbErr){
    Registry.set(
    this.url,   //注册表开机启动应用路径
    this.name, //随意写
    app.getPath('exe'), //当前应用路径，也是自动启动的应用路径
    'REG_SZ', // 固定的
    )
    .then(()=>{
      cbSus && cbSus()
    })
    .catch(()=>{
      cbErr && cbErr()
    })
  },
  // 取消启动
  cancelAppStart (cbSus,cbErr){
    Registry.has(this.url,this.name)
    .then((res)=>{
      if(res){
        Registry.delete(this.url,this.name)
        .then(()=>{
          cbSus && cbSus()
        })
        .catch(()=>{
          cbErr && cbErr()
        })
      }
    })
    .catch(()=>{
      cbErr && cbErr()
    })
  }
}
