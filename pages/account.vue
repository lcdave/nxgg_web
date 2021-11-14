<template>
  <div>
    <h3>Welcome, {{ user.email }}</h3>
  </div>
</template>

<script>
import Vue from "vue";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";

export default Vue.extend({
  name: "",
  data() {
    return {
      user: "",
    };
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!this.user) {
        this.$router.push("/");
      } else {
        this.user = user;
      }
    });
  },
  methods: {},
});
</script>
