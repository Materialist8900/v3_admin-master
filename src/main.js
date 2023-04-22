import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 导入element图标库
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 初始化图标的css
import './assets/css/icon.css'
//引入axios
import { createAPI } from '@/utils/request'

const app = createApp(App)

// 生效mockjs模拟的数据
import '@/mock'

// 注册elementplus图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 将 axios 模块挂载到 Vue 实例的原型上
// app.config.globalProperties.$axios = createAPI

app.use(store).use(router).use(ElementPlus).mount('#app')
