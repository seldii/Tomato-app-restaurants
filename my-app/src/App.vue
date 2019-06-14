<template>
  <div id="app" class="xs">
    <v-app class="xs">
      <v-container class="buttons">
        <v-btn to="/landing" color="rgb(221, 107, 58)" active-class="active" fab dark>
          <v-icon>search</v-icon>
          <span class="button">Search</span>
        </v-btn>

        <v-btn to="/discover" color="rgb(221, 107, 58)" active-class="active" fab dark>
          <v-icon>public</v-icon>
          <span class="button">Discover</span>
        </v-btn>

        <v-btn to="/" color="rgb(221, 107, 58)" active-class="active" fab dark>
          <v-icon>person</v-icon>
          <span class="button">Home</span>
        </v-btn>
      </v-container>

      <router-view></router-view>
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


<style scoped>
.active {
  background-color: rgb(219, 117, 70);
}

.buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.button {
  font-size: 10px;
}
</style>
