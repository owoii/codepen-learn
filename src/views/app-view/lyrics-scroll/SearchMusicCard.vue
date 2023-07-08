<template>
  <div class="searh-music-container">
    <div class="search-music-title">
      <n-icon :component="MusicalNotes" size="40" />
      <h1 class="search-title">Music</h1>
    </div>

    <div class="search-container">
      <n-input
        v-model:value="searchParams.keywords"
        placeholder="搜索想听的音乐,按回车键或点击按钮搜索"
        class="search-input"
        @input-focus="showSuggest"
        @change="searchMusicList"
        @input="getSuggest"
      >
        <template #prefix>
          <n-icon :component="FlashOutline" />
        </template>
        <template #suffix>
          <button class="search-button" @click="searchMusicList">
            <n-icon :component="Search" size="16" />搜索
          </button>
        </template>
      </n-input>
      <div
        class="search-float-container"
        v-show="searchParams.isShowSuggest"
      >
        <template v-if="searchParams.suggestList.songs.length > 0">
          <p
            v-for="item in searchParams.suggestList.songs"
            :key="item.id"
            @click="selectSuggest(item)"
          >
            {{ item.name }}-{{ item.artists[0].name }}
          </p>
        </template>
        <div class="no-suggest" v-else>
          <n-icon :component="CloseCircleOutline" size="50" />
          <b>暂时没有推荐的关键词</b>
        </div>
      </div>
    </div>

    <SearchMusicsCars :searchSongList="searchParams.searchMusicList" />
  </div>
</template>
<script setup lang="ts">
import {
  FlashOutline,
  Search,
  CloseCircleOutline,
  MusicalNotes,
} from "@vicons/ionicons5";
import { searchSuggest, searchMusic } from "@/api/music";
import SearchMusicsCars from "./SearchMusicsCard.vue";
// 页面参数及数据
type SearchParams = {
  isShowSuggest: boolean;
  keywords: string;
  suggestList: MusicService.Suggest;
  searchMusicList: MusicService.Song[];
  limit: number;
  loading: boolean;
};

const searchParams = reactive<SearchParams>({
  isShowSuggest: false,
  keywords: "",
  suggestList: {
    songs: [],
    albums: [],
  },
  searchMusicList: [],
  limit: 10,
  loading: false,
});
// 显示推荐关键字
const showSuggest = () => {
  searchParams.isShowSuggest = true;
};
//隐藏推荐关键字
const closeSuggest = () => {
  searchParams.isShowSuggest = false;
};
//获取推荐关键字
const getSuggest = async () => {
  const { keywords } = searchParams;
  if (keywords.length == 0) return;
  searchParams.loading = true;
  const res = await searchSuggest({ keywords });
  if (Object.keys(res.result).length == 0) return;

  searchParams.suggestList = res.result;

  searchParams.loading = false;
};

const selectSuggest = (song: MusicService.Song) => {
  console.log(1);
  searchParams.keywords = song.name;
  searchMusicList();
  closeSuggest();
};
// 搜索音乐
async function searchMusicList() {
  closeSuggest();
  let { keywords, limit } = searchParams;
  if (!keywords) return;
  keywords = keywords.split("[[!]]")[0];
  const res = await searchMusic({ keywords, limit });
  searchParams.searchMusicList = res.result.songs;
}
</script>
<style lang="scss" scoped>
.search-music-title {
  display: flex;
  align-items: center;
  gap: 8px;
}
.searh-music-container {
  padding: 15px;
  background: rgba($color: #000, $alpha: 0.05);
  border: 1px solid rgba($color: #000000, $alpha: 0.1);
  max-height: 100%;
  border-radius: 10px 10px 0 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100%;
}
.search-input {
  :deep(.n-input-wrapper) {
    padding-right: 0;
  }
}
.no-suggest {
  display: flex;
  height: 100%;
  width: 100%;
  padding: 20px 0;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
  color: #aaa;
  & > b {
    display: inline-block;
  }
}
.search-button {
  height: 100%;
  background: none;
  border: none;
  padding: 0 20px;
  display: flex;
  align-items: center;
  color: rgba($color: #000000, $alpha: 0.5);
  transition: all 0.3s;
  gap: 5px;
  &:hover {
    background: rgba($color: #000000, $alpha: 0.1);
    color: #279143;
  }
}
.search-container {
  position: relative;
}
.search-float-container {
  padding-bottom: 10px;
  width: 100%;
  background: rgba($color: #000, $alpha: 0.05);
  border-radius: 0 0 10px 10px;
  position: absolute;
  backdrop-filter: blur(18px);
  z-index: 999;
  display: flex;
  flex-direction: column;
  & > p {
    margin: 0;
    width: 100%;
    padding: 8px;
    transition: all 0.3s;
    &:hover {
      color: #279143;
      background: rgba($color: #fff, $alpha: 0.2);
    }
  }
}
</style>
