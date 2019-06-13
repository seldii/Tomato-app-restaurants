<template>
  <div>
    <v-card>
      <v-container fluid grid-list-lg>
        <v-layout>
          <v-flex xs12>
            <v-card class="mx-auto my-5" max-width="374">
              <router-link to="/restaurant">
                <v-btn icon>
                  <v-icon color="purple darken-2">navigate_before</v-icon>
                </v-btn>
              </router-link>
              <router-view></router-view>
              <v-img
                v-if="restaurantInfo.thumb"
                class="white--text"
                height="250px"
                :src="restaurantInfo.thumb"
                alt="img"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              ></v-img>
              <v-img v-else :src="images.sample"></v-img>
              <v-card-title>{{restaurantInfo.name}}</v-card-title>
              <v-card-text>
                <v-layout align-center>
                  <v-rating
                    v-model="restaurantInfo.user_rating.aggregate_rating"
                    color="amber"
                    half-increments
                    dense
                    size="14"
                    readonly
                  ></v-rating>
                  <div
                    class="grey--text ml-3"
                  >{{restaurantInfo.user_rating.aggregate_rating}} ({{restaurantInfo.user_rating.votes}})</div>
                </v-layout>
                <div class="my-3 subtitle-1 black--text">
                  Price range : {{restaurantInfo.price_range}}
                  • {{restaurantInfo.cuisines}}
                </div>

                <div>
                  Address
                  <br>
                  {{restaurantInfo.location.address}}
                </div>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";
export default {
  name: "MoreInfo",
  data() {
    return {
      images: {
        sample: require("../assets/fillingPic.jpg")
      }
    };
  },
  methods: {},
  computed: {
    restaurantInfo() {
      return this.$store.state.restaurantInfo;
    }
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>

