<template>
  <div>
    <v-container v-if="restaurants == 0 ">Loading..</v-container>
    <v-card v-else>
      <v-container fluid grid-list-lg>
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
                <v-btn @click.native="getMoreInfo(restaurant)" flat small color="primary">More info</v-btn>
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
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Restaurant",
  data() {
    return {
      images: {
        sample: require("../assets/fillingPic.jpg")
      }
    };
  },
  methods: {
    ...mapActions(["getMoreInfo"])
  },
  computed: {
    restaurants() {
      return this.$store.state.restaurants;
    }
  }
};
</script>

<style>
</style>
