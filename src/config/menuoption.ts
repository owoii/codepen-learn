import type { MenuOption } from "naive-ui";
import { RouterLink } from "vue-router";
const menuOptions: MenuOption[] = [
  {
    label: () => h(RouterLink, { to: "/home" }, { default: () => "操作录制" }),
    key: "114514",
  },
  {
    label: "CodePen临摹",
    key: "pinball-1973",
    children: [
      {
        label: () =>
          h(
            RouterLink,
            { to: "/codepen/apple" },
            { default: () => "Apple keyboard" }
          ),
        key: "rat",
      },
      {
        label: () =>
          h(
            RouterLink,
            { to: "/codepen/carousel" },
            { default: () => "轮播图" }
          ),
        key: "sds",
      },
    ],
  },

  {
    label: "胡思乱想",
    key: "dasdsa-1973",
    children: [
      {
        label: () =>
          h(
            RouterLink,
            { to: "/app/fortune-telling" },
            { default: () => "赛博算命" }
          ),
        key: "rat",
      },
      {
        label: () =>
          h(
            RouterLink,
            { to: "/app/lyrics-scroll" },
            { default: () => "音乐播放器" }
          ),
        key: "dsdsad",
      },
    ],
  },
];

export default menuOptions;
