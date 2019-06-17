<template>
  <div class="home">
    <v-parallax dark :src="background">
      <v-layout align-center column justify-center>
        <h1 class="display-2 mb-3">Tomato</h1>
        <h4 class="subheading">Follow your hunger now!</h4>
      </v-layout>
    </v-parallax>
  </div>
</template>

<script>
import Nav from "../components/Nav";
export default {
  data() {
    return {
      background: require("../assets/tomato.jpg")
    };
  },
  components: {
    Nav
  }
};
</script>
