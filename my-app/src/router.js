import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Discover from "./views/Discover";
import Landing from "./views/Landing";
import Restaurant from "./components/Restaurant";
import MoreInfo from "./components/MoreInfo";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/landing",
      name: "landing",
      component: Landing
    },
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/discover",
      name: "discover",
      component: () => import("./views/Discover.vue")
    },
    {
      path: "/restaurant",
      name: "Restaurant",
      component: Restaurant
    },
    {
      path: "/more_info",
      name: "MoreInfo",
      component: MoreInfo
    }
  ]
});
