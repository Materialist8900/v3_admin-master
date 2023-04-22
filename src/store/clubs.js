// 引入用户列表api
import { clubs } from '@/api/clubs'

export const clubStore = {
  state: {
    clubs: [],
  },
  getters: {
    allClubs: state => {
      const arr = []
      state.clubs.forEach(item => {
        arr.push(item.name)
      })
      return arr
    },
    echartsData: state => {
      const newData = []
      state.clubs.forEach(item => {
        newData.push({ value: item.members.length, name: item.name })
      })
      return newData
    },
  },
  mutations: {
    getClubs(state, res) {
      state.clubs = res.data
    },
  },
  actions: {
    async fetchClubsData(context) {
      const { data: res } = await clubs()
      context.commit('getClubs', res)
    },
  },
}
