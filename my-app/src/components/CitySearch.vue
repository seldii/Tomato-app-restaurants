<template>
  <div class="search">
    <v-container>
      <v-text-field
        browser-autocomplete
        solo-inverted
        label="Search for your city..."
        prepend-inner-icon="place"
        @keyup.enter="location"
      ></v-text-field>
      <!-- <router-link :to="{name:'discover', params : {cityId: cityId}}">Let's discover</router-link> -->
      <router-view></router-view>
    </v-container>
  </div>
</template>

<script>
import Vue from "vue";
import router from "../router";
import { mapGetters, mapActions, mapState } from "vuex";
export default {
  name: "CitySearch",
  methods: {
    location: async function(e) {
      let value = e.target.value;
      this.$store.dispatch("getLocation", value);
      await Vue.nextTick(() => {
        this.$store.dispatch("getCollections", this.$store.state.cityId).then(
          router.push({
            name: "discover"
          })
        );
      });
    }
  },
  computed: {
    ...mapState(["cityId"])
  }
};
</script>

<style>
</style>
