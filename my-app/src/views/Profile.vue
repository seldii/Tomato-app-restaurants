<template>
  <div class="profile">
    <v-toolbar clipped-left fixed dense>
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title></v-toolbar-title>
    </v-toolbar>
    <Chat v-if="currentUser && currentUser.displayName || errorMessage "/>
    <Login v-else/>
    <router-view/>
  </div>
</template>

<script>
import Chat from "../components/Chat";
import Login from "../components/Login";
import Nav from "../components/Nav";
import router from "../router";
import { mapState } from "vuex";
import store from "../store/index";
import user from "../store/user";

export default {
  name: "profile",
  computed: {
    currentUser() {
      return this.$store.state.user.currentUser;
    },
    errorMessage() {
      return this.$store.state.user.errorMessage;
    }
  },
  components: {
    Login,
    Chat
  },
  methods: {
    reloadScrollBars() {
      document.documentElement.style.overflow = "auto"; // firefox, chrome
      document.body.scroll = "yes"; // ie only
    }
  },
  mounted() {
    this.reloadScrollBars();
  }
};
</script>

<style>
* {
  box-sizing: border-box;
}

body {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
