import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
]

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL)
});

export default router;
