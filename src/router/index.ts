import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from "@/layout/default/index.vue";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: DefaultLayout,
      children: [
        {
          path: "/apple",
          component: () => import("@/views/apple-keyboard/AppleKeyboard.vue"),
        },
      ],
    },
    {
      path: "/:pathMatch(.*)",
      component: () => import("@/components/NotFoundComponent.vue"),
    },
  ],
});

export default router;
