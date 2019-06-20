<template>
  <div class="landing">
    <v-parallax dark :src="background" id="parallax-hero" @click="getHomePage">
      <v-layout align-center column justify-center>
        <h1 class="display-2 mb-3 font-weight-black">Tomato</h1>
        <h4 class="subheading font-weight-thin.font-italic">Follow your hunger now!</h4>
      </v-layout>
    </v-parallax>
  </div>
</template>

<script>
import Nav from "../components/Nav";
import router from "../router";
export default {
  name: "Landing",
  data() {
    return {
      background: require("../assets/tomato.jpg")
    };
  },
  methods: {
    getHomePage() {
      router.push({ name: "Home" });
    }
  },
  components: {
    Nav
  },
  mounted() {
    document.getElementById("parallax-hero").style.height = "100vh";
  }
};
</script>
<style scoped>
</style>
