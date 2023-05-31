<template>
  <div class="sidebar-container">
    <!-- TODO 头像的地址路径应该是存在全局状态内,或者是静态的?... -->
    <div class="avatar-container">
      <n-avatar size="large" src="/avatar/me-200.png" class="avatar" />
      <div>
        <h2>万事屋</h2>
        <b>万事屋有什么都不奇怪吧!!</b>
      </div>
    </div>
    <n-menu :options="menuOptions"> </n-menu>
  </div>
</template>
<script setup lang="ts">
import menuOptions from "@/config/menuoption";
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
