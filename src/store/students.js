// 引入用户列表api
import { students } from '@/api/students'

export const studentStore = {
  state: {
    students: [],
  },
  getters: {
    // 系别列表
    majorList: state => {
      return state.students.reduce((acc, student) => {
        if (!acc.includes(student.major)) {
          acc.push(student.major)
        }
        return acc
      }, [])
    },
    // 每个系的学生所选择的社团数量
    clubCount: (state, getters) => {
      const allCount = getters.majorList.map(major => {
        return [
          ...new Set(state.students.filter(val => val.major === major).flatMap(val => val.clubs)),
        ].length
      })
      return allCount
    },
  },
  mutations: {
    // 获取有权限登录的用户列表
    getStudents(state, res) {
      state.students = res.data
    },
    // 新增学生信息
    addNewStudent(state, data) {
      data.gender = data.gender === 'male' ? '男' : '女'
      const newId =
        state.students.length === 0 ? 1 : state.students[state.students.length - 1].id + 1
      const newData = { id: newId, ...data }
      state.students.push(newData)
    },
  },
  actions: {
    // GET请求---得到学生列表数据
    async fetchStudentsData(context) {
      const { data: res } = await students()
      context.commit('getStudents', res)
    },
  },
}
