import { createStore } from 'vuex'
import { userListStore } from './userList'
import { useSiderbarStore } from './siderbar'
import { studentStore } from './students'
import { clubStore } from './clubs'

export default createStore({
  modules: {
    userListStore,
    useSiderbarStore,
    studentStore,
    clubStore,
  },
})
