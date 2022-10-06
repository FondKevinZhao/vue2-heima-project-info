import defaultSettings from '@/settings'

const { showSettings, fixedHeader, sidebarLogo } = defaultSettings

const state = {
  showSettings: showSettings, // 全局关键信息配置
  fixedHeader: fixedHeader, // 是否固定头部
  sidebarLogo: sidebarLogo // 左侧导航的logo
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => { // 修改全局关键信息配置的值
    // eslint-disable-next-line no-prototype-builtins
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  }
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

