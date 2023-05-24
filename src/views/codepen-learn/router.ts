import { RouteRecordRaw } from "vue-router";

export default {
  path: "/codepen",
  children: [
    {
      path: "apple",
      component: () =>
        import("@/views/codepen-learn/apple-keyboard/AppleKeyboard.vue"),
    },
    {
      path: "carousel",
      component: () =>
        import("@/views/codepen-learn/carousel/CarouselView.vue"),
    },
  ],
} as RouteRecordRaw;
