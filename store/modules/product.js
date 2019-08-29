const state = () => ({
  categoryText: '', //分类选项
  location: [] //金纬度
})

const mutations = {
  setCategoryText(state, val) {
    state.categoryText = val;
  },
  setLocation(state, val) {
    state.location = val;
  },
}

const actions = {
  setCategoryText: ({
    commit
  }, val) => {
    commit('setCategoryText', val)
  },
  setLocation: ({
    commit
  }, val) => {
    commit('setLocation', val)
  }
}

const getters = {
  categoryText: state => state.categoryText,
  location: state => state.location
}


export default {
  state,
  mutations,
  actions,
  getters
}
