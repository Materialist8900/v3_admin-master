<template>
  <div class="login-warp">
    <div class="login-container">
      <el-row>
        <el-col :span="24">
          <h2 class="title">欢迎登录学生管理系统</h2>
        </el-col>
      </el-row>
      <!-- 表单区域 -->
      <el-form class="login" :model="loginData" :rules="loginRules" ref="form">
        <el-form-item label="姓名：" label-width="80px" prop="username">
          <el-input
            v-model.trim="loginData.username"
            placeholder="请输入用户名"
            style="width: 365px"
            size="large"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码：" label-width="80px" prop="password">
          <el-input
            v-model.trim="loginData.password"
            type="password"
            placeholder="请输入密码"
            style="width: 365px"
            size="large"
            show-password
          ></el-input>
        </el-form-item>
        <!-- 按钮模块 -->
        <el-row :gutter="50">
          <el-col :span="12">
            <el-button class="button" type="primary" color="#2e7cee" @click="verifyLogin">
              登录
            </el-button>
          </el-col>
          <el-col :span="12">
            <el-button class="button">注册</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
// 引入store.js中的数据
import { useStore } from 'vuex'
// 引入router
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus' //提示用户密码的el-plus的必须组件
// 使用vuex store操作数据
const store = useStore()
// 创建router实例对象以访问他的一些方法
const router = useRouter()

const loginData = reactive({
  username: '',
  password: '',
})
const loginRules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
}
const form = ref(null)
// 验证用户名&密码
const verifyLogin = () => {
  form.value.validate(valid => {
    if (valid) {
      const res = store.state.userListStore.userList.some(val => {
        if (val.username === loginData.username && val.password === loginData.password) {
          // 如果验证通过就将用户输入的信息作为载荷存入token并跳转至主页(最好配合jwt认证，这里我没有用node写接口就算了)
          // const payload = { usn: data.username, pwd: data.password }
          // const secretKey = 'secret_key_lzj'
          // const token = jwt.sign(payload, secretKey, { expiresIn: '30d' })
          const myToken = `${loginData.username}-eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzLCJuYW1lIjoiQ2hhdEdQVCJ9.ZtyQe8Wm_9yvBzI0ABmQ2B8wNGxvYGvivFktofhDZj4`
          // 注册token，写入token,这样方便在全局路由守卫中判断是否放行
          localStorage.setItem('userToken', myToken)
          // 跳转主页
          router.replace('homepage')
          // 验证通过，返回true
          return true
        }
      })
      return res
    } else {
      return false
    }
  })
}
const openUP = () => {
  ElNotification({
    title: '用户名&密码',
    message: '用户名:admin----密码:123456',
    duration: 0,
  })
}

// 在mounted阶段发送请求
onMounted(() => {
  store.dispatch('fetchData') //获取用户列表
  openUP()
})
</script>

<style scoped>
/* 背景 */
.login-warp {
  position: relative;
  width: 100%;
  height: 100vh;
  background-image: linear-gradient(90deg, deepskyblue, rgb(221, 141, 154));
  background-size: 400%;
  animation: myanimation 17s infinite;
}
/* 抄的动画 */
@keyframes myanimation {
  0% {
    background-position: 10% 50%;
  }
  50% {
    background-position: 90% 50%;
  }
  100% {
    background-position: 10% 50%;
  }
}
/* 登录盒子 */
.login-container {
  position: fixed;
  top: 50%;
  left: 50%;
  padding: 30px 50px 50px 50px;
  transform: translate(-50%, -50%);
  border: 2px solid rgb(233, 218, 218); /* border radius */
  border-radius: 18px;
  background-color: rgba(255, 255, 255, 0.4);
}
/* 头部标题 */
.title {
  margin-bottom: 20px;
  font-size: 20px;
  color: #06553a;
  text-align: center;
  font-weight: 500;
  font-family: 'Mi Sans';
}
/* 提示 */
.tips {
  margin-bottom: 10px;
  font-size: 12px;
  color: #b80909;
  line-height: 22px;
  text-align: center;
  font-weight: 400;
}
/* 按钮样式 */
.button {
  width: 100%;
  height: 40px;
  line-height: 40px;
}
</style>
