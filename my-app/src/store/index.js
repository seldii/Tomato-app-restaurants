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

Vue.config.productionTip = false;

const firebaseConfig = {
  apiKey: "AIzaSyB7ws-JIBX__G79-jBTYMemDCaBuTwUKA0",
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
  "user-key": "1fed55d6e1bf7fa795601c5deac270ae",
  Accept: "application/json"
};

let lon = "";
let lat = "";
const store = new Vuex.Store({
  state: {
    collections: [],
    collectionIds: [],
    restaurants: [],
    restaurantInfo: [],
    cityId: "",
    cityName: ""
  },
  modules: {
    user,
    messages
  },
  getters: {},
  actions: {
    async getLocation({ commit }, e) {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=` +
          e +
          `&key=AIzaSyBXjKG5EqxMNpeCQKD5EVe9sZiHPYVuxJ0`
      );

      lat = response.data.results[0].geometry.location.lat;
      lon = response.data.results[0].geometry.location.lng;

      const response2 = await axios.get(
        "https://developers.zomato.com/api/v2.1/cities?lat=" +
          lat +
          "&lon=" +
          lon,
        { headers: config }
      );
      console.log(response2.data.location_suggestions[0].name);
      commit("setCityId", response2.data.location_suggestions[0].id);
      commit("setCityName", response2.data.location_suggestions[0].name);
    },

    async getCollections({ commit }, cityId) {
      console.log(store.state.cityId);
      await setTimeout(() => {
        axios
          .get(
            "https://developers.zomato.com/api/v2.1/collections?city_id=" +
              store.state.cityId,
            { headers: config }
          )
          .then(response => {
            console.log(response.data.collections);
            commit("setCollections", response.data.collections);
          });
      }, 2500);
    },

    async getRestaurants({ commit }, collectionId) {
      const url2 =
        `https://developers.zomato.com/api/v2.1/search?lat=` +
        lat +
        `&lon=` +
        lon +
        `&collection_id=` +
        collectionId;
      const response = await axios.get(url2, {
        headers: config
      });
      console.log(response.data.restaurants);
      commit("setRestaurants", response.data.restaurants);
    },

    async getMoreInfo({ commit }, restId) {
      const url3 =
        `https://developers.zomato.com/api/v2.1/restaurant?res_id=` + restId;

      const response = await axios.get(url3, {
        headers: config
      });
      console.log(response.data);
      commit("getMoreInfo", response.data);
    }
    /* init({ commit }) {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          commit("SET_USER", { user });
        } else {
          commit("UNSET_USER");
        }
      });
    },
    login({}) {
      var authProvider = new firebase.auth.GoogleAuthProvider();
      return firebase.auth().signInWithPopup(authProvider);
    },
    logout({}) {
      firebase.auth().signOut();
    } */
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
    /*  SET_USER(state, { user }) {
      state.currentUser = user;
    },
    UNSET_USER(state) {
      state.currentUser = {};
    } */
  }
});

export default store;
export const db = firebase.firestore();
