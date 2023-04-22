<template>
  <div class="sidebar">
    <el-menu
      class="el-menu"
      :default-active="onRoutes"
      background-color="#36d0f4"
      text-color="#fff"
      active-text-color="#f8729d"
      :collapse="collapse"
      unique-opened
      router
    >
      <!-- 循环渲染菜单项结构，数据来源于items -->
      <!-- 好处是以后增删改查菜单项只需要修改items里的数据即可不需要动结构 -->
      <template v-for="item in items">
        <!-- 如果含有子菜单，用以下代码块里的代码渲染 -->
        <template v-if="item.subs">
          <!-- 循环渲染template，将key绑定在el-sub-menu多级菜单元素上 -->
          <el-sub-menu :index="item.index" :key="item.index">
            <template #title>
              <el-icon>
                <component :is="item.icon"></component>
              </el-icon>
              <span>{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs" :key="subItem.index">
              <el-menu-item :index="subItem.index">
                <span>{{ subItem.title }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <!-- 如果没有子菜单，则不显示子列表。 -->
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <el-icon>
              <component :is="item.icon"></component>
            </el-icon>
            <template #title>{{ item.title }}</template>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
// 引入vuex
import { useStore } from 'vuex'

const store = useStore()
const collapse = computed(() => store.state.useSiderbarStore.collapse)

const route = useRoute()
const onRoutes = computed(() => {
  return route.path
})
const items = [
  // 解释：icon:对应图标，index对应router索引位置，title对应标题名称，subs则是字菜单的子列表。
  {
    icon: 'Odometer',
    index: '/homepage',
    title: '首页',
  },
  {
    icon: 'User',
    index: '1',
    title: '学生管理',
    subs: [{ index: '/students', title: '信息查找' }],
  },
  {
    icon: 'HomeFilled',
    index: '2',
    title: '社团管理',
    subs: [{ index: '/club', title: '社团信息' }],
  },
]
</script>
<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
  display: none;
  width: 0;
}
.sidebar .el-menu:not(.el-menu--collapse) {
  width: 220px;
}
.sidebar > ul {
  height: 100%;
}
</style>
