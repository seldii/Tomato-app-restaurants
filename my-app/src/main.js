import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import "vuetify/src/stylus/app.styl";
import Vuetify from "vuetify";
import { sync } from "vuex-router-sync";
import * as VueGoogleMaps from "vue2-google-maps";
import VuetifyGoogleAutocomplete from "vuetify-google-autocomplete";

Vue.use(VueGoogleMaps, {
  load: {
    key: "",
    libraries: "places,drawing,visualization"
  }
});
Vue.use(VuetifyGoogleAutocomplete, {
  apiKey: "" // Can also be an object. E.g, for Google Maps Premium API, pass `{ client: <YOUR-CLIENT-ID> }`
});

sync(store, router);

Vue.use(Vuetify);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
