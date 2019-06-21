<template>
  <div class="home">
    <v-toolbar color="red" clipped-left fixed dense>
      <v-toolbar-title class="text-xs-center">Tomato</v-toolbar-title>
    </v-toolbar>
    <div class="full">
      <v-container fluid fill-height>
        <v-layout align-center justify-center column fluid>
          <div class="text-xs-center headline">Where are you?</div>
          <CitySearch/>
        </v-layout>
      </v-container>
    </div>
  </div>
</template>

<script>
import CitySearch from "../components/CitySearch";
import Nav from "../components/Nav";
import router from "../router";
import Chat from "../components/Chat";
import Login from "../components/Login";
import { mapState } from "vuex";
export default {
  name: "Home",
  data: () => ({
    gradient: "to top, #7B1FA2, #E1BEE7"
  }),
  computed: {
    ...mapState({
      currentUser: state => state.currentUser
    })
  },
  components: {
    CitySearch,
    Nav,
    Login,
    Chat
  },
  methods: {
    unloadScrollBars() {
      document.documentElement.style.overflow = "hidden"; // firefox, chrome
      document.body.scroll = "no"; // ie only
    }
  },
  mounted() {
    this.unloadScrollBars();
  }
};
</script>

<style scoped>
body {
  background-color: red;
}

.search {
  width: 100%;
}

.full {
  height: 100vw;
}
.home {
  height: 100vw;
  margin-top: 75px;
}
</style>
