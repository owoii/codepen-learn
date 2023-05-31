<template>
  <div class="page-container app-container">
    <div class="player-layout">
      <div>
        <SearchMusicCard />
      </div>
      <div></div>
    </div>
    <MusicPlayerController />
  </div>
</template>
<script setup lang="ts">
import { getMusicURL } from "@/api/music";
import SearchMusicCard from "./SearchMusicCard.vue";
import MusicPlayerController from "./MusicPlayerController.vue";
// 播放音乐,通过获取当前索引播放音乐
const play = async () => {
  const { currentIndex, playList } = playerController;
  // 判断当前音乐索引是否等于-1,如果是 -1 直接不能播放
  console.log(currentIndex);
  if (currentIndex == -1) return;

  const musicURL = await getMusicURL({
    id: playList[currentIndex].id,
  });
  if (!musicURL.data) return;
  playerController.url = musicURL.data[0].url;
  playerController.player.src = playerController.url;
  playerController.currentMusic = playList[currentIndex];
  playerController.player.play();
};

// 将歌曲切换到下一首
const playNext = () => {
  if (playerController.currentIndex == -1) return;
  if (playerController.currentIndex < playerController.playList.length - 1) {
    playerController.currentIndex++;
  }
  play();
};
// 将歌曲切换到上一首
const playPrev = () => {
  if (playerController.currentIndex == -1) return;
  if (playerController.currentIndex > 1) {
    playerController.currentIndex--;
  }
  play();
};
const playerController = reactive<MusicService.MusicController>({
  url: "",
  player: new Audio(),
  playList: [],
  currentIndex: -1,
  playNext,
  play,
  playPrev,
  playStatus: true,
});
//将播放列表和播放器注入给所有子组件
provide("playerController", playerController);
</script>
<style lang="scss" scoped>
.player-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 100%;
  height: 100%;
  gap: 15px;
  overflow: hidden;
}

.page-container {
  position: relative;
  height: 100%;
  overflow: hidden;
  padding-bottom: 0;
  user-select: none;
}
</style>
