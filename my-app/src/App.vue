<template>
  <div id="app" class="xs">
    <v-app>
      <Nav/>
      <router-view/>
    </v-app>
  </div>
</template>
<script>
import Nav from "./components/Nav";
import axios from "axios";
import lodash from "lodash";
export default {
  name: "app",
  components: {
    Nav
  }
};
</script>


<style scoped>
.active {
  background-color: rgb(219, 117, 70);
}

.buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.button {
  font-size: 10px;
}
</style>
