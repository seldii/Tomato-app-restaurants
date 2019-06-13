<template>
  <div class="search">
    <v-container>
      <v-text-field
        class="mx-3"
        flat
        hide-details
        label="Search for your city..."
        prepend-inner-icon="search"
        solo-inverted
        @keyup.enter="location"
      ></v-text-field>
    </v-container>
  </div>
</template>

<script>
import Vue from "vue";
import { mapGetters, mapActions, mapState } from "vuex";
export default {
  name: "CitySearch",
  methods: {
    location: function(e) {
      let value = e.target.value;

      this.$store.dispatch("getLocation", value);
      Vue.nextTick(() => {
        this.$store.dispatch("getCollections", this.$store.state.cityId).then(
          this.$router.push({
            path: "/discover"
          })
        );
      });
    }
  }
};
</script>

<style>
</style>
