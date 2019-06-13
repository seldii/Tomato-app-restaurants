<template>
  <div class="landing">
    <v-container>
      <h4>Where are you?</h4>
    </v-container>
    <CitySearch/>
  </div>
</template>

<script>
import CitySearch from "../components/CitySearch";
export default {
  name: "Landing",
  components: {
    CitySearch
  }
};
</script>

<style>
</style>
