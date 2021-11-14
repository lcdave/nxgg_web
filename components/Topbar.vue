<template>
  <div class="topbar">
    <div class="columns">
      <div class="column">
        <div class="logo">
          <img src="../assets/theme/logo.png" alt="NXGG Logo" />
        </div>
      </div>
      <div class="column">
        <navigation />
        <a v-if="user" @click="signout">Logout</a>
      </div>
      <div class="column">
        <button class="button is-primary">Jetzt live</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" src="../assets/sass/components/_topbar.scss"></style>

<script>
import Navigation from "./Navigation.vue";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";

export default {
  name: "Topbar",
  components: {
    Navigation,
  },
  data() {
    return {
      user: "",
    };
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
  },
  methods: {
    signout() {
      firebase
        .auth()
        .signOut()
        .then((result) => {
          console.log(result);
          this.user = "";
          this.$router.push("/");
        });
    },
  },
};
</script>
<style lang="scss" scoped></style>
