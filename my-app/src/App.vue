<template>
  <div id="app" class="xs">
    <v-app class="xs">
      <v-container>
        <v-btn append exact-active-class raised round>
          <router-link to="/landing">Search</router-link>
        </v-btn>
        <v-btn append exact-active-class raised round>
          <router-link to="/discover">Discover</router-link>
        </v-btn>
        <v-btn append exact-active-class raised round>
          <router-link to="/">Home</router-link>
        </v-btn>
        <router-view></router-view>
      </v-container>
    </v-app>
  </div>
</template>
<script>
import Home from "./views/Home";
import Discover from "./views/Discover";
import Landing from "./views/Landing";
import axios from "axios";
import lodash from "lodash";
export default {
  name: "app",
  components: {}
};
</script>


<style>
a {
  text-decoration: none;
}
</style>
