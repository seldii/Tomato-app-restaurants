<template>
  <div>
    <v-bottom-nav absolute color="transparent">
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
    </v-bottom-nav>

    <router-view></router-view>
  </div>
</template>

<script>
import router from "../router";

export default {
  name: "Nav",
  components: {}
};
</script>

<style>
</style>
