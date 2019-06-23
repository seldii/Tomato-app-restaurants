<template>
  <div class="collections">
    <v-toolbar clipped-left dense>
      <v-text-field disabled :label="locName" prepend-inner-icon="place"></v-text-field>
    </v-toolbar>
    <v-container v-if="collections == 0">
      <div class="text-xs-center">
        <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>

        <v-progress-circular :width="3" color="red" indeterminate></v-progress-circular>

        <v-progress-circular :size="70" :width="7" color="purple" indeterminate></v-progress-circular>

        <v-progress-circular :width="3" color="green" indeterminate></v-progress-circular>

        <v-progress-circular :size="50" color="amber" indeterminate></v-progress-circular>
      </div>
    </v-container>
    <v-container v-else fluid grid-list-sm>
      <v-layout
        row
        wrap
        v-for="collection in collections"
        :key="collection.collection.collection_id"
      >
        <v-flex xs12>
          <v-card color="white darken-2" class="dark-grey--text">
            <router-link
              @click.native="getRest"
              :to="{name: 'Restaurant', params: {collectionName: collection.collection.title, collectionId: collection.collection.collection_id}}"
            >
              <v-img
                height="125"
                class="grey darken-4"
                :src="collection.collection.image_url"
                alt="img"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              >
                <v-container fill-height fluid>
                  <v-layout fill-height>
                    <v-flex xs12 align-end flexbox>
                      <div>
                        <span class="headline">{{ collection.collection.title }}</span>
                        <br>
                        <span>{{ collection.collection.description }}</span>
                        <br>
                        <span>{{ collection.collection.res_count }} PLACES</span>
                        <v-icon color="white" size="12px">arrow_forward</v-icon>
                      </div>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-img>
            </router-link>
            <router-view></router-view>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";
import router from "../router";
export default {
  name: "Collections",
  props: ["lat", "lng"],
  data() {
    return {};
  },
  methods: {
    getRest: function() {
      const collectionId = router.currentRoute.params.collectionId;
      this.$store.dispatch(
        "getRestaurants",

        collectionId
      );
    },

    reloadScrollBars() {
      document.documentElement.style.overflow = "auto"; // firefox, chrome
      document.body.scroll = "yes"; // ie only
    }
  },
  computed: {
    ...mapState(["cityId", "collections", "locName"])
    /* cityName() {
      return this.$store.state.cityName;
    } */
  },

  mounted() {
    this.reloadScrollBars();
    this.$store.dispatch("getCollections");
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: white;
  font-size: 80%;
}

.headline {
  line-height: 15px !important;
}
</style>
