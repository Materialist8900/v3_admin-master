// 引入axios
import { createAPI } from '@/utils/request'
// 向外声明clubs
export const clubs = data => createAPI('/api/clubs', 'get', data)
