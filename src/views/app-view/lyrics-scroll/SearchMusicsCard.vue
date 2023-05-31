<template>
  <div class="search-music-cards-container">
    <template v-if="prop.searchSongList.length > 0">
      <div
        class="search-music-card"
        v-for="item in prop.searchSongList"
        :key="item.id"
      >
        <div class="song-info">
          <h2 class="card-title">{{ item.name }}</h2>
          <b class="card-artist">{{ item.artists[0].name }}</b>
        </div>

        <div class="options-container">
          <n-tooltip trigger="hover">
            <template #trigger>
              <n-button text style="font-size: 24px">
                <n-icon :component="PlayOutline" />
              </n-button>
            </template>
            立即播放
          </n-tooltip>
          <n-tooltip trigger="hover">
            <template #trigger>
              <n-button
                text
                style="font-size: 24px"
                @click="copyToClipboard(item)"
              >
                <n-icon :component="CopyOutline" />
              </n-button>
            </template>
            复制音乐名称
          </n-tooltip>

          <n-tooltip trigger="hover">
            <template #trigger>
              <n-button text style="font-size: 24px">
                <n-icon :component="DownloadOutline" />
              </n-button>
            </template>
            下载音乐
          </n-tooltip>

          <n-tooltip trigger="hover">
            <template #trigger>
              <n-button
                text
                style="font-size: 24px"
                @click="addToPlayListEnd(item)"
              >
                <n-icon :component="AddOutline" />
              </n-button>
            </template>
            添加到播放列表
          </n-tooltip>
        </div>
      </div>
      <n-button text class="loading-more">加载更多</n-button>
    </template>

    <div v-else class="empty-container">
      <n-icon :component="AlbumsOutline" size="64" />
      <b>没有搜索任何东西</b>
    </div>
  </div>
</template>
<script setup lang="ts">
import {
  DownloadOutline,
  AddOutline,
  CopyOutline,
  PlayOutline,
  AlbumsOutline,
} from "@vicons/ionicons5";
import { useMessage } from "naive-ui";
import Clipboard from "clipboard";
//消息提示
const message = useMessage();
type Props = {
  searchSongList: MusicService.Song[];
};

const prop = defineProps<Props>();

const musicController =
  inject<MusicService.MusicController>("playerController");

// 添加音乐到下一首(这里的数据类型还需要维护
const addToPlayListEnd = (song: MusicService.Song) => {
  musicController?.playList.push(song);
  if (musicController?.currentIndex == -1) {
    musicController.currentIndex = 0;
    musicController.currentMusic = song;
  }
};

// 将歌曲名称复制到剪切板
const copyToClipboard = (song: MusicService.Song) => {
  Clipboard.copy(song.name);
  message.warning("拷贝成功~", {
    showIcon: false,
  });
};
</script>
<style lang="scss" scoped>
.empty-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  justify-content: center;
  color: #aaa;
}
.search-music-cards-container {
  display: flex;
  flex-direction: column;
  gap: 5px;
  height: 100%;
  padding-bottom: 10%;
  overflow: scroll;
}
.options-container {
  display: flex;
  gap: 10px;
}
.search-music-card {
  width: 100%;
  min-height: 60px;
  background: rgba($color: #000, $alpha: 0);
  border-radius: 10px;
  transition: all 0.2s ease;
  border: 1px solid rgba($color: #000, $alpha: 0);
  display: flex;
  align-items: center;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  &:hover {
    background: rgba($color: #000, $alpha: 0.05);
    border: 1px solid rgba($color: #279143, $alpha: 0.5);
  }
  & > .card-title {
    color: #000;
  }
  & > div > .card-artist {
    color: rgba($color: #000000, $alpha: 0.5);
  }
}
.song-info {
  transition: all 1s;
  display: flex;
  flex-direction: column;
}
.loading-more {
  margin-top: 20px;
}
</style>
