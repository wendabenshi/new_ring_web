import { createRouter, createWebHistory } from "vue-router";
import HeroPage from "../components/HeroPage.vue";
import LoveEnergyPage from "../pages/LoveEnergyPage.vue";
import SingleCardPage from "../pages/SingleCardPage.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "home", component: HeroPage },
    { path: "/draw/love-energy", name: "love-energy", component: LoveEnergyPage },
    { path: "/draw/single-card", name: "single-card", component: SingleCardPage },
  ],
});

export default router;
