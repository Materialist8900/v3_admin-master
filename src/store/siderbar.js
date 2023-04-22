export const useSiderbarStore = {
  state: {
    collapse: false, //是否隐藏侧边栏
  },
  mutations: {
    //如果是false，则隐藏侧边栏，如果是true则显示
    toggleCollapse(state) {
      state.collapse = !state.collapse
    },
  },
}
