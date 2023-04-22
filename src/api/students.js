// 引入axios
import { createAPI } from '@/utils/request'
// 向外声明students
export const students = data => createAPI('/api/students', 'get', data)
