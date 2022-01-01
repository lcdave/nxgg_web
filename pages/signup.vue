<template>
  <div class="container">
    <form @submit.prevent="signUp">
      <input type="text" placeholder="Email" v-model="email" />
      <input type="text" placeholder="Password" v-model="password" />
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import Vue from "vue";
import { mapActions } from "vuex";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";

export default Vue.extend({
  name: "",
  data() {
    return {
      email: "",
      password: "",
      errors: "",
    };
  },
  methods: {
    ...mapActions(["signUpAction"]),
    pressed() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((user) => {
          console.log(user);
          this.$router.push("/account");
        })
        .catch((error) => {
          this.error = error;
          console.log(error);
        });
    },
    signUp() {
      this.signUpAction({ email: this.email, password: this.password });
    },
  },
});
</script>
