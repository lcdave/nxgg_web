import firebase from "firebase/compat/app";
import "firebase/compat/auth";

export const state = () => ({
  user: null,
  loading: false,
  error: null,
});

export const mutations = {
  setUser(state, payload) {
    console.log("user beeing set to", payload);
    state.user = payload;
  },
  setError(state, payload) {
    state.error = payload;
  },
  setLoading(state, payload) {
    state.loading = payload;
  },
};

export const actions = {
  signUpAction({ commit }, payload) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then((response) => {
        console.log(response);
        // @TODO mutate user state.
      })
      .catch((error) => {
        // @TODO mutate error state.
      });
  },
  signInAction({ commit }, payload) {
    return firebase
      .auth()
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then((response) => {
        console.log("signin response", response);
        commit("setUser", response.user);
      })
      .catch((error) => {
        commit("setError", error.message);
      });
  },
  async login({ commit }, payload) {
    commit("setLoading", true);
    await firebase
      .auth()
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then((firebaseData) => {
        commit("setUser", firebaseData.user);
        commit("setLoading", false);
        commit("setError", null);
        console.log("login", firebaseData);
      })
      .catch((error) => {
        commit("setLoading", false);
        commit("setError", error.message);
      });
  },
};

export const modules = {};

export const getters = {
  getUser(state) {
    return state.user;
  },
  isUserAuth(state) {
    return !!state.user;
  },
  getError(state) {
    return state.error;
  },
};
