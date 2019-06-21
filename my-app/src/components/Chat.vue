<template>
  <v-container class="chat-wrapper">
    <v-spacer></v-spacer>
    <v-layout row wrap>
      <v-flex grow pa-1>
        <v-avatar size="6em">
          <img :src="currentUser.photoURL">
        </v-avatar>
      </v-flex>
      <v-flex shrink>
        <div class="subheading">{{currentUser.displayName}}</div>
        <div class="caption">{{ currentUser.email }}</div>
        <v-btn @click.prevent="logout()" text outline color="indigo" left small>Log out</v-btn>
      </v-flex>
    </v-layout>
    <v-spacer></v-spacer>
    <!-- <v-tabs dark color="transparent">
      <v-tabs-slider color=""></v-tabs-slider>

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
    </v-tabs>-->

    <v-container fluid>
      <v-layout row align-baseline>
        <v-flex xs-11>
          <v-form class="chat-submit" @submit.prevent="addMessage">
            <v-text-field
              append-outer-icon="mdi-send"
              type="text"
              class="new-message"
              v-model="message"
              label="Message"
              @click:append-outer="addMessage"
              clearable
            ></v-text-field>
          </v-form>
        </v-flex>
      </v-layout>
    </v-container>
    <h3 class="text-xs-center">Recent Chats</h3>
    <v-spacer></v-spacer>
    <v-container ref="chatList" fluid grid-list-sm>
      <v-layout align-center justify-space-between wrap>
        <v-flex xs12 v-for="(message, index) in messages" :key="index">
          <v-layout row wrap>
            <v-flex
              xs5
              offset-xs7
              color="orange darken-2"
              small
              v-if="currentUser.displayName == message.username"
            >
              <v-badge color="blue" right overlap>
                <template v-slot:badge>
                  <v-icon small dark>message</v-icon>
                </template>
                <v-card color="orange lighten-4" full-width>
                  <v-card-title>
                    <span class="title font-weight-light caption">You</span>
                  </v-card-title>
                  <v-card-text class="headline font-weight-bold body-2">"{{ message.text }}"</v-card-text>
                </v-card>
              </v-badge>
            </v-flex>
            <v-flex xs5 small v-if="currentUser.displayName != message.username">
              <v-badge color="purple" right overlap>
                <template v-slot:badge>
                  <v-icon small dark>message</v-icon>
                </template>
                <v-card color="blue-grey lighten-3">
                  <v-badge left overlap>
                    <template v-slot:badge>
                      <v-avatar size="28px">
                        <img :src="message.image">
                      </v-avatar>
                    </template>
                    <v-card-title>
                      <span cclass="title font-weight-light caption">{{ message.username }}</span>
                    </v-card-title>
                  </v-badge>
                  <v-card-text class="headline font-weight-bold body-2">"{{ message.text }}"</v-card-text>
                </v-card>
              </v-badge>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>

    <!-- <v-timeline ref="chatList">
      <v-timeline-item
        color="orange darken-2"
        small
        v-for="message in messages"
        :key="message.username"
      >
        <div
          v-if="currentUser.displayName == message.username"
          style="background-color:blue;"
          class="chat-message__body"
        >
          <span>{{ message.username }}</span>

          <p class="text-xs-right">"{{ message.text }}"</p>
        </div>
        <div
          v-if="currentUser.displayName != message.username"
          style="background-color:red;"
          class="chat-message__body"
        >
          <p class="text-xs-right">{{ message.username }}</p>
          <p class="text-xs-right">"{{ message.text }}"</p>
        </div>
      </v-timeline-item>
    </v-timeline>-->
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
