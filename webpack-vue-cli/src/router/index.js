import { createRouter, createWebHistory } from "vue-router";

const home = () => import("../views/Home.vue");
const About = () => import("../views/About.vue");

const routes = [
  {
    path: "/home",
    component: home,
  },
  {
    path: "/About",
    component: About,
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
