import * as firebase from "firebase";
import "firebase/auth";

const state = {
  currentUser: null
};

const mutations = {
  SET_USER(state, { user }) {
    state.currentUser = user;
  },
  UNSET_USER() {
    state.currentUser = {};
  }
};

const actions = {
  init({ commit, rootState }) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        commit("SET_USER", { user });
      } else {
        commit("UNSET_USER");
      }
    });
  },
  login({ rootState }) {
    var authProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(authProvider);
  },
  logout({ rootState }) {
    firebase.auth().signOut();
  }
};

export default { namespaced: true, state, mutations, actions };
