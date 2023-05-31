import { RouteRecordRaw } from "vue-router";

export default {
  path: "/app",
  children: [
    {
      path: "fortune-telling",
      component: () =>
        import(
          "@/views/app-view/cyber-fortune-telling/CyberFortuneTelling.vue"
        ),
    },
    {
      path: "lyrics-scroll",
      component: () =>
        import("@/views/app-view/lyrics-scroll/LyricsScroll.vue"),
    },
  ],
} as RouteRecordRaw;
