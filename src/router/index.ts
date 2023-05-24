import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
const DynamicRouter: RouteRecordRaw[] = [];

//动态分模块导入路由,每个模块管理自己的路由
const modules = import.meta.glob("../views/**/router.ts", {
  eager: true,
  import: "default",
});

for (let module in modules) {
  DynamicRouter.push(modules[module] as RouteRecordRaw);
}

const router = createRouter({
  history: createWebHistory(),
  routes: [
    ...DynamicRouter,
    {
      path: "/",
      redirect: "/home",
    },
    {
      path: "/:pathMatch(.*)",
      component: () => import("@/components/NotFoundComponent.vue"),
    },
    {
      path: "/home",
      component: () => import("@/views/home/Home.vue"),
    },
  ],
});

export default router;
