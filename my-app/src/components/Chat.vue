<template>
  <v-container class="chat-wrapper">
    <v-toolbar clipped-left fixed dense>
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title>Your Profile</v-toolbar-title>
    </v-toolbar>

    <v-spacer></v-spacer>
    <v-layout row>
      <v-flex grow pa-1>
        <v-avatar size="10em">
          <img :src="currentUser.photoURL">
        </v-avatar>
      </v-flex>
      <v-flex shrink>
        <div class="subheading">{{currentUser.displayName}}</div>
        <div class="body-1">{{ currentUser.email }}</div>
        <v-btn @click.prevent="logout()" text outline color="indigo" left small>Log out</v-btn>
      </v-flex>
    </v-layout>
    <v-spacer></v-spacer>
    <v-tabs dark color="transparent">
      <v-tabs-slider color="yellow"></v-tabs-slider>

      <v-tab color="transparent">
        <v-card flat>
          <v-card-text>Favorites</v-card-text>
        </v-card>
      </v-tab>
      <v-tab>
        <v-card flat>
          <v-card-text>Chat</v-card-text>
        </v-card>
      </v-tab>
    </v-tabs>

    <v-container fluid>
      <v-layout row align-baseline>
        <v-flex xs-11>
          <v-form class="chat-submit" @submit.prevent="addMessage">
            <v-text-field
              type="text"
              class="new-message"
              v-model="message"
              placeholder="Say something..."
            ></v-text-field>
          </v-form>
        </v-flex>
        <v-flex shrink>
          <v-btn icon>
            <v-icon color="orange darken-2" @click="addMessage">mail_outline</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-container>
    <h3 class="text-xs-center">Recent Chats</h3>
    <v-spacer></v-spacer>
    <v-timeline ref="chatList">
      <v-timeline-item color="orange darken-2" small v-for="message in messages">
        <div class="chat-message__body">
          <p class="text-xs-right">{{ message.username }}</p>
          <p class="text-xs-right">"{{ message.text }}"</p>
        </div>
      </v-timeline-item>
    </v-timeline>
  </v-container>
</template>

<script>
import Vue from "vue";
import { mapState } from "vuex";
import { VCard, VCardText, VCardMedia, VListItem } from "vuetify";

export default {
  name: "Chat",
  components: {
    VCard,
    VCardText,
    VCardMedia,
    VListItem
  },
  created() {
    this.$store.dispatch("messages/init");
  },
  data() {
    return {
      message: ""
    };
  },
  computed: {
    ...mapState({
      messages: state => state.messages.all,
      currentUser: state => state.user.currentUser
    })
  },
  methods: {
    logout() {
      this.$store.dispatch("user/logout");
    },
    addMessage() {
      if (this.message !== "") {
        this.$store.dispatch("messages/send", {
          username: this.currentUser.displayName,
          image: this.currentUser.photoURL,
          text: this.message
        });
        this.message = "";
        console.log(this.$store.state.user.currentUser);
      }
    }
  },
  watch: {
    messages() {
      Vue.nextTick(() => {
        this.$refs.chatList.scrollTop = this.$refs.chatList.scrollHeight;
      });
    }
  }
};
</script>
.profile {
position: absolute;
z-index: 1;
}
<style>
</style>
