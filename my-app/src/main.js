import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import "vuetify/src/stylus/app.styl";
import Vuetify from "vuetify";
import { sync } from "vuex-router-sync";
import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyBXjKG5EqxMNpeCQKD5EVe9sZiHPYVuxJ0",
    libraries: "places" // necessary for places input
  }
});

sync(store, router);

Vue.use(Vuetify);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
