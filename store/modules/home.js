//vuex存放的数据
const state = () => ({
  menu: [],
  hotPlace: []
})

//修改数据的方法
const mutations = {
  setMenu(state, val) {
    state.menu = val;
  },
  setHotPlace(state, val) {
    state.hotPlace = val;
  }
}

//调用mutations方法
const actions = {
  setMenu: ({
    commit
  }, val) => {
    commit('setMenu', val)
  },
  setHotPlace: ({
    commit
  }, val) => {
    commit('setHotPlace', val)
  }
}

export default {
  state,
  mutations,
  actions
}
