<template>
  <div>
    <v-container>
      <GmapMap v-bind:center="center" v-bind:map-type-id="mapTypeId" v-bind:zoom="12">
        <GmapMarker
          v-for="(item, index) in markers"
          v-bind:key="index"
          v-bind:position="item.position"
          @click="center=item.position"
        />
      </GmapMap>
      <v-btn block color="#FF4136" :to="{name:'Collections'}">Discover the Collections in your city</v-btn>
    </v-container>
    <Nav/>
  </div>
</template>

<script>
import Vue from "vue";
import router from "../router";
import Nav from "./Nav";
import { mapGetters, mapActions, mapState } from "vuex";
export default {
  name: "Map",
  props: ["lat", "lng"],
  data() {
    return {
      // default to Montreal to keep it simple
      // change this to whatever makes sense
      center: { lat: parseFloat(this.lat), lng: parseFloat(this.lng) },
      mapTypeId: "roadmap",
      markers: []
    };
  },

  methods: {
    addMarker() {
      const marker = {
        lat: parseFloat(this.lat),
        lng: parseFloat(this.lng)
      };
      this.markers.push({ position: marker });
      console.log(this.markers);
    }
  },
  computed: {
    ...mapState(["cityId"]),
    cityName() {
      return this.$store.state.cityName;
    }
  },
  created() {
    this.addMarker();
  },
  watch: {
    cityId(newValue, oldValue) {
      console.log(`Updating from ${newValue} to ${oldValue}`);
      this.$store.state.collections = [];
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
</style>