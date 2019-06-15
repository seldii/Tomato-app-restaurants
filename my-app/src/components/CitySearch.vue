<template>
  <div class="search">
    <v-container>
      <v-form>
        <v-text-field
          v-model="cityName"
          browser-autocomplete
          solo-inverted
          label="Search for your city..."
          prepend-inner-icon="place"
          data-vv-name="name"
          @keydown.enter.prevent
        ></v-text-field>
        <v-btn
          class="mx-2"
          type="submit"
          @click.native="location"
          :to="{name:'discover', params:{cityName: cityName}}"
          fab
        >
          <v-icon x-small>play_circle_filled</v-icon>
        </v-btn>
      </v-form>
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
  data() {
    return {
      cityName: ""
    };
  },
  methods: {
    location: function() {
      console.log(this.cityName);
      this.$store.dispatch("getLocation", this.cityName);
      Vue.nextTick(() => {
        this.$store.dispatch("getCollections", this.$store.state.cityId);
      });
    }
  },
  computed: {
    ...mapState(["cityId", "cityName"])
  }
};
</script>

<style>
</style>
