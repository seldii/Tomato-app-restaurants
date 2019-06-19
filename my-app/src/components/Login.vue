<template>
  <button class="login-button" @click="login()">Login With Google</button>
</template>

<script>
import { mapState } from "vuex";
import store from "../store";
export default {
  created() {
    this.$store.dispatch("user/init");
  },

  methods: {
    login() {
      this.$store.dispatch("user/login");
    }
  }
};
</script>

<style language="scss">
.login-button {
  padding: 20px 36px;
  font-size: 1.2rem;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #0365d6;
  border-radius: 4px;
  color: #fff;
}
</style>
