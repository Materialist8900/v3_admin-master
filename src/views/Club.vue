<template>
  <el-row :gutter="12">
    <el-col :span="16">
      <el-card shadow="hover" class="table-content">
        <template #header>
          <span>社团预览</span>
        </template>
        <el-table :data="table" class="table" height="600" border>
          <el-table-column
            label="社团编号"
            prop="id"
            width="100"
            align="center"
            fixed
          ></el-table-column>
          <el-table-column
            label="社团名称"
            prop="name"
            width="100"
            align="center"
          ></el-table-column>
          <el-table-column
            label="成立日期"
            prop="established_date"
            width="150px"
            align="center"
          ></el-table-column>
          <el-table-column label="所属成员" prop="members" width="415"></el-table-column>
          aa
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="8">
      <el-card shadow="hover" class="rec-box">
        <template #header>
          <span>社团介绍</span>
        </template>
        <el-button v-for="club in clubList" :key="club" class="rec-nav-button" @click="toOutside">
          {{ club }}
        </el-button>
      </el-card>
      <el-card shadow="hover">
        <template #header>
          <span>重要消息</span>
        </template>
        <div class="mes-box">
          <li v-for="mes in mesList" class="mes-list">
            <el-icon><compass /></el-icon>
            {{ mes }}
          </li>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const table = computed(() => store.state.clubStore.clubs)
const clubList = computed(() => store.getters.allClubs)

const mesList = [
  '高举中国特色社会主义伟大旗帜',
  '为全面建设社会主义现代化国家而团结奋斗',
  '到2050年完成中华民族伟大复兴',
  '科学发展观',
  '"三个代表"重要思想',
]

const toOutside = () => {
  window.open('https://www.zhihu.com/question/480083532', '_blank')
}

onMounted(() => {
  store.dispatch('fetchClubsData')
})
</script>
<style scoped>
.rec-box {
  margin-bottom: 15px;
}
.rec-nav-button {
  margin: 10px;
}
.mes-box {
  height: 173px;
}
.mes-list {
  list-style: none;
  padding-left: 5px;
  margin-bottom: 12px;
  height: 15px;
  line-height: 15px;
}
</style>
