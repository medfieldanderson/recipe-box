import { createMemoryHistory, createRouter } from "vue-router";

import Hero from "../src/components/Hero.vue";
import Home from "../src/components/Home.vue";
import About from "../src/components/About.vue";

const routes = [
  { path: "/", component: Hero },
  { path: "/home", component: Home },
  { path: "/about", component: About },
];

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
});
