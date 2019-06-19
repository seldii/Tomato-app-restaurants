<template>
  <div class="home">
    <v-container fill-height>
      <v-layout align-content-center justify-center>
        <v-flex text-xs-center>
          <h3>Where are you?</h3>
          <CitySearch/>
        </v-flex>
      </v-layout>
    </v-container>

    <Nav/>
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
  }
};
</script>

<style>
</style>
