// 引入用户列表api
import { userList } from '@/api/userList'

export const userListStore = {
  state: {
    userList: [],
  },
  getters: {
    isAdmin: () => {
      if (localStorage.getItem('userToken').split('-')[0] === 'admin') {
        return 'admin'
      } else {
        return 'user'
      }
    },
  },
  mutations: {
    // 获取有权限登录的用户列表
    getUserList(state, res) {
      state.userList = res.data
    },
  },
  actions: {
    // GET请求---得到用户列表数据
    async fetchData(context) {
      const { data: res } = await userList()
      context.commit('getUserList', res)
    },
  },
}
