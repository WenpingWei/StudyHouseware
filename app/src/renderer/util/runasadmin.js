const {Registry} = require('rage-edit')
const {app } = require('electron')

module.exports = (cbSus,cbErr)=>{
  Registry.set(
  'HKCU\\Software\\Microsoft\\Windows NT\\CurrentVersion\\AppCompatFlags\\Layers', // 固定，管理员权限应用列表
  app.getPath('exe'), //应用路径
  '~ RUNASADMIN', //固定写死
  'REG_SZ', // 固定写死
  )
}