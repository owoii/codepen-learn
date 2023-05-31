declare namespace MusicService {
  interface Result<T> {
    code: number;
    result?: T;
    data?: T;
  }
  interface PromiseResult<T> extends Promise<Result<T>> {}

  // 专辑
  interface Album {
    alia: string[];
    name: string;
  }

  // 歌手
  interface Artist {
    name: string;
    id: number;
  }

  // 歌曲
  interface Song {
    name: string;
    id: number;
    artists: Artist[];
  }

  // 搜索建议返回类型
  interface Suggest {
    albums: Album[];
    songs: Song[];
  }
  // 搜索音乐返回类型
  interface SearchSong {
    hasMore: boolean;
    songCount: number;
    songs: Song[];
  }

  interface MusicURL {
    url: string;
  }

  interface Node<T> {
    data?: T;
    next?: Node<T>;
    prev?: Node<T>;
  }

  interface MusicController {
    url: string;
    player: HTMLAudioElement;
    playList: Song[];
    play: () => void;
    currentIndex: number;
    currentMusic?: Song;
    playNext: () => void;
    playPrev: () => void;
    playStatus: boolean;
  }

  type SuggestResult = PromiseResult<Suggest>;
  type SearchSongResult = PromiseResult<SearchSong>;
  type MusicURLRequest = PromiseResult<MusicURL[]>;
  type SongNode = Node<Song>;
}
