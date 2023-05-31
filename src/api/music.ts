import { musicService } from "@/utils/request";

interface SearchParams {
  keywords: string;
  limit?: number;
}

// 获取关键字推荐
export const searchSuggest = (
  params: SearchParams
): MusicService.SuggestResult => {
  return musicService({
    method: "get",
    url: "/search/suggest",
    params,
  });
};

// 搜索音乐
export const searchMusic = (
  params: SearchParams
): MusicService.SearchSongResult => {
  return musicService({
    method: "get",
    url: "/search",
    params,
  });
};

export const getMusicURL = ({
  id,
}: {
  id: number;
}): MusicService.MusicURLRequest => {
  return musicService({
    method: "get",
    params: { id },
    url: "/song/url",
  });
};
