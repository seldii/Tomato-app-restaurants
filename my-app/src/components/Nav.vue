<template>
  <div>
    <v-bottom-nav absolute color="transparent">
      <v-btn to="/home" active-class="active" fab dark>
        <v-icon>search</v-icon>
        <span class="button">Search</span>
      </v-btn>

      <v-btn to="/discover/:cityName" active-class="active" fab dark>
        <v-icon>public</v-icon>
        <span class="button">Discover</span>
      </v-btn>

      <v-btn to="/profile" active-class="active" fab dark>
        <v-icon>person</v-icon>
        <span class="button">Profile</span>
      </v-btn>
    </v-bottom-nav>
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
