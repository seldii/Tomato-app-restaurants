<template>
  <div>
    <v-container v-if="restaurants == 0 ">
      <div class="text-xs-center">
        <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>

        <v-progress-circular :width="3" color="red" indeterminate></v-progress-circular>

        <v-progress-circular :size="70" :width="7" color="purple" indeterminate></v-progress-circular>

        <v-progress-circular :width="3" color="green" indeterminate></v-progress-circular>

        <v-progress-circular :size="50" color="amber" indeterminate></v-progress-circular>
      </div>
    </v-container>
    <v-card v-else>
      <v-container fluid grid-list-lg>
        <v-text-field
          disabled
          :label="collectionName + ' in ' + cityName"
          prepend-inner-icon="place"
        ></v-text-field>
        <v-layout v-for="restaurant in restaurants" :key="restaurant.id">
          <v-flex xs12>
            <v-card color="white darken-2" class="dark-grey--text">
              <v-card-title primary-title>
                <div>
                  <div class="headline">{{restaurant.restaurant.name}}</div>
                  <div>{{restaurant.restaurant.location.locality}}</div>
                </div>
              </v-card-title>
              <v-img
                v-if="restaurant.restaurant.featured_image"
                height="125"
                class="grey darken-4"
                :src="restaurant.restaurant.featured_image"
                alt="img"
              >
                <v-chip
                  small
                  class="ma-2"
                  color="red"
                  text-color="white"
                >{{restaurant.restaurant.user_rating.aggregate_rating}}</v-chip>
              </v-img>
              <v-img v-else :src="images.sample"/>
              <v-card-actions>
                <span
                  class="pl-2 grey--text text--darken-2 font-weight-light caption"
                >{{restaurant.restaurant.user_rating.votes}} reviews</span>
                <v-spacer></v-spacer>
              </v-card-actions>
              <router-link to="/more_info">
                <v-btn
                  @click.native="getMoreInfo"
                  :to="{name:'MoreInfo', params: {restaurantId: restaurant.restaurant.id, restaurantName: restaurant.restaurant.name}}"
                  flat
                  small
                  color="primary"
                >More info</v-btn>
              </router-link>
              <router-view></router-view>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";
import router from "../router";
export default {
  name: "Restaurant",
  props: ["collectionName", "collectionId"],
  data() {
    return {
      images: {
        sample: require("../assets/fillingPic.jpg") //filling image
      }
    };
  },
  methods: {
    getMoreInfo: function() {
      this.$store.dispatch(
        "getMoreInfo",
        router.currentRoute.params.restaurantId
      );
    }
  },
  computed: {
    collections() {
      return this.$store.state.collections;
    },
    ...mapState(["restaurants"]),

    cityName() {
      return this.$store.state.cityName;
    }
  },
  watch: {
    restaurants(newValue, oldValue) {
      console.log(`Updating from ${newValue} to ${oldValue}`);
      this.$store.state.restaurant = [];
    }
  }
};
</script>

<style>
</style>
