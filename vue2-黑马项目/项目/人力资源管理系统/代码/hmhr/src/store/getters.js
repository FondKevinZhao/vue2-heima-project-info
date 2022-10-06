const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token, // 返回用户token
  avatar: state => state.user.userInfo.staffPhoto, // 返回用户头像地址
  name: state => state.user.userInfo.username, // 返回用户名
  companyId: state => state.user.userInfo.companyId // 公司 ID
}
export default getters
