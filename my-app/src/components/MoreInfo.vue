<template>
  <div>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-img
            v-if="restaurantInfo.thumb"
            class="white--text"
            height="250px"
            :src="restaurantInfo.thumb"
            alt="img"
          >
            <v-btn icon @click="setRestaurantInfoZero()">
              <v-icon color="white">arrow_back</v-icon>
            </v-btn>
          </v-img>

          <v-card-title primary-title>
            <v-layout row>
              <v-flex grow>
                <v-layout align-start column fill-height>
                  <v-flex xs12>
                    <div class="headline">{{restaurantInfo.name}}</div>
                  </v-flex>
                  <v-flex xs12>
                    <span class="grey--text body-2">
                      {{restaurantInfo.establishment[0]}} |
                      <br>
                      {{restaurantInfo.cuisines}}
                    </span>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex shrink>
                <v-layout align-center column fill-height>
                  <v-flex xs12>
                    <v-chip
                      :color="'#' + restaurantInfo.user_rating.rating_color"
                      text-color="white"
                    >{{restaurantInfo.user_rating.aggregate_rating}}</v-chip>
                  </v-flex>
                  <v-flex xs12>
                    <span
                      class="font-weight-light caption text-no-wrap green--text text-darken--2"
                    >{{restaurantInfo.user_rating.votes}} reviews</span>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <div>{{restaurantInfo.location.address}}</div>
            <v-divider></v-divider>
            <v-container pb-0 fluid grid-list-sm>
              <v-layout row justify-space-between>
                <v-flex xs4>
                  <v-bottom-sheet v-model="sheet">
                    <template v-slot:activator>
                      <v-icon small color="#1B5E20">directions</v-icon>
                      <span
                        @click="addMarker()"
                        class="text--grey body-1 underline text-xs-center"
                      >Directions</span>
                    </template>
                    <div>
                      <GmapMap
                        v-bind:center="center"
                        v-bind:map-type-id="mapTypeId"
                        v-bind:zoom="15"
                      >
                        <GmapMarker
                          v-for="(item, index) in markers"
                          v-bind:key="index"
                          v-bind:position="item.position"
                        />
                      </GmapMap>
                    </div>
                  </v-bottom-sheet>
                </v-flex>

                <v-flex xs3>
                  <v-bottom-sheet v-model="sheet">
                    <template v-slot:activator>
                      <v-icon small color="#1B5E20">restaurant_menu</v-icon>
                      <span class="text--grey body-1 underline">Menu</span>
                    </template>

                    <div>{{restaurantInfo.menu_url}}</div>
                  </v-bottom-sheet>
                </v-flex>
                <v-flex xs3>
                  <v-dialog v-model="dialog" scrollable full-width>
                    <template v-slot:activator="{ on }">
                      <v-icon small color="#1B5E20" v-on="on">rate_review</v-icon>
                      <span v-on="on" class="text--grey body-1 underline">Reviews</span>
                    </template>
                    <v-container fluid grid-list-lg>
                      <v-layout row wrap>
                        <v-flex xs12>
                          <v-card color="white" v-for="(review, index) in reviews" :key="index">
                            <v-layout row>
                              <v-flex xs3>
                                <v-avatar ma-4>
                                  <img :src="review.review.user.profile_image" contain>
                                </v-avatar>
                              </v-flex>
                              <v-flex xs9>
                                <v-layout align-start column fill-height>
                                  <v-flex xs12>
                                    <v-layout align-start column fill-height>
                                      <v-flex xs12>
                                        <div class="title">{{review.review.user.name}}</div>
                                      </v-flex>
                                      <v-flex xs12>
                                        <v-layout row justify-start>
                                          <v-flex xs3>
                                            <v-icon
                                              :color="'#' + review.review.user.foodie_color"
                                            >label</v-icon>
                                          </v-flex>
                                          <v-flex xs7>
                                            <span
                                              class="caption text-no-wrap"
                                            >{{review.review.user.foodie_level}}</span>
                                          </v-flex>
                                        </v-layout>
                                      </v-flex>
                                    </v-layout>
                                  </v-flex>
                                  <v-divider inset></v-divider>
                                  <v-flex xs12>
                                    <v-layout align-start column fill-height>
                                      <v-flex xs12>
                                        <v-layout row justify-space-between align-baseline>
                                          <v-flex xs4>
                                            <v-chip
                                              :color="'#' + review.review.rating_color"
                                              text-color="white"
                                            >
                                              {{review.review.rating}}
                                              <v-icon small>star</v-icon>
                                            </v-chip>
                                          </v-flex>
                                          <v-flex xs4>
                                            <span
                                              class="caption text-no-wrap"
                                            >{{review.review.review_time_friendly}}</span>
                                          </v-flex>
                                        </v-layout>
                                      </v-flex>
                                      <v-divider inset color="black"></v-divider>
                                      <v-flex xs12>
                                        <p>{{review.review.review_text}}</p>
                                      </v-flex>
                                    </v-layout>
                                  </v-flex>
                                </v-layout>
                              </v-flex>
                            </v-layout>
                          </v-card>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-dialog>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class="pa-3 font-weight-medium">
            Rate this place
            <v-spacer></v-spacer>
            <v-icon>star_border</v-icon>
            <v-icon>star_border</v-icon>
            <v-icon>star_border</v-icon>
            <v-icon>star_border</v-icon>
            <v-icon>star_border</v-icon>
          </v-card-actions>
          <v-divider></v-divider>
          <v-flex pa-2 xs12>
            <span class="subheading font-weight-medium">All photos</span>
            <v-carousel height="200" hide-delimiters>
              <v-carousel-item v-for="(photo,i) in photos" :key="i" :src="photo.photo.thumb_url"></v-carousel-item>
            </v-carousel>
          </v-flex>
          <v-divider></v-divider>
          <v-flex pa-2 xs12>
            <v-layout fill-height column fluid>
              <v-flex xs12>
                <span class="subheading font-weight-medium">Hints about the place</span>
              </v-flex>
              <v-divider></v-divider>
              <v-flex xs12>
                <v-icon>money</v-icon>
                <v-spacer></v-spacer>
                <span class="caption font-weight-light">AVERAGE COST</span>
                <br>
                <span
                  class="caption"
                >{{restaurantInfo.average_cost_for_two}} {{restaurantInfo.currency}} for two people(approx.)</span>
              </v-flex>
              <v-divider></v-divider>
              <v-flex xs12>
                <span class="caption font-weight-light"></span>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";
import router from "../router";
export default {
  name: "MoreInfo",
  props: ["restarantId", "restaurantName"],
  data() {
    return {
      /* images: {
        sample: require("../assets/fillingPic.jpg")
      }, */

      dialogm1: "",
      dialog: false,

      center: {
        lat: parseFloat(this.$store.state.restaurantInfo.location.latitude),
        lng: parseFloat(this.$store.state.restaurantInfo.location.longitude)
      },
      mapTypeId: "roadmap",
      markers: []
    };
  },
  methods: {
    addMarker() {
      const marker = {
        lat: parseFloat(this.$store.state.restaurantInfo.location.latitude),
        lng: parseFloat(this.$store.state.restaurantInfo.location.longitude)
      };
      this.markers.push({ position: marker });
      console.log(this.markers);
    },
    /*   setCenter() {
      const lat = parseFloat(
        this.$store.state.restaurantInfo.location.latitude
      );
      const lng = parseFloat(
        this.$store.state.restaurantInfo.location.longitude
      );
      this.center.push({ lat: lat, lng: lng });
      console.log(this.center);
    }, */
    setRestaurantInfoZero() {
      this.$store.state.restaurantInfo = [];
      router.push({ name: "Restaurant" });
    }
  },

  computed: {
    ...mapState(["restaurantInfo"]),
    reviews() {
      return this.restaurantInfo.all_reviews.reviews;
    },
    photos() {
      return this.restaurantInfo.photos;
    }
  }
};
</script>


<style scoped>
a {
  text-decoration: none;
}
.vue-map-container {
  height: 450px;
  max-width: 992px;
  width: 100%;
}
.underline {
  text-decoration: underline dashed green;
}
span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>

