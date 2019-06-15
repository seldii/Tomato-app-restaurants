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
        <!-- <v-text-field
          v-model="cityName"
          browser-autocomplete
          solo-inverted
          label="Search for your city..."
          prepend-inner-icon="place"
          data-vv-name="name"
          @keydown.enter.prevent
        >-->

        <!--  </v-text-field> -->
        <!-- <v-btn
          class="mx-2"
          type="submit"
          @click.native="location"
          :to="{name:'discover', params:{cityName: cityName}}"
          fab
        >
          <v-icon x-small>play_circle_filled</v-icon>
        </v-btn>-->
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
      console.log(this.addressData);
      console.log(this.cityName);
      this.$store.dispatch("getLocation", this.searchedAdress);
      Vue.nextTick(() => {
        this.$store.dispatch("getCollections", this.$store.state.cityId);
      });
      router.push({ name: "discover", params: { cityName: this.cityName } });
    },
    getAddressData: function(addressData, placeResultData, id) {
      this.address = addressData;
    },
    mounted() {
      this.$refs.address.focus();
    },
    computed: {
      ...mapState(["cityId"])
    },
    watch: {
      cityId(newValue, oldValue) {
        console.log(`Updating from ${newValue} to ${oldValue}`);
      }
    }
  }
};
</script>

<style>
</style>
