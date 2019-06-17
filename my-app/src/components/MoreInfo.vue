<template>
  <div>
    <v-card>
      <v-container fluid grid-list-lg>
        <v-layout>
          <v-flex xs12>
            <v-card class="mx-auto my-5" max-width="374">
              <router-link to="/restaurant/:collectionName">
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
              <v-card-title primary-title>
                <div class="headline">{{restaurantInfo.name}}</div>
              </v-card-title>
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
                  <GmapMap v-bind:center="center" v-bind:map-type-id="mapTypeId" v-bind:zoom="15">
                    <GmapMarker
                      v-for="(item, index) in markers"
                      v-bind:key="index"
                      v-bind:position="item.position"
                      @click="center=item.position"
                      @mouseover="onMapMarkerMouseOver(restaurantName)"
                    />
                  </GmapMap>
                </div>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex xs12>
            <v-subheader>Highlights</v-subheader>
            <v-container d-flex grid-list-xl>
              <v-layout row wrap>
                <v-flex v-for="i in restaurantInfo.highlights" :key="i" xs4>
                  <v-chip outline color="red lighten-2">{{i}}</v-chip>
                </v-flex>
              </v-layout>
            </v-container>
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
  props: ["restarantId", "restaurantName"],
  data() {
    return {
      images: {
        sample: require("../assets/fillingPic.jpg")
      },
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
      console.log(this.$store.state.restaurantInfo.location);
      console.log(this.restaurantName);
    }
  },
  created() {
    this.addMarker();
  },
  computed: {
    ...mapState(["restaurantInfo"])
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
</style>

