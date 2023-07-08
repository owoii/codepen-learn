<template>
  <div class="layout-container">
    <div class="m-layout">
      <n-layout has-sider style="height: 100%">
        <SideBar />
        <n-layout>
          <router-view to="/home" />
        </n-layout>
      </n-layout>
    </div>
  </div>
</template>
<script setup lang="ts">
import SideBar from './Sidebar.vue';
</script>
<style lang="scss" scoped>
// 布局的样式直接和组件绑定
.layout-container {
  height: 100vh;
  width: 100vw;
  background: #f9f9f9;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}
.m-layout {
  height: 90vh;
  width: 90vw;
  border: 1px solid #d6d6d6;
  box-shadow: 0 0 10px rgba($color: #000, $alpha: 0.05);
  border-radius: 15px;
  background: #fff;
  box-sizing: border-box;
  overflow: hidden;
  transition: all 0.3s ease;
}
</style>
