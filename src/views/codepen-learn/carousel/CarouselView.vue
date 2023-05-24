<template>
  <div>
    <div class="carousel-container">
      <div class="carousel-scroll">
        <div
          class="carousel-item"
          v-for="(item, index) in bannerList"
          :key="index"
        >
          <img :src="item" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const bannerList = [
  "/banner/food1.jpg",
  "/banner/food2.jpg",
  "/banner/food3.jpg",
];
</script>
<style lang="scss" scoped>
.carousel-container {
  height: 400px;
  width: 100%;
  overflow: hidden;
  position: relative;
  & > .carousel-scroll {
    height: 400px;
    width: 100%;
    position: relative;
    transform: translateX(0%);
  }
}
.carousel-item {
  width: 60%;
  height: 400px;
  position: absolute;
  border-radius: 15px;
  overflow: hidden;

  & > img {
    height: 100%;
    width: 100%;
  }

  &:nth-child(2) {
    left: 70%;
    z-index: 999;
  }
  &:nth-child(3) {
    left: 140%;
    z-index: 999;
  }
}
</style>
