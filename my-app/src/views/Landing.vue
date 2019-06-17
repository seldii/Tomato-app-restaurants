<template>
  <div class="landing">
    <div>
      <v-container fill-height>
        <v-layout align-content-center justify-center>
          <v-flex text-xs-center>
            <h3>Where are you?</h3>
            <CitySearch/>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
    <Nav/>
  </div>
</template>

<script>
import CitySearch from "../components/CitySearch";
import Nav from "../components/Nav";
import router from "../router";
export default {
  name: "Landing",
  data: () => ({
    gradient: "to top, #7B1FA2, #E1BEE7"
  }),
  components: {
    CitySearch,
    Nav
  }
};
</script>

<style>
.landing {
  height: 100%;
}
</style>
