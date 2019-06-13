<template>
  <div class="collections">
    <v-card></v-card>
    <v-container v-if="collections == 0">Loading</v-container>
    <v-container v-else fluid grid-list-sm>
      <v-layout
        row
        wrap
        v-for="collection in collections"
        :key="collection.collection.collection_id"
      >
        <v-flex xs12 @click="getRestaurants(collection)">
          <v-card color="white darken-2" class="dark-grey--text">
            <v-card-title primary-title>
              <div>
                <div class="headline">{{ collection.collection.title }}</div>
                <div>{{ collection.collection.description }}</div>
              </div>
            </v-card-title>
            <router-link to="/restaurant">
              <v-img
                height="125"
                class="grey darken-4"
                :src="collection.collection.image_url"
                alt="img"
              ></v-img>
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

<style>
</style>
