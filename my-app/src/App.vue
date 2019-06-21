<template>
  <div id="app" class="xs" pt-0>
    <v-app>
      <v-bottom-nav fixed :value="e31" :active.sync="e3" color>
        <v-btn to="/home" active-class="active" fab dark>
          <v-icon>search</v-icon>
          <span class="button">Search</span>
        </v-btn>

        <v-btn to="/collections" active-class="active" fab dark>
          <v-icon>public</v-icon>
          <span class="button">Discover</span>
        </v-btn>

        <v-btn to="/profile" active-class="active" fab dark>
          <v-icon>person</v-icon>
          <span class="button">Profile</span>
        </v-btn>
      </v-bottom-nav>
      <router-view/>
    </v-app>
  </div>
</template>
<script>
import Nav from "./components/Nav";
import axios from "axios";
import lodash from "lodash";

import Vue from "vue";
import { mapState } from "vuex";
export default {
  name: "app",
  data() {
    return {
      e3: 0,
      e31: true
    };
  },

  components: {
    Nav
  }
};
</script>


<style scoped>
#app {
  margin-bottom: 50px;
}
</style>
