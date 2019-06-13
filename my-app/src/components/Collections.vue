<template>
  <div class="collections">
    <v-container v-if="collections == 0">Loading</v-container>
    <v-container v-else fluid grid-list-sm>
      <v-text-field disabled :label="cityName" prepend-inner-icon="place"></v-text-field>
      <v-layout
        row
        wrap
        v-for="collection in collections"
        :key="collection.collection.collection_id"
      >
        <v-flex xs12 @click="getRestaurants(collection)">
          <v-card color="white darken-2" class="dark-grey--text">
            <router-link to="/restaurant">
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
                      <span class="headline">{{ collection.collection.title }}</span>
                      <br>
                      <span>{{ collection.collection.description }}</span>
                      <br>
                      <span>{{ collection.collection.res_count }} PLACES</span>
                      <v-icon color="white" size="12px">arrow_forward</v-icon>
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
import { mapGetters, mapActions, mapMutations, mapState } from "vuex";
export default {
  name: "Collections",
  methods: {
    ...mapActions(["getCollections", "getRestaurants"])
  },
  computed: {
    collections() {
      return this.$store.state.collections;
    },
    cityName() {
      return this.$store.state.cityName;
    }
  },
  watch: {
    collections(newCollections, oldCollections) {
      console.log(`We have ${newCollections} fruits now, yaay!`);
    }
  },
  created() {
    if (this.$store.state.cityId != 0) this.getCollections();
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: white;
  font-size: 80%;
}
</style>
