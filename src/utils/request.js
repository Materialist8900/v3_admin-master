import axios from 'axios'

const instance = axios.create({
  // baseURL: '',
  timeout: 2000,
})
export const createAPI = (url, method, data) => {
  let config = {}
  if (method.toUpperCase === 'GET') {
    //把数据传递给请求体中的参数名称给config中的参数名
    config.parmas = data
  } else {
    config.data = data
  }

  return instance({
    url,
    method,
    ...config,
  })
}
