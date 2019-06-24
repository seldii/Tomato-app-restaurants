import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Collections from "./components/Collections";
import Landing from "./views/Landing";
import Restaurant from "./components/Restaurant";
import MoreInfo from "./components/MoreInfo";
import Map from "./components/Map";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "landing",
      component: () => import("./views/Landing.vue"),
      meta: { transition: "zoom" }
    },

    {
      path: "/home",
      name: "Home",
      component: Home,
      meta: { transition: "" }
    },
    {
      path: "/collections",
      name: "Collections",
      component: Collections,
      props: true,
      meta: { transition: "" }
    },
    {
      path: "/discover/:cityName",
      name: "discover",
      component: () => import("./views/Discover.vue"),
      props: true,
      meta: { transition: "" }
    },
    {
      path: "/restaurant/:collectionName",
      name: "Restaurant",
      component: Restaurant,
      props: true,
      meta: { transition: "" }
    },
    {
      path: "/more_info",
      name: "MoreInfo",
      component: MoreInfo,
      props: true,
      meta: { transition: "" }
    },
    {
      path: "/Map",
      name: "Map",
      component: () => import("./components/Map"),
      props: true,
      meta: { transition: "" }
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("./views/Profile.vue"),
      props: true,
      meta: { transition: "" }
    }
  ]
});
