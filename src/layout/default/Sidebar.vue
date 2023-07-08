<template>
  <n-layout-sider
    width="300"
    collapse-mode="width"
    :collapsed-width="90"
    show-trigger="arrow-circle"
    @update:collapsed="demo"
  >
    <div class="sidebar-container">
      <!-- 头像 -->
      <div class="avatar-container">
        <n-avatar size="large" :src="navigator?.avatar" class="avatar" />
        <div>
          <h2>{{ navigator?.title }}</h2>
          <b>{{ navigator?.description }}</b>
        </div>
      </div>
      <!-- 导航 -->
      <n-menu :options="menuOptions" />
    </div>
  </n-layout-sider>
</template>
<script setup lang="ts">
// 侧边栏的数据应该使用约定好的数据格式
import menuOptions from '@/config/menuoption';
import { useGlobaConfigStore } from '@/store/config';
const globaConfigStore = useGlobaConfigStore();

const { navigator } = globaConfigStore;
const demo = () => {
  console.log(1234);
};
</script>
<style lang="scss" scoped>
.sidebar-container {
  background: rgba($color: #b5ffd1, $alpha: 0.1);
  height: 100%;
  padding: 20px;
  border-right: 1px solid #d6d6d6;
}
.avatar-container {
  box-sizing: border-box;
  padding: 0 10px;
  display: flex;
  gap: 15px;
  align-items: center;
  margin-bottom: 20px;
  & > .avatar {
    border: 1px solid #d6d6d6;
    box-shadow: 0 0 5px rgba($color: #b5ffd1, $alpha: 0.1);
    border-radius: 5px;
  }
}
</style>
