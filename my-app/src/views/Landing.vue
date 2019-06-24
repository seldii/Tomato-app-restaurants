<template>
  <transition name="fade" mode="out-in">
    <div class="landing">
      <v-parallax dark :src="background" id="parallax-hero" @click="getHomePage">
        <v-layout align-center column justify-center>
          <h1 class="display-2 mb-3 font-weight-black">Tomato</h1>
          <h4 class="subheading font-weight-thin.font-italic">Follow your hunger now!</h4>
        </v-layout>
      </v-parallax>
    </div>
  </transition>
</template>

<script>
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
    },
    unloadScrollBars() {
      document.documentElement.style.overflow = "hidden"; // firefox, chrome
      document.body.scroll = "no"; // ie only
    },
    directHomePage() {
      setTimeout(() => {
        router.push({ name: "Home" });
      }, 2000);
    }
  },
  mounted() {
    document.getElementById("parallax-hero").style.height = "100vh";
    this.unloadScrollBars();
    this.directHomePage();
  }
};
</script>
<style scoped>
#parallax-hero {
  z-index: 999;
}
.fade-enter,
.fade-leave-to {
  opacity: 1;
}
.fade-enter-to,
.fade-leave {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity, transform 200ms ease-out;
}
</style>
