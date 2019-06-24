<template></template>

<script>
export default {
  created() {
    this.$store.dispatch("favorites/init");
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      messages: state => state.favorites.all,
      currentUser: state => state.user.currentUser
    })
  }
};
</script>

<style>
</style>
