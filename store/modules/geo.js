//vuex存放的数据
const state = () => ({
  position: {}
})

//修改数据的方法
const mutations = {
  setPosition(state, val) {
    state.position = val;
  }
}

//调用mutations方法
const actions = {
  setPosition: ({
    commit
  }, position) => {
    commit('setPosition', position)
  }
}

export default {
  state,
  mutations,
  actions
}
