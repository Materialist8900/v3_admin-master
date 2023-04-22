<template>
  <div>
    <!-- 用户头部 -->
    <el-row>
      <el-col :span="24">
        <el-card class="user" style="height: 120px" shadow="hover">
          <div class="user-info"><el-avatar :size="75" :src="imgurl"></el-avatar></div>
          <h3>你好，{{ userID }}，祝你开心每一天</h3>
          <span class="user-position">{{ username }} | {{ userID }}</span>
        </el-card>
      </el-col>
    </el-row>
    <!-- 日历以及待办事项 -->
    <el-row :gutter="10">
      <!-- 图片展示 -->
      <el-col :span="10">
        <el-card class="nav-content" shadow="hover">
          <template #header>
            <div class="clearfix">
              <span>社团风貌</span>
            </div>
          </template>
          <el-carousel indicator-position="outside">
            <el-carousel-item v-for="pic in pics" :key="pic">
              <img :src="pic.imgUrl" class="img" />
            </el-carousel-item>
          </el-carousel>
        </el-card>
      </el-col>
      <!-- 待办事项 -->
      <el-col :span="14">
        <el-card class="schedule" shadow="hover">
          <template #header>
            <div class="clearfix">
              <span>备忘事项</span>
            </div>
          </template>
          <!-- 表格区域 -->
          <el-table
            :show-header="false"
            :data="todoList"
            style="width: 100%; overflow: auto; max-height: 230px"
          >
            <el-table-column width="40">
              <template #default="scope">
                <el-checkbox v-model="scope.row.status"></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column>
              <template #default="scope">
                <div
                  class="todo-item"
                  :class="{
                    'todo-item-del': scope.row.status,
                  }"
                >
                  {{ scope.row.todoName }}
                </div>
              </template>
            </el-table-column>
          </el-table>
          <transition>
            <el-input
              class="user-input"
              v-if="isInput"
              v-model="userIn"
              @keyup.enter="setNewTodo"
              suffix-icon="edit"
              placeholder="请输入内容,按Enter键添加事项"
            ></el-input>
          </transition>
          <div class="console">
            <el-checkbox v-model="isSelectAll" @change="handleAllCheck"></el-checkbox>
            <span style="margin-left: 7px">全选</span>

            <el-button class="btn add-btn" type="success" @click="toggleInput">
              <el-icon v-if="isInput"><arrow-down /></el-icon>
              <el-icon v-else><arrow-up /></el-icon>
              {{ addText }}
            </el-button>
            <el-button class="btn remove-btn" type="danger" @click="removeTodo">删除</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!-- scharts图标 -->
    <el-row :gutter="20">
      <el-col :span="14">
        <el-card shadow="hover">
          <div class="bar_conetent" ref="barCharts" style="width: 100%; height: 400px"></div>
        </el-card>
      </el-col>
      <el-col :span="10">
        <el-card shadow="hover">
          <div class="pie_content" ref="pieCharts" style="width: 100%; height: 400px"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
// 引入Echarts
import * as echarts from 'echarts'
// 导入图片
import imgurl from '@/assets/img/img.png'
import imgurl2 from '@/assets/img/pic1.gif'
import imgurl3 from '@/assets/img/pic2.jpg'
import imgurl4 from '@/assets/img/pic3.png'
import imgurl5 from '@/assets/img/pic4.jpg'

const store = useStore()
const username = computed(() => store.getters.isAdmin)
const userID = computed(() => {
  if (store.getters.isAdmin === 'admin') {
    return '管理员'
  } else {
    return '普通用户'
  }
})
// 图片
const pics = [
  { id: 1, imgUrl: imgurl2 },
  { id: 2, imgUrl: imgurl3 },
  { id: 3, imgUrl: imgurl4 },
  { id: 4, imgUrl: imgurl5 },
]

// todolist数据
const todoList = reactive([
  { id: 1, todoName: '吃炸鸡', status: true },
  { id: 2, todoName: '喝汽水', status: true },
  { id: 3, todoName: '肝游戏', status: true },
])
// 全选状态控制
const isSelectAll = computed(() => {
  const status = todoList.filter(item => item.status === true)
  if (todoList.length !== 0) {
    return status.length === todoList.length
  } else {
    return false
  }
})
const handleAllCheck = () => {
  const status = isSelectAll.value ? false : true
  todoList.forEach(item => (item.status = status))
}
// 添加事项
const addText = ref('点击添加')
const isInput = ref(false)
const userIn = ref('')
// 展示&隐藏input框
const toggleInput = () => {
  addText.value = addText.value === '点击添加' ? '点击收起' : '点击添加'
  isInput.value = !isInput.value
  console.log(store.getters.clubCount)
  console.log(majorData)
  console.log(store.getters.echartsData)
  console.log(echarts)
}
// 按enter键留言
const setNewTodo = () => {
  if (userIn.value.trim()) {
    // 生成唯一id（如果没有就为1）
    const newId = todoList.length === 0 ? 1 : todoList[todoList.length - 1].id + 1
    todoList.push({ id: newId, todoName: userIn.value.trim(), status: false })
    userIn.value = ''
  }
}
// 删除选中的事项
const removeTodo = () => {
  // 由于vue3响应式，只能使用splice()来进行删除操作
  for (let i = todoList.length - 1; i >= 0; i--) {
    if (todoList[i].status) {
      todoList.splice(i, 1)
    }
  }
}
// 柱状图
const majorData = computed(() => store.getters.majorList)
const barCharts = ref(null)
const initBarCharts = () => {
  const myChart = echarts.init(barCharts.value)
  let option = {
    title: {
      text: '各系学生选择的社团数量',
    },
    xAxis: {
      type: 'category',
      data: majorData.value,
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        type: 'bar',
        data: store.getters.clubCount,
        barWidth: '20%',
      },
    ],
  }
  myChart.setOption(option)
}
// 圆环状图
const pieCharts = ref(null)
const initPieCharts = () => {
  const myChart = echarts.init(pieCharts.value)
  let option = {
    title: {
      text: '各系人数一览',
      left: 'center',
      top: 'center',
    },
    series: [
      {
        type: 'pie',
        data: [...store.getters.echartsData],
        radius: ['40%', '70%'],
      },
    ],
  }
  myChart.setOption(option)
}
onMounted(() => {
  store.dispatch('fetchStudentsData')
  store.dispatch('fetchClubsData')
  initBarCharts()
  initPieCharts()
})
</script>
<style scoped>
.el-row {
  margin: 5px 0 15px 0;
}
/* 用户头部部分 */
.user {
  width: 100%;
}
.user h3 {
  margin-top: 15px;
  font-weight: 400;
  font-size: 20px;
}
.user-info {
  float: left;
  margin-right: 20px;
}
.user-position {
  display: inline-block;
  height: 20px;
  margin-top: 5px;
  font-size: 14px;
  color: #7e8585;
}
/* 清除浮动 */
.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}
.clearfix:after {
  clear: both;
}
/* 图片展示 */
.nav-content {
  height: 444px;
}
.img {
  display: inline-block;
  margin: auto;
}
/* 代办事项 */
.schedule {
  position: relative;
  width: 100%;
  height: 444px;
}
/* 操控台部分 */
.console {
  position: absolute;
  bottom: 10px;
  left: 15px;
  width: 100%;
  height: 50px;
}
/* 用户输入框 */
.user-input {
  z-index: 999;
  position: absolute;
  bottom: 80px;
  left: 2.5%;
  width: 95%;
  height: 40px;
  background-color: #eee;
}
/* 按钮相关 */
.btn {
  position: absolute;
}
.add-btn {
  bottom: 10px;
  right: 100px;
}
.remove-btn {
  bottom: 10px;
  right: 30px;
}
/* 过渡效果 */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
