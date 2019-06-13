<template>
  <div class="discover">
    <v-container>
      <v-flex>What are you up to?</v-flex>
    </v-container>
    <Collections/>
  </div>
</template>
<script>
import Collections from "../components/Collections";
export default {
  name: "Discover",
  components: {
    Collections
  }
};
</script>
