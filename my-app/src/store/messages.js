import "firebase/auth";
import { db } from "./index";
import * as firebase from "firebase";

const state = {
  all: []
};

const mutations = {
  ADD_MESSAGE(state, message) {
    state.all.push(message);
  }
};

const actions = {
  init({ commit }) {
    let messagesRef = db.collection("messages");

    messagesRef.orderBy("created_on").onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type === "added") {
          commit("ADD_MESSAGE", {
            ...change.doc.data(),
            id: change.doc.id
          });
        }
      });
    });
  },
  send({ commit }, { username, image, text }) {
    let messagesRef = db.collection("messages");

    messagesRef.add({
      username,
      image,
      text,
      created_on: new Date()
    });
  },
  addFavorites({ commit }, { username, object, uid }) {
    let favoritesRef = db.collection("favorites");
    favoritesRef.add({
      username,
      uid,
      object,
      created_on: new Date()
    });
  }
};

export default { namespaced: true, state, mutations, actions };
