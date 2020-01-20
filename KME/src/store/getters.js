const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  myname: state => state.user.myname,
  roles: state => state.user.roles,
  roleId: state => state.user.roleId,
  addRouters: state => state.permission.addRouters,
  btnPermission: state => state.permission.btnPermission
}
export default getters
