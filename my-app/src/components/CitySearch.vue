<template>
  <div class="search">
    <v-container>
      <v-form>
        <vuetify-google-autocomplete
          ref="address"
          id="map"
          v-model="searchedAdress"
          solo-inverted
          append-icon="place"
          class="form-control"
          label="Search"
          v-on:placechanged="getAddressData"
          @keydown.enter.native="getCollections()"
        ></vuetify-google-autocomplete>
      </v-form>
    </v-container>
  </div>
</template>

<script>
import Vue from "vue";
import router from "../router";
import _ from "lodash";

import { mapGetters, mapActions, mapState } from "vuex";
export default {
  name: "CitySearch",
  data() {
    return {
      searchedAdress: "",
      address: null
    };
  },
  methods: {
    getAddressData: _.debounce(function(addressData, placeResultData, id) {
      this.address = addressData;
      this.$store.dispatch("getCollections", {
        lat: this.address.latitude,
        lng: this.address.longitude
      });
      router.push({
        name: "Collections",
        params: { lat: this.address.latitude, lng: this.address.longitude }
      });
    }, 1000),

    init: function() {
      this.$store.state.collections = [];
      this.$store.state.restaurants = [];
      this.$store.state.restaurantInfo = null;
    } //init the store state variables as empty
  },
  mounted() {},
  computed: {
    ...mapState(["cityId"])
  },
  created() {
    this.init();
  }
};
</script>

<style>
</style>
