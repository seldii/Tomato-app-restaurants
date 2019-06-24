import Vue from "vue";
import Vuex from "vuex";
import Vuetify from "vuetify";
import axios from "axios";
import * as firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import VueFirestore from "vue-firestore";
import user from "./user";
import messages from "./messages";
import favorites from "./favorites";
import apiConfig from "../apiKeys";

Vue.config.productionTip = false;

const firebaseConfig = {
  apiKey: apiConfig.apiKey,
  authDomain: "my-app-242908.firebaseapp.com",
  databaseURL: "https://my-app-242908.firebaseio.com",
  projectId: "my-app-242908",
  storageBucket: "my-app-242908.appspot.com",
  messagingSenderId: "389070354277",
  appId: "1:389070354277:web:d38be0175f300eea"
};

firebase.initializeApp(firebaseConfig);

Vue.use(VueFirestore);
Vue.use(Vuex);
Vue.use(Vuetify);

const config = {
  "user-key": apiConfig.userKey,
  Accept: "application/json"
};

const store = new Vuex.Store({
  state: {
    collections: [],
    collectionIds: [],
    collectionName: "",
    restaurants: [],
    restaurantInfo: [],
    cityId: "",
    cityName: "",
    lat: null,
    lng: null,
    locName: null,
    colName: null
  },
  modules: {
    user,
    messages,
    favorites
  },
  getters: {},
  actions: {
    async getLocation({ commit }, obj) {
      /* const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=` +
          e +
          `&key=`
      );

      lat = response.data.results[0].geometry.location.lat;
      lon = response.data.results[0].geometry.location.lng; */

      const response2 = await axios.get(
        "https://developers.zomato.com/api/v2.1/cities?lat=" +
          obj.lat +
          "&lon=" +
          obj.lng,
        { headers: config }
      );
      console.log(response2.data.location_suggestions[0].name);
      commit("setCityId", response2.data.location_suggestions[0].id);
      commit("setCityName", response2.data.location_suggestions[0].name);
    },

    async getCollections({ commit }) {
      console.log(store.state.cityId);
      await axios
        .get(
          "https://developers.zomato.com/api/v2.1/collections?lat=" +
            store.state.lat +
            "&lon=" +
            store.state.lng,
          { headers: config }
        )
        .then(response => {
          commit("setCollections", response.data.collections);
        });
    },

    async getRestaurants({ commit }, collectionId) {
      const response = await axios.get(
        "https://developers.zomato.com/api/v2.1/search?lat=" +
          store.state.lat +
          "&lon=" +
          store.state.lng +
          "&collection_id=" +
          collectionId,
        {
          headers: config
        }
      );
      console.log(response.data);
      commit("setRestaurants", response.data.restaurants);
    },

    async getMoreInfo({ commit }, restId) {
      const url3 =
        `https://developers.zomato.com/api/v2.1/restaurant?res_id=` + restId;

      const response = await axios.get(url3, {
        headers: config
      });
      console.log(response.data.all_reviews.reviews);
      commit("getMoreInfo", response.data);
    }
  },

  mutations: {
    setCollections: function(state, collections) {
      state.collections = collections;
    },
    setRestaurants: function(state, restaurants) {
      state.restaurants = restaurants;
    },
    getMoreInfo: function(state, restaurantInfo) {
      state.restaurantInfo = restaurantInfo;
    },

    setCityId: function(state, cityId) {
      state.cityId = cityId;
    },
    setCityName: function(state, cityName) {
      state.cityName = cityName;
    }
  }
});

export default store;
export const db = firebase.firestore();
