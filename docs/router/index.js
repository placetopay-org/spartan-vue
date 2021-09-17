import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";
import Page from "../views/Page.vue";

const routes = [
  { path: '/', component: Home },
  { path: '/components/:view', component: Page },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;



