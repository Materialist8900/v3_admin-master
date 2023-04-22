// 引入axios
import { createAPI } from '@/utils/request'
// 向外声明userList
export const userList = data => createAPI('/api/userList', 'get', data)
