<template>
  <Header />
  <Sidebar />
  <div class="content-box" :class="{ 'content-collapse': store.state.useSiderbarStore.collapse }">
    <div class="content">
      <router-view v-slot="{ Component }">
        <transition name="move" mode="out-in">
          <keep-alive>
            <component :is="Component"></component>
          </keep-alive>
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script setup>
import Header from '@/components/header.vue'
import Sidebar from '@/components/sidebar.vue'
import { useStore } from 'vuex'
const store = useStore()
</script>
