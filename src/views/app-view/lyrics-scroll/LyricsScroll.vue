<template>
  <div class="flex-center page-container">
    <div class="container">
      <audio :src="musicURL" controls></audio>
      <h1>歌词滚动</h1>
      <n-select
        placeholder="搜索想听的音乐,按回车键或点击按钮搜索"
        v-model:value="pageParams.keywords"
        :options="optionsRef"
        :loading="pageParams.loading"
        filterable
        remote
        clearable
        @search="getSuggest"
        @update:value="searchMusicList"
        :fallback-option="false"
      />

      <n-data-table
        :bordered="false"
        :data="songList"
        :columns="createColumns()"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { searchSuggest, searchMusic, getMusicURL } from "@/api/music";
import { DataTableColumns, NButton, SelectOption } from "naive-ui";

interface PageParams {
  keywords: string | null;
  loading: boolean;
  limit: number;
}

const pageParams = reactive<PageParams>({
  keywords: null,
  loading: false,
  limit: 10,
});

const optionsRef = ref<SelectOption[]>([]);
const getSuggest = async (keywords: string) => {
  if (keywords.length == 0) return;
  pageParams.loading = true;
  const res = await searchSuggest({ keywords });
  if (Object.keys(res.result).length == 0) return;

  optionsRef.value = [
    { label: keywords, value: `${keywords}[[!]]${keywords}` },
    ...res.result.songs.map(
      (item) =>
        ({
          label: `${item.name}-${item.artists[0].name || ""}`,
          value: `${item.name}[[!]]${item.id}`,
        } as SelectOption)
    ),
  ];
  pageParams.loading = false;
};

const musicURL = ref("");
// 播放音乐
const playMusic = async (row: MusicService.Song) => {
  const res = await getMusicURL({ id: row.id });
  if (!res.data) return;
  musicURL.value = res.data[0].url;
};

//音乐列表
const songList = ref<MusicService.Song[]>([]);
// 音乐列表字段
const createColumns = (): DataTableColumns<MusicService.Song> => [
  {
    title: "歌名",
    key: "name",
  },
  {
    title: "选项",
    key: "id",
    render(row) {
      return h(
        NButton,
        { onClick: () => playMusic(row) },
        { default: () => "播放" }
      );
    },
  },
];
const searchMusicList = async () => {
  let { keywords, limit } = pageParams;
  if (!keywords) return;
  keywords = keywords.split("[[!]]")[0];
  const res = await searchMusic({ keywords, limit });
  songList.value = res.result.songs;
};
</script>
<style lang="scss" scoped>
.container {
  width: 500px;
}
.page-container {
  align-items: center;
  height: 100%;
  text-align: center;
}
</style>
