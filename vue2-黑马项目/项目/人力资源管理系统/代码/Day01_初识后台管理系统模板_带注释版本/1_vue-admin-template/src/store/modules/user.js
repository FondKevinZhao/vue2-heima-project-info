import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => { // 获取state的默认初始值对象(和正常写效果一样)
  return {
    token: getToken(),
    name: '',
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => { // 重置state为初始值(类似清空)
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => { // 设置token值
    state.token = token
  },
  SET_NAME: (state, name) => { // 设置名字
    state.name = name
  },
  SET_AVATAR: (state, avatar) => { // 设置头像
    state.avatar = avatar
  }
}

const actions = {
  // user login
  // 登录的网络请求actions方法
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        // 保存登录成功的token
        commit('SET_TOKEN', data.token) // 到vuex
        setToken(data.token) // 到cookie里
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  // 获取用户信息的接口方法
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        const { name, avatar } = data

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  // 用户退出
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  // 删除token
  resetToken({ commit }) {
    return new Promise(resolve => {
      // 删除本地cookie
      removeToken() // must remove  token  first
      // 删除 vuex里的
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

