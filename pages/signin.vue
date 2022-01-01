<template>
  <div class="container">
    <form @submit.prevent="signIn">
      <input type="text" placeholder="Email" v-model="email" />
      <input type="password" placeholder="Password" v-model="password" />
      <button type="submit">Submit</button>
    </form>
    <section v-if="getUser" class="section">
      <div class="columns">
        <div class="column is-half is-offset-one-quarter">
          Welcome {{ getUser.email }}
        </div>
      </div>
    </section>
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
      email: "",
      password: "",
    };
  },
  computed: {
    getUser() {
      return this.$store.getters.getUser;
    },
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("triggered");
        console.log(user.email);
        // update data or vuex state
      } else {
        console.log("User is not logged in.");
      }
    });
  },
  methods: {
    signIn() {
      this.$store.dispatch("user/login", {
        email: this.email,
        password: this.password,
      });
      console.log("user state:", this.getUser);
    },
    async login() {
      await this.$store.dispatch(
        "user/login",
        {
          email: this.email,
          password: this.password,
        }.then(() => {
          console.log("user state:", this.getUser);
        })
      );
    },
  },
});
</script>
