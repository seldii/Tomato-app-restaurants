import "firebase/auth";
import { db } from "./index";

const state = {
  all: []
};

const mutations = {
  ADD_FAVORITES(state, favorite) {
    state.all.push(favorite);
  }
};

const actions = {
  init({ commit }) {
    let favoritesRef = db.collection("favorites");

    favoritesRef.orderBy("created_on").onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type === "added") {
          commit("ADD_FAVORITES", {
            ...change.doc.data(),
            id: change.doc.id
          });
        }
      });
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
