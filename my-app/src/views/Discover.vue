<template>
  <div class="discover">
    <Collections/>
    <Nav/>
  </div>
</template>
<script>
import Nav from "../components/Nav";

import Collections from "../components/Collections";
export default {
  name: "Discover",
  props: ["cityName"],
  components: {
    Collections,
    Nav
  }
};
</script>
