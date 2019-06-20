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
          placeholder="Search for your location"
          v-on:placechanged="getAddressData"
          @keydown.native.enter="location"
        ></vuetify-google-autocomplete>
      </v-form>
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
      searchedAdress: ""
    };
  },
  methods: {
    location: function() {
      this.$store.dispatch("getLocation", this.searchedAdress);
      console.log(this.$store.state.cityId);

      router.push({
        name: "Collections",
        params: { lat: this.address.latitude, lng: this.address.longitude }
      });
      console.log(this.address);
    },
    getAddressData: function(addressData, placeResultData, id) {
      this.address = addressData;
      console.log(addressData);

      this.$store.dispatch("getLocation", {
        lat: this.address.latitude,
        lng: this.address.longitude
      });
      console.log(this.$store.state.cityId);

      router.push({
        name: "Collections",
        params: { lat: this.address.latitude, lng: this.address.longitude }
      });
    },
    setCollectionRestArray: function() {
      this.$store.state.collections = [];
      this.$store.state.restaurants = [];
    } //init the store state variables as empty
  },
  mounted() {},
  computed: {
    ...mapState(["cityId"])
  },
  created() {
    this.setCollectionRestArray();
  }
};
</script>

<style>
</style>
