<template>
  <el-card shadow="always" class="mes-content">
    <template #header>
      <span>信息查询</span>
    </template>
    <div class="contorl-box">
      <el-button
        class="add-btn"
        type="primary"
        icon="document-add"
        @click="dialogFormVisible = true"
      >
        添加
      </el-button>
      <!-- 弹窗部分 -->
      <el-dialog title="学生信息" v-model="dialogFormVisible">
        <el-form :model="emptyForm" :rules="rules" ref="myForm" @submit.native.prevent>
          <el-form-item label="姓名" prop="name">
            <el-input v-model.trim="emptyForm.name"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="gender">
            <el-radio-group v-model="emptyForm.gender">
              <el-radio label="male">男</el-radio>
              <el-radio label="female">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="系别" prop="major">
            <el-select v-model="emptyForm.major" placeholder="请选择系别">
              <el-option
                v-for="dept in majorList"
                :key="dept"
                :label="dept"
                :value="dept"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="参加社团" prop="clubs">
            <el-checkbox-group
              v-model="emptyForm.clubs"
              @change="handleClubChange"
              :min="0"
              :max="3"
            >
              <el-checkbox v-for="club in clubList" :key="club" :label="club">
                {{ club }}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
        <template #footer>
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm">确 定</el-button>
        </template>
      </el-dialog>
      <el-input
        class="search-input"
        v-model.trim="userIn"
        suffix-icon="search"
        placeholder="请输入内容搜索"
      ></el-input>
    </div>
    <el-table :data="table" class="table" height="500" border>
      <el-table-column label="学号" prop="id" width="80" fixed></el-table-column>
      <el-table-column label="姓名" prop="name" width="100"></el-table-column>
      <el-table-column label="性别" prop="gender" width="60"></el-table-column>
      <el-table-column label="系别" prop="major" width="180"></el-table-column>
      <el-table-column label="所属社团" prop="clubs"></el-table-column>
    </el-table>
  </el-card>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
const store = useStore()

// 定义提交表单的数据
const dialogFormVisible = ref(false) //控制是否显示
const emptyForm = reactive({
  name: '',
  gender: '',
  major: '',
  clubs: [],
})
const rules = {
  name: [
    { required: true, message: '姓名不能为空', trigger: 'blur' },
    { min: 1, max: 3, message: '请输入1-3个字符', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value.trim() === '') {
          callback(new Error('姓名不能全为空格'))
        } else {
          callback()
        }
      },
      trigger: 'blur',
    },
  ],
  gender: [{ required: true, message: '请选择性别', trigger: 'change' }],
  major: [{ required: true, message: '请选择系别', trigger: 'change' }],
  clubs: [
    {
      required: true,
      type: 'array',
      message: '请选择1-3个社团',
      trigger: 'change',
    },
  ],
}
// checkbox-group
// 系别以及选择函数
const majorList = computed(() => store.getters.majorList)
// 社团列表
const clubList = computed(() => store.getters.allClubs)
// 将选中的club赋给emptyForm中的clubs
const handleClubChange = checkedClubs => {
  if (!emptyForm.clubs.includes(...checkedClubs)) {
    emptyForm.clubs.push(...checkedClubs)
  }
}
// 声明一个 ref 来存放该元素的引用
// 必须和模板里的 ref 同名,详见vue3官方文档
const myForm = ref(null)
const submitForm = () => {
  myForm.value.validate(valid => {
    if (valid) {
      // 在这里提交表单
      store.commit('addNewStudent', emptyForm)
      dialogFormVisible.value = false
    } else {
      return false
    }
  })
}
// 搜索信息
const userIn = ref('')
const table = computed(() => {
  if (userIn.value !== '') {
    return store.state.studentStore.students.filter(item => {
      if (item.id.toString().includes(userIn.value)) {
        return true
      } else if (item.name.includes(userIn.value)) {
        return true
      } else if (item.gender.includes(userIn.value)) {
        return true
      } else if (item.major.includes(userIn.value)) {
        return true
      } else if (item.clubs.some(item => item.includes(userIn.value))) {
        return true
      } else {
        return false
      }
    })
  } else {
    return store.state.studentStore.students
  }
})

onMounted(() => {
  store.dispatch('fetchStudentsData')
  store.dispatch('fetchClubsData')
})
</script>
<style scoped>
.mes-content {
  position: relative;
  height: 100%;
}
.contorl-box {
  margin-left: 40px;
  width: 1020px;
}
.search-input {
  float: right;
  height: 30px;
  width: 300px;
}
.table {
  position: absolute;
  top: 120px;
  left: 60px;
  width: 1020px;
}
</style>
