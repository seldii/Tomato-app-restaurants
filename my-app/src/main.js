import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "vuetify/src/stylus/app.styl";

import { sync } from "vuex-router-sync";
import * as VueGoogleMaps from "vue2-google-maps";
import VuetifyGoogleAutocomplete from "vuetify-google-autocomplete";
import "vuetify/src/stylus/app.styl";
import Vuetify, {
  VApp, // required
  VNavigationDrawer,
  VFooter,
  VToolbar,
  VFadeTransition,
  VCard,
  VCardText,
  VCardMedia,
  VListItem
} from "vuetify";
import { Ripple } from "vuetify/lib/directives";

Vue.use(Vuetify, {
  components: {
    VApp,
    VNavigationDrawer,
    VFooter,
    VToolbar,
    VFadeTransition,
    VCard,
    VCardText,
    VCardMedia,
    VListItem
  },
  directives: {
    Ripple
  }
});

import "babel-polyfill";

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyBXjKG5EqxMNpeCQKD5EVe9sZiHPYVuxJ0",
    libraries: "places,drawing,visualization"
  }
});
Vue.use(VuetifyGoogleAutocomplete, {
  apiKey: "AIzaSyBXjKG5EqxMNpeCQKD5EVe9sZiHPYVuxJ0"
});

sync(store, router);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
