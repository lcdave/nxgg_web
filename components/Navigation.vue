<template>
  <div class="mainnav" :class="{ 'mainnav--active': isActive }">
    <div class="mainnav__trigger"></div>
    <div class="mainnav__content" :class="isActive">
      <div class="mainnav__links">
        <prismic-link
          :field="menuLink.link"
          class="navbar-item"
          v-for="menuLink in $store.state.menu.menu_links"
          :key="menuLink.id"
          >{{ $prismic.asText(menuLink.label) }}</prismic-link
        >
        <a v-if="user" @click="signout">Logout</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

export default Vue.extend({
  name: "",
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      hamburgerOpen: false,
      user: "",
      name: "Michel",
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
});
</script>

<style lang="scss" src="../assets/sass/components/_navigation.scss"></style>
