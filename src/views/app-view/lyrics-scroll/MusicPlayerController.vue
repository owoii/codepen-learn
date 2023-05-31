<template>
  <div class="music-controller">
    <div class="info-container">
      <img class="play-img" />
      <div>
        <h2>{{ musicInfo?.name }}</h2>
        <b>{{ musicInfo?.artists[0].name }}</b>
      </div>
    </div>
    <div>
      <n-button-group class="play-controller">
        <n-button text
          ><n-icon
            :component="PlayBack"
            size="32"
            @click="playerController?.playPrev"
          />
        </n-button>
        <n-button text
          ><n-icon :component="status" size="32" @click="playOrPause" />
        </n-button>
        <n-button text
          ><n-icon
            :component="PlayForward"
            size="32"
            @click="playerController?.playNext"
          />
        </n-button>
      </n-button-group>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Play, PlayForward, PlayBack, Pause } from "@vicons/ionicons5";
// 获取到音乐控制
const playerController =
  inject<MusicService.MusicController>("playerController");

const playOrPause = () => {
  if (!playerController) return;
  const { url, player, play, playStatus } = playerController;
  // true 表示音乐被暂停,false表示音乐播放中
  console.log(playStatus);

  if (playStatus) {
    if (!url) {
      play();
    } else {
      player.play();
    }

    playerController.playStatus = false;
  } else {
    player.pause();
    playerController.playStatus = true;
  }
};

// 当前音乐信息
const status = computed(() => {
  return playerController?.playStatus ? Play : Pause;
});

// 获取当前音乐信息
const musicInfo = computed(() => {
  return playerController?.currentMusic;
});
</script>
<style lang="scss" scoped>
.music-controller {
  height: 60px;
  width: 100%;
  background: rgba($color: #ffffff, $alpha: 0.1);
  position: absolute;
  bottom: 0;
  left: 0;
  backdrop-filter: blur(5px);
  box-shadow: 0 -1px 2px rgba($color: #000000, $alpha: 0.05);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 25px;
}
.play-controller {
  display: flex;
  gap: 15px;
}
.info-container {
  display: flex;
  align-items: center;
  gap: 20px;
  & > .play-img {
    height: 50px;
    width: 50px;
    background: rgba($color: #000000, $alpha: 0.05);
    border: none;
    border-radius: 5px;
  }
}
</style>
